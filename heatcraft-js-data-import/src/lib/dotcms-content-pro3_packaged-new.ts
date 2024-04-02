import {ContentDataType, ContentKind, ContentType, dictionaryTransformation} from "./dotcms-writer";
import {Pro3NewCapacityItem, SourceProduct} from "heatcraft-js-shared/lib/source-product";
import {createCrossReferenceContentType} from "./dotcms-content-util";

// noinspection NonAsciiCharacters
export const contentTypes: ContentType[] = [
    {
        name: "ProductX4Pro3PackagedNew",
        contentKind: ContentKind.PRO3_PACKAGED_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "Pricing", dataType: ContentDataType.FLOAT},
            {id: "applicationType", description: "Application Type", required: true, dataType: ContentDataType.SELECT},
            {id: "applicationLocation", description: "Application Location", required: true, dataType: ContentDataType.SELECT},
            {id: "operatingRange", description: "Operating Range", required: true, dataType: ContentDataType.SELECT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "refrigerant", description: "refrigerant", required: true},
            {id: "ambientTempF", description: "ambientTempF", required: true, dataType: ContentDataType.INTEGER},
            {id: "roomTempF", description: "roomTempF", required: true, dataType: ContentDataType.INTEGER},
            {id: "refrigerant", description: "refrigerant", required: true},
            {id: "awef", description: "awef", required: false, dataType: ContentDataType.FLOAT},
            {id: "capacity", description: "capacity", required: true, dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: products =>
            products.map(product => {
                const capacityItem = product.pro3Packaged.capacity.filter(capacity =>
                    capacity.inputConditions.refrigerant === "R-448A"
                    && capacity.inputConditions.ambientTempF == 95
                    && (capacity.inputConditions.roomTempF == 35 || capacity.inputConditions.roomTempF == 0)
                )[0];

                return {
                    ...product,
                    ambientTempF: capacityItem.inputConditions.ambientTempF,
                    roomTempF: capacityItem.inputConditions.roomTempF,
                    refrigerant: capacityItem.inputConditions.refrigerant,
                    awef: capacityItem.outputProperties.awef,
                    capacity: capacityItem.outputProperties.capacityBTUH,
                };
            })

    },
    {
        name: "ProductX4Pro3PackagedNewDetails",
        contentKind: ContentKind.PRO3_PACKAGED_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "cfm", description: "CFM", dataType: ContentDataType.INTEGER},
            {id: "motorType", description: "Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "cabinetSize", description: "Cabinet", required: true, dataType: ContentDataType.SELECT},
            {id: "unitVoltage", description: "Unit Voltage", required: true, dataType: ContentDataType.SELECT},
            {id: "unitAmps", description: "Unit Amps", dataType: ContentDataType.FLOAT},
            {id: "unitMca", description: "Unit MCA", dataType: ContentDataType.FLOAT},
            {id: "unitMopd", description: "Unit MOPD", dataType: ContentDataType.INTEGER},
            {id: "matchingNemaReceptable", description: "Matching NEMA Receptacle"},
            {id: "plugSupplied", description: "Plug Supplied"},
            {id: "estNetWeightLbs", description: "Est. Net Weight (lbs.)", dataType: ContentDataType.FLOAT},
            {id: "grossWeightLbs", description: "Gross Weight (lbs)", dataType: ContentDataType.FLOAT},
            {id: "shippingLengthIn", description: "Shipping Length (.in)", dataType: ContentDataType.FLOAT},
            {id: "shippingWidthIn", description: "Shipping Width (.in)", dataType: ContentDataType.FLOAT},
            {id: "shippingHeightIn", description: "Shipping Height (.in)", dataType: ContentDataType.FLOAT},
            {id: "packaging", description: "Packaging"},
            {id: "awefNotes", description: "AWEF Notes"},
        ]
    },
    {
        name: "ProductX4Pro3PackagedNewDictionaryRefs",
        contentKind: ContentKind.PRO3_PACKAGED_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "capacityRefId", description: "capacityRefId", required: true, dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: (products: SourceProduct[]) => {
            const results = [];
            for (const product of products) {
                results.push({
                    productId: product.productId,
                    modelNumber: product.modelNumber,
                    capacityRefId: product.pro3Packaged.capacityRefId,
                })
            }
            return results;
        }
    },
    {
        name: "ProductX4Pro3PackagedNewCapacityDictionary",
        contentKind: ContentKind.PRO3_PACKAGED_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "refrigerant", description: "Refrigerant", required: true, dataType: ContentDataType.SELECT},
            {id: "ambientTempF", description: "Ambient Temp (°F)", required: false, dataType: ContentDataType.INTEGER}, // TODO: make required, after we get the data
            {id: "roomTempF", description: "Room Temp (°F)", required: false, dataType: ContentDataType.INTEGER},  // TODO: make required, after we get the data
            {id: "capacity", description: "Capacity", dataType: ContentDataType.INTEGER},
            {id: "awef", description: "AWEF", dataType: ContentDataType.FLOAT},
        ],
        contentTransformation: dictionaryTransformation<Pro3NewCapacityItem>("capacity", capacity => ({
            "Refrigerant": capacity.inputConditions.refrigerant,
            "Ambient Temp (°F)": capacity.inputConditions.ambientTempF,
            "Room Temp (°F)": capacity.inputConditions.roomTempF,
            "Capacity": capacity.outputProperties.capacityBTUH,
            "AWEF": capacity.outputProperties.awef,
        })),
    },
    createCrossReferenceContentType("ProductX4Pro3PackagedNewCrossReference", ContentKind.PRO3_PACKAGED_NEW),
]