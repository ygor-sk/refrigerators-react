import {ContentDataType, ContentKind, ContentType} from "./dotcms-writer";
import {createCrossReferenceContentType} from "./dotcms-content-util";

export const contentTypes: ContentType[] = [
    {
        name: "ProductX4RefrigeratedWarehouseUnitCoolersNew",
        contentKind: ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW,
        attributes: [
            {id: "productId", description: "productId", required: true, indexed: true, unique: true, dataType: ContentDataType.INTEGER},
            {id: "modelNumber", description: "modelNumber", required: true, indexed: true, unique: true},
            {id: "brand", description: "brand", required: true, dataType: ContentDataType.SELECT},
            {id: "style", description: "style", required: true, dataType: ContentDataType.SELECT},
            {id: "price", description: "List Price ($US)", required: true, dataType: ContentDataType.FLOAT},
            {id: "defrostType", description: "Defrost Type", required: true, dataType: ContentDataType.SELECT},
            {id: "unitVoltage", description: "Voltage", required: true, dataType: ContentDataType.SELECT},
            {id: "motorType", description: "Motor Type", required: true, dataType: ContentDataType.SELECT},
            {id: "fanDiameter", description: "Fan Diameter", required: true, dataType: ContentDataType.INTEGER},
            {id: "fpi", description: "FPI", required: true, dataType: ContentDataType.INTEGER},
            {id: "ratingPoint", description: "Rating Point °F", required: true, dataType: ContentDataType.SELECT},
            {id: "capacity", description: "Capacity", required: true, dataType: ContentDataType.INTEGER},
        ],
    },
    createCrossReferenceContentType("ProductX4RefrigeratedWarehouseUnitCoolersNewCrossReference", ContentKind.REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW)
];