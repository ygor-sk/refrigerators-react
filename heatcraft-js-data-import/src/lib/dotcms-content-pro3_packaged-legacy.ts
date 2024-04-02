import {ContentDataType, ContentKind, ContentType} from "./dotcms-writer";

export const contentTypes: ContentType[] = [
    {
        name: "ProductX4Pro3PackagedLegacy",
        contentKind: ContentKind.PRO3_PACKAGED_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "unitVoltage", description: "Voltage", required: true, dataType: ContentDataType.SELECT},
            {id: "motorType", description: "Evap Fan Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "applicationType", description: "Application", required: true, dataType: ContentDataType.SELECT},
            {id: "operatingRange", description: "Operating Range", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
            {id: "applicationLocation", description: "Application Location", required: true, dataType: ContentDataType.SELECT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "refrigerant", description: "Refrigerant Type", required: true, dataType: ContentDataType.SELECT},
            {id: "plugSupplied", description: "Plug Supplied"},
            {id: "matchingNemaReceptacle", description: "Matching NEMA Receptacle"},
            {id: "cabinetSize", description: "Cabinet Size", required: true, dataType: ContentDataType.SELECT},
        ]
    },
    {
        name: "ProductX4Pro3PackagedLegacyDetails",
        contentKind: ContentKind.PRO3_PACKAGED_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "evapFansCfm", description: "Evap. Fans CFM"},
            {id: "ambientTemperatureF", description: "Ambient Temperature °F"},
            {id: "boxTemperatureF", description: "Box Temperature °F"},
            {id: "capacity", description: "Capacity (BTUH) °F", dataType: ContentDataType.INTEGER},
            {id: "mca", description: "MCA", dataType: ContentDataType.FLOAT},
            {id: "mopd", description: "MOPD", dataType: ContentDataType.INTEGER},
            {id: "heightIn", description: "Height (in.)"},
            {id: "depthIn", description: "Depth (in.)"},
            {id: "lengthIn", description: "Length (In.)"},
            {id: "approxNetWeightLbs", description: "Approx. Net Weight (lbs.)", dataType: ContentDataType.INTEGER},
            {id: "refrigChargeR404ALbs", description: "Refrig. Charge R-404A (lbs.)", dataType: ContentDataType.INTEGER},
        ]
    },
];