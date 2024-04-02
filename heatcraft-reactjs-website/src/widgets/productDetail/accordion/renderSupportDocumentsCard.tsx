import React from "react";
import {RenderedCard} from "../Accordion";
import {AppContext} from "../../../app/AppContext";
import {createAssetsDocumentLinks, findProductKindAsset, findProductRevisionAsset} from "../../../lib/global-util";
import _ from "lodash";
import {ProductDetail} from "heatcraft-js-shared/lib/product";

export default function renderSupportDocumentsCard(productDetail: ProductDetail): RenderedCard {
    return {
        section: "supportDocuments",
        title: "Support & Documents",
        children:
            <AppContext.Consumer>
                {siteInfo =>
                    <div className="row">
                        {
                            [
                                ...createAssetsDocumentLinks(findProductKindAsset(siteInfo, productDetail.productKind).documents),
                                ...createAssetsDocumentLinks(findProductRevisionAsset(siteInfo, productDetail.productKind.style, productDetail.productKind.revision).documents)
                                    .filter(revisionAsset => productDetail.assets.revisionDocumentIds.indexOf(revisionAsset.documentId) !== -1)
                            ].map(document =>
                                <div
                                    className="col-6 col-sm-6 col-md-2 col-lg-2 col-xl-2" key={document.documentId}>
                                    <a className="text-center" href={document.fileLink} target="_blank">
                                        <img alt={document.title} src={document.thumbnailLink}
                                             className="img-thumbnail"/>
                                        <p>{document.title}</p>
                                    </a>
                                </div>)
                        }
                    </div>
                }
            </AppContext.Consumer>


    }
}

