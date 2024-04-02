import {ContentDataType, ContentKind, ContentType, dictionaryTransformation} from "./dotcms-writer";
import {
    FactoryOption,
    ReverseCycleKit,
    SourceProduct,
    WalkIn3NewCapacityItem,
    WalkInNewExpansionValve,
    WalkInNewLiquidValve
} from "heatcraft-js-shared/lib/source-product";
import {createCrossReferenceContentType, createShippedLooseDictionaryContentType} from "./dotcms-content-util";

// noinspection NonAsciiCharacters
export const contentTypes: ContentType[] = [
    {
        name: "ProductX4WalkInUnitCoolersNew",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
            {id: "cfm", description: "CFM", dataType: ContentDataType.FLOAT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "fpi", description: "FPI", dataType: ContentDataType.INTEGER},
            {id: "applicationType", description: "Application", required: true, dataType: ContentDataType.SELECT},
            {id: "refrigerant", description: "refrigerant", required: true},
            {id: "doeCompliance", description: "doeCompliance", dataType:  ContentDataType.BOOLEAN},
            {id: "awef", description: "awef", dataType:  ContentDataType.FLOAT, required: false},
            {id: "capacity", description: "capacity", dataType:  ContentDataType.INTEGER, required: true},
            {id: "ratingPoint", description: "ratingPoint", required: true},
        ],
        contentTransformation: products =>
            products.map(product => {
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

                return {
                    ...product,
                    refrigerant: capacityItem.inputConditions.refrigerant,
                    doeCompliance: capacityItem.outputProperties.doeCompliance,
                    capacity: capacityItem.outputProperties.capacityBTUH,
                    awef: capacityItem.outputProperties.awef,
                    ratingPoint: `${capacityItem.inputConditions.temperatureDifferenceF}°F TD ${capacityItem.inputConditions.saturatedSuctionTemperatureF}°F SST`
                };
            })
            // .filter(capacity => capacity !== null)
    },
    {
        name: "ProductX4WalkInUnitCoolersNewDetails",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            // physical
            {id: "heightIn", description: "Height (in.)", dataType: ContentDataType.FLOAT},
            {id: "depthIn", description: "Depth (in.)", dataType: ContentDataType.FLOAT},
            {id: "lengthIn", description: "Length (In.)", dataType: ContentDataType.FLOAT},
            {id: "estNetWeightLbs", description: "Est. Net Weight (lbs.)", dataType: ContentDataType.FLOAT},
            {id: "coilInletOd", description: "Coil Inlet OD", dataType: ContentDataType.FLOAT},
            {id: "suctionOd", description: "Suction OD", dataType: ContentDataType.FLOAT},
            {id: "externalEqualizedOd", description: "External Equalizer OD", dataType: ContentDataType.FLOAT},
            {id: "drainMpt", description: "Drain MPT", dataType: ContentDataType.FLOAT},
            {id: "sidePortOd", description: "Side Port OD", dataType: ContentDataType.FLOAT},
            {id: "hotGasPanConnsOd", description: "Hot Gas Pan Conns.OD", dataType: ContentDataType.FLOAT},
            {id: "fanDiameterIn", description: "Fan Diameter (in)", dataType: ContentDataType.INTEGER},
            {id: "fanDiameterMm", description: "Fan Diameter (mm)", dataType: ContentDataType.INTEGER},
            {id: "aitThrowStandardFt", description: "Air Throw - Standard (ft)", dataType: ContentDataType.INTEGER},
            {id: "aitThrowStandardM", description: "Air Throw - Standard (m)", dataType: ContentDataType.FLOAT},
            {id: "aitThrowWithCollarFt", description: "Air Throw - With Collar (ft)", dataType: ContentDataType.INTEGER},
            {id: "aitThrowWithCollarM", description: "Air Throw - With Collar (m)", dataType: ContentDataType.FLOAT},
        ]
    },
    {
        name: "ProductX4WalkInUnitCoolersNewElectrical",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "dualRated", description: "Dual Rated"},
            {id: "motorType", description: "Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "motorHp", description: "Motor HP"},
            {id: "unitVoltage", description: "Unit Voltage", required: true, dataType: ContentDataType.SELECT},
            {id: "motorVoltage", description: "Motor Voltage"},
            {id: "motorAmps", description: "Motor Amps", dataType: ContentDataType.FLOAT},
            {id: "motorWatts", description: "Motor Watts", dataType: ContentDataType.INTEGER},
            {id: "defrostHeaterVoltage", description: "Defrost Heater Voltage"},
            {id: "defrostHeaterAmps", description: "Defrost Heater Amps", dataType: ContentDataType.FLOAT},
            {id: "defrostHeaterWatts", description: "Defrost Heater Watts", dataType: ContentDataType.INTEGER},
            {id: "drainPanVoltage", description: "Drain Pan Voltage"},
            {id: "drainPanAmps", description: "Drain Pan Amps", dataType: ContentDataType.FLOAT},
            {id: "drainPanWatts", description: "Drain Pan Watts", dataType: ContentDataType.INTEGER},
            {id: "unitMca", description: "Unit MCA", dataType: ContentDataType.FLOAT},
            {id: "unitMopd", description: "Unit MOPD", dataType: ContentDataType.INTEGER},
            {id: "noOfFans", description: "NO OF FANS", dataType: ContentDataType.INTEGER},
        ]
    },
    {
        name: "ProductX4WalkInUnitCoolersNewDictionaryRefs",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "capacityRefId", description: "capacityRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "preferredOptionsRefId", description: "preferredOptionsRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "alaCarteOptionsRefId", description: "alaCarteOptionsRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "expansionValvesRefId", description: "expansionValvesRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "liquidValvesRefId", description: "liquidValvesRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "shippedLooseRefId", description: "shippedLooseRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "reverseCycleKitsRefId", description: "reverseCycleKitsRefId", required: true, dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: (products: SourceProduct[]) => {
            const results = [];
            for (const product of products) {
                results.push({
                    productId: product.productId,
                    modelNumber: product.modelNumber,
                    capacityRefId: product.walkInUnitCoolers.dictionaryRefIds.capacity,
                    preferredOptionsRefId: product.walkInUnitCoolers.dictionaryRefIds.preferredOptions,
                    alaCarteOptionsRefId: product.walkInUnitCoolers.dictionaryRefIds.alaCarteOptions,
                    expansionValvesRefId: product.walkInUnitCoolers.dictionaryRefIds.expansionValves,
                    liquidValvesRefId: product.walkInUnitCoolers.dictionaryRefIds.liquidValves,
                    shippedLooseRefId: product.walkInUnitCoolers.dictionaryRefIds.shippedLoose,
                    reverseCycleKitsRefId: product.walkInUnitCoolers.dictionaryRefIds.reverseCycleKits,
                })
            }
            return results;
        }
    },
    {
        name: "ProductX4WalkInUnitCoolersNewCapacityDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "applicationType", description: "Application", required: true, dataType: ContentDataType.SELECT},
            {id: "refrigerant", description: "Refrigerant", required: true, dataType: ContentDataType.SELECT},
            {id: "temperatureDifferenceF", description: "Temperature difference (°F)", required: true, dataType: ContentDataType.INTEGER},
            {id: "saturatedSuctionTemperatureF", description: "Saturated Suction Temperature (°F)", required: true, dataType: ContentDataType.INTEGER},
            {id: "capacity", description: "Capacity", dataType: ContentDataType.INTEGER},
            {id: "awef", description: "AWEF", dataType: ContentDataType.FLOAT},
            {id: "doeCompliance", description: "DOE Compliance", dataType: ContentDataType.BOOLEAN},
        ],
        contentTransformation: dictionaryTransformation<WalkIn3NewCapacityItem>("capacity", capacity => ({
            "Application": capacity.applicationType,
            "Refrigerant": capacity.inputConditions.refrigerant,
            "Temperature difference (°F)": capacity.inputConditions.temperatureDifferenceF,
            "Saturated Suction Temperature (°F)": capacity.inputConditions.saturatedSuctionTemperatureF,
            "Capacity": capacity.outputProperties.capacityBTUH,
            "AWEF": capacity.outputProperties.awef,
            "DOE Compliance": capacity.outputProperties.doeCompliance,
        })),
    },
    {
        name: "ProductX4WalkInUnitCoolersNewPreferredOptionsDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "optionType", description: "Option Type" /*, required: true, dataType: ContentDataType.SELECT */},
            {id: "optionCode", description: "Option Code"},
            {id: "optionDesc", description: "Option Description", required: true},
            {id: "notes", description: "Notes"},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.INTEGER, required: true},
        ],
        contentTransformation: dictionaryTransformation<FactoryOption>("preferredOptions", factoryOption => ({
            "Option Type": factoryOption.section,
            "Option Code": factoryOption.code,
            "Option Description": factoryOption.title,
            "Notes": null,
            "List Price ($US)": factoryOption.price,
        })),
    },
    {
        name: "ProductX4WalkInUnitCoolersNewAlaCarteOptionsDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "optionType", description: "Option Type", required: true, dataType: ContentDataType.SELECT},
            {id: "optionCode", description: "Option Code"},
            {id: "optionDesc", description: "Option Description", required: true},
            {id: "notes", description: "Notes"},
            {id: "price", description: "List Price Adder ($US)", dataType: ContentDataType.INTEGER, required: true},
        ],
        contentTransformation: dictionaryTransformation<FactoryOption>("alaCarteOptions", factoryOption => ({
            "Option Type": factoryOption.section,
            "Option Code": factoryOption.code,
            "Option Description": factoryOption.title,
            "Notes": null,
            "List Price Adder ($US)": factoryOption.price,
        })),
    },
    {
        name: "ProductX4WalkInUnitCoolersNewExpansionValvesDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "partNumber", description: "Part Number"},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.INTEGER, required: true},
        ],
        contentTransformation: dictionaryTransformation<WalkInNewExpansionValve>("expansionValves", valve => ({
            "Part Number": valve.partNumber,
            "Notes": null,
            "List Price ($US)": valve.price,
        })),
    },
    {
        name: "ProductX4WalkInUnitCoolersNewLiquidValvesDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "partNumber", description: "Part Number"},
            {id: "size", description: "Size"},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: dictionaryTransformation<WalkInNewLiquidValve>("liquidValves", valve => ({
            "Part Number": valve.partNumber,
            "Size": valve.size,
            "List Price ($US)": valve.price,
        })),
    },
    createShippedLooseDictionaryContentType("ProductX4WalkInUnitCoolersNewShippedLooseDictionary", ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY),
    {
        name: "ProductX4WalkInUnitCoolersNewReverseCycleKitsDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_NEW_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "txvType", description: "TXV Type"},
            {id: "partNumber", description: "Part Number", required: true},
            {id: "price", description: "List Price ($US)", required: true, dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: dictionaryTransformation<ReverseCycleKit>("reverseCycleKits", valve => ({
            "TXV Type": valve.txvType,
            "Part Number": valve.partNumber,
            "List Price ($US)": valve.price,
        })),
    },
    createCrossReferenceContentType("ProductX4WalkInUnitCoolersNewCrossReference", ContentKind.WALK_IN_UNIT_COOLERS_NEW),
];