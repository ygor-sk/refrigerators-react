import {SourceProduct} from "../../../heatcraft-js-shared/lib/source-product";

// noinspection NonAsciiCharacters
export const DUMMY_REFRIGERATED_WAREHOUSE_UNIT_COOLERS_NEW: any[] = [
    {
        ...{
            productId: 1000,
            modelNumber: "MODEL1000NEW",
            brand: "bohn",
            group: "evaporators_unit_coolers",
            category: "refrigerated_warehouse_unit_coolers",
            style: "Large_Unit_Coolers",
            legacyModels: [
                "MODEL1000LEGACY"
            ]
        } as SourceProduct,
        "List Price ($US)": 1500,
        "Defrost Type": "Air Defrost",
        "Voltage": "208-230/1/60",
        "Motor Type": "PSC Open Drip Proof Rail Mount",
        "Fan Diameter": 24,
        "FPI": 4,
        "Rating Point °F": "10°F TD -20°F SST",
        "Capacity": 65000,
    }
];

export const DUMMY_REFRIGERATED_WAREHOUSE_UNIT_COOLERS_LEGACY: any[] = [
    {
        ...{
            productId: 2000,
            modelNumber: "MODEL1000LEGACY",
            brand: "bohn",
            group: "evaporators_unit_coolers",
            category: "refrigerated_warehouse_unit_coolers",
            style: "Large_Unit_Coolers",
        } as SourceProduct,
        "List Price ($US)": 1400,
        "Defrost Type": "Air Defrost",
        "Voltage": "460/1/60",
        "Motor Type": "3 Phase AC Totally Enclosed Rail Mount",
        "FPI": 8,
        "Rating Point °F": "10°F TD 25°F SST",
        "Capacity": 165000,
    }
]

