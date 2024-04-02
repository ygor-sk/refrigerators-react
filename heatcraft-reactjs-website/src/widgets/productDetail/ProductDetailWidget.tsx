import React from "react";
import Axios, {AxiosResponse} from "axios";
import * as _ from "lodash";
import ProductSearch from "../product/ProductSearch";
import Accordion, {AccordionSection, JumpLinkTarget, JumpLinkTargets} from "./Accordion";
import RelatedProducts from "./RelatedProducts";
import BreadCrumbs from "./BreadCrumbs";
import JumpLinks from "./JumpLinks";
import SubMenu from "./SubMenu";
import Content from "./Content";
import $ from "jquery";
import "./ProductDetailWidget.css";
import {Category, ProductDetail, Revision} from "heatcraft-js-shared/lib/product";

interface ProductDetailNewProps {
    category: Category,
    revision: Revision,
    productId: number
}

interface ProductDetailNewState {
    productDetail: ProductDetail,
    subMenuVisible: boolean
}

export default class ProductDetailWidget extends React.Component<ProductDetailNewProps, ProductDetailNewState> {

    private jumpLinkTargets: JumpLinkTargets = {
        specifications: this.createJumpLinkTarget("specifications"),
        supportDocuments: this.createJumpLinkTarget("supportDocuments"),
        crossReference: this.createJumpLinkTarget("crossReference"),
        alaCarteOptions: this.createJumpLinkTarget("alaCarteOptions"),
        preferredOptions: this.createJumpLinkTarget("preferredOptions"),
        shippedLooseAccessories: this.createJumpLinkTarget("shippedLooseAccessories"),
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            productDetail: null,
            subMenuVisible: false
        }
    }

    componentDidMount() {
        this.loadProductDetail();
    };

    componentDidUpdate(prevProps: Readonly<ProductDetailNewProps>, prevState: Readonly<ProductDetailNewState>, snapshot?: any): void {
        if (!_.isEqual(prevProps, this.props)) {
            this.loadProductDetail();
        }
    }

    private loadProductDetail() {
        this.setState({
            productDetail: null,
        })

        Axios
            .get<any, AxiosResponse<ProductDetail>>(`/api/heatcraft/products/detail/${this.props.category}/${this.props.revision}/${this.props.productId}`)
            .then(response => {
                this.setState({
                    productDetail: response.data,
                })
            })
            .catch(error => {
                window.alert("Error loading product:" + error);
                console.log("Error loading product", error);
            })
;
    }

    render(): React.ReactNode {
        if (this.state.productDetail === null) {
            return null;
        }
        return <main className="products-detail-page">
            <ProductSearch/>
            <div className="container">
                <BreadCrumbs productDetail={this.state.productDetail}/>
                <section className="product-detail-container">
                    <JumpLinks jumpLinkTargets={this.jumpLinkTargets} onToggleSubMenu={this.toggleSubMenu}/>
                    <SubMenu visible={this.state.subMenuVisible}/>
                    <Content productDetail={this.state.productDetail}
                             crossReferenceJumpLinkTarget={this.jumpLinkTargets.crossReference}/>
                </section>
            </div>
            <Accordion productDetail={this.state.productDetail} jumpLinkTargets={this.jumpLinkTargets}/>
            <RelatedProducts/>
        </main>
    }

    private createJumpLinkTarget(section: AccordionSection): JumpLinkTarget {
        let ref = React.createRef<HTMLDivElement>();
        return {
            section: section,
            sectionId: "#" + section,
            ref: ref,
            action: () => {
                window.scrollTo(0, $(ref.current).offset().top - 170);
            }
        };
    }

    private toggleSubMenu = () => {
        this.setState(prevState => ({subMenuVisible: !prevState.subMenuVisible}));
    }
}
