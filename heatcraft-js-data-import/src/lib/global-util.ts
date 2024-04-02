import fs from "fs";
import {AxiosInstance} from "axios";
import * as path from "path";
import PromisePool from "es6-promise-pool";
import _ from "lodash";
import {DictionaryId, SourceProduct} from "heatcraft-js-shared/lib/source-product";

export const MAX_BRAND_STYLE_PRODUCTS = 999999;

export async function saveFile(fileName: string, content: string) {
    let directory = path.dirname(fileName);
    await fs.promises.mkdir(directory, {recursive: true});
    await fs.promises.writeFile(fileName, content);
    console.log(`Saved: ${fileName}`)
}

export async function readFileIfExists(fileName: string): Promise<string> {
    if (fs.existsSync(fileName)) {
        return await fs.promises.readFile(fileName, 'utf8');
    } else {
        return null;
    }
}

export async function readCachedUrl(pageCacheFileName: string, pageUrl: string, axiosProvider: () => Promise<AxiosInstance>) {
    const pageCacheData: string = await readFileIfExists(pageCacheFileName);
    let rawData: string;
    if (pageCacheData) {
        console.log(`Reading page from cache: ${pageUrl}`);
        rawData = JSON.parse(pageCacheData).data
    } else {
        console.log(`Fetching page: ${pageUrl}`);
        const axios = await axiosProvider();
        rawData = (await axios.get(pageUrl)).data;
        await saveFile(
            pageCacheFileName,
            JSON.stringify({url: pageUrl, data: rawData}, null, 2)
        )
    }
    return rawData;
}

export async function readCachedData<T>(pageCacheFileName: string, fetchData: () => Promise<T>) {
    const cachedData: string = await readFileIfExists(pageCacheFileName);
    let result: T;
    if (cachedData) {
        console.log(`Reading data from cache: ${pageCacheFileName}`);
        result = JSON.parse(cachedData);
    } else {
        result = await fetchData();
        await saveFile(
            pageCacheFileName,
            JSON.stringify(result, null, 2)
        )
    }
    return result;
}

export async function executeInParallel<T, R>(items: T[], concurrency: number, itemProcessor: (item: T) => Promise<R>): Promise<R[]> {
    const results: R[] = [];
    let remainingItems = items;
    while (remainingItems.length > 0) {
        const failedItems = [];
        let idx = 0;
        const promiseGenerator = function () {
            if (idx >= remainingItems.length) {
                return null;
            } else {
                const item = remainingItems[idx++];
                return itemProcessor(item)
                    .then((result: R) => {
                        console.log(`remainingItems: ${remainingItems.length - idx}`);
                        return results.push(result);
                    })
                    .catch((error) => {
                        console.log(error);
                        failedItems.push(item)
                    });
            }
        }
        await new PromisePool(promiseGenerator, concurrency).start();
        remainingItems = failedItems;
    }
    return results;
}

export function collectDistinctValues(attributeId: string, csvRows: any[]) {
    return _.sortBy(_.uniq(csvRows.map(csvRow => csvRow[attributeId])))
}

export function toDotCmsItemId(str: string) {
    return str.split(" ").join("_").toLowerCase();
}

export function calculateRefId(dictionary: any[], needle: any) {
    const capacityKey = _.findIndex(dictionary, (entry => _.isEqual(entry, needle)));
    if (capacityKey !== -1) {
        return capacityKey;
    } else {
        dictionary.push(needle);
        return dictionary.length - 1;
    }
}

export function createDictionarySourceProduct(idx: number, dictionaryId: DictionaryId, data: any[]): SourceProduct {
    return {
        productId: idx, modelNumber: null, brand: null, group: null, category: null, style: null,
        dictionaryRef: {
            dictionaryId: dictionaryId, refId: idx, data: data
        }
    };
}