import React from "react";
import {RenderedCard} from "../Accordion";
import {
    AssetImage,
    createProductDetailLink,
    findProductKindAsset,
    renderAttributeValue
} from "../../../lib/global-util";
import {DotCmsLink} from "../../../app/DotCmsLink";
import {AppContext} from "../../../app/AppContext";
import {ProductDetail} from "heatcraft-js-shared/lib/product";

export default function renderCrossReferenceCard(productDetail: ProductDetail): RenderedCard {
    if (productDetail.crossReference === null) {
        return null;
    }
    return {
        section: "crossReference",
        title: "View New Model Equivalent(s)",
        children: <AppContext.Consumer>
            {siteInfo =>
                <div className="comparison table-responsive">
                    <table>
                        <thead>
                        <tr>
                            <th/>
                            <th className="qbse">
                                Compare Model 1
                            </th>
                            {productDetail.crossReference.newModels.map((model, index) =>
                                <th key={model.modelNumber} className={`qbo${index + 2}`}>Compare Model {index + 2}</th>
                            )}
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                {productDetail.crossReference.legacyModel.modelNumber}
                            </th>
                            {productDetail.crossReference.newModels.map(model =>
                                <th className="compare-heading" key={model.modelNumber}>
                                    {model.modelNumber}
                                </th>
                            )}

                        </tr>
                        <tr>
                            <th/>
                            <th className="price-info">
                                <div className="badge badge-pill badge-danger">Legacy</div>
                                <div className="price-now">
                                    <AssetImage className="img-fluid" image={findProductKindAsset(siteInfo, {...productDetail.productKind, revision: "LEGACY"}).gridViewImage}/>
                                </div>
                                <div>
                                    <DotCmsLink className="btn btn-primary" uri={createProductDetailLink({
                                        productId: productDetail.crossReference.legacyModel.productId,
                                        modelNumber: productDetail.modelNumber,
                                        productKind: {...productDetail.productKind, revision: "LEGACY"}
                                    })}>
                                        View <span className="hide-mobile">Now</span>
                                    </DotCmsLink>
                                </div>
                            </th>
                            {productDetail.crossReference.newModels.map(model =>
                                <th className="price-info" key={model.modelNumber}>
                                    <div className="badge badge-pill badge-success">New Model</div>
                                    <div className="price-now">
                                        <AssetImage className="img-fluid" image={findProductKindAsset(siteInfo, {...productDetail.productKind, revision: "NEW"}).gridViewImage}/>
                                    </div>
                                    <div>
                                        <DotCmsLink className="btn btn-primary" uri={createProductDetailLink({
                                            productId: model.productId,
                                            modelNumber: model.modelNumber,
                                            productKind: {...productDetail.productKind, revision: "NEW"},
                                        })}>
                                            View <span className="hide-mobile">Now</span>
                                        </DotCmsLink>
                                    </div>
                                </th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {productDetail.crossReference.attributes.map((attribute, attrIndex) =>
                            <React.Fragment key={attribute.name}>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td colSpan={productDetail.crossReference.newModels.length + 2}>{attribute.name}</td>
                                </tr>
                                <tr className={attrIndex % 2 === 0 ? "compare-row" : ""}>
                                    <td>{attribute.name}</td>
                                    <td><span>{renderAttributeValue(attribute.legacyValue, attribute.type)}</span></td>
                                    {productDetail.crossReference.newModels.map((model, idx) =>
                                        <td key={model.modelNumber}>{renderAttributeValue(attribute.newValues[idx], attribute.type)}</td>
                                    )}
                                </tr>
                            </React.Fragment>
                        )}
                        </tbody>
                    </table>
                </div>
            }
        </AppContext.Consumer>
    }
}