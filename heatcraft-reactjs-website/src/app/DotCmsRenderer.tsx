import * as React from "react";
import Axios from "axios";
import {BrowserRouter, RouteComponentProps} from "react-router-dom";
import * as _ from "lodash";
import {dotCmsContext} from "../lib/dotCmsContext";
import ProductListWidget from "../widgets/productList/ProductListWidget";
import ProductDetailWidget from "../widgets/productDetail/ProductDetailWidget";
import {Category, Group, Revision, Style} from "heatcraft-js-shared/lib/product";
import {Helmet} from "react-helmet";
import MainMenu from "../widgets/MainMenu";

let axios = Axios.create();

export interface PartialLocation {
    pathname: string,
    search: string
}

interface DotCmsRendererState {
    location: PartialLocation,
    page: any,
    error: string,
}

interface Container {
    contentlets: any[];
}

export default class DotCmsRenderer extends React.Component<RouteComponentProps, DotCmsRendererState> {

    pageCache = {};

    constructor(props, context) {
        super(props, context);
        this.state = {
            location: null,
            page: null,
            error: null
        }
    }

    componentDidMount() {
        // on first page load, we check, whether the page was perhaps opened in DotCMS edit mode
        this.loadPage({pathname: dotCmsContext.path, search: dotCmsContext.searchQuery});
    };

    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<DotCmsRendererState>, snapshot?: any): void {
        if (!_.isEqual(prevProps.location, this.props.location)) {
            // when React Router's <Link/> is used, we use the location provided by Router
            this.loadPage(this.props.location);
        }
    }

    loadPage(location: PartialLocation) {
        const pathname = location.pathname === '' || location.pathname === '/' ? '/index' : location.pathname;
        const cachedPage = this.pageCache[pathname];
        if (cachedPage) {
            this.setState({location, error: null, page: cachedPage})
        } else {
            // this.setState({error: null, page: null});
            axios.get(`/api/heatcraft/page${pathname}`)
                .then(result => {
                    this.pageCache[pathname] = result.data;
                    this.setState({location, error: null, page: result.data});
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 404) {
                        this.setState({location, error: "Page not found", page: null});
                    } else {
                        this.setState({location, error: error.toString(), page: null});
                    }
                });
        }
    }

    render() {
        return <div className="dotcms-layout">
            <Helmet>
                <body id="home"/>
            </Helmet>
            {this.renderPage()}
        </div>
    }

    renderPage() {
        if (this.state.page) {
            return this.renderLayout(this.state.page.layout, this.state.page.containers);
        } else if (this.state.error) {
            return <div className="alert-danger">{this.state.error}</div>
        } else {
            // return <div>No page available</div>
            return <></>
        }
    }

    renderLayout(layout, pageContainers) {
        // if (layout.sidebar && layout.sidebar.location) {
        //     const sidebarColumnSize = this.sidebarColumnSize(layout.sidebar.width);
        //     return <div className="container sidebar">
        //         <div className="row">
        //             <div className={`col-${sidebarColumnSize}`}>
        //                 {this.renderColumnContainers(layout.sidebar.containers, pageContainers)}
        //             </div>
        //             <div className={`col-${12 - sidebarColumnSize}`}>
        //                 {this.renderRows(layout, pageContainers)}
        //             </div>
        //         </div>
        //     </div>
        // }
        return this.renderRows(layout, pageContainers)
    }

    renderRows(layout, pageContainers) {
        return <div className="container-fluid" style={{margin: 0, padding: 0}}>
            {layout.body.rows.map((row, index) => this.renderRow(row, index, pageContainers))}
        </div>;
    }

    renderRow(row, index, pageContainers) {
        return <div id={`section-${index}`} className={`row dotcms-layout-row ${row.styleClass || ""}`} key={index}>
            {this.renderColumns(row, pageContainers)}
        </div>
    }

    private renderColumns(row, pageContainers): React.ReactNode[] {
        let rowLeftOffset = 1;
        const result: React.ReactNode[] = [];
        let columnIndex = 0;
        for (const column of row.columns) {
            const currentColumnSpan = `col-lg-${column.width}`
            let offset: number = 0;
            let columnOffset: string;
            if (rowLeftOffset === column.leftOffset) {
                columnOffset = "";
            } else {
                offset = column.leftOffset - rowLeftOffset;
                columnOffset = `offset-lg-${offset}`;
            }

            rowLeftOffset = rowLeftOffset + column.width + offset;

            result.push(
                <div className={`dotcms-layout-col ${currentColumnSpan} ${columnOffset} ${column.styleClass || ""}`} key={columnIndex}>
                    {this.renderColumnContainers(column.containers, pageContainers)}
                </div>
            )
            columnIndex++;
        }
        return result;
    }

    renderColumnContainers(columnContainers, pageContainers) {
        return columnContainers.map(container => this.renderContainer(pageContainers[container.identifier], container.uuid));
    }

    renderContainer(container, contenletUUID) {
        return <div
            data-dot-object="container"
            data-dot-inode={container.container.inode}
            data-dot-identifier={container.container.identifier}
            data-dot-uuid="1"
            data-max-contentlets={container.container.maxContentlets}
            data-dot-accept-types="webPageContent,WIDGET,FORM" // TODO: collect contentTypeVar from containerStructures ?
            data-dot-can-add="CONTENT,FORM,WIDGET"
            key={`container-${container.container.identifier}`}>
            {/*<h2 style={{backgroundColor: "lightcoral"}}>Container: {container.container.identifier}</h2>*/}
            {/*<pre>{JSON.stringify(container.container, null, 2)}</pre>*/}
            {this.renderContentlets(container, contenletUUID)}
        </div>
    }

    renderContentlets(container: Container, contenletUUID) {
        return Object.entries(container.contentlets)
            .filter(([contentletId]) => contentletId === `uuid-${contenletUUID}`)
            .map(([contentletId, contentletItems]) => {
                return <div key={`contentlet-${contentletId}`}>
                    {contentletItems.map(contentletItem => {
                        return <div
                            data-dot-object="contentlet"
                            data-dot-inode={contentletItem.inode}
                            data-dot-identifier={contentletItem.identifier}
                            data-dot-type={contentletItem.contentType}
                            data-dot-basetype={contentletItem.baseType}
                            data-dot-lang={contentletItem.languageId}
                            data-dot-title={contentletItem.title}
                            data-dot-can-edit={true}
                            data-dot-content-type-id={contentletItem.stInode}
                            data-dot-has-page-lang-version="true"
                            key={`contentletItem-${contentletItem.identifier}`}>
                            {this.renderContentlet(contentletItem)}
                        </div>
                    })}
                </div>
            });
    }

    private renderContentlet(contentletItem) {
        let contentType = contentletItem.contentType;
        switch (contentType) {
            case 'ProductGroup':
            case 'ProductCategory':
            case 'ProductStyle':
                return this.createProductListWidget(contentletItem);
            case 'ProductDetail':
                const params = new URLSearchParams(this.state.location.search);
                return <ProductDetailWidget productId={parseInt(params.get('productId'))}
                                            revision={params.get('revision') as Revision}
                                            category={params.get('category') as Category}
                />
            default:
                return <div dangerouslySetInnerHTML={{__html: contentletItem.body}}/>
        }
    }

    private createProductListWidget(widget: {
        group: Group, category: Category, style: Style,
        title: string, description: string, introduction: string
    }) {
        const params = new URLSearchParams(this.state.location.search);
        return <ProductListWidget view={ProductListWidget.UrlFactory.parseParams(params)}
                                  level={{
                                      group: widget.group,
                                      category: widget.category || null,
                                      style: widget.style || null
                                  }}
                                  content={{
                                      title: widget.title,
                                      description: widget.description,
                                      introduction: widget.introduction
                                  }}
                                  changeUrl={this.props.history.push}/>;
    };

    sidebarColumnSize(sidebarWidth) {
        switch (sidebarWidth) {
            case 'small':
                return 2;
            case 'medium':
                return 3;
            case 'large':
                return 4;
            default:
                throw `Unknown sidebar width: ${sidebarWidth}`;
        }
    }
}