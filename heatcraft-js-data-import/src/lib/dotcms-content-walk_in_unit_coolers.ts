import {ContentDataType, ContentKind, ContentType} from "./dotcms-writer";
import {collectDetailAttributeMappings, formatJson} from "./dotcms-content-util";

// noinspection NonAsciiCharacters
export const contentTypes: ContentType[] = [
    {
        name: "ProductX4WalkInUnitCoolers",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: false},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
            {id: "revision", description: "revision", required: true, dataType: ContentDataType.SELECT},

            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "unitVoltage", description: "unitVoltage", required: true, dataType: ContentDataType.SELECT},
            {id: "motorType", description: "Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "fpi", description: "FPI", required: false, dataType: ContentDataType.INTEGER},
            {id: "capacity", description: "capacity", required: true, dataType: ContentDataType.INTEGER},
            {id: "cfm", description: "CFM", required: true, dataType: ContentDataType.FLOAT},

            {id: "detailData", description: "detailData", required: true, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "capacityData", description: "capacityData", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "preferredOptions", description: "preferredOptions", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "alaCarteOptions", description: "alaCarteOptions", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "expansionValves", description: "expansionValves", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "liquidValves", description: "liquidValves", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "shippedLoose", description: "shippedLoose", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
            {id: "reverseCycleKits", description: "reverseCycleKits", required: false, listed: false, dataType: ContentDataType.TEXTAREA},
        ],
        contentTransformation: products =>
            products.map(product => {
                const detailAttributeMappings = product.revision === "LEGACY" ? detailAttributeMappingsLegacy : detailAttributeMappingsNew;

                const detailData = {};
                for (const mapping of detailAttributeMappings) {
                    detailData[mapping.dotCmsAttributeName] = product[mapping.parsedAttributeName];
                }

                if (product.revision === "NEW") {
                    let capacityItem = product.walkInUnitCoolers.capacity.filter(capacity =>
                        capacity.inputConditions.refrigerant === "R-448A"
                    )[0];

                    if (!capacityItem && product.style === "medium_profile") {
                        capacityItem = product.walkInUnitCoolers.capacity.filter(capacity =>
                            capacity.inputConditions.refrigerant === "R-404A"
                        )[0];
                    }

                    if (!capacityItem) {
                        console.log(`Suitable capacity not found: ${product.modelNumber}`);
                    }
                    detailData["refrigerant"] = capacityItem.inputConditions.refrigerant;
                    detailData["doeCompliance"] = capacityItem.outputProperties.doeCompliance;
                    detailData["capacity"] = capacityItem.outputProperties.capacityBTUH;
                    detailData["awef"] = capacityItem.outputProperties.awef;
                    detailData["ratingPoint"] = `${capacityItem.inputConditions.temperatureDifferenceF}°F TD ${capacityItem.inputConditions.saturatedSuctionTemperatureF}°F SST`;
                }

                return {
                    ...product,
                    unitVoltage: product.revision === "LEGACY" ? product["Voltage"] : product["Unit Voltage"],
                    motorType: product.revision === "LEGACY" ? product["Evap Fan Motor Type"] : product["Motor Type"],
                    capacity: product.revision === "LEGACY" ? product["Capacity (BTUH)"] : detailData["capacity"],
                    detailData: formatJson(detailData),
                    capacityData: formatJson(product.revision === "LEGACY" ? null : product.walkInUnitCoolers.capacity),
                    preferredOptions: formatJson(product.revision === "LEGACY" ? null : product.walkInUnitCoolers.options.preferred),
                    alaCarteOptions: formatJson(product.revision === "LEGACY" ? product.walkInUnitCoolersLegacy.alaCarteOptions : product.walkInUnitCoolers.options.alaCarte),
                    expansionValves: formatJson(product.revision === "LEGACY" ? product.walkInUnitCoolersLegacy.accessories.expansionValves : product.walkInUnitCoolers.valves.expansionValves),
                    liquidValves: formatJson(product.revision === "LEGACY" ? product.walkInUnitCoolersLegacy.accessories.liquidValves : product.walkInUnitCoolers.valves.liquidValves),
                    shippedLoose: formatJson(product.revision === "LEGACY" ? product.walkInUnitCoolersLegacy.accessories.shippedLooseAccessories : product.walkInUnitCoolers.shippedLoose),
                    reverseCycleKits: formatJson(product.revision === "LEGACY" ? null : product.walkInUnitCoolers.reverseCycleKits),
                };
            })

    },
]

const detailAttributeMappingsLegacy = collectDetailAttributeMappings(require("./dotcms-content-walk_in_unit_coolers-legacy").contentTypes, ContentKind.WALK_IN_UNIT_COOLERS_LEGACY);
const detailAttributeMappingsNew = collectDetailAttributeMappings(require("./dotcms-content-walk_in_unit_coolers-new").contentTypes, ContentKind.WALK_IN_UNIT_COOLERS_NEW);
