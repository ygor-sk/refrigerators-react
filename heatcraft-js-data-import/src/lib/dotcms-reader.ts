import {
    consolidatePro3PackagedLegacyProducts,
    consolidateWalkInUnitCoolersLegacyProducts,
    crawlPro3PackagedLegacyProducts,
    crawlWalkInUnitCoolers
} from "./crawler";
import {saveFile} from "./global-util";
import {ContentKind, ContentType} from "./dotcms-writer";
import {readXlsxProductsPPRO3} from "./xlsx-reader-ppro3";
import {readWalkInUnitCoolerProducts,} from "./xlsx-reader-walk-in-unit-coolers";
import {initialMainMenu} from "./initial-main-menu";
import {contentKinds} from "./dotcms-content";
import _ from "lodash";
import {
    initialBrands,
    initialCategories,
    initialCategoryAttributes,
    initialDocuments,
    initialGroups,
    initialProductCompareAttributes,
    initialProductDetail,
    initialProductDetailCrossReference,
    initialProductDetailDictionaries,
    initialProductDetailSpecification,
    initialProductListAttributes,
    initialStyles
} from "./initial-product-metadata";
import {
    DUMMY_REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY,
    DUMMY_REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW
} from "./dummy-data";

export interface ProductGroup {
    contentKind: ContentKind,
    sourceProducts: any[],
}

const MAX_PRODUCT_COUNT = 9999999;

export async function readProductGroups(saveAnalysis: boolean): Promise<ProductGroup[]> {
    const crawledProducts = await crawlWalkInUnitCoolers();
    const sourceProducts = consolidateWalkInUnitCoolersLegacyProducts(crawledProducts);
    const productGroups: ProductGroup[] = [];

    if (_.includes(contentKinds, ContentKind.META_GROUP)) {
        productGroups.push({contentKind: ContentKind.META_GROUP, sourceProducts: initialGroups})
    }
    if (_.includes(contentKinds, ContentKind.META_CATEGORY)) {
        productGroups.push({contentKind: ContentKind.META_CATEGORY, sourceProducts: initialCategories})
    }
    if (_.includes(contentKinds, ContentKind.META_STYLE)) {
        productGroups.push({contentKind: ContentKind.META_STYLE, sourceProducts: initialStyles})
    }
    if (_.includes(contentKinds, ContentKind.META_BRAND)) {
        productGroups.push({contentKind: ContentKind.META_BRAND, sourceProducts: initialBrands})
    }
    if (_.includes(contentKinds, ContentKind.META_DOCUMENT)) {
        productGroups.push({contentKind: ContentKind.META_DOCUMENT, sourceProducts: initialDocuments})
    }

    if (_.includes(contentKinds, ContentKind.META_CATEGORY_ATTRIBUTE)) {
        productGroups.push({contentKind: ContentKind.META_CATEGORY_ATTRIBUTE, sourceProducts: initialCategoryAttributes})
    }

    if (_.includes(contentKinds, ContentKind.META_PRODUCT_LIST_ATTRIBUTE)) {
        productGroups.push({contentKind: ContentKind.META_PRODUCT_LIST_ATTRIBUTE, sourceProducts: initialProductListAttributes})
    }

    if (_.includes(contentKinds, ContentKind.META_PRODUCT_COMPARE_ATTRIBUTE)) {
        productGroups.push({contentKind: ContentKind.META_PRODUCT_COMPARE_ATTRIBUTE, sourceProducts: initialProductCompareAttributes})
    }

    if (_.includes(contentKinds, ContentKind.META_PRODUCT_DETAIL)) {
        productGroups.push({contentKind: ContentKind.META_PRODUCT_DETAIL, sourceProducts: initialProductDetail})
    }

    if (_.includes(contentKinds, ContentKind.META_PRODUCT_DETAIL_SPECIFICATION)) {
        productGroups.push({contentKind: ContentKind.META_PRODUCT_DETAIL_SPECIFICATION, sourceProducts: initialProductDetailSpecification})
    }

    if (_.includes(contentKinds, ContentKind.META_PRODUCT_DETAIL_DICTIONARIES)) {
        productGroups.push({contentKind: ContentKind.META_PRODUCT_DETAIL_DICTIONARIES, sourceProducts: initialProductDetailDictionaries})
    }

    if (_.includes(contentKinds, ContentKind.META_PRODUCT_DETAIL_CROSS_REFERENCE)) {
        productGroups.push({contentKind: ContentKind.META_PRODUCT_DETAIL_CROSS_REFERENCE, sourceProducts: initialProductDetailCrossReference})
    }

    // PRO3 Packaged

    const includePro3Packaged = _.includes(contentKinds, ContentKind.PRO3_PACKAGED);

    const includePro3PackagedLegacy = _.includes(contentKinds, ContentKind.PRO3_PACKAGED_LEGACY);
    if (includePro3Packaged || includePro3PackagedLegacy) {
        let crawledProducts = await crawlPro3PackagedLegacyProducts();
        let sourceProducts = consolidatePro3PackagedLegacyProducts(crawledProducts);
        if (saveAnalysis) {
            await saveFile(`../target-analysis/generated/crawl-pro3_packaged-consolidated.json`, JSON.stringify(sourceProducts, null, 2));
            await saveFile(`../target-analysis/generated/crawl-pro3_packaged.json`, JSON.stringify(crawledProducts, null, 2));
        }
        if (includePro3Packaged) {
            productGroups.push({
                contentKind: ContentKind.PRO3_PACKAGED,
                sourceProducts: sourceProducts.products.slice(0, MAX_PRODUCT_COUNT),
            });
        }
        if (includePro3PackagedLegacy) {
            productGroups.push({
                contentKind: ContentKind.PRO3_PACKAGED_LEGACY,
                sourceProducts: sourceProducts.products.slice(0, MAX_PRODUCT_COUNT),
            });
        }
    }

    const includePro3PackagedNew = _.includes(contentKinds, ContentKind.PRO3_PACKAGED_NEW);
    const includePro3PackagedNewDictionary = _.includes(contentKinds, ContentKind.PRO3_PACKAGED_NEW_DICTIONARY);
    if (includePro3Packaged || includePro3PackagedNew || includePro3PackagedNewDictionary) {
        const pro3PackagedProducts = await readXlsxProductsPPRO3();
        if (includePro3PackagedNewDictionary) {
            if (saveAnalysis) {
                await saveFile('../target-analysis/generated/source-consolidated-new-packaged-dictionary.json', JSON.stringify(pro3PackagedProducts.dictionaries, null, 2));
            }
            productGroups.push({
                contentKind: ContentKind.PRO3_PACKAGED_NEW_DICTIONARY,
                sourceProducts: pro3PackagedProducts.dictionaries,
            });
        }
        if (includePro3Packaged || includePro3PackagedNew) {
            if (saveAnalysis) {
                await saveFile('../target-analysis/generated/source-consolidated-new-packaged.json', JSON.stringify(pro3PackagedProducts.products, null, 2));
            }
            if (includePro3Packaged) {
                productGroups.push({
                    contentKind: ContentKind.PRO3_PACKAGED,
                    sourceProducts: pro3PackagedProducts.products.slice(0, MAX_PRODUCT_COUNT),
                });
            }
            if (includePro3PackagedNew) {
                productGroups.push({
                    contentKind: ContentKind.PRO3_PACKAGED_NEW,
                    sourceProducts: pro3PackagedProducts.products.slice(0, MAX_PRODUCT_COUNT),
                });
            }
        }
    }

    ///// WALK IN UNIT COOLERS

    const includeWalkInUnitCoolers = _.includes(contentKinds, ContentKind.WALK_IN_UNIT_COOLERS);

    const includeWalkInUnitCoolersLegacy = _.includes(contentKinds, ContentKind.WALK_IN_UNIT_COOLERS_LEGACY);
    const includeWalkInUnitCoolersLegacyDictionary = _.includes(contentKinds, ContentKind.WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY);
    if (includeWalkInUnitCoolers || includeWalkInUnitCoolersLegacy || includeWalkInUnitCoolersLegacyDictionary) {

        if (includeWalkInUnitCoolersLegacyDictionary) {
            if (saveAnalysis) {
                await saveFile(`../target-analysis/generated/crawl-walk_in_unit_coolers-dictionary.json`, JSON.stringify(sourceProducts.dictionaries, null, 2));
            }
            productGroups.push({
                contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY,
                sourceProducts: sourceProducts.dictionaries,
            });
        }

        if (includeWalkInUnitCoolers || includeWalkInUnitCoolersLegacy) {
            if (saveAnalysis) {
                await saveFile(`../target-analysis/generated/crawl-walk_in_unit_coolers.json`, JSON.stringify(crawledProducts, null, 2));
                await saveFile(`../target-analysis/generated/crawl-walk_in_unit_coolers-consolidated.json`, JSON.stringify(sourceProducts.products, null, 2));
                await saveFile(`../target-analysis/generated/crawl-walk_in_unit_coolers-attributes.json`, JSON.stringify(sourceProducts.uniqueAttributeNames, null, 2));
            }
            if (includeWalkInUnitCoolers) {
                productGroups.push({
                    contentKind: ContentKind.WALK_IN_UNIT_COOLERS,
                    sourceProducts: sourceProducts.products.slice(0, MAX_PRODUCT_COUNT),
                });
            }
            if (includeWalkInUnitCoolersLegacy) {
                productGroups.push({
                    contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY,
                    sourceProducts: sourceProducts.products.slice(0, MAX_PRODUCT_COUNT),
                });
            }
        }
    }

    const includeWalkInUnitCoolersNew = _.includes(contentKinds, ContentKind.WALK_IN_UNIT_COOLERS_NEW);
    const includeWalkInUnitCoolersNewDictionary = _.includes(contentKinds, ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY);
    if (includeWalkInUnitCoolers || includeWalkInUnitCoolersNew || includeWalkInUnitCoolersNewDictionary) {
        const walkInUnitCoolerProducts = await readWalkInUnitCoolerProducts();
        if (includeWalkInUnitCoolersNewDictionary) {
            if (saveAnalysis) {
                await saveFile(`../target-analysis/generated/source-consolidated-new-walk-in-unit-coolers-dictionaries.json`, JSON.stringify(walkInUnitCoolerProducts.dictionaries, null, 2));
            }
            productGroups.push({
                contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
                sourceProducts: walkInUnitCoolerProducts.dictionaries
            })
        }
        if (includeWalkInUnitCoolers || includeWalkInUnitCoolersNew) {
            if (saveAnalysis) {
                await saveFile(`../target-analysis/generated/source-consolidated-new-walk-in-unit-coolers.json`, JSON.stringify(walkInUnitCoolerProducts.products, null, 2));
            }
            if (includeWalkInUnitCoolers) {
                productGroups.push({
                    contentKind: ContentKind.WALK_IN_UNIT_COOLERS,
                    sourceProducts: walkInUnitCoolerProducts.products.slice(0, MAX_PRODUCT_COUNT),
                })
            }
            if (includeWalkInUnitCoolersNew) {
                productGroups.push({
                    contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW,
                    sourceProducts: walkInUnitCoolerProducts.products.slice(0, MAX_PRODUCT_COUNT),
                })
            }
        }
    }

    if (_.includes(contentKinds, ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW)) {
        productGroups.push({
            contentKind: ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW,
            sourceProducts: DUMMY_REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW,
        });
    }

    if (_.includes(contentKinds, ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY)) {
        productGroups.push({
            contentKind: ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY,
            sourceProducts: DUMMY_REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY,
        });
    }

    if (_.includes(contentKinds, ContentKind.MAIN_MENU)) {
        productGroups.push({
            contentKind: ContentKind.MAIN_MENU,
            sourceProducts: initialMainMenu()
        });
    }
    return productGroups;
}

export function collectContentTypeProducts(contentType: ContentType, productGroups: ProductGroup[]) {
    return productGroups
        .filter(productGroup => contentType.contentKind === productGroup.contentKind)
        .flatMap(productGroup => productGroup.sourceProducts);
}
