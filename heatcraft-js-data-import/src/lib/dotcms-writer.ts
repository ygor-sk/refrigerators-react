import uuid from "uuid/v5"
import stringify from 'csv-stringify';
import {collectDistinctValues} from "./global-util";
import {DictionaryId, SourceProduct} from "heatcraft-js-shared/lib/source-product";

const ATTRIBUTE_UUID_NAMESPACE = 'fc55f50d-8e63-4395-aafd-8808c9ace675';

export enum ContentKind {
    PRO3_PACKAGED,
    PRO3_PACKAGED_NEW,
    PRO3_PACKAGED_NEW_DICTIONARY,
    PRO3_PACKAGED_LEGACY,
    WALK_IN_UNIT_COOLERS_NEW,
    WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
    WALK_IN_UNIT_COOLERS,
    WALK_IN_UNIT_COOLERS_LEGACY,
    WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY,
    REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW,
    REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY,
    MAIN_MENU,
    META_GROUP,
    META_CATEGORY,
    META_STYLE,
    META_BRAND,
    META_DOCUMENT,
    META_CATEGORY_ATTRIBUTE,
    META_PRODUCT_LIST_ATTRIBUTE,
    META_PRODUCT_COMPARE_ATTRIBUTE,
    META_PRODUCT_DETAIL,
    META_PRODUCT_DETAIL_SPECIFICATION,
    META_PRODUCT_DETAIL_DICTIONARIES,
    META_PRODUCT_DETAIL_CROSS_REFERENCE,
}

export enum ContentDataType {
    TEXT,
    TEXTAREA,
    INTEGER,
    FLOAT,
    SELECT,
    BOOLEAN,
    FILE
}

export interface ContentType<P = SourceProduct[]> {
    name: string,
    contentKind: ContentKind,
    attributes: Attribute[]
    contentTransformation?: (products: P) => any[],
}

export function contentTypeId(contentType: ContentType) {
    return uuid(contentType.name, ATTRIBUTE_UUID_NAMESPACE);
}

export interface Attribute {
    id: string,
    description: string,
    required?: boolean
    listed?: boolean
    indexed?: boolean
    unique?: boolean,
    dataType?: ContentDataType
}

export function generateDotCmsCsvRows(contentType: ContentType, products: SourceProduct[]): any[] {
    const dotCmsContentEntries = [];
    let transformedProducts = contentType.contentTransformation === undefined ?
        products :
        contentType.contentTransformation(products);

    function convertAttributeValue(attribute: Attribute, attributeValue: any) {
        switch (attribute.dataType) {
            case ContentDataType.BOOLEAN:
                if (attributeValue === true) {
                    return 'true';
                } else if (attributeValue === false) {
                    return "false";
                } else {
                    return null;
                }
            default:
                return attributeValue;
        }
    }

    for (let productProperties of transformedProducts) {
        try {
            // only keep known attributes and rename them to DotCMS attributes
            const dotCmsContentEntry = {};
            for (const [attributeName, attributeValue] of Object.entries(productProperties)) {
                const attribute = contentType.attributes.find((attribute) => attribute.description === attributeName);
                if (attribute) {
                    const value = convertAttributeValue(attribute, attributeValue);
                    // verify
                    if (value === undefined || value === null || value === "") {
                        if (attribute.required) {
                            throw `${contentType.name}.${attribute.id}, is required, but value is null or undefined.`;
                        }
                        // } else if (typeof value === "string" && value.trim() === "") { // TODO: enable this rule again
                        //         console.log(productProperties);
                        //         throw `${contentType.name}.${attribute.id}, is empty string, but should be null.`;
                    } else {
                        const valueType = typeof value;
                        const dataType = attribute.dataType || ContentDataType.TEXT;
                        switch (dataType) {
                            case ContentDataType.TEXT:
                                if (valueType !== "string") {
                                    throw `${contentType.name}.${attribute.id}, TEXT expected, found: ${attributeName} = ${value}: ${valueType}`;
                                }
                                break;
                            case ContentDataType.INTEGER:
                                if (!Number.isInteger(value)) {
                                    throw `${contentType.name}.${attribute.id}, INTEGER expected, found: ${attributeName} = ${value}: ${valueType}`;
                                }
                                break;
                            case ContentDataType.FLOAT:
                                if (valueType !== "number") {
                                    throw `${contentType.name}.${attribute.id}, FLOAT expected, found: ${attributeName} = ${value}: ${valueType}`;
                                }
                                break;
                            case ContentDataType.SELECT:
                                if (valueType !== "string") {
                                    throw `${contentType.name}.${attribute.id}, SELECT expected, found: ${attributeName} = ${value}: ${valueType}`;
                                }
                                break;
                            case ContentDataType.BOOLEAN:
                                break;
                            case ContentDataType.FILE:
                                break;
                        }
                    }

                    dotCmsContentEntry[attribute.id] = value;
                }
            }
            dotCmsContentEntries.push(dotCmsContentEntry);
        } catch (ex) {
            console.log(productProperties);
            throw ex;
        }
    }
    return dotCmsContentEntries;
}

export async function generateDotCmsCsvFile(contentType: ContentType, csvRows: any[]): Promise<string> {
    const csvHeader = contentType.attributes.map((attribute) => attribute.id);
    return new Promise((resolve, reject) => {
        stringify(csvRows, {header: true, columns: csvHeader}, (err, output) => {
            if (err) {
                reject(err);
            } else {
                resolve(output)
            }
        })
    })
}


export function createDotCmsContentType(contentType: ContentType, workflowIds: string[], csvRows: any[]) {
    return {
        "id": contentTypeId(contentType),
        "name": contentType.name,
        "variable": contentType.name,
        "baseType": "CONTENT",
        "clazz": "com.dotcms.contenttype.model.type.ImmutableSimpleContentType",
        "description": contentType.name,
        "workflow": workflowIds,
        "fields": createFields(contentType, csvRows)
    }
}

function determineValues(dataType: ContentDataType, attribute: Attribute, csvRows: any[]) {
    switch (dataType) {
        case ContentDataType.SELECT:
            return collectDistinctValues(attribute.id, csvRows)
                .filter(value => value !== undefined && value !== null)
                .map(value => `${value}|${value}`).join("\r\n");
        case ContentDataType.BOOLEAN:
            return 'true';
        default:
            return null;
    }
}

function createFields(contentType: ContentType, csvRows: any[]) {
    let sortOrder = 2; // 0 and 1 are reserved for two system attributes (of type ROW) which are created automatically

    return contentType.attributes.map((attribute: Attribute) => {
        const dataType = attribute.dataType || ContentDataType.TEXT;
        if (attribute.dataType === ContentDataType.SELECT && !attribute.required) {
            // DotCMS GUI does not allow to choose "empty" value from SELECT checkbox
            // throw Error(`SELECT attribute must be required: ${contentType.name}.${attribute.id}`);
            console.log(`SELECT attribute must be required: ${contentType.name}.${attribute.id}`);
        }
        if (attribute.dataType === ContentDataType.BOOLEAN && attribute.required) {
            throw Error(`BOOLEAN attribute must not be required: ${contentType.name}.${attribute.id}`)
        }

        return {
            "clazz": determineClazz(dataType),
            "contentTypeId": contentTypeId(contentType),
            "dataType": determineDataType(dataType),
            "fieldType": determineFieldType(dataType),
            "fieldTypeLabel": determineFieldType(dataType),
            "fieldVariables": [],
            "fixed": false,
            "id": uuid(`${contentType.name} ${attribute.id}`, ATTRIBUTE_UUID_NAMESPACE),
            "indexed": attribute.indexed || false,
            "listed": attribute.listed === undefined ? true : attribute.listed,
            "name": attribute.description,
            "readOnly": false,
            "required": attribute.required || false,
            "searchable": attribute.listed === undefined ? true : attribute.listed,
            "sortOrder": sortOrder++,
            "unique": attribute.unique || false,
            "variable": attribute.id,
            "values": determineValues(dataType, attribute, csvRows)
        }
    });
}

function determineClazz(dataType: ContentDataType) {
    switch (dataType) {
        case ContentDataType.TEXT:
        case ContentDataType.INTEGER:
        case ContentDataType.FLOAT:
            return 'com.dotcms.contenttype.model.field.ImmutableTextField';
        case ContentDataType.SELECT:
            return 'com.dotcms.contenttype.model.field.ImmutableSelectField';
        case ContentDataType.BOOLEAN:
            return 'com.dotcms.contenttype.model.field.ImmutableSelectField';
        case ContentDataType.FILE:
            return 'com.dotcms.contenttype.model.field.ImmutableFileField';
        case ContentDataType.TEXTAREA:
            return 'com.dotcms.contenttype.model.field.ImmutableTextAreaField';
        default:
            throw new Error(`Unsupported dataType: ${dataType}`);
    }
}

function determineFieldType(dataType: ContentDataType) {
    switch (dataType) {
        case ContentDataType.TEXT:
        case ContentDataType.INTEGER:
        case ContentDataType.FLOAT:
            return 'Text';
        case ContentDataType.SELECT:
            return 'Select';
        case ContentDataType.BOOLEAN:
            return 'Checkbox';
        case ContentDataType.FILE:
            return 'File';
        case ContentDataType.TEXTAREA:
            return 'Textarea';
        default:
            throw new Error(`Unsupported dataType: ${dataType}`);
    }
}

function determineDataType(dataType: ContentDataType) {
    switch (dataType) {
        case ContentDataType.TEXT:
        case ContentDataType.SELECT:
        case ContentDataType.BOOLEAN:
        case ContentDataType.FILE:
            return 'TEXT';
        case ContentDataType.INTEGER:
            return 'INTEGER';
        case ContentDataType.FLOAT:
            return 'FLOAT';
        case ContentDataType.TEXTAREA:
            return 'LONG_TEXT';
        default:
            throw new Error(`Unsupported dataType: ${dataType}`);
    }
}

export function dictionaryTransformation<T>(dictionaryId: DictionaryId, createContent: (item: T) => any) {
    return (products: SourceProduct[]) => {
        const results = [];
        for (const product of products) {
            if (product.dictionaryRef.dictionaryId === dictionaryId) {
                const data: T[] = product.dictionaryRef.data;
                for (const item of Object.values(data)) {
                    const result = createContent(item)
                    result["refId"] = product.dictionaryRef.refId;
                    results.push(result);
                }
            }
        }
        return results;
    };
}