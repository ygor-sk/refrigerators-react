import {DocumentId} from "./site";

export type Revision = 'LEGACY' | 'NEW'; // TODO: use lowercase when Java is not used anymore
export type Brand = 'bohn' | 'larkin' | 'climate_control' | 'chandler'; // TODO: rename to BrandId
export type Group = "evaporators_unit_coolers" | "compressorized"; // TODO: rename to GroupId
export type Category = "pro3_packaged" // TODO: rename to CategoryId
    | "refrigerated_warehouse_unit_coolers"
    | "walk_in_unit_coolers";
export type Style = // TODO: rename to StyleId
    "low_profile"
    | "medium_profile"
    | "center_mount"
    | "low_velocity_center_mount"
    | "Large_Unit_Coolers"
    | "top_mount"
    | "side_mount";


export interface Level {
    group: Group,
    category: Category,
    style: Style,
}

export interface ProductKind extends Level {
    brand: Brand,
    revision: Revision,
}

export interface Product { // TODO: create a separate type for ProductList (productList + productGrid)
    productId: number,
    productKind: ProductKind,
    modelNumber: string,
}

export interface PaginatedProducts {
    totalCount: number,
    pageNumber: number,
    pageSize: number,
    pageCount: number,
    products: Product[],
}

export interface ProductDetail extends Product {
    price: number,
    specifications: Specification[],
    factoryOptions: FactoryOptions,
    capacities: Capacity[],
    crossReference: CrossReference,
    assets: Assets
}

export interface ProductCompareData {
    products: { [productId: number]: Product },
}

export interface Assets {
    revisionDocumentIds: DocumentId[],
}

export interface CrossReference {
    legacyModel: CrossReferenceModel,
    newModels: CrossReferenceModel[],
    attributes: CrossReferenceAttribute[],
}

interface CrossReferenceModel {
    productId: number,
    modelNumber: string,
    revision: Revision,
}

export interface Option {
    optionCode: string,
    optionDescription: string,
    notes: string,
    price: any,
}

export interface Part {
    partNumber: string,
    description: string,
    notes: string,
    price: number,
}

export type AttributeType = "SIMPLE" | "INTEGER" | "DECIMAL" | "MONEY" | "DECIMAL_ROUNDED" | "FRACTION" | "SELECT" | "BOOLEAN";

export interface ExpansionValve {
    partNumber: string,
    capacityRange: string,
    price: number,
}

interface LiquidValve {
    partNumber: string,
    capacityRange: string,
    size: string,
    price: number,
}

interface CrossReferenceAttribute {
    name: string,
    legacyValue: any,
    newValues: any[],
    type: AttributeType,
}

export interface Capacity {
    refrigerant: string,
    selectionCapacity: number,
    awef: number,
    doeCompliance: boolean,
}

export type Options = { [key: string]: Option[] };
export type Parts = { [key: string]: Part[] }; // TODO: rename to ShippedLooseAccessories
export type LiquidValves = { [key: string]: LiquidValve[] };

interface FactoryOptions {
    preferredOptions: Options,
    alaCarteOptions: Options,
    parts: Parts,
    expansionValves: ExpansionValve[],
    liquidValves: LiquidValves,
}

export interface Attribute {
    title: string,
    value: any,
    type: AttributeType
}

export interface Specification {
    title: string,
    attributes: Attribute[]
}

