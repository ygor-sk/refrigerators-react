import {Brand, Category, Group, Revision, Style} from "./product";

export const brands: Brand[] = ["bohn", "larkin", "climate_control", "chandler"];

export interface FactoryOptionLegacy {
    section: string,
    optionCode: string,
    description: string,
    notes: string,
    listPrice: string
}

export interface SourceProduct {
    productId: number,
    modelNumber: string,
    revision: Revision,
    brand: Brand,
    group: Group,
    category: Category,
    style: Style,
    pro3Packaged?: {
        capacity?: Pro3NewCapacityItem[],
        capacityRefId: number
    },
    walkInUnitCoolers?: {
        capacity: WalkIn3NewCapacityItem[],
        options: WalkInNewOptions,
        valves: WalkInUnitCoolersValves,
        reverseCycleKits: ReverseCycleKit[],
        shippedLoose: ShippedLooseAccessory[],
        dictionaryRefIds: { [key in DictionaryId]: number }
    },
    walkInUnitCoolersLegacy?: {
        alaCarteOptions: FactoryOptionLegacy[],
        accessories: Accessories,
        dictionaryRefIds: { [key in DictionaryId]: number }
    }
    newModelNumbers?: string[],
    filePaths?: string[], // TODO: remove this
    legacyModels?: string[],
    dictionaryRef?: {
        dictionaryId: DictionaryId,
        refId: number,
        data: any[]
    },
}

export interface CapacityItem {
    applicationType: string,
    inputConditions: {
        refrigerant: string,
    },
    outputProperties: OutputProperties
}

export interface Pro3NewCapacityItem extends CapacityItem {
    inputConditions: {
        refrigerant: string,
        ambientTempF: number,
        roomTempF: number,
    }
}

export interface WalkIn3NewCapacityItem extends CapacityItem {
    inputConditions: {
        refrigerant: string,
        temperatureDifferenceF: string,
        saturatedSuctionTemperatureF: number,
    }
}

export interface ShippedLooseAccessory {
    section: string,
    partNumber: string,
    description: string,
    notes: string,
    listPrice: number
}

export interface FactoryOption {
    section: string,
    title: string, // TODO: rename to description
    code: string,
    price: number
}

interface WalkInNewOptions {
    preferred: FactoryOption[],
    alaCarte: FactoryOption[],
}

export interface WalkInNewExpansionValve {
    partNumber: string,
    price: number
}

export interface ReverseCycleKit {
    txvType: string,
    partNumber: string,
    price: number
}

export interface WalkInLegacyExpansionValve {
    partNumber: string,
    capacityRange: string,
    price: number
}

export interface WalkInNewLiquidValve {
    section: "",
    partNumber: string,
    size: string,
    price: number,
}

export interface WalkInLegacyLiquidValve {
    section: string,
    partNumber: string,
    capacityRange: string,
    size: string
    price: number
}

export interface WalkInUnitCoolersValves {
    expansionValves: WalkInNewExpansionValve[],
    liquidValves: WalkInNewLiquidValve[],
}

export interface Accessories {
    shippedLooseAccessories: ShippedLooseAccessory[],
    expansionValves: WalkInLegacyExpansionValve[],
    liquidValves: WalkInLegacyLiquidValve[],
}

export type WalkInUnitCoolersOptionKey = keyof WalkInNewOptions

export interface OutputProperties {
    capacityBTUH: number,
    awef: number,
    doeCompliance?: boolean
}

export type DictionaryId =
    "capacity"
    | "preferredOptions"
    | "alaCarteOptions"
    | "liquidValves"
    | "expansionValves"
    | "shippedLoose"
    | "reverseCycleKits";
