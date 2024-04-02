import React from "react";
import {RenderedCard} from "../Accordion";
import {renderMoney} from "../../../lib/global-util";
import _ from "lodash";
import {ExpansionValve, LiquidValves, Parts, ProductDetail, Revision} from "heatcraft-js-shared/lib/product";


export default function renderShippedLooseAccessoriesCard(productDetail: ProductDetail): RenderedCard {
    const parts = productDetail.factoryOptions.parts;
    const expansionValves = productDetail.factoryOptions.expansionValves;
    const liquidValves = productDetail.factoryOptions.liquidValves;

    if (_.isEmpty(parts) && _.isEmpty(expansionValves) && _.isEmpty(liquidValves)) {
        return null;
    }

    return {
        section: "shippedLooseAccessories",
        title: "Shipped Loose Accessories",
        children: <table className="table table-hover" key="parts">
            {[
                renderParts(parts),
                renderExpansionValves(productDetail.productKind.revision, expansionValves),
                renderLiquidValves(productDetail.productKind.revision, liquidValves),
            ]}
        </table>
    }
}

function renderParts(parts: Parts) {
    if (_.isEmpty(parts)) {
        return null;
    }

    return <React.Fragment key="parts">
        <thead className="primary-legend">
        <tr>
            <th scope="col">Part Number</th>
            <th scope="col">Description</th>
            <th scope="col">List Price ($US)</th>
            <th scope="col">Notes</th>
        </tr>
        </thead>
        {Object.entries(parts).map(([section, partList]) =>
            <React.Fragment key={section}>
                <thead className="table-head">
                <tr>
                    <th scope="row">{section}</th>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>
                </tr>
                </thead>
                <tbody>
                {partList.map(part =>
                    <tr key={`${part.partNumber}-${part.description}`}>
                        <th scope="row">{part.partNumber}</th>
                        <td>{part.description}</td>
                        <td>{renderMoney(part.price)}</td>
                        <td>{part.notes}</td>
                    </tr>
                )}
                </tbody>
            </React.Fragment>
        )}
    </React.Fragment>;
}

function renderExpansionValves(revision: Revision, expansionValves: ExpansionValve[]) {
    if (_.isEmpty(expansionValves)) {
        return null;
    }

    return <React.Fragment key="expansionValves">
        <thead className="primary-legend">
        <tr>
            <th scope="col">Part Number</th>
            {revision === "LEGACY" ?
                <th scope="col">Capacity Range (BTUH)</th> :
                <th scope="col"/>
            }
            <th scope="col">List Price ($US)</th>
            <th scope="col"/>
        </tr>
        </thead>
        <thead className="table-head">
        <tr>
            <th scope="col">Expansion Valves</th>
            <th scope="col"/>
            <th scope="col"/>
            <th scope="col"/>
        </tr>
        </thead>
        <tbody>
        {expansionValves.map(valve =>
            <tr key={valve.partNumber}>
                <th scope="row">{valve.partNumber}</th>
                {revision === "LEGACY" ? <td>{valve.capacityRange}</td> : <td/>}
                <td>{renderMoney(valve.price)}</td>
                <td/>
            </tr>
        )}
        </tbody>
    </React.Fragment>;
}

function renderLiquidValves(revision: Revision, liquidValves: LiquidValves) {
    if (_.isEmpty(liquidValves)) {
        return null;
    }

    return <React.Fragment key="liquidValves">
        <thead className="primary-legend">
        <tr>
            <th scope="col">Part Number</th>
            {revision === 'LEGACY' ? <th scope="col">Capacity Range</th> : <th scope="col"/>}
            <th scope="col">List Price ($US)</th>
            <th scope="col">Size</th>
        </tr>
        </thead>
        <thead className="table-head">
        <tr>
            <th scope="col">Liquid Valves</th>
            <th scope="col"/>
            <th scope="col"/>
            <th scope="col"/>
        </tr>
        </thead>
        <tbody>
        {Object.entries(liquidValves).map(([section, valveList]) =>
            <React.Fragment key={section}>
                {section === "" ?
                    null :
                    <tr>
                        <th scope="row" colSpan={4}>{section}</th>
                    </tr>
                }
                {valveList.map(valve =>
                    <tr key={valve.partNumber}>
                        <th scope="row">{valve.partNumber}</th>
                        {revision === 'LEGACY' ? <td>{valve.capacityRange}</td> : <td/>}
                        <td>{renderMoney(valve.price)}</td>
                        <td>{valve.size}</td>
                    </tr>
                )}
            </React.Fragment>
        )}
        </tbody>
    </React.Fragment>;
}
