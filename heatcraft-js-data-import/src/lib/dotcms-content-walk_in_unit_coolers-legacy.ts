import {ContentDataType, ContentKind, ContentType, dictionaryTransformation} from "./dotcms-writer";
import {createShippedLooseDictionaryContentType} from "./dotcms-content-generic";
import {
    FactoryOptionLegacy,
    SourceProduct,
    WalkInLegacyExpansionValve,
    WalkInLegacyLiquidValve
} from "heatcraft-js-shared/lib/source-product";

export const contentTypes: ContentType[] = [
    {
        name: "ProductV7WalkInUnitCoolersLegacy",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "group", description: "group", required: true, dataType: ContentDataType.SELECT},
            {id: "category", description: "category", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "standardModel", description: "standardModel"},
            {id: "configModel", description: "configModel"},
            {id: "unitVoltage", description: "Voltage", required: true, dataType: ContentDataType.SELECT},
            {id: "motorType", description: "Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
            {id: "intelliGenConfigModel", description: "intelliGenConfigModel"},
            {id: "intelliGenConfigListPrice", description: "intelliGenConfigListPrice", dataType: ContentDataType.FLOAT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "fpi", description: "FPI"},
        ],
        contentTransformation: products =>
            products.map(product => (
                {
                    ...product,
                    standardModel: product["modelNumber"],
                    modelNumber: product["modelNumber"] === "-" ? product["configModel"] : product["modelNumber"]
                }
            ))
    },
    {
        name: "ProductV7WalkInUnitCoolersLegacyDetails",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "ratingPoint", description: "Rating Point °F"},
            {id: "capacity", description: "Capacity (BTUH)", dataType: ContentDataType.INTEGER},
            {id: "cfm", description: "CFM", dataType: ContentDataType.INTEGER},
            {id: "heightIn", description: "Height (in.)"},
            {id: "depthIn", description: "Depth (in.)"},
            {id: "lengthIn", description: "Length (In.)"},
            {id: "approxNetWeightLBS", description: "Approx. Net Weight (lbs.)", dataType: ContentDataType.INTEGER},
            {id: "coilInletOD", description: "Coil Inlet OD"},
            {id: "coilInletODF", description: "Coil Inlet ODF"},
            {id: "suctionID", description: "Suction ID"},
            {id: "suctionOD", description: "Suction OD"},
            {id: "externalEqualizerOD", description: "External Equalizer OD"},
            {id: "drainMPT", description: "Drain MPT"},
            {id: "drainFPT", description: "Drain FPT"},
            {id: "sidePortOD", description: "Side Port OD"},
            {id: "hotGasPanConnsOD", description: "Hot Gas Pan Conns.OD"},
        ]
    },
    {
        name: "ProductV7WalkInUnitCoolersLegacyElectrical",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "motorHP", description: "Motor HP"},
            {id: "noOfFans", description: "No. of Fans", dataType: ContentDataType.INTEGER},
            {id: "motorVoltage", description: "Motor Voltage"},
            {id: "motorWatts", description: "Motor Watts", dataType: ContentDataType.INTEGER},
            {id: "motorAmps", description: "Motor Amps", dataType: ContentDataType.FLOAT},
            {id: "defrostHeaterVoltage", description: "Defrost Heater Voltage"},
            {id: "defrostHeaterAmps", description: "Defrost Heater Amps"},
            {id: "defrostHeaterWatts", description: "Defrost Heater Watts"},
            {id: "drainPanVoltage", description: "Drain Pan Voltage"},
            {id: "drainPanAmps", description: "Drain Pan Amps"},
            {id: "drainPanWatts", description: "Drain Pan Watts"},
        ]
    },
    {
        name: "ProductV7WalkInUnitCoolersLegacyDictionaryRefs",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "alaCarteOptionsRefId", description: "alaCarteOptionsRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "expansionValvesRefId", description: "expansionValvesRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "liquidValvesRefId", description: "liquidValvesRefId", required: true, dataType: ContentDataType.INTEGER},
            {id: "shippedLooseRefId", description: "shippedLooseRefId", required: true, dataType: ContentDataType.INTEGER},
        ],
        contentTransformation: (products: SourceProduct[]) => {
            const results = [];
            for (const product of products) {
                results.push({
                    productId: product.productId,
                    modelNumber: product.modelNumber,
                    alaCarteOptionsRefId: product.walkInUnitCoolersLegacy.dictionaryRefIds.alaCarteOptions,
                    expansionValvesRefId: product.walkInUnitCoolersLegacy.dictionaryRefIds.expansionValves,
                    liquidValvesRefId: product.walkInUnitCoolersLegacy.dictionaryRefIds.liquidValves,
                    shippedLooseRefId: product.walkInUnitCoolersLegacy.dictionaryRefIds.shippedLoose,
                })
            }
            return results;
        }
    },
    {
        name: "ProductV7WalkInUnitCoolersLegacyAlaCarteOptionsDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "optionType", description: "Section", required: true, dataType: ContentDataType.SELECT},
            {id: "optionCode", description: "Option Code"},
            {id: "optionDesc", description: "Description"},
            {id: "notes", description: "Notes"},
            {id: "price", description: "List Price Adder(US$)"},
        ],
        contentTransformation: dictionaryTransformation<FactoryOptionLegacy>("alaCarteOptions", alaCarteOption => ({
            "Section": alaCarteOption.section,
            "Option Code": alaCarteOption.optionCode,
            "Description": alaCarteOption.description,
            "Notes": alaCarteOption.notes,
            "List Price Adder(US$)": alaCarteOption.listPrice,
        })),
    },
    {
        name: "ProductV7WalkInUnitCoolersLegacyExpansionValvesDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "partNumber", description: "Part Number"},
            {id: "capacityRange", description: "Capacity Range"},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
        ],
        contentTransformation: dictionaryTransformation<WalkInLegacyExpansionValve>("expansionValves", valve => ({
            "Part Number": valve.partNumber,
            "Capacity Range": valve.capacityRange,
            "List Price ($US)": valve.price,
        })),
    },
    {
        name: "ProductV7WalkInUnitCoolersLegacyLiquidValvesDictionary",
        contentKind: ContentKind.WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY,
        attributes: [
            {id: "refId", description: "refId", required: true, indexed: true, unique: false, dataType: ContentDataType.INTEGER},
            {id: "section", description: "Section", required: true, dataType: ContentDataType.SELECT},
            {id: "partNumber", description: "Part Number"},
            {id: "capacityRange", description: "Capacity Range"},
            {id: "size", description: "Size"},
            {id: "price", description: "List Price ($US)", dataType: ContentDataType.FLOAT},
        ],
        contentTransformation: dictionaryTransformation<WalkInLegacyLiquidValve>("liquidValves", valve => ({
            "Section": valve.section,
            "Part Number": valve.partNumber,
            "Capacity Range": valve.capacityRange,
            "Size": valve.size,
            "List Price ($US)": valve.price,
        })),
    },
    createShippedLooseDictionaryContentType("ProductV7WalkInUnitCoolersLegacyShippedLooseDictionary", ContentKind.WALK_IN_UNIT_COOLERS_LEGACY_DICTIONARY),
];