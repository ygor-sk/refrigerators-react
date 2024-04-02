import React from "react";
import {AccordionSection, RenderedCard} from "../Accordion";
import {renderMoney} from "../../../lib/global-util";
import {Options} from "heatcraft-js-shared/lib/product";

export function renderPreferredOptionsCard(preferredOptions: Options): RenderedCard {
    return renderOptionsCard(preferredOptions, "preferredOptions", "Factory Installed: Preferred Options");
}

export function renderAlaCarteOptionsCard(alaCarteOptions: Options): RenderedCard {
    return renderOptionsCard(alaCarteOptions, "alaCarteOptions", "Factory Installed: A la Carte Options");
}

function renderOptionsCard(options: Options, section: AccordionSection, title: string): RenderedCard {
    if (options === null || Object.keys(options).length === 0) {
        return null;
    }
    return {
        section: section,
        title: title,
        children: <table className="table table-hover">
            <thead className="primary-legend">
            <tr>
                <th scope="col">Option Type</th>
                <th scope="col">Description</th>
                <th scope="col">List Price Adder ($US)</th>
                <th scope="col">Notes</th>
            </tr>
            </thead>
            {Object.entries(options).map(([section, optionList]) =>
                <React.Fragment key={section}>
                    {section === "" ?
                        null :
                        <thead className="table-head">
                        <tr>
                            <th scope="col">{section}</th>
                            <th scope="col"/>
                            <th scope="col"/>
                            <th scope="col"/>

                        </tr>
                        </thead>
                    }
                    <tbody>
                    {optionList.map(option =>
                        <tr key={`${option.optionCode}/${option.optionDescription}`}>
                            <th scope="row">{option.optionCode}</th>
                            <td>{option.optionDescription}</td>
                            <td>{renderMoney(option.price)}</td>
                            <td>{option.notes}</td>
                        </tr>
                    )}
                    </tbody>
                </React.Fragment>
            )}
        </table>
    }
}
