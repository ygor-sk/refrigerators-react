import {ContentDataType, ContentKind, ContentType} from "./dotcms-writer";
import {collectDetailAttributeMappings} from "./dotcms-content-util";

// noinspection NonAsciiCharacters
export const contentTypes: ContentType[] = [
    {
        name: "ProductX4Pro3Packaged",
        contentKind: ContentKind.PRO3_PACKAGED,
        attributes: [
            {
                id: "productId",
                description: "productId",
                required: true,
                indexed: true,
                unique: true,
                dataType: ContentDataType.INTEGER
            },
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "price", dataType: ContentDataType.FLOAT},
            {id: "revision", description: "revision", required: true, dataType: ContentDataType.SELECT},

            {id: "applicationType", description: "applicationType", required: true, dataType: ContentDataType.SELECT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "operatingRange", description: "Operating Range", required: true, dataType: ContentDataType.SELECT},
            {id: "motorType", description: "motorType", required: true},
            {id: "refrigerant", description: "refrigerant", required: true},
            {id: "capacity", description: "capacity", required: true, dataType: ContentDataType.INTEGER},

            {
                id: "detailData",
                description: "detailData",
                required: true,
                listed: false,
                dataType: ContentDataType.TEXTAREA
            },
            {
                id: "capacityData",
                description: "capacityData",
                required: false,
                listed: false,
                dataType: ContentDataType.TEXTAREA
            },
        ],
        contentTransformation: products =>
            products.map(product => {
                let capacityData: { refrigerant: string, capacity: number };
                if (product.revision === "NEW") {
                    const capacityItem = product.pro3Packaged.capacity.filter(capacity =>
                        capacity.inputConditions.refrigerant === "R-448A"
                        && capacity.inputConditions.ambientTempF == 95
                        && (capacity.inputConditions.roomTempF == 35 || capacity.inputConditions.roomTempF == 0)
                    )[0];
                    capacityData = {
                        refrigerant: capacityItem.inputConditions.refrigerant,
                        capacity: capacityItem.outputProperties.capacityBTUH,
                    }
                } else {
                    capacityData = {
                        refrigerant: product["Refrigerant Type"],
                        capacity: product["Capacity (BTUH) °F"]
                    }
                }

                const detailAttributeMappings = product.revision === "LEGACY" ? detailAttributeMappingsLegacy : detailAttributeMappingsNew;
                const detailData = {};
                for (const mapping of detailAttributeMappings) {
                    detailData[mapping.dotCmsAttributeName] = product[mapping.parsedAttributeName];
                }

                return {
                    ...product,
                    price: product.revision === "LEGACY" ? product["List Price ($US)"] : product["Pricing"],
                    applicationType: product.revision === "LEGACY" ? product["Application"] : product["Application Type"],
                    motorType: product.revision === "LEGACY" ? product["Evap Fan Motor Type"] : product["Motor Type"],
                    ...capacityData,
                    detailData: JSON.stringify(detailData, null, 2),
                    capacityData: JSON.stringify(product.revision === "LEGACY" ? null : product.pro3Packaged.capacity, null, 2)
                };
            })

    },
]

const detailAttributeMappingsLegacy = collectDetailAttributeMappings(require("./dotcms-content-pro3_packaged-legacy").contentTypes, ContentKind.PRO3_PACKAGED_LEGACY);
const detailAttributeMappingsNew = collectDetailAttributeMappings(require("./dotcms-content-pro3_packaged-new").contentTypes, ContentKind.PRO3_PACKAGED_NEW);
