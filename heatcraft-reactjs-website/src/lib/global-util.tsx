import querystring from "querystring";
import Fraction from "fraction.js";
import _ from "lodash";
import React from "react";
import {AttributeType, Brand, Category, Group, Product, ProductKind, Revision, Style} from "heatcraft-js-shared/lib/product";
import {
    BrandAsset,
    CategoryAsset, CategoryInfo,
    DocumentId,
    Documents, GroupInfo,
    Image,
    Images,
    ProductId2,
    ProductId2Asset,
    ProductKindAsset,
    RevisionAsset, SiteInfo, StyleAsset, StyleInfo
} from "heatcraft-js-shared/lib/site";

export function renderMoney(money: any): string {
    if (money === null || money === undefined) {
        return "-";
    }
    if (typeof money === "number") {
        return "$" + money.toLocaleString();
    }
    return money.toString();
}

export function renderAttributeValue(value: any, type: AttributeType): string {
    if (value === null) {
        return "-";
    }
    switch (type) {
        case "MONEY":
            if (typeof value === "number") {
                return "$" + value.toLocaleString();
            } else {
                return value.toString();
            }
        case "DECIMAL_ROUNDED": // TODO: rename to "ROUNDED"
            if (typeof value === "number") {
                return Math.round(value).toLocaleString();
            } else {
                return value.toString();
            }
        case "FRACTION":
            if (typeof value === "number") {
                return new Fraction(value).toFraction(true);
            } else {
                return value.toString();
            }
        case "SIMPLE":
        case "DECIMAL": // TODO: remove "DECIMAL
            if (typeof value === "number") {
                if (value === 0) {
                    return "-";
                } else {
                    return value.toLocaleString();
                }
            } else {
                return value.toString();
            }
        default:
            return value.toString();
    }
}

function firstOrNull<T>(items: T[]): T {
    return items.length === 0 ? null : items[0];
}

function toProductId2(category: Category, brand: Brand): ProductId2 {
    return {
        category: category,
        brand: brand,
    };
}

export function findCategoryAsset(siteInfo: SiteInfo, category: Category): CategoryAsset {
    const result = firstOrNull(
        siteInfo.assets.categoryAssets.filter(categoryAsset => categoryAsset.category === category)
    );
    if (result !== null) {
        return result;
    } else {
        console.log("No product detail assets found for category", category);
        return {
            category: category,
            featuredImage: null,
        }
    }
}

export function findStyleAsset(siteInfo: SiteInfo, style: Style): StyleAsset {
    const result = firstOrNull(
        siteInfo.assets.styleAssets.filter(styleAsset => styleAsset.style === style)
    );
    if (result !== null) {
        return result;
    } else {
        console.log("No product detail assets found for style", style);
        return {
            style: style,
            featuredImage: null,
        }
    }
}

export function findBrandAsset(siteInfo: SiteInfo, brand: Brand): BrandAsset {
    const result = firstOrNull(
        siteInfo.assets.brandAssets.filter(brandAsset => brandAsset.brand === brand)
    );
    if (result !== null) {
        return result;
    } else {
        console.log("No product assets found for brand", brand);
        return {
            brand: brand,
            gridViewLogo: null,
        }
    }
}

export function findProductId2Asset(siteInfo: SiteInfo, category: Category, brand: Brand): ProductId2Asset {
    const productId2: ProductId2 = toProductId2(category, brand);
    // const result = firstOrNull(
    //     siteInfo.assets.productId2Assets.filter(productId2Asset => _.isEqual(productId2Asset.productId2, productId2))
    // );
    // TODO: implement productId2Assets
    const result = null;
    if (result !== null) {
        return result;
    } else {
        // console.log("No product kind assets found", productId2); // TODO: enable
        return {
            productId2: productId2,
            carouselImages: null,
            gridViewImage: null,
            documents: null
        }
    }
}

export function findProductKindAsset(siteInfo: SiteInfo, productKind: ProductKind): ProductKindAsset {
    const result = firstOrNull(
        siteInfo.assets.productKindAssets.filter(productId4Asset => _.isEqual(productId4Asset.productKind, productKind))
    );
    if (result !== null) {
        return result;
    } else {
        console.log("No product kind assets found", productKind);
        return {
            productKind: productKind,
            carouselImages: null,
            gridViewImage: null,
            documents: null
        }
    }
}

export function findProductRevisionAsset(siteInfo: SiteInfo, style: Style, revision: Revision): RevisionAsset {
    const result = firstOrNull(
        siteInfo.assets.revisionAssets.filter(revisionAsset => revisionAsset.style === style && revisionAsset.revision === revision)
    );
    if (result !== null) {
        return result;
    } else {
        console.log("No revision assets found", style, revision);
        return {
            style: style,
            revision: revision,
            documents: null
        }
    }
}

export function AssetImage(props: Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "src" | "alt"> & { image: Image }): JSX.Element {
    if (props.image === null) {
        return <span>No image specified</span>;
    } else if (props.image.img === null) {
        console.log("Image not found in: " + props.image.parentName);
        return <span>Image not found in: {props.image.parentName}</span>
    } else {
        const {image, ...imageProps} = props;
        return <img {...imageProps} src={createAssetsLink(image.img.src)} alt={props.image.img.alt}/>
    }
}

export function createAssetsImageLinks(images: Images): { src: string, alt: string }[] {
    if (images === null) {
        // useful warning should have been logged by now in findProductKindAsset
        return []
    } else if (images.imgList.length === 0) {
        console.log("No images found in: " + images.parentName);
        return [];
    } else {
        return images.imgList.map(img => ({src: createAssetsLink(img.src), alt: img.alt}));
    }
}

export interface DocumentAssetLinks {
    documentId: DocumentId,
    title: string,
    fileLink: string,
    thumbnailLink: string,
}

export function createAssetsDocumentLink(documents: Documents, documentId: DocumentId): DocumentAssetLinks | null {
    const links = createAssetsDocumentLinks(documents);
    const link = links.find(link => link.documentId === documentId);
    if (link === undefined) {
        if (documents !== null) {
            console.log("Document not found in: " + documents.parentName + documentId);
        }
        return null;
    } else {
        return link;
    }
}

export function createAssetsDocumentLinks(documents: Documents): DocumentAssetLinks[] {
    if (documents === null) {
        // useful warning should have been logged by now in findProductId4Assets
        return []
    } else if (documents.documents.length === 0) {
        console.log("No documents found in: " + documents.parentName);
        return [];
    } else {
        return documents.documents.map(document => {
            const logNull = (msg: string) => {
                console.log(msg);
                return null;
            }
            return {
                documentId: document.id,
                title: document.title,
                fileLink: document.name !== null ?
                    createAssetsLink(document.name) :
                    logNull("No file uploaded for document to " + document.parentName),
                thumbnailLink: document.thumbnailName !== null ?
                    createAssetsLink(document.thumbnailName) :
                    logNull("No file uploaded for document to " + document.parentThumbnailName),
            }
        });
    }
}

function createAssetsLink(uri: string) {
    if (process.env["NODE_ENV"] === "development") {
        return "http://localhost:9256" + uri;
    } else {
        return "https://assets.heatcraftrpd.com" + uri;
    }
}

// TODO: fetch from group/category/style metadata
function translateProductGroupPath(group: Group) {
    switch (group) {
        case "compressorized":
            return "compressorized";
        case "evaporators_unit_coolers":
            return "unit-coolers";
        default:
            throw `Unsupported group: ${group}`;
    }
}

// TODO: fetch from group/category/style metadata
function translateProductCategoryPath(category: Category) {
    return category.replace(/_/g, "-");
}

// TODO: fetch from group/category/style metadata
function translateProductStylePath(style: Style) {
    return style.replace(/_/g, "-");
}

export function findGroupInfo(siteInfo: SiteInfo, level: { group: Group }): GroupInfo {
    return siteInfo.groups[level.group];
}

export function findCategoryInfo(siteInfo: SiteInfo, level: { group: Group, category: Category }): CategoryInfo {
    return findGroupInfo(siteInfo, level).categories[level.category];
}

export function findStyleInfo(siteInfo: SiteInfo, level: { group: Group, category: Category, style: Style }): StyleInfo {
    return findCategoryInfo(siteInfo, level).styles[level.style];
}

export function createProductCategoryLink(level: { group: Group, category: Category }) {
    const path = [
        translateProductGroupPath(level.group),
        translateProductCategoryPath(level.category),
    ].join("/");
    return `/products/${path}`;
}

export function createProductStyleLink(level: { group: Group, category: Category, style: Style }) {
    const path = [
        translateProductGroupPath(level.group),
        translateProductCategoryPath(level.category),
        translateProductStylePath(level.style),
    ].join("/");

    return `/products/${path}`;
}

export function createProductDetailLink(product: Product) {
    return `/products/detail?${querystring.stringify({
        category: product.productKind.category,
        revision: product.productKind.revision,
        productId: product.productId
    })}`;
}

export function split2(str: string, separator: string): { left: string, right: string } {
    let idx = str.indexOf(separator);
    if (idx === -1) {
        return null;
    }
    return {
        left: str.slice(0, idx),
        right: str.slice(idx + separator.length)
    }
}
