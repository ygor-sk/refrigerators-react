import {ContentDataType, ContentKind, ContentType} from "./dotcms-writer";

export const contentTypes: ContentType[] = [
    {
        name: "ProductX4RefrigeratedWarehouseUnitCoolersLegacy",
        contentKind: ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "List Price ($US)", required: true, dataType: ContentDataType.FLOAT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "unitVoltage", description: "Voltage", required: true, dataType: ContentDataType.SELECT},
            {id: "motorType", description: "Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "fpi", description: "FPI", required: true, dataType: ContentDataType.INTEGER},
            {id: "ratingPoint", description: "Rating Point °F", required: true, dataType: ContentDataType.SELECT},
            {id: "capacity", description: "Capacity", required: true, dataType: ContentDataType.INTEGER},
        ],
    },
];