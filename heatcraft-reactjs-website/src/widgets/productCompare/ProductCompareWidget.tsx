import * as React from "react";
import {Category, ProductCompareData} from "heatcraft-js-shared/lib/product";
import Axios, {AxiosResponse} from "axios";
import * as querystring from "querystring";
import {AssetImage, findProductKindAsset} from "../../lib/global-util";
import {AppContext} from "../../app/AppContext";
import {
    booleanFormatter,
    Formatter,
    moneyFormatter,
    numberFormatter,
    numberRoundedFormatter,
    simpleFormatter
} from "../product/ProductWidgets";
import {Helmet} from "react-helmet";

interface ProductCompareWidgetProps {
    category: Category,
    productIds: number[],
    goBack: () => void
}

interface ProductCompareWidgetState {
    productCompareData: ProductCompareData
}

export default class ProductCompareWidget extends React.Component<ProductCompareWidgetProps, ProductCompareWidgetState> {

    constructor(props: Readonly<ProductCompareWidgetProps>) {
        super(props);
        this.state = {
            productCompareData: null, // loading
        };
    }

    componentDidMount() {
        const apiUrl = `/api/heatcraft/products/compare/${this.props.category}?${querystring.stringify({"productId": this.props.productIds})}`;
        Axios
            .get<any, AxiosResponse<ProductCompareData>>(apiUrl)
            .then(response => {
                this.setState({productCompareData: response.data})
            })
            .catch(e => {
                window.alert(e);
            });
    }

    render() {
        return <>
            <Helmet>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.matchHeight/0.7.2/jquery.matchHeight-min.js"/>
                <link rel="stylesheet" href="/application/themes/heatcraft/custom/reset.css"/>
                <link rel="stylesheet" href="/application/themes/heatcraft/custom/style.css"/>
                <script src="/application/themes/heatcraft/custom/js/modernizr.js"/>
                <script src="/application/themes/heatcraft/custom/js/jquery-2.1.4.js" defer={true}/>
                <script src="/application/themes/heatcraft/custom/js/main.js" defer={true}/>
                <body id="compare-table"/>
            </Helmet>
            {this.renderContent()}
        </>
    }

    renderContent() {
        if (this.state.productCompareData === null) {
            return null;
        }
        return <section className="cd-products-comparison-table">
            <div className="cd-products-table">
                <div className="features">
                    <div className="top-info">
                        <button onClick={(e) => this.props.goBack()}
                                className=""
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textTransform: "uppercase",
                                    lineHeight: "16px",
                                    fontWeight: "bold",
                                    paddingLeft: 0,
                                    cursor: "pointer"
                                }}>
                            Back To List
                        </button>
                        <div className="header-options">
                            <a href="#0" className="reset" style={{display: "block", padding: "15px 0"}}>Reset</a>
                            <a href="#0" className="filter" style={{display: "block", margin: 0}} data-toggle="tooltip"
                               title="Some tooltip text!">Filter</a>
                        </div>
                    </div>
                    <ul className="cd-features-list">
                        {compareAttributes[this.props.category].map(attribute => <li
                            key={attribute.attributeId}>{attribute.title}</li>)}
                    </ul>
                </div>

                <div className="cd-products-wrapper">
                    <ul className="cd-products-columns">
                        {this.props.productIds.map(productId => {
                                const product = this.state.productCompareData.products[productId];
                                if (product === undefined) {
                                    return null;
                                }
                                return <li className="product" key={productId}>
                                    <div className="top-info">
                                        <div className="check"></div>
                                        <AppContext.Consumer>
                                            {siteInfo => <AssetImage
                                                image={findProductKindAsset(siteInfo, product.productKind).gridViewImage}/>}
                                        </AppContext.Consumer>
                                        <h3><a className="model-link" href="#">{product.modelNumber}</a></h3>
                                    </div>

                                    <ul className="cd-features-list">
                                        {compareAttributes[this.props.category].map(attribute => {
                                                const formatter = attribute.formatter || simpleFormatter;
                                                return <li
                                                    key={attribute.attributeId}>{formatter(product, attribute.attributeId)}</li>;
                                            }
                                        )}
                                    </ul>
                                </li>
                            }
                        )}
                    </ul>
                </div>

                <ul className="cd-table-navigation">
                    <li><a href="#0" className="prev inactive">Prev</a></li>
                    <li><a href="#0" className="next">Next</a></li>
                </ul>
            </div>
        </section>
    }
}

interface CompareAttribute {
    title: string,
    attributeId: string,
    formatter?: Formatter,
}

const compareAttributes: { [key in Category]: CompareAttribute[] } = {
    'walk_in_unit_coolers': [
        {title: 'List Price', attributeId: 'price', formatter: moneyFormatter},
        {title: 'Compliance', attributeId: 'compliance', formatter: booleanFormatter,},
        {title: 'FPI', attributeId: 'fpi', formatter: numberFormatter},
        {title: 'CFM', attributeId: 'cfm', formatter: numberRoundedFormatter},
        {title: 'AWEF Rating', attributeId: 'awef',},
        {title: 'Rating Point', attributeId: 'ratingPoint',},
        {title: 'Selection Capacity', attributeId: 'capacity',},
        {title: 'Unit MCA', attributeId: 'unitMca',},
        {title: 'Unit MOPD', attributeId: 'unitMopd',},
        {title: 'Depth', attributeId: 'depthIn',},
        {title: 'Height', attributeId: 'heightIn',},
        {title: 'Length', attributeId: 'lengthIn',},
        {title: 'Est. Net Wt', attributeId: 'estNetWeightLbs',},
        {title: 'Motor HP', attributeId: 'motorHp',},
        {title: 'Motor Amps', attributeId: 'motorAmps',},
        {title: 'No. of Fans', attributeId: 'noOfFans',},
        {title: 'Motor Watts', attributeId: 'motorWatts',},
        {title: 'Unit Voltage', attributeId: 'unitVoltage',},
        {title: 'Motor Voltage', attributeId: 'motorVoltage',},
        {title: 'Drain MPT', attributeId: 'drainMpt',},
        {title: 'Suction OD', attributeId: 'suctionOd',},
        {title: 'Coil Inlet OD', attributeId: 'coilInletOD',},
        {title: 'External Equalizer OD', attributeId: 'externalEqualizedOd'},
    ],
    "pro3_packaged": [
        {title: 'List Price', attributeId: 'price', formatter: moneyFormatter},
        {title: 'Application Type', attributeId: 'applicationType',},
        {title: 'Defrost Type', attributeId: 'defrostType',},
        {title: 'Operating Range', attributeId: 'operatingRange',},
        {title: 'Motor Type', attributeId: 'motorType',},
        {title: 'Refrigerant', attributeId: 'refrigerant',},
        {title: 'Capacity', attributeId: 'capacity', formatter: numberFormatter},
    ]
}
