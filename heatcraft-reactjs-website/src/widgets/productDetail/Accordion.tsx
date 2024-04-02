import React from "react";
import renderSpecificationsCard from "./accordion/renderSpecificationsCard";
import renderSupportDocumentsCard from "./accordion/renderSupportDocumentsCard";
import renderShippedLooseAccessoriesCard from "./accordion/renderShippedLooseAccessoriesCard";
import renderCrossReferenceCard from "./accordion/renderCrossReferenceCard";
import {renderAlaCarteOptionsCard, renderPreferredOptionsCard} from "./accordion/renderOptionsCard";
import {ProductDetail} from "heatcraft-js-shared/lib/product";


export type AccordionSection = "specifications" | "supportDocuments" | "crossReference"
    | "preferredOptions" | "alaCarteOptions" | "shippedLooseAccessories"

export type JumpLinkTarget = {
    section: AccordionSection,
    sectionId: string,
    ref: React.RefObject<HTMLDivElement>,
    action: () => void
};

export type JumpLinkTargets = { [key in AccordionSection]: JumpLinkTarget };

export default function Accordion(props: { productDetail: ProductDetail, jumpLinkTargets: JumpLinkTargets }) {
    return <section id="product-detail-accordion" className="product-detail-accordion">
        <div className="container">
            <div id="accordion">
                {renderCards(props.productDetail, props.jumpLinkTargets)}
            </div>
        </div>
    </section>
}

function getRenderedCards(productDetail: ProductDetail): RenderedCard[] {
    return [
        renderSpecificationsCard(productDetail),
        renderSupportDocumentsCard(productDetail),
        renderPreferredOptionsCard(productDetail.factoryOptions.preferredOptions),
        renderAlaCarteOptionsCard(productDetail.factoryOptions.alaCarteOptions),
        renderShippedLooseAccessoriesCard(productDetail),
        renderCrossReferenceCard(productDetail),
    ];
}

function renderCards(productDetail: ProductDetail, jumpLinkTargets: JumpLinkTargets) {
    return getRenderedCards(productDetail).map(renderedCard => {
        if (renderedCard === null) {
            return null;
        }
        return <div className="card" key={renderedCard.section}>
            <div className="card-header" id={`label-${renderedCard.section}`}>
                <h5 className="mb-0">
                    <button className="btn btn-link"
                            data-toggle="collapse"
                            data-target={`#${renderedCard.section}`}
                            aria-expanded="false"
                            aria-controls={renderedCard.section}>
                        {renderedCard.title}
                    </button>
                </h5>
            </div>

            <div id={renderedCard.section}
                 className="collapse"
                 aria-labelledby={`label-${renderedCard.section}`}
                 ref={jumpLinkTargets[renderedCard.section].ref}>
                <div className="card-body">
                    {renderedCard.children}
                </div>
            </div>
        </div>
    })
}

export interface RenderedCard {
    section: AccordionSection,
    title: string,
    children: React.ReactNode
}
