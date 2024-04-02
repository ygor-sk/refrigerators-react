import * as React from "react";
import Axios, {AxiosResponse} from "axios";
import ProductSearch from "../product/ProductSearch";
import FeaturedProducts from "./FeaturedProducts";
import ListView from "./ListView";
import GridView from "./GridView";
import BreadCrumbs from "./BreadCrumbs";
import ViewControls from "./ViewControls";
import ProductFilters, {FilterChangeAction, FilterState} from "./ProductFilters";
import * as _ from "lodash";
import {ProductPaginator} from "./ProductPaginator";
import {split2} from "../../lib/global-util";
import {Level, PaginatedProducts} from "heatcraft-js-shared/lib/product";
import StickyCompareTool from "./StickyCompareTool";

interface ProductListWidgetProps {
    level: Level,
    view: View,
    content: ProductListContent,
    changeUrl: (url: string) => void
}

interface ProductListWidgetState {
    paginatedProducts: PaginatedProducts,
    filtersExpanded: boolean,
    compareToolExpanded: boolean,
    checkedProductIds: Set<number>;
}

interface Selection {
    filterState?: FilterState,
    pageNumber?: number,
    sortBy?: SortBy
}

type ViewKind = 'list' | 'grid';

export interface ProductListContent {
    title: string,
    description: string,
    introduction: string,
}

interface View {
    selection: Selection,
    productViewKind?: ViewKind,
}

export type SortDirection = "ASC" | "DESC";

export interface SortBy {
    attributeId: string,
    direction: SortDirection;
}

export default class ProductListWidget extends React.Component<ProductListWidgetProps, ProductListWidgetState> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            paginatedProducts: null, // loading
            filtersExpanded: true,
            compareToolExpanded: false,
            checkedProductIds: new Set<number>()
        }
    }

    componentDidMount() {
        this.loadProducts();
    };

    componentDidUpdate(prevProps: Readonly<ProductListWidgetProps>, prevState: Readonly<ProductListWidgetState>, snapshot?: any): void {
        if (!_.isEqual(prevProps.view.selection, this.props.view.selection) || !_.isEqual(prevProps.level, this.props.level)) {
            this.loadProducts();
        }
    }

    loadProducts() {
        this.setState({paginatedProducts: null});
        const filterState = {...this.props.view.selection.filterState};
        if (this.props.level.style !== null) {
            filterState.style = new Set([this.props.level.style]);
        }
        const queryFilters = Object.entries(filterState)
            .flatMap(([attributeId, optionValues]) => [...optionValues].map(optionValue => ['filterBy', `${attributeId}_${optionValue}`]));
        const queryPageNumber = ['pageNumber', this.props.view.selection.pageNumber ?? 1]
        const queryPageSize = ['pageSize', 24]
        const querySortBy = ['sortBy', `${this.getEffectiveSortBy().attributeId}_${this.getEffectiveSortBy().direction}`];
        const queryString = [queryPageNumber, queryPageSize, ...queryFilters, querySortBy]
            .filter(keyValue => keyValue !== null)
            .map(([key, value]) => `${key}=${value}`).join("&");
        Axios
            .get<any, AxiosResponse<PaginatedProducts>>(`/api/heatcraft/products/list/${this.props.level.category}?${queryString}`)
            .then(response => {
                this.setState({
                    paginatedProducts: response.data,
                })
            })
            .catch(error => {
                window.alert("Error loading products:" + error);
                console.log("Error loading products", error);
            })
    }

    render(): React.ReactNode {
        return <>
            <main className="products-page">
                <ProductSearch/>
                <div className="container">
                    <BreadCrumbs level={this.props.level}/>
                    <FeaturedProducts level={this.props.level} content={this.props.content}/>
                    <ViewControls category={this.props.level.category}
                                  filtersExpanded={this.state.filtersExpanded}
                                  toggleOpenFilters={this.toggleOpenFilters}
                                  createSortAttributeChangeUrl={(this.createSortAttributeChangeUrl)}
                                  createSortDirectionChangeUrl={(this.createSortDirectionChangeUrl)}
                                  createViewKindUrl={this.createViewKindUrl}/>
                    <section className="product-selection">
                        <div className={`product-selection-filters ${this.state.filtersExpanded ? 'expanded' : ''}`}>
                            <ProductFilters level={this.props.level}
                                            filterState={this.props.view.selection.filterState}
                                            onFilterChange={this.changeFilter}/>
                        </div>
                        <div
                            className={`product-selection-items_wrapper ${this.props.view.productViewKind === "list" ? 'show-list-view' : ''}`}>
                            {this.state.paginatedProducts === null ?
                                <div>Loading ...</div> :
                                <>
                                    <ListView category={this.props.level.category}
                                              paginatedProducts={this.state.paginatedProducts}
                                              sortBy={this.getEffectiveSortBy()}
                                              createSortToggleUrl={this.createSortToggleUrl}
                                              checkedProductIds={this.state.checkedProductIds}
                                              toggleCheckedProductId={this.toggleCheckedProductId}
                                    />
                                    <GridView products={this.state.paginatedProducts.products}
                                              checkedProductIds={this.state.checkedProductIds}
                                              toggleCheckedProductId={this.toggleCheckedProductId}
                                    />
                                    <ProductPaginator paginatedProducts={this.state.paginatedProducts}
                                                      changePage={(pageNumber: number) => this.props.changeUrl(this.createPageNumberViewUrl(pageNumber))}
                                                      createPageNumberViewUrl={this.createPageNumberViewUrl}
                                    />
                                </>
                            }
                        </div>
                    </section>
                </div>
            </main>
            <StickyCompareTool
                category={this.props.level.category}
                isOpen={this.state.compareToolExpanded}
                checkedProductIds={[...this.state.checkedProductIds]}
                toggleCheckedProductId={this.toggleCheckedProductId}
                uncheckAllProductIds={this.uncheckAllProductIds}

            />
        </>
    }

    private createPageNumberViewUrl = (pageNumber: number) => this.createSelectionUrl({
        ...this.props.view.selection,
        pageNumber: pageNumber
    })

    private changeFilter: FilterChangeAction = (filterKey, optionValue) => {
        return (e) => {
            const checked = e.target.checked;
            const oldFilterState = this.props.view.selection.filterState;
            const newFilterState: FilterState = {...oldFilterState}
            newFilterState[filterKey] = new Set<String>(oldFilterState[filterKey] || []);
            if (checked) {
                newFilterState[filterKey].add(optionValue)
            } else {
                newFilterState[filterKey].delete(optionValue)
            }
            this.props.changeUrl(this.createSelectionUrl({...this.props.view.selection, filterState: newFilterState}));
        }
    };

    private createSortToggleUrl = (attributeId: string) => {
        const flipSortDirection = (direction: SortDirection): SortDirection => direction === "ASC" ? "DESC" : "ASC"

        const currentDirection: SortDirection = this.getEffectiveSortBy().direction;
        const sortDirection: SortDirection = this.getEffectiveSortBy().attributeId === attributeId ? flipSortDirection(currentDirection) : "ASC";
        return this.createSelectionUrl({
            ...this.props.view.selection,
            sortBy: {attributeId: attributeId, direction: sortDirection}
        })
    }

    private toggleCheckedProductId = (productId: number, checked: boolean) => {
        this.setState((oldState) => {
            const checkedProductIds = new Set(oldState.checkedProductIds);
            if (checked) {
                checkedProductIds.add(productId)
            } else {
                checkedProductIds.delete(productId);
            }
            return {
                checkedProductIds: checkedProductIds,
                compareToolExpanded: checkedProductIds.size > 0,
            };
        });
    }

    private uncheckAllProductIds = () => {
        this.setState({
            checkedProductIds: new Set<number>(),
            compareToolExpanded: false,
        });
    }

    private createSortAttributeChangeUrl = (attributeId: string) => {
        const currentDirection: SortDirection = this.getEffectiveSortBy().direction;
        return this.createSelectionUrl({
            ...this.props.view.selection,
            sortBy: {attributeId: attributeId, direction: currentDirection}
        })
    }

    private createSortDirectionChangeUrl = (direction: SortDirection) => {
        const currentAttributeId = this.getEffectiveSortBy().attributeId;
        return this.createSelectionUrl({
            ...this.props.view.selection,
            sortBy: {attributeId: currentAttributeId, direction: direction}
        })
    }

    private getEffectiveSortBy(): SortBy {
        return this.props.view.selection.sortBy || {attributeId: "modelNumber", direction: "ASC"};
    }

    private createViewKindUrl = (productViewKind: 'list' | 'grid') => this.createViewUrl({
        ...this.props.view,
        productViewKind
    });

    private createSelectionUrl = (selection: Selection) => this.createViewUrl({...this.props.view, selection});

    private createViewUrl = (view: View) => "?" + ProductListWidget.UrlFactory.createParams(view).toString();

    private toggleOpenFilters = () => this.setState((oldState) => ({filtersExpanded: !oldState.filtersExpanded}))

    public static UrlFactory = {
        createParams: (view: View): URLSearchParams => {
            let params = new URLSearchParams();
            if (view.selection.filterState) {
                for (const [attributeId, values] of Object.entries(view.selection.filterState)) {
                    for (const value of values) {
                        params.append("filterBy", `${attributeId}_${value}`);
                    }
                }
            }
            if (view.selection.sortBy) {
                params.append("sortBy", `${view.selection.sortBy.attributeId}_${view.selection.sortBy.direction}`)
            }
            if (view.selection.pageNumber) {
                params.append("pageNumber", view.selection.pageNumber.toString())
            }
            if (view.productViewKind) {
                params.append("view", view.productViewKind)
            }
            return params;
        },
        parseParams: (params: URLSearchParams): View => {
            const filterState: FilterState = {};
            for (const filterByParam of params.getAll("filterBy")) {
                const parts = split2(filterByParam, "_")
                if (!filterState[parts.left]) {
                    filterState[parts.left] = new Set<string>();
                }
                filterState[parts.left].add(parts.right);
            }

            let sortBy: SortBy = null;
            let sortByParam = params.get("sortBy");
            if (sortByParam) {
                let parts = split2(sortByParam, "_");
                sortBy = {attributeId: parts.left, direction: parts.right as SortDirection}
            }

            return {
                selection: {
                    filterState: filterState,
                    pageNumber: params.get("pageNumber") ? Number(params.get("pageNumber")) : null,
                    sortBy: sortBy
                },
                productViewKind: params.get("view") as ViewKind
            }
        }
    }

}

