import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import DotCmsRenderer from "./DotCmsRenderer";
import MainMenu from "../widgets/MainMenu";
import {SiteInfo} from "heatcraft-js-shared/lib/site";
import ProductCompareWidget from "../widgets/productCompare/ProductCompareWidget";
import {Category} from "../../../heatcraft-js-shared/lib/product";

export function App() {
    return <BrowserRouter>
        <MainMenu/>
        <Switch>
            <Route path="/products/compare/:category" render={props => {
                const params = new URLSearchParams(props.location.search);
                const category = props.match.params["category"] as Category;
                const productIds = params.get("productIds").split(",").map(Number);
                return <ProductCompareWidget category={category}
                                             productIds={productIds}
                                             goBack={() => props.history.goBack()}
                />
            }}/>
            <Route path="*" component={DotCmsRenderer}/>
        </Switch>
    </BrowserRouter>
}

export const AppContext = React.createContext<SiteInfo>(null);