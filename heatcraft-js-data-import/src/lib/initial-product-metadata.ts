import {AttributeType, Category} from "../../../heatcraft-js-shared/lib/product";

export interface NamedIdentifier {
    id: string,
    title: string,
}

export const initialGroups: NamedIdentifier[] = [
    {id: "compressorized", title: "Compressorized"},
    {id: "evaporators_unit_coolers", title: "Evaporators / Unit Coolers"},
];

export const initialCategories: (NamedIdentifier & { groupId: string })[] = [
    {id: "pro3_packaged", title: "PRO3 Packaged Systems", groupId: "compressorized"},
    {id: "walk_in_unit_coolers", title: "Walk-In Unit Coolers", groupId: "evaporators_unit_coolers"},
];

export const initialStyles: (NamedIdentifier & { categoryId: string })[] = [
    {id: "top_mount", title: "Top Mount", categoryId: "pro3_packaged"},
    {id: "side_mount", title: "Side Mount", categoryId: "pro3_packaged"},
    {id: "low_profile", title: "Low Profile", categoryId: "walk_in_unit_coolers"},
    {id: "medium_profile", title: "Medium Profile", categoryId: "walk_in_unit_coolers"},
    {id: "center_mount", title: "Center Mount", categoryId: "walk_in_unit_coolers"},
    {id: "low_velocity_center_mount", title: "Low Velocity Center Mount", categoryId: "walk_in_unit_coolers"},
];

export const initialBrands: NamedIdentifier[] = [
    {id: "bohn", title: "Bohn"},
    {id: "larkin", title: "Larkin"},
    {id: "climate_control", title: "Climate Control"},
    {id: "chandler", title: "Chandler"},
];

export const initialDocuments: NamedIdentifier[] = [
    {id: "installation_manual_indoor", title: "Installation & Operation Manual - Indoor"},
    {id: "installation_manual_outdoor", title: "Installation & Operation Manual - Outdoor"},
    {id: "technical_bulletin", title: "Technical Bulletin"},
    {id: "installation_manual", title: "Installation & Operation Manual"},
    {id: "refrigeration_manual", title: "Refrigeration Systems Installation & Operation Manual"},
    {id: "sales_brochure", title: "Sales Brochure"},
    {id: "unit_cooler_manual", title: "Unit Coolers Installation & Operation Manual"},
    {id: "price_book", title: "Price Book"},
    {id: "cad", title: "Download AutoCad File"},
    {id: "revit_air_defrost", title: "Download Revit File"},
    {id: "revit_electric_defrost", title: "Download Revit File"},
    {id: "revit_gas_defrost_electric_drain_pan", title: "Download Revit File"},
    {id: "revit_gas_defrost_hot_gas_drain_pan", title: "Download Revit File"},
];

export interface CategoryAttributeGroup {
    category: Category,
    attributes: CategoryAttribute[]
}

export interface CategoryAttribute {
    categoryAttributeId: string,
    newContentType: string,
    newAttributeId: string,
    legacyContentType: string,
    legacyAttributeId: string,
    attributeType: AttributeType
}

export const initialCategoryAttributes: CategoryAttributeGroup[] = [
    {
        category: "pro3_packaged",
        attributes: [{
            "categoryAttributeId": "productId",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "productId",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "productId",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "modelNumber",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "modelNumber",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "modelNumber",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "brand",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "brand",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "brand",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "style",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "style",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "style",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "revision",
            "newContentType": "ConstantContentType",
            "newAttributeId": "new",
            "legacyContentType": "ConstantContentType",
            "legacyAttributeId": "legacy",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "price",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "price",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "price",
            "attributeType": "MONEY"
        }, {
            "categoryAttributeId": "applicationType",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "applicationType",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "applicationType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "applicationLocation",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "applicationLocation",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "applicationLocation",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "cabinetSize",
            "newContentType": "ProductV7Pro3PackagedNewDetails",
            "newAttributeId": "cabinetSize",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "cabinetSize",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "defrostType",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "defrostType",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "defrostType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "unitVoltage",
            "newContentType": "ProductV7Pro3PackagedNewDetails",
            "newAttributeId": "unitVoltage",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "unitVoltage",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "operatingRange",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "operatingRange",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "operatingRange",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorType",
            "newContentType": "ProductV7Pro3PackagedNewDetails",
            "newAttributeId": "motorType",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "motorType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "refrigerant",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "refrigerant",
            "legacyContentType": "ProductV7Pro3PackagedLegacy",
            "legacyAttributeId": "refrigerant",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "capacity",
            "newContentType": "ProductV7Pro3PackagedNew",
            "newAttributeId": "capacity",
            "legacyContentType": "ProductV7Pro3PackagedLegacyDetails",
            "legacyAttributeId": "capacity",
            "attributeType": "INTEGER"
        }]
    },
    {
        category: "walk_in_unit_coolers",
        attributes: [{
            "categoryAttributeId": "productId",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "productId",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "productId",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "modelNumber",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "modelNumber",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "modelNumber",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "group",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "group",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "group",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "category",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "category",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "category",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "style",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "style",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "style",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "revision",
            "newContentType": "ConstantContentType",
            "newAttributeId": "new",
            "legacyContentType": "ConstantContentType",
            "legacyAttributeId": "legacy",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "brand",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "brand",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "brand",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "price",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "price",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "price",
            "attributeType": "MONEY"
        }, {
            "categoryAttributeId": "applicationType",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "applicationType",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "defrostType",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "defrostType",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "defrostType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "ratingPoint",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "ratingPoint",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "ratingPoint",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "fpi",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "fpi",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "fpi",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "cfm",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "cfm",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "cfm",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "refrigerant",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "refrigerant",
            "legacyContentType": "ConstantContentType",
            "legacyAttributeId": "R-448A",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "compliance",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "doeCompliance",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "BOOLEAN"
        }, {
            "categoryAttributeId": "awef",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "awef",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "capacity",
            "newContentType": "ProductV7WalkInUnitCoolersNew",
            "newAttributeId": "capacity",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "capacity",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "motorType",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorType",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "motorType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "unitMca",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "unitMca",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "DECIMAL"
        }, {
            "categoryAttributeId": "unitMopd",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "unitMopd",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "depthIn",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "depthIn",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "depthIn",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "heightIn",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "heightIn",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "heightIn",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "lengthIn",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "lengthIn",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "lengthIn",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "estNetWeightLbs",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "estNetWeightLbs",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "approxNetWeightLBS",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorHp",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorHp",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "motorHP",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorAmps",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorAmps",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "motorAmps",
            "attributeType": "DECIMAL"
        }, {
            "categoryAttributeId": "noOfFans",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "noOfFans",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "noOfFans",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "motorWatts",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorWatts",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "motorWatts",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "unitVoltage",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "unitVoltage",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacy",
            "legacyAttributeId": "unitVoltage",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorVoltage",
            "newContentType": "ProductV7WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorVoltage",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "motorVoltage",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "drainMpt",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "drainMpt",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "drainMPT",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "suctionOd",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "suctionOd",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "suctionOD",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "coilInletOD",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "coilInletOD",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "coilInletOD",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "externalEqualizedOd",
            "newContentType": "ProductV7WalkInUnitCoolersNewDetails",
            "newAttributeId": "externalEqualizedOd",
            "legacyContentType": "ProductV7WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "externalEqualizerOD",
            "attributeType": "FRACTION"
        }]
    },
];

export interface ProductListAttributeGroup {
    category: Category,
    attributes: ProductListAttribute[]
}

export interface ProductListAttribute {
    title: string,
    categoryAttributeId: string,
    width: string
}

export const initialProductListAttributes: ProductListAttributeGroup[] = [
    {
        category: "pro3_packaged",
        attributes: [
            {title: "New / Legacy", categoryAttributeId: "revision", width: "10%"},
            {title: "Model #", categoryAttributeId: "modelNumber", width: "10%"},
            {title: "List Price", categoryAttributeId: "price", width: "10%"},
            {title: "Application Type", categoryAttributeId: "applicationType", width: "15%"},
            {title: "Defrost Type", categoryAttributeId: "defrostType", width: "13%"},
            {title: "Operating Range", categoryAttributeId: "operatingRange", width: "13%"},
            {title: "Motor Type", categoryAttributeId: "motorType", width: "12%"},
            {title: "Refrigerant", categoryAttributeId: "refrigerant", width: "10%"},
            {title: "Capacity", categoryAttributeId: "capacity", width: "10%"},
        ]
    },
    {
        category: "walk_in_unit_coolers",
        attributes: [
            {title: "New / Legacy", categoryAttributeId: "revision", width: "10%"},
            {title: "Model #", categoryAttributeId: "modelNumber", width: "20%"},
            {title: "List Price", categoryAttributeId: "price", width: "11%"},
            {title: "Defrost Type", categoryAttributeId: "defrostType", width: "13%"},
            {title: "Voltage", categoryAttributeId: "unitVoltage", width: "12%"},
            {title: "Motor Type", categoryAttributeId: "motorType", width: "15%"},
            {title: "FPI", categoryAttributeId: "fpi", width: "5%"},
            {title: "Capacity", categoryAttributeId: "capacity", width: "10%"},
            {title: "CFM", categoryAttributeId: "cfm", width: "5%"},
        ]
    },
];

export interface ProductCompareAttributeGroup {
    category: Category,
    attributes: ProductCompareAttribute[]
}

export interface ProductCompareAttribute {
    title: string,
    categoryAttributeId: string,
}

export const initialProductCompareAttributes: ProductCompareAttributeGroup[] = [
    {
        category: "pro3_packaged",
        attributes: [
            {title: 'List Price', categoryAttributeId: 'price',},
            {title: 'Application Type', categoryAttributeId: 'applicationType',},
            {title: 'Defrost Type', categoryAttributeId: 'defrostType',},
            {title: 'Operating Range', categoryAttributeId: 'operatingRange',},
            {title: 'Motor Type', categoryAttributeId: 'motorType',},
            {title: 'Refrigerant', categoryAttributeId: 'refrigerant',},
            {title: 'Capacity', categoryAttributeId: 'capacity',},
        ]
    },
    {
        category: "walk_in_unit_coolers",
        attributes: [
            {title: 'List Price', categoryAttributeId: 'price',},
            {title: 'Compliance', categoryAttributeId: 'compliance',},
            {title: 'FPI', categoryAttributeId: 'fpi',},
            {title: 'CFM', categoryAttributeId: 'cfm',},
            {title: 'AWEF Rating', categoryAttributeId: 'awef',},
            {title: 'Rating Point', categoryAttributeId: 'ratingPoint',},
            {title: 'Selection Capacity', categoryAttributeId: 'capacity',},
            {title: 'Unit MCA', categoryAttributeId: 'unitMca',},
            {title: 'Unit MOPD', categoryAttributeId: 'unitMopd',},
            {title: 'Depth', categoryAttributeId: 'depthIn',},
            {title: 'Height', categoryAttributeId: 'heightIn',},
            {title: 'Length', categoryAttributeId: 'lengthIn',},
            {title: 'Est. Net Wt', categoryAttributeId: 'estNetWeightLbs',},
            {title: 'Motor HP', categoryAttributeId: 'motorHp',},
            {title: 'Motor Amps', categoryAttributeId: 'motorAmps',},
            {title: 'No. of Fans', categoryAttributeId: 'noOfFans',},
            {title: 'Motor Watts', categoryAttributeId: 'motorWatts',},
            {title: 'Unit Voltage', categoryAttributeId: 'unitVoltage',},
            {title: 'Motor Voltage', categoryAttributeId: 'motorVoltage',},
            {title: 'Drain MPT', categoryAttributeId: 'drainMpt',},
            {title: 'Suction OD', categoryAttributeId: 'suctionOd',},
            {title: 'Coil Inlet OD', categoryAttributeId: 'coilInletOD',},
            {title: 'External Equalizer OD', categoryAttributeId: 'externalEqualizedOd'},
        ]
    },
];

export interface CategoryRevision {
    category: Category,
    revision: "new" | "legacy"
}

export interface ProductMetaV1Detail {
    categoryRevision: CategoryRevision,
    mainContentType: string,
    crossReferenceContentType: string | null,
    dictionaryContentType: string | null,
}

export const initialProductDetail: ProductMetaV1Detail[] = [{
    "categoryRevision": {
        "category": "walk_in_unit_coolers",
        "revision": "new"
    },
    "mainContentType": "ProductV7WalkInUnitCoolersNew",
    "crossReferenceContentType": null,
    "dictionaryContentType": "ProductV7WalkInUnitCoolersNewDictionaryRefs"
}, {
    "categoryRevision": {"category": "walk_in_unit_coolers", "revision": "legacy"},
    "mainContentType": "ProductV7WalkInUnitCoolersLegacy",
    "crossReferenceContentType": "ProductV7WalkInUnitCoolersNewCrossReference",
    "dictionaryContentType": "ProductV7WalkInUnitCoolersLegacyDictionaryRefs"
}, {
    "categoryRevision": {"category": "pro3_packaged", "revision": "new"},
    "mainContentType": "ProductV7Pro3PackagedNew",
    "crossReferenceContentType": null,
    "dictionaryContentType": "ProductV7Pro3PackagedNewDictionaryRefs"
}, {
    "categoryRevision": {"category": "pro3_packaged", "revision": "legacy"},
    "mainContentType": "ProductV7Pro3PackagedLegacy",
    "crossReferenceContentType": "ProductV7Pro3PackagedNewCrossReference",
    "dictionaryContentType": null
}];

export interface ProductMetaV1DetailSpecification {
    categoryRevision: CategoryRevision,
    sections: {
        title: string,
        attributes: {
            title: string,
            contentType: string,
            attributeId: string,
            type: AttributeType,
        }[]
    }[]
}

export const initialProductDetailSpecification: ProductMetaV1DetailSpecification[] = [
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "new"
        },
        "sections": [
            {
                "title": "General Information",
                "attributes": [
                    {
                        "title": "Type",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "applicationType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "FPI",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "fpi",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Dual Rated",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "dualRated",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Performance Data",
                "attributes": [
                    {
                        "title": "Rating Point °F",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "ratingPoint",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Selection Capacity (R-448A/R-449A)",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "capacity",
                        "type": "INTEGER"
                    },
                    {
                        "title": "CFM",
                        "contentType": "ProductV7WalkInUnitCoolersNew",
                        "attributeId": "cfm",
                        "type": "DECIMAL_ROUNDED"
                    }
                ]
            },
            {
                "title": "Electrical Ratings",
                "attributes": [
                    {
                        "title": "Motor Type",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "No of Fans",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "noOfFans",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor HP",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorHp",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Unit MCA",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "unitMca",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Unit MOPD",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "unitMopd",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Watts",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Amps",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "defrostHeaterVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Amps",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "defrostHeaterAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Watts",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "defrostHeaterWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "drainPanVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Amps",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "drainPanAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Watts",
                        "contentType": "ProductV7WalkInUnitCoolersNewElectrical",
                        "attributeId": "drainPanWatts",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Physical Data",
                "attributes": [
                    {
                        "title": "Height (in.)",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "heightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Depth (in.)",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "depthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Length (In.)",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "lengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Est. Net Weight (lbs.)",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "estNetWeightLbs",
                        "type": "DECIMAL"
                    }
                ]
            },
            {
                "title": "Connections Data (in.)",
                "attributes": [
                    {
                        "title": "Coil Inlet OD",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "coilInletOd",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Suction OD",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "suctionOd",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "External Equalizer OD",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "externalEqualizedOd",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Drain MPT",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "drainMpt",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Side Port OD",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "sidePortOd",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Hot Gas Pan Conns.OD",
                        "contentType": "ProductV7WalkInUnitCoolersNewDetails",
                        "attributeId": "hotGasPanConnsOd",
                        "type": "FRACTION"
                    }
                ]
            }
        ]
    },
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "legacy"
        },
        "sections": [
            {
                "title": "Model Summary",
                "attributes": [
                    {
                        "title": "Standard Model",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "modelNumber",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Config Model",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "configModel",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "List Price ($US)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "price",
                        "type": "MONEY"
                    },
                    {
                        "title": "intelliGen™ Config Model",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "intelliGenConfigModel",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "intelliGen™ Config. List Price ($US)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "intelliGenConfigListPrice",
                        "type": "MONEY"
                    }
                ]
            },
            {
                "title": "General Information",
                "attributes": [
                    {
                        "title": "Type",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "FPI",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "fpi",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Performance Data",
                "attributes": [
                    {
                        "title": "Rating Point °F",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "ratingPoint",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Capacity R-404A (BTUH)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "capacity",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "CFM",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "cfm",
                        "type": "DECIMAL_ROUNDED"
                    }
                ]
            },
            {
                "title": "Electrical Ratings",
                "attributes": [
                    {
                        "title": "Motor Type",
                        "contentType": "ProductV7WalkInUnitCoolersLegacy",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "No. of Fans",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "noOfFans",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor HP",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorHP",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Watts",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Amps",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "defrostHeaterVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Amps",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "defrostHeaterAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Watts",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "defrostHeaterWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Voltage",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "drainPanVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Amps",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "drainPanAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Watts",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "drainPanWatts",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Physical Data",
                "attributes": [
                    {
                        "title": "Height (in.)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "heightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Depth (in.)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "depthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Length (In.)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "lengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Approx. Net Weight (lbs.)",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "approxNetWeightLBS",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Connections Data (in.)",
                "attributes": [
                    {
                        "title": "Coil Inlet OD",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "coilInletOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Coil Inlet ODF",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "coilInletODF",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Suction ID",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "suctionID",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Suction OD",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "suctionOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "External Equalizer OD",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "externalEqualizerOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain MPT",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "drainMPT",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain FPT",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "drainFPT",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Side Port OD",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "sidePortOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Hot Gas Pan Conns.OD",
                        "contentType": "ProductV7WalkInUnitCoolersLegacyDetails",
                        "attributeId": "hotGasPanConnsOD",
                        "type": "SIMPLE"
                    }
                ]
            }
        ]
    },
    {
        "categoryRevision": {
            "category": "pro3_packaged",
            "revision": "new"
        },
        "sections": [
            {
                "title": "TBD",
                "attributes": [
                    {
                        "title": "Unit Amps",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "unitAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Plug Supplied",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "plugSupplied",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Packaging",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "packaging",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Gross Weight (lbs)",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "grossWeightLbs",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "AWEF Notes",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "awefNotes",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "General Information",
                "attributes": [
                    {
                        "title": "Type",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "applicationType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application Location",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "applicationLocation",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Operating Range",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "operatingRange",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Evap Fan Motor Type",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Refrigerant Type",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "refrigerant",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Matching NEMA Receptacle",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "matchingNemaReceptable",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Cabinet Size",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "cabinetSize",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Performance Data",
                "attributes": [
                    {
                        "title": "Evap. Fans CFM",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "cfm",
                        "type": "DECIMAL_ROUNDED"
                    },
                    {
                        "title": "Ambient Temperature °F",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "ambientTempF",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Box Temperature °F",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "roomTempF",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Capacity (BTUH) °F",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "capacity",
                        "type": "INTEGER"
                    },
                    {
                        "title": "AWEF",
                        "contentType": "ProductV7Pro3PackagedNew",
                        "attributeId": "awef",
                        "type": "DECIMAL"
                    }
                ]
            },
            {
                "title": "Electrical Ratings",
                "attributes": [
                    {
                        "title": "MCA",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "unitMca",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "MOPD",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "unitMopd",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Physical Data",
                "attributes": [
                    {
                        "title": "Shipping Length (.in)",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "shippingLengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Shipping Width (.in)",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "shippingWidthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Shipping Height (.in)",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "shippingHeightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Est. Net Weight (lbs.)",
                        "contentType": "ProductV7Pro3PackagedNewDetails",
                        "attributeId": "estNetWeightLbs",
                        "type": "SIMPLE"
                    }
                ]
            }
        ]
    },
    {
        "categoryRevision": {
            "category": "pro3_packaged",
            "revision": "legacy"
        },
        "sections": [
            {
                "title": "General Information",
                "attributes": [
                    {
                        "title": "Type",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "applicationType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application Location",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "applicationLocation",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Operating Range",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "operatingRange",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Evap Fan Motor Type",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Refrigerant Type",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "refrigerant",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Plug Supplied",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "plugSupplied",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Matching NEMA Receptacle",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "matchingNemaReceptacle",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Cabinet Size",
                        "contentType": "ProductV7Pro3PackagedLegacy",
                        "attributeId": "cabinetSize",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Performance Data",
                "attributes": [
                    {
                        "title": "Evap. Fans CFM",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "evapFansCfm",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Ambient Temperature °F",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "ambientTemperatureF",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Box Temperature °F",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "boxTemperatureF",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Capacity R-404A (BTUH) °F",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "capacity",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Electrical Ratings",
                "attributes": [
                    {
                        "title": "MCA",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "mca",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "MOPD",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "mopd",
                        "type": "SIMPLE"
                    }
                ]
            },
            {
                "title": "Physical Data",
                "attributes": [
                    {
                        "title": "Height (in.)",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "heightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Depth (in.)",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "depthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Length (In.)",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "lengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Approx. Net Weight (lbs.)",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "approxNetWeightLbs",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Refrig. Charge R-404A (lbs.)",
                        "contentType": "ProductV7Pro3PackagedLegacyDetails",
                        "attributeId": "refrigChargeR404ALbs",
                        "type": "SIMPLE"
                    }
                ]
            }
        ]
    }
];

export interface ProductMetaV1DetailDictionary {
    categoryRevision: CategoryRevision,
    dictionarySpecs: {
        dictionary: string,
        contentType: string
    }[]
}

export const initialProductDetailDictionaries: ProductMetaV1DetailDictionary[] = [
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "new"
        },
        "dictionarySpecs": [
            {
                "dictionary": "CAPACITY",
                "contentType": "ProductV7WalkInUnitCoolersNewCapacityDictionary"
            },
            {
                "dictionary": "PREFERRED_OPTIONS",
                "contentType": "ProductV7WalkInUnitCoolersNewPreferredOptionsDictionary"
            },
            {
                "dictionary": "ALACARTE_OPTIONS",
                "contentType": "ProductV7WalkInUnitCoolersNewAlaCarteOptionsDictionary"
            },
            {
                "dictionary": "EXPANSION_VALVES",
                "contentType": "ProductV7WalkInUnitCoolersNewExpansionValvesDictionary"
            },
            {
                "dictionary": "LIQUID_VALVES",
                "contentType": "ProductV7WalkInUnitCoolersNewLiquidValvesDictionary"
            },
            {
                "dictionary": "SHIPPED_LOOSE",
                "contentType": "ProductV7WalkInUnitCoolersNewShippedLooseDictionary"
            }
        ]
    },
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "legacy"
        },
        "dictionarySpecs": [
            {
                "dictionary": "ALACARTE_OPTIONS",
                "contentType": "ProductV7WalkInUnitCoolersLegacyAlaCarteOptionsDictionary"
            },
            {
                "dictionary": "SHIPPED_LOOSE",
                "contentType": "ProductV7WalkInUnitCoolersLegacyShippedLooseDictionary"
            },
            {
                "dictionary": "EXPANSION_VALVES",
                "contentType": "ProductV7WalkInUnitCoolersLegacyExpansionValvesDictionary"
            },
            {
                "dictionary": "LIQUID_VALVES",
                "contentType": "ProductV7WalkInUnitCoolersLegacyLiquidValvesDictionary"
            }
        ]
    },
    {
        "categoryRevision": {
            "category": "pro3_packaged",
            "revision": "new"
        },
        "dictionarySpecs": [
            {
                "dictionary": "CAPACITY",
                "contentType": "ProductV7Pro3PackagedNewCapacityDictionary"
            }
        ]
    }
];

export interface ProductMetaV1DetailCrossReference {
    categoryRevision: CategoryRevision,
    attributes: {
        categoryAttributeId: string,
        title: string,
    }[]
}

export const initialProductDetailCrossReference: ProductMetaV1DetailCrossReference[] = [
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "legacy"
        },
        "attributes": [
            {
                "categoryAttributeId": "compliance",
                "title": "Compliance",
            },
            {
                "categoryAttributeId": "fpi",
                "title": "FPI",
            },
            {
                "categoryAttributeId": "cfm",
                "title": "CFM",
            },
            {
                "categoryAttributeId": "awefRating",
                "title": "AWEF Rating",
            },
            {
                "categoryAttributeId": "ratingPoint",
                "title": "Rating Point",
            },
            {
                "categoryAttributeId": "selectionCapacity",
                "title": "Selection Capacity",
            },
            {
                "categoryAttributeId": "unitMca",
                "title": "Unit MCA",
            },
            {
                "categoryAttributeId": "unitMopd",
                "title": "Unit MOPD",
            },
            {
                "categoryAttributeId": "depthIn",
                "title": "Depth",
            },
            {
                "categoryAttributeId": "heightIn",
                "title": "Height",
            },
            {
                "categoryAttributeId": "lengthIn",
                "title": "Length",
            },
            {
                "categoryAttributeId": "estNetWeightLbs",
                "title": "Est. Net Wt",
            },
            {
                "categoryAttributeId": "motorHp",
                "title": "Motor HP",
            },
            {
                "categoryAttributeId": "motorAmps",
                "title": "Motor Amps",
            },
            {
                "categoryAttributeId": "noOfFans",
                "title": "No. of Fans",
            },
            {
                "categoryAttributeId": "motorWatts",
                "title": "Motor Watts",
            },
            {
                "categoryAttributeId": "unitVoltage",
                "title": "Unit Voltage",
            },
            {
                "categoryAttributeId": "motorVoltage",
                "title": "Motor Voltage",
            },
            {
                "categoryAttributeId": "drainMPT",
                "title": "Drain MPT",
            },
            {
                "categoryAttributeId": "suctionOd",
                "title": "Suction OD",
            },
            {
                "categoryAttributeId": "coilInletOd",
                "title": "Coil Inlet OD",
            },
            {
                "categoryAttributeId": "externalEqualizedOd",
                "title": "External Equalizer OD",
            }
        ]
    },
    {
        "categoryRevision": {
            "category": "pro3_packaged",
            "revision": "legacy"
        },
        "attributes": [
            {
                "categoryAttributeId": "price",
                "title": "List Price ($US)",
            },
            {
                "categoryAttributeId": "unitVoltage",
                "title": "Voltage",
            },
            {
                "categoryAttributeId": "motorType",
                "title": "Motor Type",
            },
            {
                "categoryAttributeId": "shippingLengthIn",
                "title": "Height (in.)",
            },
            {
                "categoryAttributeId": "shippingWidthIn",
                "title": "Depth (in.)",
            },
            {
                "categoryAttributeId": "shippingHeightIn",
                "title": "Length (In.)",
            }
        ]
    }
];