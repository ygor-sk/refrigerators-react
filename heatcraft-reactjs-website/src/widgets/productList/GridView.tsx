import * as React from "react";
import {DotCmsLink} from "../../app/DotCmsLink";
import {
    AssetImage,
    createProductDetailLink,
    findBrandAsset,
    findCategoryInfo,
    findGroupInfo,
    findProductKindAsset,
    findStyleInfo
} from "../../lib/global-util";
import {AppContext} from "../../app/AppContext";
import {Product, ProductKind, Revision} from "heatcraft-js-shared/lib/product";
import {SiteInfo} from "heatcraft-js-shared/lib/site";

export default function GridView(props: {
    checkedProductIds: Set<number>,
    products: Product[],
    toggleCheckedProductId(productId: number, checked: boolean): void,
}) {
    return <AppContext.Consumer>
        {siteInfo =>
            <section className="view__grid product-selection-items">
                {props.products.map(product =>
                    <DotCmsLink key={product['productId']}
                                uri={createProductDetailLink(product)}
                                className="product-selection__box">
                        <div className="card cat-list">
                            <div className="card-body">
                                <div className="right-content">
                                    <AssetImage image={findBrandAsset(siteInfo, product.productKind.brand).gridViewLogo}
                                                className="sm-logo"/>
                                    <AssetImage
                                        image={findProductKindAsset(siteInfo, product.productKind).gridViewImage}/>
                                    <p className="crumbs">
                                        {renderBreadcrumb(siteInfo, product.productKind)}
                                        {renderRevisionSpan(product.productKind.revision)}
                                    </p>
                                </div>
                                <div className="header-title">
                                    <p>Model: {product['modelNumber']}</p>
                                </div>
                                <div className="grey" onClick={(e) => e.stopPropagation()}>
                                    <ul className="metrics2" style={{columns: 2}}>
                                        <li><span>Price:</span> ${product['price']?.toLocaleString()}</li>
                                        {product["applicationType"] ?
                                            <li><span>Application Type:</span><br/> {product['applicationType']}</li> :
                                            null
                                        }
                                        <li><span>Unit Voltage:</span><br/> {product['unitVoltage']}</li>
                                        <li><span>Defrost Type:</span><br/> {product['defrostType']}</li>
                                        {product['refrigerant'] ?
                                            <li><span>Refrigerant Type:</span><br/> {product['refrigerant']}</li> :
                                            null
                                        }
                                        <li><span>Capacity (BTUH):</span><br/> {product['capacity']?.toLocaleString()}
                                        </li>
                                    </ul>
                                    <span className="select-box">
                                              <label>
                                                <input
                                                    type="checkbox"
                                                    className="compare-checkbox"
                                                    checked={props.checkedProductIds.has(product.productId)}
                                                    onChange={(e) => {
                                                        props.toggleCheckedProductId(product.productId, e.target.checked);
                                                    }}
                                                />
                                                Select to Compare
                                              </label>
                                            </span>
                                </div>
                            </div>
                        </div>
                    </DotCmsLink>
                )}
            </section>
        }

    </AppContext.Consumer>
}

function renderBreadcrumb(siteInfo: SiteInfo, productKind: ProductKind) {
    return <>
        {findGroupInfo(siteInfo, productKind).title}
        {' > '}
        {findCategoryInfo(siteInfo, productKind).title}
        {' > '}
        {findStyleInfo(siteInfo, productKind).title}</>;
}

function renderRevisionSpan(revision: Revision) {
    switch (revision) {
        case "LEGACY":
            return <span className="badge badge-pill badge-danger" style={{marginLeft: "15px"}}>LEGACY</span>;
        case "NEW":
            return <span className="badge badge-pill badge-success" style={{marginLeft: "10%"}}>NEW</span>;
        default:
            return <></>
    }
}