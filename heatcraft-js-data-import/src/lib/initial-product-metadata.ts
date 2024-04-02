import {AttributeType, Brand, Category, Group, Style} from "../../../heatcraft-js-shared/lib/product";
import {DocumentId} from "../../../heatcraft-js-shared/lib/site";

export interface NamedIdentifier<T> {
    id: T,
    title: string,
}

export const initialGroups: NamedIdentifier<Group>[] = [
    {id: "compressorized", title: "Compressorized"},
    {id: "evaporators_unit_coolers", title: "Evaporators / Unit Coolers"},
];

export const initialCategories: (NamedIdentifier<Category> & { groupId: Group })[] = [
    {id: "pro3_packaged", title: "PRO3 Packaged Systems", groupId: "compressorized"},
    {id: "walk_in_unit_coolers", title: "Walk-In Unit Coolers", groupId: "evaporators_unit_coolers"},
    // {
    //     id: "refrigerated_warehouse_unit_coolers",
    //     title: "Refrigerated Warehouse Unit Coolers",
    //     groupId: "evaporators_unit_coolers"
    // },
];

export const initialStyles: (NamedIdentifier<Style> & { categoryId: Category })[] = [
    {id: "top_mount", title: "Top Mount", categoryId: "pro3_packaged"},
    {id: "side_mount", title: "Side Mount", categoryId: "pro3_packaged"},
    {id: "low_profile", title: "Low Profile", categoryId: "walk_in_unit_coolers"},
    {id: "medium_profile", title: "Medium Profile", categoryId: "walk_in_unit_coolers"},
    {id: "center_mount", title: "Center Mount", categoryId: "walk_in_unit_coolers"},
    {id: "low_velocity_center_mount", title: "Low Velocity Center Mount", categoryId: "walk_in_unit_coolers"},
    // {id: "Large_Unit_Coolers", title: "Large Unit Coolers", categoryId: "refrigerated_warehouse_unit_coolers"},
];

export const initialBrands: NamedIdentifier<Brand>[] = [
    {id: "bohn", title: "Bohn"},
    {id: "larkin", title: "Larkin"},
    {id: "climate_control", title: "Climate Control"},
    {id: "chandler", title: "Chandler"},
];

export const initialDocuments: NamedIdentifier<DocumentId>[] = [
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
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "productId",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "productId",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "modelNumber",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "modelNumber",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "modelNumber",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "brand",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "brand",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "brand",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "style",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "style",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
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
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "price",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "price",
            "attributeType": "MONEY"
        }, {
            "categoryAttributeId": "applicationType",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "applicationType",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "applicationType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "shippingLengthIn",
            "newContentType": "ProductX4Pro3PackagedNewDetails",
            "newAttributeId": "shippingLengthIn",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "applicationLocation",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "applicationLocation",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "applicationLocation",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "cabinetSize",
            "newContentType": "ProductX4Pro3PackagedNewDetails",
            "newAttributeId": "cabinetSize",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "cabinetSize",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "defrostType",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "defrostType",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "defrostType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "unitVoltage",
            "newContentType": "ProductX4Pro3PackagedNewDetails",
            "newAttributeId": "unitVoltage",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "unitVoltage",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "operatingRange",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "operatingRange",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "operatingRange",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorType",
            "newContentType": "ProductX4Pro3PackagedNewDetails",
            "newAttributeId": "motorType",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "motorType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "refrigerant",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "refrigerant",
            "legacyContentType": "ProductX4Pro3PackagedLegacy",
            "legacyAttributeId": "refrigerant",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "capacity",
            "newContentType": "ProductX4Pro3PackagedNew",
            "newAttributeId": "capacity",
            "legacyContentType": "ProductX4Pro3PackagedLegacyDetails",
            "legacyAttributeId": "capacity",
            "attributeType": "INTEGER"
        }]
    },
    {
        category: "walk_in_unit_coolers",
        attributes: [{
            "categoryAttributeId": "productId",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "productId",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "productId",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "modelNumber",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "modelNumber",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "modelNumber",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "style",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "style",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
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
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "brand",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "brand",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "price",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "price",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "price",
            "attributeType": "MONEY"
        }, {
            "categoryAttributeId": "applicationType",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "applicationType",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "defrostType",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "defrostType",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "defrostType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "ratingPoint",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "ratingPoint",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "ratingPoint",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "fpi",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "fpi",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "fpi",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "cfm",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "cfm",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "cfm",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "refrigerant",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "refrigerant",
            "legacyContentType": "ConstantContentType",
            "legacyAttributeId": "R-448A",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "compliance",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "doeCompliance",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "BOOLEAN"
        }, {
            "categoryAttributeId": "awef",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "awef",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "capacity",
            "newContentType": "ProductX4WalkInUnitCoolersNew",
            "newAttributeId": "capacity",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "capacity",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "motorType",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorType",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "motorType",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "unitMca",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "unitMca",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "DECIMAL"
        }, {
            "categoryAttributeId": "unitMopd",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "unitMopd",
            "legacyContentType": "NullContentType",
            "legacyAttributeId": "NullContentType",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "depthIn",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "depthIn",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "depthIn",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "heightIn",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "heightIn",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "heightIn",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "lengthIn",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "lengthIn",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "lengthIn",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "estNetWeightLbs",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "estNetWeightLbs",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "approxNetWeightLBS",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorHp",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorHp",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "motorHP",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorAmps",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorAmps",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "motorAmps",
            "attributeType": "DECIMAL"
        }, {
            "categoryAttributeId": "noOfFans",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "noOfFans",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "noOfFans",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "motorWatts",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorWatts",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "motorWatts",
            "attributeType": "INTEGER"
        }, {
            "categoryAttributeId": "unitVoltage",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "unitVoltage",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacy",
            "legacyAttributeId": "unitVoltage",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "motorVoltage",
            "newContentType": "ProductX4WalkInUnitCoolersNewElectrical",
            "newAttributeId": "motorVoltage",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
            "legacyAttributeId": "motorVoltage",
            "attributeType": "SIMPLE"
        }, {
            "categoryAttributeId": "drainMpt",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "drainMpt",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "drainMPT",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "suctionOd",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "suctionOd",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "suctionOD",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "coilInletOD",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "coilInletOD",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "coilInletOD",
            "attributeType": "FRACTION"
        }, {
            "categoryAttributeId": "externalEqualizedOd",
            "newContentType": "ProductX4WalkInUnitCoolersNewDetails",
            "newAttributeId": "externalEqualizedOd",
            "legacyContentType": "ProductX4WalkInUnitCoolersLegacyDetails",
            "legacyAttributeId": "externalEqualizerOD",
            "attributeType": "FRACTION"
        }]
    },
    // {
    //     category: "refrigerated_warehouse_unit_coolers",
    //     attributes: [{
    //         "categoryAttributeId": "productId",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "productId",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "productId",
    //         "attributeType": "INTEGER"
    //     }, {
    //         "categoryAttributeId": "modelNumber",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "modelNumber",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "modelNumber",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "style",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "style",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "style",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "revision",
    //         "newContentType": "ConstantContentType",
    //         "newAttributeId": "new",
    //         "legacyContentType": "ConstantContentType",
    //         "legacyAttributeId": "legacy",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "brand",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "brand",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "brand",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "price",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "price",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "price",
    //         "attributeType": "MONEY"
    //     }, {
    //         "categoryAttributeId": "defrostType",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "defrostType",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "defrostType",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "unitVoltage",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "unitVoltage",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "unitVoltage",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "motorType",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "motorType",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "motorType",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "fanDiameter",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "fanDiameter",
    //         "legacyContentType": "NullContentType",
    //         "legacyAttributeId": "NullContentType",
    //         "attributeType": "INTEGER"
    //     }, {
    //         "categoryAttributeId": "fpi",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "fpi",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "fpi",
    //         "attributeType": "INTEGER"
    //     }, {
    //         "categoryAttributeId": "ratingPoint",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "ratingPoint",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "ratingPoint",
    //         "attributeType": "SIMPLE"
    //     }, {
    //         "categoryAttributeId": "capacity",
    //         "newContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //         "newAttributeId": "capacity",
    //         "legacyContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //         "legacyAttributeId": "capacity",
    //         "attributeType": "INTEGER"
    //     },]
    // },
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
            {title: "Brand", categoryAttributeId: "brand", width: "10%"},
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
            {title: "Brand", categoryAttributeId: "brand", width: "10%"},
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
    // {
    //     category: "refrigerated_warehouse_unit_coolers",
    //     attributes: [
    //         {title: "Brand", categoryAttributeId: "brand", width: "10%"},
    //         {title: "New / Legacy", categoryAttributeId: "revision", width: "10%"},
    //         {title: "Model #", categoryAttributeId: "modelNumber", width: "20%"},
    //         {title: "List Price", categoryAttributeId: "price", width: "11%"},
    //         {title: "Defrost Type", categoryAttributeId: "defrostType", width: "13%"},
    //         {title: "Voltage", categoryAttributeId: "unitVoltage", width: "12%"},
    //         {title: "Motor Type", categoryAttributeId: "motorType", width: "15%"},
    //         {title: "Fan Diameter", categoryAttributeId: "fanDiameter", width: "7%"},
    //         {title: "FPI", categoryAttributeId: "fpi", width: "5%"},
    //         {title: "Rating Point °F", categoryAttributeId: "ratingPoint", width: "15%"},
    //         {title: "Capacity", categoryAttributeId: "capacity", width: "10%"},
    //     ]
    // },
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
    // {
    //     category: "refrigerated_warehouse_unit_coolers",
    //     attributes: [
    //         {title: "List Price", categoryAttributeId: "price"},
    //         {title: "Defrost Type", categoryAttributeId: "defrostType"},
    //         {title: "Voltage", categoryAttributeId: "unitVoltage"},
    //         {title: "Motor Type", categoryAttributeId: "motorType"},
    //         {title: "Fan Diameter", categoryAttributeId: "fanDiameter"},
    //         {title: "FPI", categoryAttributeId: "fpi"},
    //         {title: "Rating Point °F", categoryAttributeId: "ratingPoint"},
    //         {title: "Capacity", categoryAttributeId: "capacity"},
    //     ]
    // },
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

export const initialProductDetail: ProductMetaV1Detail[] = [
    // {
    //     "categoryRevision": {
    //         "category": "refrigerated_warehouse_unit_coolers",
    //         "revision": "new"
    //     },
    //     "mainContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //     "crossReferenceContentType": null,
    //     "dictionaryContentType": null
    // },
    // {
    //     "categoryRevision": {
    //         "category": "refrigerated_warehouse_unit_coolers",
    //         "revision": "legacy"
    //     },
    //     "mainContentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //     "crossReferenceContentType": "ProductX4RefrigeratedWarehouseUnitCoolersNewCrossReference",
    //     "dictionaryContentType": null
    // },
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "new"
        },
        "mainContentType": "ProductX4WalkInUnitCoolersNew",
        "crossReferenceContentType": null,
        "dictionaryContentType": "ProductX4WalkInUnitCoolersNewDictionaryRefs"
    },
    {
        "categoryRevision": {
            "category": "walk_in_unit_coolers",
            "revision": "legacy"
        },
        "mainContentType": "ProductX4WalkInUnitCoolersLegacy",
        "crossReferenceContentType": "ProductX4WalkInUnitCoolersNewCrossReference",
        "dictionaryContentType": "ProductX4WalkInUnitCoolersLegacyDictionaryRefs"
    },
    {
        "categoryRevision": {
            "category": "pro3_packaged",
            "revision": "new"
        },
        "mainContentType": "ProductX4Pro3PackagedNew",
        "crossReferenceContentType": null,
        "dictionaryContentType": "ProductX4Pro3PackagedNewDictionaryRefs"
    },
    {
        "categoryRevision": {
            "category": "pro3_packaged",
            "revision": "legacy"
        },
        "mainContentType": "ProductX4Pro3PackagedLegacy",
        "crossReferenceContentType": "ProductX4Pro3PackagedNewCrossReference",
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
    // {
    //     "categoryRevision": {
    //         "category": "refrigerated_warehouse_unit_coolers",
    //         "revision": "new"
    //     },
    //     "sections": [
    //         {
    //             "title": "General Information",
    //             "attributes": [
    //                 {
    //                     "title": "Type",
    //                     "contentType": "ProductKindContentType",
    //                     "attributeId": "group",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Category",
    //                     "contentType": "ProductKindContentType",
    //                     "attributeId": "category",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Style",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "style",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Defrost Type",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "defrostType",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Voltage",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "unitVoltage",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Motor Type",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "motorType",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "FPI",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "fpi",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Rating Point °F",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "ratingPoint",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Capacity",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "capacity",
    //                     "type": "INTEGER"
    //                 },
    //             ]
    //         },
    //         {
    //             "title": "Physical Data",
    //             "attributes": [
    //                 {
    //                     "title": "Fan Diameter",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersNew",
    //                     "attributeId": "fanDiameter",
    //                     "type": "INTEGER"
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     "categoryRevision": {
    //         "category": "refrigerated_warehouse_unit_coolers",
    //         "revision": "legacy"
    //     },
    //     "sections": [
    //         {
    //             "title": "General Information",
    //             "attributes": [
    //                 {
    //                     "title": "Type",
    //                     "contentType": "ProductKindContentType",
    //                     "attributeId": "group",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Category",
    //                     "contentType": "ProductKindContentType",
    //                     "attributeId": "category",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Style",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "style",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Defrost Type",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "defrostType",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Voltage",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "unitVoltage",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Motor Type",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "motorType",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "FPI",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "fpi",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Rating Point °F",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "ratingPoint",
    //                     "type": "SIMPLE"
    //                 },
    //                 {
    //                     "title": "Capacity",
    //                     "contentType": "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
    //                     "attributeId": "capacity",
    //                     "type": "INTEGER"
    //                 },
    //             ]
    //         }
    //     ]
    // },
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
                        "contentType": "ProductKindContentType",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductKindContentType",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductX4WalkInUnitCoolersNew",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application",
                        "contentType": "ProductX4WalkInUnitCoolersNew",
                        "attributeId": "applicationType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductX4WalkInUnitCoolersNew",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "FPI",
                        "contentType": "ProductX4WalkInUnitCoolersNew",
                        "attributeId": "fpi",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Dual Rated",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
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
                        "contentType": "ProductX4WalkInUnitCoolersNew",
                        "attributeId": "ratingPoint",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Selection Capacity (R-448A/R-449A)",
                        "contentType": "ProductX4WalkInUnitCoolersNew",
                        "attributeId": "capacity",
                        "type": "INTEGER"
                    },
                    {
                        "title": "CFM",
                        "contentType": "ProductX4WalkInUnitCoolersNew",
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
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "No of Fans",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "noOfFans",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor HP",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorHp",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Unit MCA",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "unitMca",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Unit MOPD",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "unitMopd",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Watts",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Amps",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "motorAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "defrostHeaterVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Amps",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "defrostHeaterAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Watts",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "defrostHeaterWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "drainPanVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Amps",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
                        "attributeId": "drainPanAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Watts",
                        "contentType": "ProductX4WalkInUnitCoolersNewElectrical",
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
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "heightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Depth (in.)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "depthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Length (In.)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "lengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Est. Net Weight (lbs.)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
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
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "coilInletOd",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Suction OD",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "suctionOd",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "External Equalizer OD",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "externalEqualizedOd",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Drain MPT",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "drainMpt",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Side Port OD",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "sidePortOd",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Hot Gas Pan Conns.OD",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "hotGasPanConnsOd",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Fan Diameter (in)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "fanDiameterIn",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Fan Diameter (mm)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "fanDiameterMm",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Air Throw - Standard (ft)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "aitThrowStandardFt",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Air Throw - Standard (m)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "aitThrowStandardM",
                        "type": "DECIMAL"
                    },
                    {
                        "title": "Air Throw - With Collar (ft)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "aitThrowWithCollarFt",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Air Throw - With Collar (m)",
                        "contentType": "ProductX4WalkInUnitCoolersNewDetails",
                        "attributeId": "aitThrowWithCollarM",
                        "type": "DECIMAL"
                    },
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
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "modelNumber",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Config Model",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "configModel",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "List Price ($US)",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "price",
                        "type": "MONEY"
                    },
                    {
                        "title": "intelliGen™ Config Model",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "intelliGenConfigModel",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "intelliGen™ Config. List Price ($US)",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
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
                        "contentType": "ProductKindContentType",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductKindContentType",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "FPI",
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
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
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "ratingPoint",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Capacity R-404A (BTUH)",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "capacity",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "CFM",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
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
                        "contentType": "ProductX4WalkInUnitCoolersLegacy",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "No. of Fans",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "noOfFans",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor HP",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorHP",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Watts",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Motor Amps",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "motorAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "defrostHeaterVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Amps",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "defrostHeaterAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Heater Watts",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "defrostHeaterWatts",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Voltage",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "drainPanVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Amps",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
                        "attributeId": "drainPanAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain Pan Watts",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyElectrical",
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
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "heightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Depth (in.)",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "depthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Length (In.)",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "lengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Approx. Net Weight (lbs.)",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
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
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "coilInletOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Coil Inlet ODF",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "coilInletODF",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Suction ID",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "suctionID",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Suction OD",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "suctionOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "External Equalizer OD",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "externalEqualizerOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain MPT",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "drainMPT",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Drain FPT",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "drainFPT",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Side Port OD",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
                        "attributeId": "sidePortOD",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Hot Gas Pan Conns.OD",
                        "contentType": "ProductX4WalkInUnitCoolersLegacyDetails",
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
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "unitAmps",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Plug Supplied",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "plugSupplied",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Packaging",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "packaging",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Gross Weight (lbs)",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "grossWeightLbs",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "AWEF Notes",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
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
                        "contentType": "ProductKindContentType",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductKindContentType",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "applicationType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application Location",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "applicationLocation",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Operating Range",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "operatingRange",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Evap Fan Motor Type",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Refrigerant Type",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "refrigerant",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Matching NEMA Receptacle",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "matchingNemaReceptable",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Cabinet Size",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
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
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "cfm",
                        "type": "DECIMAL_ROUNDED"
                    },
                    {
                        "title": "Ambient Temperature °F",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "ambientTempF",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Box Temperature °F",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "roomTempF",
                        "type": "INTEGER"
                    },
                    {
                        "title": "Capacity (BTUH) °F",
                        "contentType": "ProductX4Pro3PackagedNew",
                        "attributeId": "capacity",
                        "type": "INTEGER"
                    },
                    {
                        "title": "AWEF",
                        "contentType": "ProductX4Pro3PackagedNew",
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
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "unitMca",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "MOPD",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
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
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "shippingLengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Shipping Width (.in)",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "shippingWidthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Shipping Height (.in)",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
                        "attributeId": "shippingHeightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Est. Net Weight (lbs.)",
                        "contentType": "ProductX4Pro3PackagedNewDetails",
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
                        "contentType": "ProductKindContentType",
                        "attributeId": "group",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Category",
                        "contentType": "ProductKindContentType",
                        "attributeId": "category",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Style",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "style",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "applicationType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Application Location",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "applicationLocation",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Operating Range",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "operatingRange",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Voltage",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "unitVoltage",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Defrost Type",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "defrostType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Evap Fan Motor Type",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "motorType",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Refrigerant Type",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "refrigerant",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Plug Supplied",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "plugSupplied",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Matching NEMA Receptacle",
                        "contentType": "ProductX4Pro3PackagedLegacy",
                        "attributeId": "matchingNemaReceptacle",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Cabinet Size",
                        "contentType": "ProductX4Pro3PackagedLegacy",
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
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "evapFansCfm",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Ambient Temperature °F",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "ambientTemperatureF",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Box Temperature °F",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "boxTemperatureF",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Capacity R-404A (BTUH) °F",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
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
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "mca",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "MOPD",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
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
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "heightIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Depth (in.)",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "depthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Length (In.)",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "lengthIn",
                        "type": "FRACTION"
                    },
                    {
                        "title": "Approx. Net Weight (lbs.)",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
                        "attributeId": "approxNetWeightLbs",
                        "type": "SIMPLE"
                    },
                    {
                        "title": "Refrig. Charge R-404A (lbs.)",
                        "contentType": "ProductX4Pro3PackagedLegacyDetails",
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
                "contentType": "ProductX4WalkInUnitCoolersNewCapacityDictionary"
            },
            {
                "dictionary": "PREFERRED_OPTIONS",
                "contentType": "ProductX4WalkInUnitCoolersNewPreferredOptionsDictionary"
            },
            {
                "dictionary": "ALACARTE_OPTIONS",
                "contentType": "ProductX4WalkInUnitCoolersNewAlaCarteOptionsDictionary"
            },
            {
                "dictionary": "EXPANSION_VALVES",
                "contentType": "ProductX4WalkInUnitCoolersNewExpansionValvesDictionary"
            },
            {
                "dictionary": "LIQUID_VALVES",
                "contentType": "ProductX4WalkInUnitCoolersNewLiquidValvesDictionary"
            },
            {
                "dictionary": "SHIPPED_LOOSE",
                "contentType": "ProductX4WalkInUnitCoolersNewShippedLooseDictionary"
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
                "contentType": "ProductX4WalkInUnitCoolersLegacyAlaCarteOptionsDictionary"
            },
            {
                "dictionary": "SHIPPED_LOOSE",
                "contentType": "ProductX4WalkInUnitCoolersLegacyShippedLooseDictionary"
            },
            {
                "dictionary": "EXPANSION_VALVES",
                "contentType": "ProductX4WalkInUnitCoolersLegacyExpansionValvesDictionary"
            },
            {
                "dictionary": "LIQUID_VALVES",
                "contentType": "ProductX4WalkInUnitCoolersLegacyLiquidValvesDictionary"
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
                "contentType": "ProductX4Pro3PackagedNewCapacityDictionary"
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
    // {
    //     "categoryRevision": {
    //         "category": "refrigerated_warehouse_unit_coolers",
    //         "revision": "legacy"
    //     },
    //     "attributes": [
    //         {
    //             "categoryAttributeId": "ratingPoint",
    //             "title": "Rating Point",
    //         },
    //         {
    //             "categoryAttributeId": "capacity",
    //             "title": "Capacity",
    //         },
    //     ]
    // },
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