import * as React from "react";
import {productFilterSpecs} from "./ProductFilterSpecs";
import { AppContext } from "../../app/AppContext";
import {Level} from "heatcraft-js-shared/lib/product";

export type FilterState = { [attributeId: string]: Set<String> }

export type FilterChangeAction = (attributeId: string, optionValue: string) => (e: React.ChangeEvent<HTMLInputElement>) => void

export default function ProductFilters(props: {
    level: Level,
    filterState: FilterState,
    onFilterChange: FilterChangeAction
}) {
    return <AppContext.Consumer>
        {siteInfo => <div className="filters-container">
            <div className="accordion" id="accordionFilters">
                {productFilterSpecs(siteInfo, props.level).filter(spec => spec.hidden !== true).map(spec => {
                    const headingId = `filter-heading-${spec.attributeId}`
                    const targetId = `filter-target-${spec.attributeId}`
                    return <div className="card" key={spec.attributeId}>
                        <div className="card-header" id={headingId}>
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${targetId}`}
                                        aria-expanded="true" aria-controls={targetId}>
                                    {spec.title}
                                </button>
                            </h2>
                        </div>

                        <div id={targetId} className="collapse show" aria-labelledby={headingId}>
                            <div className="card-body">
                                <form>
                                    {spec.options.map(option => {
                                        const optionValue = option.value || option.title;
                                        return <label className="custom-control custom-checkbox" key={option.title}>
                                            <input type="checkbox" className="custom-control-input"
                                                   checked={props.filterState[spec.attributeId] ? props.filterState[spec.attributeId].has(optionValue) : false}
                                                   onChange={props.onFilterChange(spec.attributeId, optionValue)}
                                            />
                                            <div className="custom-control-label">
                                                {option.title}
                                                {/*<b className="badge badge-pill badge-light float-right">0</b>*/}
                                            </div>
                                        </label>
                                    })}
                                </form>
                            </div>
                        </div>
                    </div>;
                })}

                {/*<div className="card">*/}
                {/*    <div className="card-header" id="headingSix">*/}
                {/*        <h2 className="mb-0">*/}
                {/*            <button className="btn btn-link collapsed" type="button" data-toggle="collapse"*/}
                {/*                    data-target="#collapseSix"*/}
                {/*                    aria-expanded="false" aria-controls="collapseSix">*/}
                {/*                CFM (cu ft/min)*/}
                {/*            </button>*/}
                {/*        </h2>*/}
                {/*    </div>*/}
                {/*    <div id="collapseSix" className="collapse" aria-labelledby="headingSix">*/}
                {/*        <div className="card-body">*/}

                {/*            <form className="range-field w-100">*/}
                {/*                <label className="custom-control">Min CFM</label>*/}
                {/*                <input id="cfmsliderMin" className="border-0 w-100" type="range" min="610" max="4112"/>*/}
                {/*            </form>*/}
                {/*            <span className="font-weight-bold text-primary ml-2 mt-1 MinvalueSpan"></span>*/}


                {/*            <form className="range-field w-100">*/}
                {/*                <label className="custom-control">Max CFM</label>*/}
                {/*                <input id="cfmsliderMax" className="border-0 w-100" type="range" min="610" max="4112"/>*/}
                {/*            </form>*/}
                {/*            <span className="font-weight-bold text-primary ml-2 mt-1 MaxvalueSpan"></span>*/}

                {/*        </div>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </div>}
    </AppContext.Consumer>
}