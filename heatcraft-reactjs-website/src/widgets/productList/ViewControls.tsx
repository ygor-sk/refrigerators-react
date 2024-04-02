import ActionLink from "../ActionLink";
import * as React from "react";
import {Link} from "react-router-dom";
import {listAttributes} from "./ListView";
import {SortDirection} from "./ProductListWidget";
import {Category} from "heatcraft-js-shared/lib/product";

export default function ViewControls(props: {
	category: Category,
    filtersExpanded: boolean,
    toggleOpenFilters: () => void,
	createSortAttributeChangeUrl: (attributeId: string) => string,
	createSortDirectionChangeUrl: (direction: SortDirection) => string,
    createViewKindUrl: (view: 'grid' | 'list') => string,
}) {
    return <section className="view-controls">
        <ActionLink className="filter-slideout" action={props.toggleOpenFilters}>
            <img src="/application/themes/heatcraft/build/images/filter.svg"/>
            <span className="filter-text">
                {props.filtersExpanded ? 'Close' : 'Open'} Filters
            </span>
        </ActionLink>
        <div className="layout-controls">
	        <div className="dropdown show">
			  <a className="btn dropdown-toggle" href="#" role="button" id="dropdownSort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Sort By
			  </a>

			  <div className="dropdown-menu" aria-labelledby="dropdownSort">
				  {listAttributes[props.category].map(listAttribute => {
				  	return <Link key={listAttribute.attributeId}
								 className="dropdown-item"
								 to={props.createSortAttributeChangeUrl(listAttribute.attributeId)}>
						{listAttribute.title}
				  	</Link>
				  })}
			  </div>
			</div>
            <div className="dropdown show">
			  <a className="btn dropdown-toggle" href="#" role="button" id="dropdownSort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    Sort Order
			  </a>

			  <div className="dropdown-menu" aria-labelledby="dropdownSort">
			    <Link className="dropdown-item" to={props.createSortDirectionChangeUrl("ASC")}>ASC <i className='fas fa-sort-amount-down'></i></Link>
			    <Link className="dropdown-item" to={props.createSortDirectionChangeUrl("DESC")}>DESC <i className='fas fa-sort-amount-up'></i></Link>
			  </div>
			</div>
            <Link className="grid-view" to={props.createViewKindUrl('grid')}>
                <img src="/application/themes/heatcraft/build/images/grid.svg"/>Grid View
            </Link>
            <Link className="list-view" to={props.createViewKindUrl('list')}>
                <img src="/application/themes/heatcraft/build/images/bars.svg"/>List View
            </Link>
        </div>
    </section>
}