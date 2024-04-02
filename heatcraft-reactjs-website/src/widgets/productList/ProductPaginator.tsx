import Pagination from "react-js-pagination";
import * as React from "react";
import {PaginatedProducts} from "heatcraft-js-shared/lib/product";

export function ProductPaginator(props: {
    paginatedProducts: PaginatedProducts,
    changePage: (pageNumber: number) => void,
    createPageNumberViewUrl: (pageNumber: number) => string,
}) {
    return <div className="container">
        <div id="pagination" className="row">
            <nav aria-label="Page navigation">
                <Pagination
                    innerClass="pagination justify-content-center"
                    firstPageText="First"
                    lastPageText="Last"
                    prevPageText="Previous"
                    nextPageText="Next"
                    getPageUrl={props.createPageNumberViewUrl}
                    itemClass="page-item"
                    linkClass="page-link"
                    totalItemsCount={props.paginatedProducts.totalCount}
                    activePage={props.paginatedProducts.pageNumber}
                    itemsCountPerPage={props.paginatedProducts.pageSize}
                    onChange={props.changePage}
                />
            </nav>
        </div>
    </div>

}