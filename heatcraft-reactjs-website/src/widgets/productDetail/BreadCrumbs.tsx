import React from "react";
import {DotCmsLink} from "../../app/DotCmsLink";
import {
    createProductCategoryLink,
    createProductDetailLink,
    createProductStyleLink,
    findCategoryInfo,
    findGroupInfo,
    findStyleInfo
} from "../../lib/global-util";
import {AppContext} from "../../app/AppContext";
import {ProductDetail} from "heatcraft-js-shared/lib/product";

export default function BreadCrumbs(props: { productDetail: ProductDetail }) {
    return <AppContext.Consumer>
        {siteInfo =>
            <section className="breadcrumbs">
                <a href="#">Home</a>
                {' '}
                <a href="#">Products</a>
                {' '}
                <a href="#">{findGroupInfo(siteInfo, props.productDetail.productKind).title}</a>
                {' '}
                <DotCmsLink uri={createProductCategoryLink(props.productDetail.productKind)} className="link">
                    {findCategoryInfo(siteInfo, props.productDetail.productKind).title}
                </DotCmsLink>
                {' '}
                <DotCmsLink uri={createProductStyleLink(props.productDetail.productKind)} className="link">
                    {findStyleInfo(siteInfo, props.productDetail.productKind).title}
                </DotCmsLink>
                {' '}
                <DotCmsLink uri={createProductDetailLink(props.productDetail)} className="link">
                    {props.productDetail.modelNumber}
                </DotCmsLink>
            </section>
        }
    </AppContext.Consumer>
}