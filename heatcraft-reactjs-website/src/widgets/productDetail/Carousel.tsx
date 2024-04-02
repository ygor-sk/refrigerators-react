import {createAssetsImageLinks, findProductKindAsset} from "../../lib/global-util";
import React from "react";
import {AppContext} from "../../app/AppContext";
import {ProductDetail} from "heatcraft-js-shared/lib/product";

export function Carousel(props: { productDetail: ProductDetail }) {
    return <AppContext.Consumer>
        {siteInfo => {
            const imgList = createAssetsImageLinks(findProductKindAsset(siteInfo, props.productDetail.productKind).carouselImages);
            return <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
                data-wrap="true"
                data-interval="0">
                <div className="carousel-inner">
                    {imgList.map((img, idx) =>
                        <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                            <img
                                className="d-block w-100"
                                src={img.src}
                                alt={img.alt}
                            />
                        </div>
                    )}
                </div>
                <ol className="carousel-thumbnails">
                    {imgList.map((img, idx) =>
                        <li
                            key={idx}
                            data-target="#carouselExampleIndicators"
                            data-slide-to={idx}
                            className={idx === 0 ? "active" : ""}>
                            <img
                                className="d-block img-thumbnail"
                                src={img.src}
                                alt={img.alt}
                            />
                        </li>
                    )}
                </ol>
            </div>;
        }}
    </AppContext.Consumer>;
}
