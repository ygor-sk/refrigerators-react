import * as React from "react";
import {
    AssetImage,
    createAssetsDocumentLink,
    findCategoryAsset,
    findProductId2Asset,
    findProductKindAsset,
    findStyleAsset
} from "../../lib/global-util";
import {AppContext} from "../../app/AppContext";
import {ProductListContent} from "./ProductListWidget";
import {Brand, Level, ProductKind} from "heatcraft-js-shared/lib/product";
import {DocumentId, Documents, SiteInfo} from "heatcraft-js-shared/lib/site";

export default function FeaturedProducts(props: { level: Level, content: ProductListContent }) {
    return <AppContext.Consumer>
        {siteInfo =>
            <section className="featured-products">
                <div className="row">
                    <div className="col-lg-6">
                        <AssetImage
                            image={(props.level.style === null ?
                                    findCategoryAsset(siteInfo, props.level.category) :
                                    findStyleAsset(siteInfo, props.level.style)
                            ).featuredImage}
                            />
                    </div>
                    <div className="col-lg-6">
                        {renderDescription(props.content)}
                        <img
                            src="/application/themes/heatcraft/build/images/certification-logos.png"
                            alt="certification logos"
                        />
                        <div className="featured-links">
                            {featuredLinks(siteInfo, props.level, "price_book", "Price Book")}
                            {featuredLinks(siteInfo, props.level, "technical_bulletin", "Technical Bulletin")}
                            <a href="#"><i className="fas fa-question-circle"></i>
                                {' '}
                                Tech Services
                            </a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h3 className="page-title">{props.content.introduction}</h3>
                    </div>
                </div>
            </section>
        }
    </AppContext.Consumer>
}

function renderDescription(content: ProductListContent) {
    return <div className="">
        <h2 className="tab-content-header">{content.title}</h2>
        <p dangerouslySetInnerHTML={{__html: content.description}}/>
    </div>;
}

function featuredLinks(siteInfo: SiteInfo, level: Level, documentId: DocumentId, title: string) {
    let links = brandDocumentLinks(siteInfo, level, documentId);

    if (links.length === 0) {
        return null;
    }
    return <div className="dropdown">
        <a className="dropdown-toggle" href="#" role="button" id={documentId} data-toggle="dropdown"
           aria-haspopup="true" aria-expanded="false">
            <i className="far fa-file-alt"></i>
            {' '}
            {title}
        </a>
        <div className="dropdown-menu" aria-labelledby={documentId}>
            {links}
        </div>
    </div>;
}


function brandDocumentLinks(siteInfo: SiteInfo, level: Level, documentId: DocumentId) {
    const result = [];

    function findDocuments(brand: Brand): Documents {
        if (level.style === null) {
            return findProductId2Asset(siteInfo, level.category, brand).documents;
        } else {
            const productKind: ProductKind = {brand, group: level.group, category: level.category, style: level.style, revision: "NEW"};
            return findProductKindAsset(siteInfo, productKind).documents;
        }
    }

    for (const brandInfo of Object.values(siteInfo.brands)) {
        const documents = findDocuments(brandInfo.brandId);
        if (documents !== null) {
            const link = createAssetsDocumentLink(documents, documentId);
            if (link !== null) {
                result.push(<a key={brandInfo.brandId} className="dropdown-item" href={link.fileLink} target="_blank">{brandInfo.title}</a>);
            }
        }
    }
    return result;
}

