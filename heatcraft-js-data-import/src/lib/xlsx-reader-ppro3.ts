import XLSX, {CellAddress, WorkSheet} from 'xlsx'
import * as fs from "fs";
import * as _ from "lodash";
import {calculateRefId, MAX_BRAND_STYLE_PRODUCTS, readCachedData} from "./global-util";
import {Brand} from "heatcraft-js-shared/lib/product";
import {brands} from "heatcraft-js-shared/lib/source-product";
import {SourceProduct} from "heatcraft-js-shared/lib/source-product";

let utils = XLSX.utils;
let productId = 3000;

// noinspection NonAsciiCharacters
const boxTemperatureAttributeNames = {
    'Capacity (BTUH) R-448A (0° F)': 0,
    'Capacity (BTUH) R-448A (-10° F)': -10,
    'Capacity (BTUH) R-448A (-20° F)': -20,
    'Capacity (BTUH) R-448A (35° F)': 35,
    'Capacity (BTUH) R-448A (38° F)': 38
};

/**
 * Find cell, which contains "New Model No"
 */
function findNewModelNoCell(sheet: WorkSheet): CellAddress | undefined {
    if (sheet['!ref']) {
        let range = utils.decode_range(sheet['!ref']);
        for (let row = range.s.r; row <= range.e.r; row++) {
            for (let col = range.s.c; col <= range.e.c; col++) {
                let cell = {r: row, c: col};
                let value = sheet[utils.encode_cell(cell)];
                if (value && value.v === 'New Model No') {
                    return cell;
                }
            }
        }
        return undefined;
    }
}

function collectAttributes(products: { [p: string]: SourceProduct }, brand: Brand,
                           sheetName: string, sheet: WorkSheet,
                           headerRow: number, modelNumberCol: number) {
    let range = utils.decode_range(sheet['!ref']);
    const attributeNames = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
        const attributeName: string = sheet[utils.encode_cell({r: headerRow, c: col})].v;
        attributeNames.push(attributeName.trim());
    }
    for (let row = headerRow + 1; row <= range.e.r; row++) {
        let modelNumberCell = sheet[utils.encode_cell({r: row, c: modelNumberCol})];
        if (modelNumberCell !== undefined) {
            const modelNumber = modelNumberCell.v.toString();
            if (modelNumber !== 'Call Factory') {
                let product = products[modelNumber];
                if (product === undefined) {
                    product = {
                        productId: productId++,
                        modelNumber: modelNumber,
                        brand: brand,
                        group: 'compressorized',
                        category: 'pro3_packaged',
                        style: 'top_mount',
                        pro3Packaged: {
                            capacity: [],
                            capacityRefId: null
                        },
                        legacyModels: []
                    };
                    products[modelNumber] = product
                }
                const productVariation: { [attributeName: string]: string } = {};
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const attributeName = attributeNames[col];
                    let valueCell = sheet[utils.encode_cell({r: row, c: col})];
                    if (valueCell !== undefined) {
                        productVariation[attributeName] = valueCell.v;
                    }
                }
                for (const [attributeName, roomTemperature] of Object.entries(boxTemperatureAttributeNames)) {
                    let capacity = parseCapacity(productVariation[attributeName], attributeName);
                    if (capacity !== null) {
                        let inputConditions = {
                            refrigerant: 'R-448A',
                            ambientTempF: parseTemperature(productVariation['Ambient Temp']),
                            roomTempF: roomTemperature,
                        };
                        if (!_.some(product.pro3Packaged.capacity, (capacity => _.isEqual(capacity.inputConditions, inputConditions)))) {
                            product.pro3Packaged.capacity.push({
                                inputConditions: inputConditions,
                                outputProperties: {
                                    capacityBTUH: capacity,
                                    awef: parseAWEF(productVariation['AWEF R-448A'], 'AWEF R-448A'),
                                }
                            })
                        }
                    }
                }
                for (let [attributeName, attributeValue] of Object.entries(productVariation)) {
                    if (attributeName === 'Legacy Model No') {
                        if (product.legacyModels.indexOf(attributeValue) === -1) {
                            product.legacyModels.push(attributeValue); // build unique set of legacy models
                        }
                    } else {
                        if (product[attributeName] === undefined) {
                            product[attributeName] = attributeValue; // choose value from first variation
                        }
                    }
                }
            }
        }
    }
}

function parseAWEF(attributeValue: string, attributeName: any) {
    if (typeof attributeValue === "number") {
        return attributeValue;
    } else if (attributeValue === '—') {
        return null;
    } else {
        throw Error(`Unexpected string value: ${attributeValue} for attribute: ${attributeName}`);
    }
}

function parseCapacity(attributeValue: string, attributeName: any) {
    if (typeof attributeValue === "number") {
        return attributeValue;
    } else if (attributeValue === '-') {
        return null;
    } else {
        throw Error(`Unexpected string value: ${attributeValue} for attribute: ${attributeName}`);
    }
}

function parseTemperature(attributeValue: string): number {
    return parseInt(attributeValue.replace('°F', ''))
}

interface Pro3PackagedProducts {
    products: SourceProduct[],
    dictionaries: SourceProduct[]
}

function createCapacityDictionarySourceProduct(data: any[], idx: number): SourceProduct {
    return {
        productId: idx, modelNumber: null, brand: null, group: null, category: null, style: null,
        dictionaryRef: {
            dictionaryId: "capacity", refId: idx, data: data
        }
    };
}

export async function readXlsxProductsPPRO3(): Promise<Pro3PackagedProducts> {
    return await readCachedData(
        "category_cache/pro3-new.json",
        async () => {
            const file = {
                filename: '../source-xlsx/v2/PRO3 Models New Product Catalog.xlsx',
                sheetNames: ['PRO3 2020 Models']
            };
            console.log(`Parsing PRO3 Packaged: ${file.filename}`)
            const workBook = XLSX.read(await fs.promises.readFile(file.filename));
            const result: SourceProduct[] = [];
            for (const brand of brands) {
                const products: { [p: string]: SourceProduct } = {};
                for (const sheetName of file.sheetNames) {
                    const sheet: WorkSheet = workBook.Sheets[sheetName];
                    let newModelNoCell = findNewModelNoCell(sheet);
                    if (newModelNoCell) {
                        collectAttributes(products, brand, sheetName, sheet, newModelNoCell.r, newModelNoCell.c)
                    }
                }
                result.push(...Object.values(products).slice(0, MAX_BRAND_STYLE_PRODUCTS));
            }
            const capacityDictionaryBuilder = [[]];  // [[]] is used, because we want empty dictionary item to be at index 0
            for (const sourceProduct of result) {
                sourceProduct.pro3Packaged.capacityRefId = calculateRefId(capacityDictionaryBuilder, sourceProduct.pro3Packaged.capacity);
            }
            return {
                products: result,
                dictionaries: capacityDictionaryBuilder.map(createCapacityDictionarySourceProduct)
            };
        }
    )
}
