import Axios, {AxiosInstance} from "axios";
import cheerio from "cheerio";
import {
    calculateRefId,
    createDictionarySourceProduct,
    executeInParallel, MAX_BRAND_STYLE_PRODUCTS,
    readCachedData,
    readCachedUrl
} from "./global-util";
import * as url from "url";
import parseIntStrict from "parse-int";
import _ from "lodash";
import {Brand, Category, Group, Style} from "heatcraft-js-shared/lib/product";
import {Accessories, DictionaryId, FactoryOptionLegacy, SourceProduct} from "heatcraft-js-shared/lib/source-product";

const baseUrl = 'http://www.heatcraftrpd.com/productcatalog/';

let crawlingAxios = null;

async function getCrawlingAxios(): Promise<AxiosInstance> {
    if (crawlingAxios === null) {
        const cookie = await fetchCookie();
        crawlingAxios = Axios.create({headers: {'Cookie': cookie}})
    }
    return crawlingAxios;
}

const xrefAxios = Axios.create();

async function getXrefAxios(): Promise<AxiosInstance> {
    return xrefAxios;
}

async function fetchCookie() {
    const cookieUrl = `${baseUrl}familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC107&pageNo=1&cID=2`;
    console.log(`Fetching cookie from: ${cookieUrl}`)
    const response = await Axios.get(cookieUrl);
    const setCookie = response.headers['set-cookie'][0];
    const cookie = setCookie.split(";")[0];
    console.log(`Fetched cookie: ${cookie}`);
    return cookie;
}

function formatProductLink(productLink: ProductLink): string {
    return `${productLink.productId}-${productLink.standardModel}-${productLink.configModel}`;
}

interface ParsedPage {
    rawData: string,
    $: CheerioStatic
}

function parseFloatAttribute(attribute: Attribute) {
    if (attribute.attributeValue === undefined || attribute.attributeValue === '-') {
        return null;
    }
    const result = Number(attribute.attributeValue.replace(',', ''));
    if (isNaN(result)) {
        throw `Attribute '${attribute.attributeName}' cannot be parsed to FLOAT: '${attribute.attributeValue}'`;
    }
    return result
}

class Crawler {
    private readonly brand: Brand;
    private readonly group: Group;
    private readonly category: Category;
    private readonly style: Style;

    constructor(brand: Brand, group: Group, category: Category, style: Style) {
        this.brand = brand;
        this.group = group;
        this.category = category;
        this.style = style;
    }

    private subDir(): string {
        return `${this.group}/${this.brand}/${this.category}/${this.style}`;
    }

    async crawlProductListPages(firstPageUrl: string): Promise<ProductLink[]> {
        const pages: ParsedPage[] = [];
        let pageUrl = baseUrl + firstPageUrl;
        while (pageUrl !== null) {
            const pageNumber = parseInt(url.parse(pageUrl, true).query['pageNo'].toString()).toString().padStart(3, '0');
            // read raw HTML from cache or from web
            const rawData = await readCachedUrl(
                `crawl_cache/product_list/${this.subDir()}/${pageNumber}.json`,
                pageUrl,
                getCrawlingAxios
            );

            // parse and add the page to result
            const $ = cheerio.load(rawData);
            pages.push({rawData: rawData, $: $});

            // is there a next page ?
            const pageUri = $('a').filter(function (idx, a) {
                return $(a).html() === 'Next'
            }).attr('href');
            pageUrl = pageUri !== undefined ? baseUrl + pageUri : null;
        }
        return this.extractProductsLinks(pages);
    }


    private extractProductsLinks(parsedPages: ParsedPage[]): ProductLink[] {
        return parsedPages.flatMap(parsedPage => {
            const $ = parsedPage.$;
            return $("#tbl_ProductsDisplay tr")
                .filter((idx, tr) => $(tr).find('input[type=checkbox]').length > 0)
                .map((idx, tr) => {
                    const standardModel = $(tr).find('td:nth-child(2) a');
                    const configModel = $(tr).find('td:nth-child(3) a');
                    let href = $(standardModel).attr('href');
                    const productId = parseInt(url.parse(href, true).query['PID'].toString());
                    return {
                        productId: productId,
                        standardModel: $(standardModel).text(),
                        configModel: $(configModel).text(),
                        href: href
                    } as ProductLink;
                })
                .get()
                .filter(({href}) => href !== undefined);
        });
    }

    async crawlBasicData(productLink: ProductLink): Promise<BasicData> {
        const rawData = await readCachedUrl(
            `crawl_cache/product_detail/${this.subDir()}/${formatProductLink(productLink)}-basic.json`,
            baseUrl + productLink.href,
            getCrawlingAxios
        );

        // parse and add the page to result
        const $ = cheerio.load(rawData);

        const basicData: Attribute[] = $('#prodDetails tr')
            .map((idx, tr) => {
                const attributeName = $(tr).find('td strong').text().trim().replace(":", "").trim();
                const attributeValueNodes = $(tr).find('td').contents();
                const attributeValue = attributeValueNodes.length >= 2 ? attributeValueNodes[1].nodeValue.trim() : undefined;
                return {attributeName, attributeValue}
            }).get();

        const productSpecifications: Attribute[] = $('table[width=601] table[valign=top] tr')
            .filter((idx, tr) => $(tr).children().length === 3)
            .map((idx, tr) => {
                const attributeName = $(tr).find('td:nth-child(2)').text().trim();
                const attributeValue = $(tr).find('td:nth-child(3)').text().trim();
                return {attributeName, attributeValue};
            }).get();

        const alaCarteOptionsLink = $("a")
            .filter((idx, a) => $(a).text().indexOf("Factory-Installed") !== -1)
            .filter((idx, a) => $(a).closest('li').css("display") !== 'none')
            .attr("href");

        const accessoriesLink = $("a").filter((idx, a) => $(a).text().indexOf("Shipped-Loose") !== -1).attr("href");

        return {basicData, productSpecifications, alaCarteOptionsLink, accessoriesLink}
    }

    async crawlAlaCarteOptions(productLink: ProductLink, alaCarteOptionsLink: string): Promise<FactoryOptionLegacy[]> {
        if (!alaCarteOptionsLink) {
            return [];
        }
        const rawData = await readCachedUrl(
            `crawl_cache/product_detail/${this.subDir()}/${formatProductLink(productLink)}-factory-options.json`,
            baseUrl + alaCarteOptionsLink,
            getCrawlingAxios
        );
        const $ = cheerio.load(rawData);
        const table = $('b').filter((idx, b) => $(b).html() === 'Option Code').closest('table');

        const alaCarteOptions: FactoryOptionLegacy[] = [];
        let section;

        $(table).find('tr')
            .each((idx, tr) => {
                let sectionNameElement = $(tr).find('b');
                if (sectionNameElement.length === 1) {
                    section = sectionNameElement.html();
                }
                if ($(tr).find("td.bdr_btm").length === 0) {
                    const optionCode = $(tr).find('td:nth-child(1)').text().trim();
                    const description = $(tr).find('td:nth-child(2)').text().trim();
                    const notes = $(tr).find('td:nth-child(3)').text().trim();
                    const listPrice = $(tr).find('td:nth-child(4)').text().trim();
                    alaCarteOptions.push({section, optionCode, description, notes, listPrice})
                }
            });
        return alaCarteOptions;
    }

    async crawlAccessories(productLink: ProductLink, accessoriesLink: string): Promise<Accessories> {
        if (!accessoriesLink) {
            throw `Missing accessoriesLink: "${accessoriesLink}", productLink: ${JSON.stringify(productLink)}`;
        }
        const rawData = await readCachedUrl(
            `crawl_cache/product_detail/${this.subDir()}/${formatProductLink(productLink)}-accessories.json`,
            baseUrl + accessoriesLink,
            getCrawlingAxios
        );
        const $ = cheerio.load(rawData);

        const accessories: Accessories = {shippedLooseAccessories: [], expansionValves: [], liquidValves: []};

        let section = undefined;
        $('strong').filter((idx, strong) => $(strong).html() === 'Notes')
            .closest('table')
            .find('tr')
            .each((idx, tr) => {
                let sectionNameElement = $(tr).find('bol');
                if (sectionNameElement.length === 1) {
                    section = sectionNameElement.text();
                }
                if ($(tr).find("td.bdr_btm").length === 0) {
                    const partNumber = $(tr).find('td:nth-child(1)').text().trim();
                    const description = $(tr).find('td:nth-child(2)').text().trim();
                    const notes = $(tr).find('td:nth-child(3)').text().trim();
                    const listPrice = parseFloatAttribute({
                        attributeName: "List Price",
                        attributeValue: $(tr).find('td:nth-child(4)').text().trim()
                    });

                    accessories.shippedLooseAccessories.push({section, partNumber, description, notes, listPrice});
                }
            })

        section = undefined;
        $('td').filter((idx, td) => $(td).html() === 'Expansion Valves (TXV)')
            .closest('table')
            .find('table tr')
            .each((idx, tr) => {
                if ($(tr).find("td.bdr_btm").length === 0 && $(tr).children('td').length === 3) {
                    const partNumber = $(tr).find('td:nth-child(1)').text().trim();
                    const capacityRange = $(tr).find('td:nth-child(2)').text().trim();
                    const listPrice = parseFloatAttribute({
                        attributeName: "List Price",
                        attributeValue: $(tr).find('td:nth-child(3)').text().trim()
                    });

                    accessories.expansionValves.push({partNumber, capacityRange, price: listPrice});
                }
            })

        section = undefined;
        $('td').filter((idx, td) => $(td).html() === 'Liquid-line Solenoid Valves (LLSV)')
            .closest('table')
            .find('table tr')
            .each((idx, tr) => {
                let sectionNameElement = $(tr).find('strong');
                if (sectionNameElement.length === 1) {
                    section = sectionNameElement.text();
                }
                if ($(tr).find("td.bdr_btm").length === 0 && $(tr).children('td').length === 4) {
                    const partNumber = $(tr).find('td:nth-child(1)').text().trim();
                    const capacityRange = $(tr).find('td:nth-child(2)').text().trim();
                    const size = $(tr).find('td:nth-child(3)').text().trim();
                    const listPrice = parseFloatAttribute({
                        attributeName: "List Price",
                        attributeValue: $(tr).find('td:nth-child(4)').text().trim()
                    });

                    accessories.liquidValves.push({section, partNumber, capacityRange, size, price: listPrice});
                }
            })

        return accessories;
    }


    async fetchNewModelCrossReference(productLink: ProductLink): Promise<string[]> {
        if (productLink.standardModel === '-') {
            return [];
        }
        if (productLink.standardModel.length < 4) {
            throw productLink.standardModel;
        }
        const xrefData = await readCachedUrl(
            `crawl_cache/product_detail/${this.subDir()}/${formatProductLink(productLink)}-xref.json`,
            `https://marketingapi.heatcraftrpdqa.com/xref/v2/models/${productLink.standardModel}/new`,
            getXrefAxios
        );
        if (xrefData['message'] === 'Model Not Found') {
            return [];
        }
        return xrefData
            ['doe'].map(doe => doe['modelno']);
    }
}

interface ProductLink {
    productId: number,
    standardModel: string,
    configModel: string,
    href: string
}

interface Attribute {
    attributeName: string,
    attributeValue: string,
}

interface BasicData {
    basicData: Attribute[],
    productSpecifications: Attribute[],
    alaCarteOptionsLink: string,
    accessoriesLink: string
}

interface Pro3PackagedLegacyProduct {
    productId: number,
    modelNumber: string,
    brand: Brand,
    style: Style,
    basicData: Attribute[],
    productSpecifications: Attribute[],
    newModeNumbers: string[],
}

interface WalkInUnitCoolersLegacyProduct {
    productId: number,
    modelNumber: string;
    brand: Brand,
    style: Style,
    basicData: Attribute[],
    productSpecifications: Attribute[],
    alaCarteOptions: FactoryOptionLegacy[],
    accessories: Accessories,
    newModeNumbers: string[],
}


const brandIds: { brand: Brand, cID: number }[] = [
    {brand: "bohn", cID: 2},
    {brand: "larkin", cID: 3},
    {brand: "climate_control", cID: 4},
    {brand: "chandler", cID: 5},
]

export async function crawlPro3PackagedLegacyProducts(): Promise<Pro3PackagedLegacyProduct[]> {
    return readCachedData(
        "category_cache/pro3-legacy.json",
        async () => {
            console.log("Crawling PRO3 Packaged LEGACY products");

            async function crawl(brand: Brand, style: Style, firstPageUrl: string): Promise<Pro3PackagedLegacyProduct[]> {
                const crawler = new Crawler(brand, "compressorized", "pro3_packaged", style);
                const productLinks = (await crawler.crawlProductListPages(firstPageUrl)).slice(0, MAX_BRAND_STYLE_PRODUCTS);
                return await executeInParallel(productLinks, 30, async (productLink) => {
                    const basicData = await crawler.crawlBasicData(productLink);
                    // const newModeNumbers = await crawler.fetchNewModelCrossReference(productLink);
                    const newModeNumbers = [];
                    return {
                        productId: productLink.productId,
                        modelNumber: productLink.standardModel,
                        brand: brand,
                        style: style,
                        basicData: basicData.basicData,
                        productSpecifications: basicData.productSpecifications,
                        newModeNumbers
                    }
                });
            }

            const pro3PackagedStyles: { style: Style, catID: string }[] = [
                {style: "top_mount", catID: "HC042"},
                {style: "side_mount", catID: "HC040"},
            ];

            const products: Pro3PackagedLegacyProduct[] = [];
            for (const brandId of brandIds) {
                for (const pro3PackagedStyle of pro3PackagedStyles) {
                    products.push(...await crawl(
                        brandId.brand,
                        pro3PackagedStyle.style,
                        `familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=${pro3PackagedStyle.catID}&pageNo=1&cID=${brandId.cID}`,
                    ));
                }
            }

            return _.sortBy(products, ['brand', 'style', 'productId']);
        }
    )
}

export async function crawlWalkInUnitCoolers(): Promise<WalkInUnitCoolersLegacyProduct[]> {
    return await readCachedData(
        "category_cache/walk-in-legacy.json",
        async () => {
            console.log("Crawling Walk-In Unit Coolers LEGACY products");

            async function crawl(brand: Brand, style: Style, firstPageUrl: string): Promise<WalkInUnitCoolersLegacyProduct[]> {
                let crawler = new Crawler(brand, "evaporators_unit_coolers", 'walk_in_unit_coolers', style);
                const productLinks = (await crawler.crawlProductListPages(firstPageUrl)).slice(0, MAX_BRAND_STYLE_PRODUCTS);

                return await executeInParallel(productLinks, 30, async (productLink) => {
                    const basicData = await crawler.crawlBasicData(productLink);
                    const alaCarteOptions = await crawler.crawlAlaCarteOptions(productLink, basicData.alaCarteOptionsLink);
                    const accessories = await crawler.crawlAccessories(productLink, basicData.accessoriesLink);
                    // const newModeNumbers = await crawler.fetchNewModelCrossReference(productLink);
                    const newModeNumbers = [];
                    return {
                        productId: productLink.productId,
                        modelNumber: productLink.standardModel,
                        brand: brand,
                        style: style,
                        basicData: basicData.basicData,
                        productSpecifications: basicData.productSpecifications,
                        alaCarteOptions,
                        accessories,
                        newModeNumbers
                    }
                });
            }

            const walkInStyles: { style: Style, catID: string }[] = [
                {style: "low_profile", catID: "HC107"},
                {style: "center_mount", catID: "HC057"},
                {style: "low_velocity_center_mount", catID: "HC059"},
                // {style: "medium_profile", catID: "HC106"},
            ];

            const products: WalkInUnitCoolersLegacyProduct[] = [];
            for (const brandId of brandIds) {
                for (const walkInStyle of walkInStyles) {
                    products.push(...await crawl(
                        brandId.brand,
                        walkInStyle.style,
                        `familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=${walkInStyle.catID}&pageNo=1&cID=${brandId.cID}`,
                    ));
                }
            }
            return _.sortBy(products, ['brand', 'style', 'productId']);
        }
    )
}

const catalogueSpecificProperties: { [brand in Brand]: any } = {
    'bohn': {
        catalogueId: 2,
        configModel: 'Bohn Config Model',
        intelliGenConfigModel: 'Bohn intelliGen™ Config Model',
        intelliGenConfigListPrice: 'Bohn intelliGen™ Config. List Price ($US)',
    },
    'larkin': {
        catalogueId: 3,
        configModel: 'Larkin Config Model',
        intelliGenConfigModel: 'Larkin intelliGen™ Config Model',
        intelliGenConfigListPrice: 'Larkin intelliGen™ Config. List Price ($US)',
    },
    'climate_control': {
        catalogueId: 4,
        configModel: 'Climate Control Config Model',
        intelliGenConfigModel: 'Climate Control intelliGen™ Config Model',
        intelliGenConfigListPrice: 'Climate Control intelliGen™ Config. List Price ($US)',
    },
    'chandler': {
        catalogueId: 5,
        configModel: 'Chandler Config Model',
        intelliGenConfigModel: 'Chandler intelliGen™ Config Model',
        intelliGenConfigListPrice: 'Chandler intelliGen™ Config. List Price ($US)',
    },
}

function parseIntegerAttribute(attribute: Attribute) {
    const result = parseIntStrict(attribute.attributeValue.replace(',', ''));
    if (result === undefined) {
        throw `Attribute '${attribute.attributeName}' cannot be parsed to INTEGER: '${attribute.attributeValue}'`;
    }
    return result
}


// noinspection NonAsciiCharacters
const attributeParsers = {
    "List Price ($US)": parseFloatAttribute,
    "List Price Adder(US$)": parseFloatAttribute,
    "Capacity (BTUH) °F": parseFloatAttribute,
    "Capacity (BTUH)": parseIntegerAttribute,
    "CFM": parseIntegerAttribute,
    "No. of Fans": parseIntegerAttribute,
    "Motor Watts": parseIntegerAttribute,
    "Motor Amps": parseFloatAttribute,
    "MCA": parseFloatAttribute,
    "MOPD": parseIntegerAttribute,
    "Approx. Net Weight (lbs.)": parseIntegerAttribute,
    "Refrig. Charge R-404A (lbs.)": parseIntegerAttribute,
}

function parseAttribute(attribute) {
    const attributeParser = attributeParsers[attribute.attributeName];
    if (attributeParser) {
        return attributeParser(attribute);
    } else {
        return attribute.attributeValue;
    }
}

interface ConsolidatedSourceProducts {
    uniqueAttributeNames: string[]
    products: SourceProduct[],
    dictionaries: SourceProduct[],
}

export function consolidatePro3PackagedLegacyProducts(crawledProducts: Pro3PackagedLegacyProduct[]): ConsolidatedSourceProducts {
    const products: SourceProduct[] = []
    const uniqueAttributeName = new Set<string>()
    for (const crawledProduct of crawledProducts) {
        let catalogueSpecificProperty = catalogueSpecificProperties[crawledProduct.brand];
        const product: SourceProduct = {
            productId: catalogueSpecificProperty.catalogueId * 1000000 + crawledProduct.productId,
            modelNumber: crawledProduct.modelNumber,
            brand: crawledProduct.brand,
            group: 'compressorized',
            category: 'pro3_packaged',
            style: crawledProduct.style,
        };
        crawledProduct.basicData.forEach(attribute => product[attribute.attributeName] = parseAttribute(attribute));
        crawledProduct.productSpecifications.forEach(attribute => product[attribute.attributeName] = parseAttribute(attribute));
        product["configModel"] = product[catalogueSpecificProperty.configModel];
        product.newModelNumbers = crawledProduct.newModeNumbers;
        products.push(product);
        for (const attributeName of Object.keys(product)) {
            uniqueAttributeName.add(attributeName)
        }
    }
    return {
        uniqueAttributeNames: Array.from(uniqueAttributeName),
        products: _.sortBy(products, 'productId'),
        dictionaries: null
    }
}

export function consolidateWalkInUnitCoolersLegacyProducts(crawledProducts: WalkInUnitCoolersLegacyProduct[]): ConsolidatedSourceProducts {
    const products: SourceProduct[] = []
    const uniqueAttributeName = new Set<string>()
    for (const crawledProduct of crawledProducts) {
        try {
            let catalogueSpecificProperty = catalogueSpecificProperties[crawledProduct.brand];
            const product: SourceProduct = {
                productId: catalogueSpecificProperty.catalogueId * 1000000 + crawledProduct.productId,
                modelNumber: crawledProduct.modelNumber,
                brand: crawledProduct.brand,
                group: 'evaporators_unit_coolers',
                category: 'walk_in_unit_coolers',
                style: crawledProduct.style,
            };
            crawledProduct.basicData.forEach(attribute => product[attribute.attributeName] = parseAttribute(attribute));
            crawledProduct.productSpecifications
                .filter(attribute => !(attribute.attributeName === "No. of Fans" && attribute.attributeValue === "")) // TODO: remove this special handling
                .forEach(attribute => product[attribute.attributeName] = parseAttribute(attribute));
            product["configModel"] = product[catalogueSpecificProperty.configModel];
            product["intelliGenConfigModel"] = product[catalogueSpecificProperty.intelliGenConfigModel];
            product["intelliGenConfigListPrice"] = parseFloatAttribute({
                attributeName: 'intelliGenConfigListPrice',
                attributeValue: product[catalogueSpecificProperty.intelliGenConfigListPrice]
            });
            product.walkInUnitCoolersLegacy = {
                alaCarteOptions: crawledProduct.alaCarteOptions,
                accessories: crawledProduct.accessories,
                dictionaryRefIds: {
                    capacity: null, preferredOptions: null, alaCarteOptions: null,
                    expansionValves: null, liquidValves: null, shippedLoose: null, reverseCycleKits: null,
                }
            }
            product.newModelNumbers = crawledProduct.newModeNumbers;
            products.push(product);
            for (const attributeName of Object.keys(product)) {
                uniqueAttributeName.add(attributeName)
            }
        } catch (e) {
            console.log(crawledProduct);
            throw e;
        }
    }

    // compute dictionaries
    const dictionaryBuilders: { [key in DictionaryId]: any[] } = {
        capacity: null, preferredOptions: null, alaCarteOptions: [[]], shippedLoose: [[]], reverseCycleKits: [[]],
        liquidValves: [[]], expansionValves: [[]] // [[]] is used, because we want empty dictionary item to be at index 0
    };

    for (const product of products) {
        product.walkInUnitCoolersLegacy.dictionaryRefIds = {
            capacity: null,
            preferredOptions: null,
            alaCarteOptions: calculateRefId(dictionaryBuilders.alaCarteOptions, product.walkInUnitCoolersLegacy.alaCarteOptions),
            liquidValves: calculateRefId(dictionaryBuilders.liquidValves, product.walkInUnitCoolersLegacy.accessories.liquidValves),
            expansionValves: calculateRefId(dictionaryBuilders.expansionValves, product.walkInUnitCoolersLegacy.accessories.expansionValves),
            shippedLoose: calculateRefId(dictionaryBuilders.shippedLoose, product.walkInUnitCoolersLegacy.accessories.shippedLooseAccessories),
            reverseCycleKits: null
        }
    }

    const dictionaries = [
        ...dictionaryBuilders.alaCarteOptions.map((options, idx) => createDictionarySourceProduct(idx, "alaCarteOptions", options)),
        ...dictionaryBuilders.liquidValves.map((valves, idx) => createDictionarySourceProduct(idx, "liquidValves", valves)),
        ...dictionaryBuilders.expansionValves.map((valves, idx) => createDictionarySourceProduct(idx, "expansionValves", valves)),
        ...dictionaryBuilders.shippedLoose.map((shippedLoose, idx) => createDictionarySourceProduct(idx, "shippedLoose", shippedLoose)),
    ];

    return {
        uniqueAttributeNames: Array.from(uniqueAttributeName),
        products: _.sortBy(products, 'productId'),
        dictionaries: dictionaries
    }
}

