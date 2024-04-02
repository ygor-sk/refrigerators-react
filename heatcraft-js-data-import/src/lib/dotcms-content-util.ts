import {ContentDataType, ContentKind, ContentType, dictionaryTransformation} from "./dotcms-writer";
import {ShippedLooseAccessory, SourceProduct} from "../../../heatcraft-js-shared/lib/source-product";
import {Revision} from "../../../heatcraft-js-shared/lib/product";

export function createCrossReferenceContentType(name: string, contentKind: ContentKind) {
    return {
        name: name,
        contentKind: contentKind,
        attributes: [
            {
                id: 'productId',
                description: 'productId',
                required: true,
                indexed: true,
                unique: false,
                dataType: ContentDataType.INTEGER
            },
            {id: 'modelNumber', description: 'modelNumber', required: true, indexed: true, unique: false},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: 'legacyModelNumber', description: 'legacyModelNumber', required: true, indexed: true, unique: false}
        ],
        contentTransformation: (products: SourceProduct[]) => {
            const results = [];
            for (const product of products) {
                for (const legacyModelNumber of product.legacyModels) {
                    results.push({
                            productId: product.productId,
                            modelNumber: product.modelNumber,
                            brand: product.brand,
                            legacyModelNumber: legacyModelNumber
                        }
                    );
                }
            }
            return results;
        }
    };
}

export function createShippedLooseDictionaryContentType(name: string, contentKind: ContentKind) {
    return {
        name: name,
        contentKind: contentKind,
        attributes: [
            {
                id: "refId",
                description: "refId",
                required: true,
                indexed: true,
                unique: false,
                dataType: ContentDataType.INTEGER
            },
            {id: "section", description: "Section", required: true, dataType: ContentDataType.SELECT},
            {id: "partNumber", description: "Part Number"},
            {id: "description", description: "Description"},
            {id: "notes", description: "Notes"},
            {id: "listPrice", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
        ],
        contentTransformation: dictionaryTransformation<ShippedLooseAccessory>("shippedLoose", shippedLoose => ({
            "Section": shippedLoose.section,
            "Part Number": shippedLoose.partNumber,
            "Description": shippedLoose.description,
            "Notes": shippedLoose.notes,
            "List Price ($US)": shippedLoose.listPrice,
        })),
    };
}

export function collectDetailAttributeMappings(contentTypes: ContentType[],
                                               contentKind: ContentKind): { parsedAttributeName: string, dotCmsAttributeName: string }[] {
    return contentTypes
        .filter(contentType => contentType.contentKind === contentKind)
        .flatMap(contentType => contentType.attributes)
        .filter(attribute => attribute.id !== "price")
        .filter(attribute => attribute.id !== "productId")
        .filter(attribute => attribute.id !== "modelNumber")
        .filter(attribute => attribute.id !== "brand")
        .filter(attribute => attribute.id !== "style")
        .filter(attribute => !attribute.id.endsWith("RefId"))
        .map(attribute => ({parsedAttributeName: attribute.description, dotCmsAttributeName: attribute.id}));
}
export function formatJson(data) {
    return JSON.stringify(data, null, 2)
}