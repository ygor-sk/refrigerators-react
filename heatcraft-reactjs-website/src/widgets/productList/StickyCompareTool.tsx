import * as React from "react";
import placeholder_200_90 from "../../resources/placeholder_200_90.png";
import {Category} from "heatcraft-js-shared/lib/product";
import ActionLink from "../ActionLink";
import * as querystring from "querystring";
import {DotCmsLink} from "../../app/DotCmsLink";

export default function StickyCompareTool(props: {
    category: Category,
    isOpen: boolean,
    checkedProductIds: number[],
    toggleCheckedProductId(productId: number, checked: boolean): void,
    uncheckAllProductIds(): void
}) {
    return <section className={`sticky-compare-tool ${props.isOpen ? "is-open" : ""}`}>
        <a href="#" className="sticky-compare-tool__button">
            <img src="/application/themes/heatcraft/build/images/chevron.svg"/>
        </a>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <div className="compare-wrapper">
                            {props.checkedProductIds.map(checkedProductId =>
                                <div className="compare-item" key={checkedProductId}>
                                    <img src={placeholder_200_90} alt={`productId=${checkedProductId}`}/>
                                    <ActionLink href="#" className="remove-compare"
                                                action={() => props.toggleCheckedProductId(checkedProductId, false)}>
                                        <i className="fas fa-check"></i>
                                        Deselect
                                    </ActionLink>
                                </div>)}

                        </div>
                        <div className="share-options">
                            <a href="#"><i className="fas fa-print"></i>Print</a>
                            <a href="#"><i className="fas fa-paper-plane"></i>Email</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <DotCmsLink uri={`/products/compare/${props.category}?productIds=${props.checkedProductIds.join(",")}`}
                       className="reg-button reg-button--primary">Compare All Selected Items</DotCmsLink>
                    <ActionLink href="#" className="reg-button reg-button--inverted"
                                action={props.uncheckAllProductIds}>
                        Deselect All Items
                    </ActionLink>
                </div>
            </div>
        </div>
    </section>
}