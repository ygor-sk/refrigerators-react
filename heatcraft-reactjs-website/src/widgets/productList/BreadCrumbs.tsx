import * as React from "react";
import {DotCmsLink} from "../../app/DotCmsLink";
import {
    createProductCategoryLink,
    createProductStyleLink,
    findCategoryInfo,
    findGroupInfo,
    findStyleInfo
} from "../../lib/global-util";
import {AppContext} from "../../app/AppContext";
import {Level} from "heatcraft-js-shared/lib/product";

export default function BreadCrumbs(props: { level: Level }) {
    return <AppContext.Consumer>
        {siteInfo =>
            <section className="breadcrumbs">
                <a href="#">Home</a>
                {' '}
                <a href="#">Products</a>
                {' '}
                <a href="#">{findGroupInfo(siteInfo, props.level).title}</a>
                {' '}
                <DotCmsLink uri={createProductCategoryLink(props.level)} className="link">
                    {findCategoryInfo(siteInfo, props.level).title}
                </DotCmsLink>
                {' '}
                {props.level.style === null ?
                    null :
                    <DotCmsLink uri={createProductStyleLink(props.level)} className="link">
                        {findStyleInfo(siteInfo, props.level).title}
                    </DotCmsLink>
                }
                {' '}
            </section>
        }
    </AppContext.Consumer>
}