import {Level} from "heatcraft-js-shared/lib/product";
import {SiteInfo} from "heatcraft-js-shared/lib/site";

interface FilterSpec {
    title: string,
    attributeId: string,
    options: {
        title: string,
        value?: string
    }[],
    hidden?: boolean
    /*filterType?: 'checkbox' | 'slider'*/
}

function commonFilters(siteInfo: SiteInfo): FilterSpec[] {
    return [
        {
            title: 'Brands',
            attributeId: 'brand',
            options: Object.values(siteInfo.brands).map((brandInfo) => ({
                title: brandInfo.title,
                value: brandInfo.brandId
            }))
        },
        {
            title: 'Model Type',
            attributeId: 'revision',
            options: [
                {title: 'Legacy Model', value: 'LEGACY'},
                {title: 'New Model', value: 'NEW'},
            ],
        }
    ]
}

function productFilterSpecsPackaged(siteInfo: SiteInfo, hideStyleFilter: boolean): FilterSpec[] {
    return [
        ...commonFilters(siteInfo),
        {
            title: 'Style(s)',
            attributeId: 'style',
            options: Object.values(siteInfo.groups.compressorized.categories.pro3_packaged.styles)
                .map(styleInfo => ({title: styleInfo.title, value: styleInfo.styleId})),
            hidden: hideStyleFilter
        },
        {
            title: 'Application',
            attributeId: 'applicationType',
            options: [
                {title: 'Cooler'},
                {title: 'Freezer'},
            ],
        },
        {
            title: 'Application Location',
            attributeId: 'applicationLocation',
            options: [
                {title: 'Indoor'},
                {title: 'Outdoor'},
            ],
        },
        {
            title: 'Operating Range',
            attributeId: 'operatingRange',
            options: [
                {title: "High Temperature"},
                {title: "Low Temperature"},
                {title: "Medium Temperature"},
            ],
        },
        {
            title: 'Voltage',
            attributeId: 'unitVoltage',
            options: [
                {title: '115/1/60'},
                {title: '208-230/1/60'},
                {title: '208-230/3/60'},
            ],
        },
        {
            title: 'Evap Fan Motor Type',
            attributeId: 'motorType',
            options: [
                {title: '2-Speed EC'},
                {title: 'Fixed Speed EC'},
                {title: 'EC Motor'},
                {title: 'PSC Motor'},
            ],
        },
        {
            title: 'Defrost Type',
            attributeId: 'defrostType',
            options: [
                {title: 'Air Defrost'},
                {title: 'Electric Defrost'},
            ],
        },
        {
            title: 'Cabinet Size',
            attributeId: 'cabinetSize',
            options: [
                {title: "P1"},
                {title: "P2"},
                {title: "P3"},
                {title: "Large"},
                {title: "Medium"},
                {title: "Small"},
            ],
        },
        {
            title: 'Capacity (BTUH)',
            attributeId: 'capacity',
            options: [
                {title: "Under 5,000", value: "0_4999"},
                {title: "5,000 - 10,000", value: "5000_9999"},
                {title: "Over 10,000", value: "9999_999999"},
            ],
        },
    ]
}

function productFilterSpecsWalkInUnitCoolers(siteInfo: SiteInfo, hideStyleFilter: boolean): FilterSpec[] {
    return [
        ...commonFilters(siteInfo),
        {
            title: 'Style(s)',
            attributeId: 'style',
            options: Object.values(siteInfo.groups.evaporators_unit_coolers.categories.walk_in_unit_coolers.styles)
                .map(styleInfo => ({title: styleInfo.title, value: styleInfo.styleId})),
            hidden: hideStyleFilter
        },
        {
            title: 'Defrost Type',
            attributeId: 'defrostType',
            options: [
                {title: 'Air Defrost'},
                {title: 'Electric Defrost'},
                {title: 'Hot Gas Defrost'},
            ],
        },
        {
            title: 'Voltage',
            attributeId: 'unitVoltage',
            options: [
                {title: '115/1/60'},
                {title: '208-230/1/60'},
                {title: '208-230/3/60'},
                {title: '460/1/60'},
            ],
        },
        {
            title: 'Motor Type',
            attributeId: 'motorType',
            options: [
                {title: '1-Speed EC'},
                {title: '2-Speed EC'},
                {title: 'PSC'},
                {title: 'EC Motor'},
                {title: 'PSC Motor'},
            ],
        },
        {
            title: 'Fans Per Inch (FPI)',
            attributeId: 'fpi',
            options: [
                {title: '4'},
                {title: '6'},
            ],
        },
        {
            title: 'Rating Point',
            attributeId: 'ratingPoint',
            options: [
                {title: "10°F TD -20°F SST"},
                {title: "10°F TD 25°F SST"},
            ],
        },
        {
            title: 'Capacity',
            attributeId: 'capacity',
            options: [
                {title: 'Under 2,000', value: "0_1999"},
                {title: '2,000 - 9,999', value: "2000_9999"},
                {title: '10,000 - 30,000', value: "10000_30000"},
                {title: 'Over 30,000', value: "30000_999999"},
            ],
        },
        {
            title: 'CFM (cu ft/min)',
            attributeId: 'cfm',
            options: [
                {title: 'Under 800', value: "0_799"},
                {title: '800 - 1,899', value: "800_1899"},
                {title: '1,900 - 3,000', value: "1900_3000"},
                {title: 'Over 3,000', value: "3001_999999"},
            ],
        },
    ]
}

export function productFilterSpecs(siteInfo: SiteInfo, level: Level): FilterSpec[] {
    switch (level.category) {
        case "pro3_packaged":
            return productFilterSpecsPackaged(siteInfo, level.style !== null);
        case "walk_in_unit_coolers":
            return productFilterSpecsWalkInUnitCoolers(siteInfo, level.style !== null);
    }
}

