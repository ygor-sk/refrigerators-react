import XLSX, {WorkBook, WorkSheet} from 'xlsx'
import * as fs from "fs";
import _ from 'lodash';
import {
    calculateRefId,
    createDictionarySourceProduct,
    MAX_BRAND_STYLE_PRODUCTS,
    readCachedData,
    toDotCmsItemId
} from "./global-util";
import {Brand, Style} from "heatcraft-js-shared/lib/product";
import {
    DictionaryId,
    FactoryOption,
    ShippedLooseAccessory,
    SourceProduct,
    WalkInNewExpansionValve,
    WalkInNewLiquidValve,
    WalkInUnitCoolersOptionKey
} from "heatcraft-js-shared/lib/source-product";

let utils = XLSX.utils;
let productId = 4000;

interface Attribute {
    name: string,
    column: number,
    isSimple: boolean
}

export interface WalkInUnitCoolerProducts {
    products: SourceProduct[],
    dictionaries: SourceProduct[]
}

function attributeMode(attributeName: string): "parseInt" | "toString" | undefined {
    switch (attributeName) {
        case "FPI":
            return "parseInt";
        case "Part Number":
            return "toString";
        default:
            return undefined;
    }
}

function parseAWEF(productRow: { [p: string]: any }) {
    const awef = productRow['AWEF'];
    if (awef === "" || awef === "-") {
        return null;
    }
    return awef;
}

function parseDoeCompliance(productRow: { [p: string]: any }): boolean {
    return productRow['DOE Compliance'] === 'Compliant';
}

function collectAttributes(style: Style,
                           products: { [p: string]: SourceProduct },
                           sheet: WorkSheet,
                           modelNumberCellAddressRaw: string,
                           specs: {
                               attributeRanges?: { [rangeRaw: string]: boolean }, // true = simple attribute, false = capacity, parts, etc ...,
                               optionRanges?: { [rangeRaw: string]: WalkInUnitCoolersOptionKey },
                               expansionValveAddresses?: string[],
                               liquidValveAddresses?: string[],
                               reverseCycleKitCellAddressesRaw?: ReverseCycleKitCellAddressesRaw,
                           }
) {
    const modelNumberCellAddress = XLSX.utils.decode_cell(modelNumberCellAddressRaw);
    const headerRow = modelNumberCellAddress.r;
    const modelNumberCol = modelNumberCellAddress.c;

    const attributes: { [attributeName: string]: Attribute } = {};
    for (const [rangeRaw, isSimple] of Object.entries(specs.attributeRanges || {})) {
        let range = utils.decode_range(rangeRaw);
        for (let col = range.s.c; col <= range.e.c; col++) {
            const attributeName: string = sheet[utils.encode_cell({r: headerRow, c: col})].v.trim();
            if (attributeName !== "Est. Net Weight (kg)" && attributeName !== "Drain Pan Amps") { // TODO: remove this exception, after data has been fixed
                attributes[attributeName] = {name: attributeName, column: col, isSimple: isSimple};
            }
        }
    }

    let sheetRange = utils.decode_range(sheet['!ref']);
    for (let row = headerRow + 1; row <= sheetRange.e.r; row++) {
        let modelNumberCell = sheet[utils.encode_cell({r: row, c: modelNumberCol})];
        if (modelNumberCell !== undefined) { // is the row non-empty ?
            const productRow: { [id: string]: any } = {};
            for (const attribute of Object.values(attributes)) {
                productRow[attribute.name] = parseCellValue(sheet, row, attribute.column, attributeMode(attribute.name));
            }

            const modelNumber = modelNumberCell.v.toString();
            let product = products[modelNumber];
            if (product === undefined) {
                const pdfCount = Math.abs(hashCode(modelNumber)) % 3;
                product = {
                    productId: productId++,
                    modelNumber: modelNumber,
                    brand: productRow['Brand'] === undefined ?
                        null :
                        toDotCmsItemId(productRow['Brand']) as Brand,
                    group: 'evaporators_unit_coolers',
                    category: 'walk_in_unit_coolers',
                    style: style,
                    filePaths: [...Array(pdfCount).keys()].map(i => `/resources/pdf/model/low_profile/${modelNumber}_${i}.pdf`.toLowerCase()),
                    walkInUnitCoolers: {
                        capacity: [],
                        options: {preferred: [], alaCarte: [],},
                        valves: {expansionValves: [], liquidValves: []},
                        reverseCycleKits: [],
                        shippedLoose: [],
                        dictionaryRefIds: {
                            capacity: null, preferredOptions: null, alaCarteOptions: null,
                            expansionValves: null, liquidValves: null, shippedLoose: null, reverseCycleKits: null
                        }
                    },
                    legacyModels: []
                };
                products[modelNumber] = product
            }

            // simple attributes
            for (const [attributeName, attributeValue] of Object.entries(productRow)) {
                let attribute = attributes[attributeName];
                if (attribute.name === 'Legacy Model') {
                    if (attributeValue !== 'N/A') {
                        product.legacyModels.push(attributeValue);
                    }
                } else if (attribute.isSimple) {
                    if (product[attributeName] !== undefined && product[attributeName] !== attributeValue) {
                        console.log({row});
                        throw `Non-unique value. Model ${modelNumber}, attribute: ${attributeName}, values: [${product[attributeName]}, ${attributeValue}]`;
                    }
                    product[attributeName] = attributeValue;
                }
            }

            // capacity
            if (_.some(attributes, (attr) => attr.name === 'Refrigerant')) {
                product.walkInUnitCoolers.capacity.push({
                    inputConditions: {
                        refrigerant: productRow['Refrigerant'],
                        temperatureDifferenceF: productRow['TD °F'],
                        saturatedSuctionTemperatureF: productRow['SST °F'],
                    },
                    outputProperties: {
                        capacityBTUH: productRow['Capacity (BTUH)'],
                        awef: parseAWEF(productRow),
                        doeCompliance: parseDoeCompliance(productRow),
                    }
                })
            }

            // options
            for (const [rangeRaw, optionKey] of Object.entries(specs.optionRanges || {})) {
                let range = utils.decode_range(rangeRaw);
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const price = parseCellValue(sheet, row, col, "number") as number;
                    if (price !== null) {
                        const option: FactoryOption = {
                            section: parseCellValue(sheet, range.s.r - 2, range.s.c)?.toString(),
                            title: parseCellValue(sheet, range.s.r - 1, col, "string") as string,
                            code: parseCellValue(sheet, range.s.r, col)?.toString(),
                            price: Math.round(price) // TODO: remove round
                        };
                        const existingOption = product.walkInUnitCoolers.options[optionKey].find(o => o.title === option.title);
                        if (existingOption !== undefined) {
                            if (!_.isEqual(existingOption, option)) {
                                throw `Multiple ${optionKey} options with same title ${option.title} but different attributes for product ${modelNumber}`;
                            }
                        } else {
                            product.walkInUnitCoolers.options[optionKey].push(option);
                        }
                    }
                }
            }

            // valves
            for (const valveAddress of specs.expansionValveAddresses || []) {
                const cellAddress = utils.decode_cell(valveAddress);
                const valve: WalkInNewExpansionValve = {
                    partNumber: parseCellValue(sheet, cellAddress.r, cellAddress.c, "string") as string,
                    price: parseCellValue(sheet, row, cellAddress.c, "number") as number,
                };
                if (valve.price !== null) {
                    const existingValve = product.walkInUnitCoolers.valves.expansionValves.find(v => v.partNumber === valve.partNumber);
                    if (existingValve !== undefined) {
                        if (!_.isEqual(existingValve, valve)) {
                            throw `Multiple expansion valves with same code ${valve.partNumber} but different attributes for product ${modelNumber}`;
                        }
                    } else {
                        product.walkInUnitCoolers.valves.expansionValves.push(valve);
                    }
                }
            }
            for (const valveAddress of specs.liquidValveAddresses || []) {
                const cellAddress = utils.decode_cell(valveAddress);
                const valve: WalkInNewLiquidValve = {
                    section: "",
                    partNumber: parseCellValue(sheet, cellAddress.r, cellAddress.c).toString(),
                    price: parseCellValue(sheet, row, cellAddress.c, 'number'),
                    size: parseCellValue(sheet, row, cellAddress.c + 1, "numberFmt"),
                };
                if (valve.price !== null || valve.size != null) {
                    const existingValve = product.walkInUnitCoolers.valves.liquidValves.find(v => v.partNumber === valve.partNumber);
                    if (existingValve !== undefined) {
                        if (!_.isEqual(existingValve, valve)) {
                            throw `Multiple liquid valves with same code ${valve.partNumber} but different attributes for product ${modelNumber}`;
                        }
                    } else {
                        product.walkInUnitCoolers.valves.liquidValves.push(valve);
                    }
                }
            }

            // reverse cycle kits
            if (specs.reverseCycleKitCellAddressesRaw !== undefined) {
                product.walkInUnitCoolers.reverseCycleKits.push({
                    txvType: parseReverseCycleKitAttribute(sheet, row, specs.reverseCycleKitCellAddressesRaw.txvType, "toString"),
                    partNumber: parseReverseCycleKitAttribute(sheet, row, specs.reverseCycleKitCellAddressesRaw.partNumber, "toString"),
                    price: parseReverseCycleKitAttribute(sheet, row, specs.reverseCycleKitCellAddressesRaw.price, "number"),
                });
            }
        }
    }
}

function parseReverseCycleKitAttribute(sheet: WorkSheet, row: number, cellAddressRaw: string | undefined, mode: ParseValueMode) {
    if (cellAddressRaw === undefined) {
        return null;
    }
    const cellAddress = utils.decode_cell(cellAddressRaw);
    return parseCellValue(sheet, row, cellAddress.c, mode)
}


type ParseValueMode = "string" | "number" | "numberFmt" | "parseInt" | "toString";

function parseCellValue<T>(sheet: WorkSheet, row: number, column: number, mode: ParseValueMode = undefined) {
    let valueCell = sheet[utils.encode_cell({r: row, c: column})];
    if (valueCell === undefined) {
        return undefined;
    }
    if (valueCell.t === 's') {
        if (valueCell.v.trim() === 'NA' || valueCell.v.trim() === '-' || valueCell.v.trim() === '---' || valueCell.v.trim() === 'Std') {
            return null;
        } else {
            switch (mode) {
                case "number":
                case "numberFmt":
                    console.log({sheet: sheet["!ref"], cell: utils.encode_cell({r: row, c: column}), mode: mode});
                    throw Error(`Wrong cell type. Expected: ${mode}, actual: string, value: ${valueCell.v}`);
                case "parseInt":
                    return parseInt(valueCell.v.trim())
                case "string":
                case "toString":
                default:
                    return valueCell.v.trim();
            }
        }
    } else if (valueCell.t === 'n') {
        switch (mode) {
            case "numberFmt":
                return valueCell.w.trim();
            case "string":
                throw Error(`Wrong cell type. Expected: ${mode}, actual: number, value: ${valueCell.v} / ${valueCell.w}`);
            case "toString":
                return valueCell.v.toString();
            case "number":
            case "parseInt":
            default:
                return valueCell.v;
        }
    } else {
        throw `Unsupported expression type: ${valueCell.t}`;
    }
}

function hashCode(str: string) {
    let hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

async function readProducts(workBook: WorkBook, excelFile: ExcelFile): Promise<SourceProduct[]> {
    const products: { [p: string]: SourceProduct } = {};
    collectAttributes(excelFile.style, products, workBook.Sheets['Pricing'], excelFile.pricing.modelNumberCellAddressRaw, {
        attributeRanges: excelFile.pricing.attributeRanges,
        optionRanges: excelFile.pricing.optionRanges
    });
    collectAttributes(excelFile.style, products, workBook.Sheets['Tech Data'], excelFile.techData.modelNumberCellAddressRaw, {
        attributeRanges: excelFile.techData.attributeRanges
    });
    collectAttributes(excelFile.style, products, workBook.Sheets['TXV Shipped Loose Pricing'], excelFile.expansionValves.modelNumberCellAddressRaw, {
        expansionValveAddresses: excelFile.expansionValves.addresses
    });
    if (excelFile.liquidValves !== undefined) {
        collectAttributes(excelFile.style, products, workBook.Sheets['LLSV Shipped Loose Pricing'], excelFile.liquidValves.modelNumberCellAddressRaw, {
            liquidValveAddresses: excelFile.liquidValves.addresses
        });
    }
    if (excelFile.reverseCycleKits !== undefined) {
        collectAttributes(excelFile.style, products, workBook.Sheets['Hot Gas Reverse Cycle Kits'], excelFile.reverseCycleKits.modelNumberCellAddressRaw, {
            reverseCycleKitCellAddressesRaw: excelFile.reverseCycleKits.cellAddressesRaw
        });
    }
    return Object.values(products);
}

async function readShippedLooseAccessories(workBook: WorkBook, style: Style): Promise<ShippedLooseAccessory[]> {
    const products: { [p: string]: SourceProduct } = {};
    collectAttributes(style, products, workBook.Sheets['Other Shipped Loose Pricing'], 'C5', {
        attributeRanges: {'B5:F5': true},
    });
    return Object.values(products).map(product => ({
        section: product["Item"],
        partNumber: product["Part Number"],
        description: product["Description"],
        notes: product["Notes"],
        listPrice: product["List Price (US $)"],
    }));
}

interface ReverseCycleKitCellAddressesRaw {
    txvType?: string,
    partNumber: string,
    price: string,
}

interface ExcelFile {
    style: Style,
    filename: string,
    pricing: {
        modelNumberCellAddressRaw: string,
        attributeRanges: { [rangeRaw: string]: boolean },
        optionRanges: { [rangeRaw: string]: WalkInUnitCoolersOptionKey },
    },
    techData: {
        modelNumberCellAddressRaw: string,
        attributeRanges: { [rangeRaw: string]: boolean }
    },
    expansionValves: {
        modelNumberCellAddressRaw: string,
        addresses: string[]
    },
    liquidValves?: {
        modelNumberCellAddressRaw: string,
        addresses: string[]
    },
    reverseCycleKits?: {
        modelNumberCellAddressRaw: string,
        cellAddressesRaw: ReverseCycleKitCellAddressesRaw
    }
}

const excelFiles: ExcelFile[] = [
    {
        style: "low_profile",
        filename: "../source-xlsx/v4/LOP Data PC_05-11-2020.xlsx",
        pricing: {
            modelNumberCellAddressRaw: "G4",
            attributeRanges: {'B4:B4': true, 'F4:H4': true},
            optionRanges: {
                'I4:Q4': "preferred",
                'R4:Y4': "alaCarte",
                'Z4:AE4': "alaCarte",
                'AF4:AL4': "alaCarte",
                'AM4:AP4': "alaCarte"
            }
        },
        techData: {
            modelNumberCellAddressRaw: "A1",
            attributeRanges: {'A1:C1': true, 'D1:J1': false, 'K1:N1': true, 'O1:P1': false, 'Q1:AQ1': true}
        },
        expansionValves: {
            modelNumberCellAddressRaw: 'A2',
            addresses: ['B2', 'C2', 'D2'],
        },
        liquidValves: {
            modelNumberCellAddressRaw: 'A3',
            addresses: ['B2', 'D2', 'F2', 'H2'],
        },
    },
    {
        style: "center_mount",
        filename: "../source-xlsx/v4/CM Data PC_05-28-2020.xlsx",
        pricing: {
            modelNumberCellAddressRaw: "G4",
            attributeRanges: {'B4:B4': true, 'F4:H4': true},
            optionRanges: {
                'I4:Q4': "preferred",
                'R4:Y4': "alaCarte",
                'Z4:AE4': "alaCarte",
                'AF4:AL4': "alaCarte",
                'AM4:AP4': "alaCarte",
                'AQ4:AQ4': "alaCarte",
            }
        },
        techData: {
            modelNumberCellAddressRaw: "A1",
            attributeRanges: {'A1:C1': true, 'D1:J1': false, 'K1:N1': true, 'O1:P1': false, 'Q1:AQ1': true}
        },
        expansionValves: {
            modelNumberCellAddressRaw: 'A2',
            addresses: ['B2', 'C2', 'D2'],
        },
        liquidValves: {
            modelNumberCellAddressRaw: 'A3',
            addresses: ['B2', 'D2', 'F2'],
        }
    },
    {
        style: "low_velocity_center_mount",
        filename: "../source-xlsx/v4/LVCM Data PC_06-16-2020.xlsx",
        pricing: {
            modelNumberCellAddressRaw: "G4",
            attributeRanges: {'B4:B4': true, 'F4:H4': true},
            optionRanges: {
                'I4:Q4': "preferred",
                'R4:Y4': "alaCarte",
                'Z4:AE4': "alaCarte",
                'AF4:AL4': "alaCarte",
                'AM4:AP4': "alaCarte",
                'AQ4:AQ4': "alaCarte",
            }
        },
        techData: {
            modelNumberCellAddressRaw: "A1",
            attributeRanges: {'A1:C1': true, 'D1:J1': false, 'K1:N1': true, 'O1:P1': false, 'Q1:AQ1': true}
        },
        expansionValves: {
            modelNumberCellAddressRaw: 'A2',
            addresses: ['B2', 'C2', 'D2', 'E2'],
        },
        reverseCycleKits: {
            modelNumberCellAddressRaw: "B2",
            cellAddressesRaw: {
                txvType: "C2",
                partNumber: "D2",
                price: "E2"
            }
        }
    },
    // {
    //     style: "medium_profile",
    //     pricing: {
    //         modelNumberCellAddressRaw: "G4",
    //         attributeRanges: {'B4:B4': true, 'F4:H4': true},
    //         optionRanges: {
    //             'I4:Q4': "preferred",
    //             'R4:Y4': "alaCarte",
    //             'Z4:AE4': "alaCarte",
    //             'AF4:AL4': "alaCarte",
    //             'AM4:AP4': "alaCarte",
    //             'AQ4:AQ4': "alaCarte",
    //             'AU4:AW4': "alaCarte",
    //         }
    //     },
    //     techData: {
    //         modelNumberCellAddressRaw: "A1",
    //         attributeRanges: {'A1:C1': true, 'D1:J1': false, 'K1:N1': true, 'O1:P1': false, 'Q1:AQ1': true}
    //     },
    //     filename: "../source-xlsx/v4/Medium Profile Data PC_07-21-2020.xlsx",
    //     expansionValves: {
    //         modelNumberCellAddressRaw: 'A2',
    //         addresses: ['B2', 'C2', 'D2', 'E2', 'F2'],
    //     },
    //     liquidValves: {
    //         modelNumberCellAddressRaw: 'A3',
    //         addresses: ['B2', 'D2', 'F2', 'H2', 'J2', 'L2'],
    //     },
    //     reverseCycleKits: {
    //         modelNumberCellAddressRaw: "B1",
    //         cellAddressesRaw: {
    //             partNumber: "C1",
    //             price: "D1",
    //         }
    //     }
    // },
]

export async function readWalkInUnitCoolerProducts(): Promise<WalkInUnitCoolerProducts> {
    return await readCachedData(
        "category_cache/walk-in-new.json",
        async () => {
            const products: SourceProduct[] = [];
            for (const excelFile of excelFiles) {
                console.log(`Parsing Walk-In Unit Coolers: ${excelFile.style}, ${excelFile.filename}`)
                const workBook = XLSX.read(await fs.promises.readFile(excelFile.filename));
                const styleProducts = await readProducts(workBook, excelFile);
                const styleShippedLoose = await readShippedLooseAccessories(workBook, excelFile.style);
                for (const styleProduct of styleProducts) {
                    styleProduct.walkInUnitCoolers.shippedLoose = styleShippedLoose;
                }
                Object.values(_.groupBy(styleProducts, (styleProduct) => styleProduct.brand))
                    .forEach(brandProducts => products.push(...brandProducts.slice(0, MAX_BRAND_STYLE_PRODUCTS)));
            }

            // compute dictionaries
            const dictionaryBuilders: { [key in DictionaryId]: any[] } = {
                capacity: [[]],
                preferredOptions: [[]],
                alaCarteOptions: [[]],
                shippedLoose: [[]],
                reverseCycleKits: [[]],
                liquidValves: [[]],
                expansionValves: [[]] // [[]] is used, because we want empty dictionary item to be at index 0
            };
            for (const product of products) {
                product.walkInUnitCoolers.dictionaryRefIds = {
                    capacity: calculateRefId(dictionaryBuilders.capacity, product.walkInUnitCoolers.capacity),
                    preferredOptions: calculateRefId(dictionaryBuilders.preferredOptions, product.walkInUnitCoolers.options.preferred),
                    alaCarteOptions: calculateRefId(dictionaryBuilders.alaCarteOptions, product.walkInUnitCoolers.options.alaCarte),
                    liquidValves: calculateRefId(dictionaryBuilders.liquidValves, product.walkInUnitCoolers.valves.liquidValves),
                    expansionValves: calculateRefId(dictionaryBuilders.expansionValves, product.walkInUnitCoolers.valves.expansionValves),
                    shippedLoose: calculateRefId(dictionaryBuilders.shippedLoose, product.walkInUnitCoolers.shippedLoose),
                    reverseCycleKits: calculateRefId(dictionaryBuilders.reverseCycleKits, product.walkInUnitCoolers.reverseCycleKits),
                }
                // console.log(dictionaryBuilders);
            }
            const dictionaries: SourceProduct[] = [
                ...dictionaryBuilders.capacity.map((capacity, idx) => createDictionarySourceProduct(idx, "capacity", capacity)),
                ...dictionaryBuilders.preferredOptions.map((options, idx) => createDictionarySourceProduct(idx, "preferredOptions", options)),
                ...dictionaryBuilders.alaCarteOptions.map((options, idx) => createDictionarySourceProduct(idx, "alaCarteOptions", options)),
                ...dictionaryBuilders.liquidValves.map((valves, idx) => createDictionarySourceProduct(idx, "liquidValves", valves)),
                ...dictionaryBuilders.expansionValves.map((valves, idx) => createDictionarySourceProduct(idx, "expansionValves", valves)),
                ...dictionaryBuilders.shippedLoose.map((shippedLoose, idx) => createDictionarySourceProduct(idx, "shippedLoose", shippedLoose)),
                ...dictionaryBuilders.reverseCycleKits.map((reverseCycleKits, idx) => createDictionarySourceProduct(idx, "reverseCycleKits", reverseCycleKits)),
            ]

            return {products: products, dictionaries: dictionaries};
        }
    );
}
