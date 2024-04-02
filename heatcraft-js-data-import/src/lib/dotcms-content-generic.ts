import {ContentDataType, ContentKind, ContentType, dictionaryTransformation} from "./dotcms-writer";
import {ShippedLooseAccessory, SourceProduct} from "heatcraft-js-shared/lib/source-product";
import {
    CategoryAttributeGroup,
    ProductCompareAttributeGroup,
    ProductListAttributeGroup,
    ProductMetaV1Detail, ProductMetaV1DetailCrossReference, ProductMetaV1DetailDictionary,
    ProductMetaV1DetailSpecification
} from "./initial-product-metadata";

export const contentTypes: ContentType[] = [
    // {
    //     name: "MainMenuV8",
    //     contentKind: ContentKind.MAIN_MENU,
    //     attributes: [
    //         {id: 'id', description: 'ID', required: true, unique: true},
    //         {id: 'title', description: 'Title'},
    //         {id: 'url', description: 'URL'},
    //         {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
    //         {id: 'additionalClass', description: 'Additional Class'},
    //     ]
    // },
    createNamedIdentifierContentType("ProductMetaV1Group", ContentKind.META_GROUP),
    {
        name: "ProductMetaV1Category",
        contentKind: ContentKind.META_CATEGORY,
        attributes: [
            {id: 'id', description: 'ID', required: true, unique: true},
            {id: 'title', description: 'Title'},
            {id: 'groupId', description: 'Group ID', dataType: ContentDataType.SELECT, required: true},
            {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: items => {
            return items.map((item, idx) => ({
                "ID": item["id"],
                "Title": item["title"],
                "Group ID": item["groupId"],
                "Order": idx * 100,
            }))
        }
    },
    {
        name: "ProductMetaV1Style",
        contentKind: ContentKind.META_STYLE,
        attributes: [
            {id: 'id', description: 'ID', required: true, unique: true},
            {id: 'title', description: 'Title'},
            {id: 'categoryId', description: 'Category ID', dataType: ContentDataType.SELECT, required: true},
            {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: items => {
            return items.map((item, idx) => ({
                "ID": item["id"],
                "Title": item["title"],
                "Category ID": item["categoryId"],
                "Order": idx * 100,
            }))
        }
    },
    createNamedIdentifierContentType("ProductMetaV1Brand", ContentKind.META_BRAND),
    createNamedIdentifierContentType("ProductMetaV1Document", ContentKind.META_DOCUMENT),
    {
        name: "ProductMetaV1CategoryAttribute",
        contentKind: ContentKind.META_CATEGORY_ATTRIBUTE,
        attributes: [
            {id: 'categoryId', description: 'Category ID', required: true, dataType: ContentDataType.SELECT},
            {id: 'categoryAttributeId', description: 'Category Attribute ID', required: true},
            {id: 'categoryAttributeType', description: 'Category Attribute Type', required: true},
            {id: 'newContentType', description: 'New Content Type', required: true},
            {id: 'newAttributeId', description: 'New Attribute ID / Value', required: true},
            {id: 'legacyContentType', description: 'Legacy Content Type', required: true},
            {id: 'legacyAttributeId', description: 'Legacy Attribute ID / Value', required: true},
            {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: sourceProducts => {
            const categoryAttributeGroups = sourceProducts as unknown as CategoryAttributeGroup[];
            const result = [];
            for (const categoryAttributeGroup of categoryAttributeGroups) {
                categoryAttributeGroup.attributes.forEach((attribute, idx) => {
                    result.push({
                        "Category ID": categoryAttributeGroup.category,
                        "Category Attribute ID": attribute.categoryAttributeId,
                        "Category Attribute Type": attribute.attributeType,
                        "New Content Type": attribute.newContentType,
                        "New Attribute ID / Value": attribute.newAttributeId,
                        "Legacy Content Type": attribute.legacyContentType,
                        "Legacy Attribute ID / Value": attribute.legacyAttributeId,
                        "Order": idx * 100,
                    });
                });
            }
            return result;
        }
    },
    {
        name: "ProductMetaV1ProductListAttribute",
        contentKind: ContentKind.META_PRODUCT_LIST_ATTRIBUTE,
        attributes: [
            {id: 'categoryId', description: 'Category ID', required: true, dataType: ContentDataType.SELECT},
            {id: 'categoryAttributeId', description: 'Category Attribute ID', required: true},
            {id: 'title', description: 'Title', required: true},
            {id: 'width', description: 'Width', required: true},
            {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: sourceProducts => {
            const categoryAttributeGroups = sourceProducts as unknown as ProductListAttributeGroup[];
            const result = [];
            for (const categoryAttributeGroup of categoryAttributeGroups) {
                categoryAttributeGroup.attributes.forEach((attribute, idx) => {
                    result.push({
                        "Category ID": categoryAttributeGroup.category,
                        "Category Attribute ID": attribute.categoryAttributeId,
                        "Title": attribute.title,
                        "Width": attribute.width,
                        "Order": idx * 100,
                    });
                });
            }
            return result;
        }
    },
    {
        name: "ProductMetaV1ProductCompareAttribute",
        contentKind: ContentKind.META_PRODUCT_COMPARE_ATTRIBUTE,
        attributes: [
            {id: 'categoryId', description: 'Category ID', required: true, dataType: ContentDataType.SELECT},
            {id: 'categoryAttributeId', description: 'Category Attribute ID', required: true},
            {id: 'title', description: 'Title', required: true},
            {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: sourceProducts => {
            const attributeGroups = sourceProducts as unknown as ProductCompareAttributeGroup[];
            const result = [];
            for (const [idx, attributeGroup] of attributeGroups.entries()) {
                attributeGroup.attributes.forEach(attribute => {
                    result.push({
                        "Category ID": attributeGroup.category,
                        "Category Attribute ID": attribute.categoryAttributeId,
                        "Title": attribute.title,
                        "Order": idx * 100,
                    });
                });
            }
            return result;
        }
    },
    {
        name: "ProductMetaV1Detail",
        contentKind: ContentKind.META_PRODUCT_DETAIL,
        attributes: [
            {id: 'categoryId', description: "Category ID", required: true, dataType: ContentDataType.SELECT},
            {id: 'revision', description: "Revision", required: true, dataType: ContentDataType.SELECT},
            {id: 'mainContentType', description: "Main Content Type", required: true},
            {id: 'dictionaryContentType', description: "Dictionary Content Type"},
            {id: 'crossReferenceContentType', description: "Cross Reference Content Type"},
        ],
        contentTransformation: sourceProducts => {
            const details = sourceProducts as unknown as ProductMetaV1Detail[];
            const result = [];
            for (const detail of details) {
                result.push({
                    "Category ID": detail.categoryRevision.category,
                    "Revision": detail.categoryRevision.revision,
                    "Main Content Type": detail.mainContentType,
                    "Dictionary Content Type": detail.dictionaryContentType,
                    "Cross Reference Content Type": detail.crossReferenceContentType,
                });
            }
            return result;
        }
    },
    {
        name: "ProductMetaV1DetailSpecification",
        contentKind: ContentKind.META_PRODUCT_DETAIL_SPECIFICATION,
        attributes: [
            {id: 'categoryId', description: "Category ID", required: true, dataType: ContentDataType.SELECT},
            {id: 'revision', description: "Revision", required: true, dataType: ContentDataType.SELECT},
            {id: 'sectionTitle', description: "Section Title", required: true},
            {id: 'contentType', description: "Content Type", required: true},
            {id: 'attributeId', description: "Attribute ID", required: true},
            {id: 'attributeTitle', description: "Attribute Title", required: true},
            {id: 'attributeType', description: "Attribute Type", dataType: ContentDataType.SELECT, required: true},
            {id: 'order', description: "Order", dataType: ContentDataType.INTEGER, required: true},
        ],
        contentTransformation: sourceProducts => {
            const specifications = sourceProducts as unknown as ProductMetaV1DetailSpecification[];
            const result = [];
            for (const [idx, specification] of specifications.entries()) {
                for (const [idx2, section] of specification.sections.entries()) {
                    for (const [idx3, attribute] of section.attributes.entries()) {
                        result.push({
                            "Category ID": specification.categoryRevision.category,
                            "Revision": specification.categoryRevision.revision,
                            "Section Title": section.title,
                            "Content Type": attribute.contentType,
                            "Attribute ID": attribute.attributeId,
                            "Attribute Title": attribute.title,
                            "Attribute Type": attribute.type,
                            "Order": idx * 10000 + idx2 * 1000 + idx3 * 100,
                        })
                    }
                }
            }
            return result;
        }
    },
    {
        name: "ProductMetaV1DetailDictionaries",
        contentKind: ContentKind.META_PRODUCT_DETAIL_DICTIONARIES,
        attributes: [
            {id: 'categoryId', description: "Category ID", required: true, dataType: ContentDataType.SELECT},
            {id: 'revision', description: "Revision", required: true, dataType: ContentDataType.SELECT},
            {id: 'dictionary', description: "Dictionary", required: true},
            {id: 'contentType', description: "Content Type", required: true},
        ],
        contentTransformation: sourceProducts => {
            const dictionaries = sourceProducts as unknown as ProductMetaV1DetailDictionary[];
            const result = [];
            for (const dictionary of dictionaries) {
                for (const spec of dictionary.dictionarySpecs) {
                    result.push({
                        "Category ID": dictionary.categoryRevision.category,
                        "Revision": dictionary.categoryRevision.revision,
                        "Dictionary": spec.dictionary,
                        "Content Type": spec.contentType,
                    })
                }
            }
            return result;
        }
    },
    {
        name: "ProductMetaV1DetailCrossReference",
        contentKind: ContentKind.META_PRODUCT_DETAIL_CROSS_REFERENCE,
        attributes: [
            {id: 'categoryId', description: "Category ID", required: true, dataType: ContentDataType.SELECT},
            {id: 'revision', description: "Revision", required: true, dataType: ContentDataType.SELECT},
            {id: 'categoryAttributeId', description: "Category Attribute ID", required: true},
            {id: 'attributeTitle', description: "Attribute Title", required: true},
            {id: 'order', description: "Order", dataType: ContentDataType.INTEGER, required: true},
        ],
        contentTransformation: sourceProducts => {
            const crossReferences = sourceProducts as unknown as ProductMetaV1DetailCrossReference[];
            const result = [];
            for (const [idx, crossReference] of crossReferences.entries()) {
                for (const [idx2, attribute] of crossReference.attributes.entries()) {
                    result.push({
                        "Category ID": crossReference.categoryRevision.category,
                        "Revision": crossReference.categoryRevision.revision,
                        "Category Attribute ID": attribute.categoryAttributeId,
                        "Attribute Title": attribute.title,
                        "Order": idx * 10000 + idx2 * 1000,
                    })
                }
            }
            return result;
        }
    },
]

function createNamedIdentifierContentType(name: string, contentKind: ContentKind): ContentType {
    return {
        name: name,
        contentKind: contentKind,
        attributes: [
            {id: 'id', description: 'ID', required: true, unique: true},
            {id: 'title', description: 'Title'},
            {id: 'order', description: 'Order', dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: items => {
            return items.map((item, idx) => ({
                "ID": item["id"],
                "Title": item["title"],
                "Order": idx * 100,
            }))
        }
    };
}

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
