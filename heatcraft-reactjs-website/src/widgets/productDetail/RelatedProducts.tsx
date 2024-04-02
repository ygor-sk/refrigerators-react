import React from "react";

export default function RelatedProducts() {
    return <section className="related-products">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="page-title">Product Add-ons</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="related-product first-block">
                            <div className="content-block">

                                <img className="d-block" src="/application/themes/heatcraft/build/images/intelligen-refrigeration-controller.svg" width="86" />
                                <h3 className="related-product__title">intelliGen™ Refrigiration Controller
                  </h3>
                                <p>
                                    The intelliGen™ Refrigeration Controller is a factory-mounted electronic control that delivers reliable operation and system performance. intelliGen helps reduce food spoilage by maintaining better temperature control and provides energy savings through optimizing defrosts.</p>
                                <a href="https://intelligen.heatcraftrpd.com/en/USD/homepage" target="_blank" className="related-product__button">Learn More</a>

                            </div>

                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="related-product second-block">
                            <div className="content-block">

                                <img className="d-block" src="/application/themes/heatcraft/build/images/warranty.svg" width="96" />
                                <h3 className="related-product__title">Warranty</h3>

                                <p> Our refrigeration systems are built using durable materials and top-of-the-line components to fortify their longevity of use. Every product in our inventory is supported by the industry’s most trusted warranties, ensuring years of reliable performance and user satisfaction.</p>

                                <a href="http://www.heatcraftrpd.com/support/warranty.asp" target="_blank" className="related-product__button">Learn More</a>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="related-product third-block">
                            <div className="content-block">

                                <img className="d-block" src="/application/themes/heatcraft/build/images/interlink-parts-lookup.svg" width="120" />
                                <h3 className="related-product__title">
                    Interlink Parts Lookup
                  </h3>
                                <p>
                                    InterLink Parts provides wholesalers and distributors with a comprehensive selection of product solutions and innovative technologies for the installed base, backed by a dedicated customer service team and the resources to deliver the best lead times in the industry.
                                </p>

                                <a href="http://www.heatcraftrpd.com/products/interlink-parts/" target="_blank" className="related-product__button">Learn More</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
}