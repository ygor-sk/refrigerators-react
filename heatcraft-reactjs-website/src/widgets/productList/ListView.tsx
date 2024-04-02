import * as React from "react";
import {SortBy} from "./ProductListWidget";
import {Link} from "react-router-dom";
import {Category, PaginatedProducts} from "heatcraft-js-shared/lib/product";
import {
    Formatter,
    moneyFormatter,
    numberFormatter,
    numberRoundedFormatter,
    productDetailFormatter,
    revisionFormatter,
    simpleFormatter
} from "../product/ProductWidgets";


export default function ListView(props: {
    category: Category,
    paginatedProducts: PaginatedProducts,
    sortBy: SortBy,
    createSortToggleUrl: (attributeId: string) => string,
    checkedProductIds: Set<number>,
    toggleCheckedProductId(productId: number, checked: boolean): void,
}) {
    function renderSortArrow(attributeId: string, sortBy: SortBy) {
        if (sortBy === null || attributeId !== sortBy.attributeId) {
            return null;
        }
        return sortBy.direction === "ASC" ? "\u21e7" : "\u21e9";
    }

    return <section className="view__list">
        <div className="table-responsive table-hover">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col" style={{width: "7%"}}>Compare</th>
                    {listAttributes[props.category].map(attribute =>
                        <th scope="col" key={attribute.attributeId} style={{width: attribute.width}}>
                            <Link to={props.createSortToggleUrl(attribute.attributeId)}>
                                {attribute.title}&nbsp;{renderSortArrow(attribute.attributeId, props.sortBy)}
                            </Link>
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {props.paginatedProducts.products.map(product =>
                    <tr key={product['productId']}>
                        <th scope="row">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={props.checkedProductIds.has(product.productId)}
                                    onChange={(e) => {
                                        props.toggleCheckedProductId(product.productId, e.target.checked);
                                    }}
                                />
                            </div>
                        </th>
                        {listAttributes[props.category].map(attribute => {
                            const formatter = attribute.formatter || simpleFormatter;
                            return <td
                                key={attribute.attributeId}>{formatter(product, attribute.attributeId)}</td>;
                        })}
                    </tr>
                )}
                </tbody>
            </table>
        </div>

    </section>
}

interface ListAttribute {
    title: string,
    attributeId: string,
    width: string,
    formatter?: Formatter,
}

export const listAttributes: { [key in Category]: ListAttribute[] } = {
    'walk_in_unit_coolers': [
        {title: 'New / Legacy', attributeId: 'revision', width: "10%", formatter: revisionFormatter},
        {title: 'Model #', attributeId: 'modelNumber', width: "20%", formatter: productDetailFormatter},
        {title: 'List Price', attributeId: 'price', width: "11%", formatter: moneyFormatter},
        {title: 'Defrost Type', attributeId: 'defrostType', width: "13%"},
        {title: 'Voltage', attributeId: 'unitVoltage', width: "12%"},
        {title: 'Motor Type', attributeId: 'motorType', width: "15%"},
        {title: 'FPI', attributeId: 'fpi', width: "5%", formatter: numberFormatter},
        {title: 'Capacity', attributeId: 'capacity', width: "10%", formatter: numberFormatter},
        {title: 'CFM', attributeId: 'cfm', width: "5%", formatter: numberRoundedFormatter},
    ],
    "pro3_packaged": [
        {title: 'New / Legacy', attributeId: 'revision', width: "10%", formatter: revisionFormatter},
        {title: 'Model #', attributeId: 'modelNumber', width: "10%", formatter: productDetailFormatter},
        {title: 'List Price', attributeId: 'price', width: "10%", formatter: moneyFormatter},
        {title: 'Application Type', attributeId: 'applicationType', width: "15%"},
        {title: 'Defrost Type', attributeId: 'defrostType', width: "13%"},
        {title: 'Operating Range', attributeId: 'operatingRange', width: "13%"},
        {title: 'Motor Type', attributeId: 'motorType', width: "12%"},
        {title: 'Refrigerant', attributeId: 'refrigerant', width: "10%"},
        {title: 'Capacity', attributeId: 'capacity', width: "10%", formatter: numberFormatter},
    ]
}
