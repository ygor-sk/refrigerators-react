import React from "react";
import {RenderedCard} from "../Accordion";
import {renderAttributeValue} from "../../../lib/global-util";
import {AppContext} from "../../../app/AppContext";
import {Attribute, Level, ProductDetail, Specification} from "heatcraft-js-shared/lib/product";
import {SiteInfo} from "heatcraft-js-shared/lib/site";

export default function renderSpecificationsCard(productDetail: ProductDetail): RenderedCard {
    return {
        section: "specifications",
        title: "Specifications",
        children:
            <table className="table table-hover">
                {productDetail.specifications.map(specification => renderSpecification(productDetail.productKind, specification))}
            </table>
    }
}

function renderSpecification(level: Level, specification: Specification) {
    return <React.Fragment key={specification.title}>
        <thead className="table-head">
        <tr>
            <th scope="col">{specification.title}</th>
            <th scope="col"/>
            <th scope="col"/>
            <th scope="col"/>
        </tr>
        </thead>
        <tbody>
        {specification.attributes.map(attribute =>
            <tr key={attribute.title}>
                <th scope="row">{attribute.title}</th>
                <td>
                    <AppContext.Consumer>
                        {siteInfo => renderAttribute(attribute,level, siteInfo)}
                    </AppContext.Consumer>
                </td>
                <td/>
                <td/>
            </tr>)}
        </tbody>
    </React.Fragment>;
}

function renderAttribute(attribute: Attribute, level: Level, siteInfo: SiteInfo): string {
    switch (attribute.title) {
        case "Type": // TODO: fix this hack
            return siteInfo.groups[level.group].title;
        case "Category": // TODO: fix this hack
            return siteInfo.groups[level.group].categories[level.category].title;
        case "Style": // TODO: fix this hack
            return siteInfo.groups[level.group].categories[level.category].styles[level.style].title;
        default:
            return renderAttributeValue(attribute.value, attribute.type)
    }
}
