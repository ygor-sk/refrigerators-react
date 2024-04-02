import {Product, Revision} from "heatcraft-js-shared/lib/product";
import * as React from "react";
import {DotCmsLink} from "../../app/DotCmsLink";
import {createProductDetailLink} from "../../lib/global-util";

export type Formatter = (product: Product, attributeId: string) => React.ReactNode;

export const productDetailFormatter: Formatter = (product: Product, attributeId: string) => {
    return <span>
        <DotCmsLink key={product['productId']}
                    uri={createProductDetailLink(product)}>
        {product[attributeId]}
        </DotCmsLink>
    </span>
};

export const revisionFormatter: Formatter = (product: Product, attributeId: string) =>
    product[attributeId] === ("NEW" as Revision) ?
        <span className="badge badge-pill badge-success">NEW</span> :
        <span className="badge badge-pill badge-danger">Legacy</span>;

export const moneyFormatter: Formatter = (product: Product, attributeId: string) =>
    <>${product[attributeId]?.toLocaleString() || "\u00A0"}</>;

export const numberFormatter: Formatter = (product: Product, attributeId: string) =>
    <>{product[attributeId]?.toLocaleString() || "\u00A0"}</>;

export const booleanFormatter: Formatter = (product: Product, attributeId: string) => {
    let result = "-";
    if (product[attributeId] === "true" || product[attributeId] === true) {
        result = "yes";
    }
    if (product[attributeId] === "false" || product[attributeId] === false) {
        result = "no";
    }
    return <>{result}</>;
};

export const numberRoundedFormatter: Formatter = (product: Product, attributeId: string) =>
    <>{product[attributeId] ? Math.round(product[attributeId]).toLocaleString() : "-"}</>;

export const simpleFormatter: Formatter = (product: Product, attributeId: string) =>
    <>{product[attributeId] || "\u00A0"}</>;