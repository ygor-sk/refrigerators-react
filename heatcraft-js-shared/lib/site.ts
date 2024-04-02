import {Brand, Category, Group, ProductKind, Revision, Style} from "./product";

export type LanguageId = 'en';

export interface MainMenuNode {
    id: string,
    title: string,
    url: string,
    level: number,
    additionalClass: string,
    children: MainMenuNode[],
}

export interface Assets {
    logoImage: Image,
    brandAssets: BrandAsset[],
    categoryAssets: CategoryAsset[],
    styleAssets: StyleAsset[],
    revisionAssets: RevisionAsset[],
    productId2Assets: ProductId2Asset[],
    productKindAssets: ProductKindAsset[],
}

export interface SiteInfo {
    brands: { [key in Brand]: BrandInfo },
    groups: { [key in Group]: GroupInfo }
    mainMenuNode: MainMenuNode,
    assets: Assets,
}

export interface BrandInfo {
    brandId: Brand,
    title: string,
    url: string
}

export interface GroupInfo {
    groupId: Group,
    title: string,
    url: string,
    categories: Partial<{ [key in Category]: CategoryInfo }>
}

export interface CategoryInfo {
    categoryId: Category,
    title: string,
    url: string,
    styles: Partial<{ [key in Style]: StyleInfo }>
}

export interface StyleInfo {
    styleId: Style,
    title: string,
    url: string,
}

export interface BrandAsset {
    brand: Brand,
    gridViewLogo: Image,
}

export interface CategoryAsset {
    category: Category,
    featuredImage: Image,
}

export interface StyleAsset {
    style: Style,
    featuredImage: Image,
}

export interface RevisionAsset {
    style: Style,
    revision: Revision,
    documents: Documents,
}

export interface ProductKindAsset {
    productKind: ProductKind,
    gridViewImage: Image,
    carouselImages: Images,
    documents: Documents,
}

export interface ProductId2Asset {
    productId2: ProductId2,
    gridViewImage: Image,
    carouselImages: Images,
    documents: Documents,
}

export type DocumentId =
    "price_book" |
    "technical_bulletin" |
    "cad" |
    "revit_air_defrost" |
    "revit_electric_defrost" |
    "revit_gas_defrost_electric_drain_pan" |
    "revit_gas_defrost_hot_gas_drain_pan" |
    "installation_manual" |
    "installation_manual_indoor" |
    "installation_manual_outdoor" |
    "unit_cooler_manual" |
    "refrigeration_manual" |
    "sales_brochure"
    ;

export interface Document {
    id: DocumentId;
    title: string,
    parentName: string,
    name: string,
    parentThumbnailName: string,
    thumbnailName: string,
}

export interface Documents {
    parentName: string,
    documents: Document[]
}

export interface Image {
    parentName: string,
    img: {
        src: string,
        alt: string,
    },
}

export interface Images {
    parentName: string,
    imgList: {
        src: string,
        alt: string,
    }[],
}

export interface ProductId2 {
    category: string
    brand: string
}