import React from "react";
import {JumpLinkTarget} from "./Accordion";
import {
    createAssetsDocumentLink,
    findProductKindAsset,
    findProductRevisionAsset,
    renderAttributeValue
} from "../../lib/global-util";
import {Carousel} from "./Carousel";
import {AppContext} from "../../app/AppContext";
import {ProductDetail} from "heatcraft-js-shared/lib/product";
import {DocumentId, Documents, SiteInfo} from "heatcraft-js-shared/lib/site";

type ContentProps = { productDetail: ProductDetail, crossReferenceJumpLinkTarget: JumpLinkTarget };

export default function Content(props: ContentProps) {
    return <div className="tab-content">
        <div
            className="tab-pane active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
        >
            <section className="featured-products">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <Carousel productDetail={props.productDetail}/>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <Detail {...props}/>
                    </div>
                </div>
            </section>
        </div>
    </div>;
}

function renderCrossReference(props: ContentProps) {
    return props.productDetail.crossReference === null ?
        null :
        <div className="float-child green">
            <a href=""
               className="cross-ref-cta-button"
               data-target={props.crossReferenceJumpLinkTarget.sectionId}
               aria-expanded="true"
               aria-controls={props.crossReferenceJumpLinkTarget.section}
               data-toggle="collapse"
               onClick={props.crossReferenceJumpLinkTarget.action}>
                Cross-Reference New Model
            </a>
        </div>;
}

function Detail(props: ContentProps) {
    return <AppContext.Consumer>
        {siteInfo => <>
            <h3 className="tab-content-header">{siteInfo.brands[props.productDetail.productKind.brand].title} Model: {props.productDetail.modelNumber}</h3>
            <h4 style={{color: "#003263", marginBottom: "35px"}}>List Price:
                US$ {props.productDetail.price.toLocaleString()}</h4>
            {renderDescription(siteInfo, props.productDetail)}
            {renderCapacity(props.productDetail)}
            <img style={{marginTop: '15px'}}
                 src="/application/themes/heatcraft/build/images/certification-logos.png"
                 alt="certification logos"
            />
            <div className="featured-links">
                {createBrandDocumentLinks(siteInfo, props.productDetail, ["price_book", "technical_bulletin"])}
                {/*{createRevisionDocumentLinks(siteInfo, props.productDetail)}*/}
                <a href="">
                    <i className="fas fa-question-circle"></i>
                    {' '}
                    Tech Services
                </a>
            </div>
            <div className="float-container">
                {renderCrossReference(props)}
                <div className="float-child blue">
                    <a href="http://www.heatcraftrpd.com/the-hub/"
                       className="hub-cta-button">
                        Configure this model in <i className="hub">THE HUB</i>
                    </a>
                </div>
            </div>
        </>
        }
    </AppContext.Consumer>;
}

function renderDescription(siteInfo: SiteInfo, productDetail: ProductDetail) {
    switch (productDetail.productKind.category) {
        case "pro3_packaged":
            return <p>
                Top Mount <span className="red">{siteInfo.brands[productDetail.productKind.brand].title}</span> packaged
                refrigeration systems combine
                evaporator and condensing unit
                into one unit expediting installation time and reducing refrigerant charge.
                These systems are designed to maximize storage space inside walk-in coolers or freezers
                and are ideal for small- to medium-sized restaurant and convenience store applications.
                Systems are fully-assembled, evacuated, charged, run-tested and wired at the factory.
                No additional components are required.
            </p>;
        case "walk_in_unit_coolers":
            return <p>
                Everyday <span className="red">{siteInfo.brands[productDetail.productKind.brand].title}</span> Low
                Profile unit coolers are installed in an
                extensive range
                of applications and industries to improve product integrity and preserve shelf life of perishable
                products. Heatcraft not only
                redesigned
                this product line to meet or exceed Department of Energy (DOE) minimum AWEF efficiency standards, but
                incorporated new outstanding
                features to improve installation, enhance serviceability and optimize performance.
            </p>;
    }
}

function renderCapacity(productDetail: ProductDetail) {
    if (productDetail.capacities === null) {
        return null;
    }
    return <>
        <h3 style={{color: "#003263", marginBottom: "35px"}}>DOE AWEF Compliant</h3>
        <div style={{marginTop: '15px'}} className="capacity-list">
            <div className="container">
                <table className="table-striped">
                    <thead>
                    <tr>
                        <th className="tl2"/>
                        {productDetail.capacities.map(capacity =>
                            <th className="tl" key={capacity.refrigerant}>
                                {capacity.refrigerant}
                            </th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th className="text-left blue">Selection Capacity</th>
                        {productDetail.capacities.map(capacity =>
                            <th key={capacity.refrigerant}>
                                {renderAttributeValue(capacity.selectionCapacity, "DECIMAL")}
                            </th>
                        )}
                    </tr>
                    <tr>
                        <td className="tl text-left blue">AWEF</td>
                        {productDetail.capacities.map(capacity =>
                            <td key={capacity.refrigerant}>
                                {capacity.awef === 0 ? "-" : renderAttributeValue(capacity.awef, "DECIMAL")}
                            </td>
                        )}
                    </tr>
                    <tr>
                        <td className="tl text-left blue">DOE Compliance</td>
                        {productDetail.capacities.map(capacity =>
                            capacity.doeCompliance ?
                                <td className="text-success" key={capacity.refrigerant}>✔</td> :
                                <td className="text-danger" key={capacity.refrigerant}>X</td>
                        )}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <hr/>
    </>;
}

function createBrandDocumentLinks(siteInfo: SiteInfo, productDetail: ProductDetail, documentIds: DocumentId[]) {
    const documents = findProductKindAsset(siteInfo, productDetail.productKind).documents;
    return <>
        {documentIds.map(documentId => createDocumentLink(documentId, documents))}
    </>;
}

function createRevisionDocumentLinks(siteInfo: SiteInfo, productDetail: ProductDetail) {
    let documents = findProductRevisionAsset(siteInfo, productDetail.productKind.style, productDetail.productKind.revision).documents;
    return <>
        {productDetail.assets.revisionDocumentIds.map(documentId => createDocumentLink(documentId, documents))}
    </>;
}

function createDocumentLink(documentId: DocumentId, documents: Documents) {
    const link = createAssetsDocumentLink(documents, documentId);
    return link === null ?
        null :
        <a href={link.fileLink} target="_blank" key={documentId}>
            <i className="far fa-file-alt"></i>
            {' '}
            {link.title}
        </a>;
}
