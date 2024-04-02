import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Axios, {AxiosResponse} from "axios";
import {AppContext} from "./app/AppContext";
import {App} from "./app/App";
import {Brand, Group} from "heatcraft-js-shared/lib/product";
import {BrandInfo, GroupInfo, SiteInfo} from "heatcraft-js-shared/lib/site";

const brands: {[key in Brand]: BrandInfo} = {
    bohn: {brandId: "bohn", title: "Bohn", url: "bohn"},
    larkin: {brandId: "larkin", title: "Larkin", url: "larkin"},
    climate_control: {brandId: "climate_control", title: "Climate Control", url: "climate-control"},
    chandler: {brandId: "chandler", title: "Chandler", url: "chandler"},
};

const groups: {[key in Group]: GroupInfo} = {
    compressorized: {
        groupId: "compressorized", title: "Compressorized", url: "compressorized",
        categories: {
            pro3_packaged: {
                categoryId: "pro3_packaged", title: "PRO3 Packaged Systems", url: "pro3-packaged",
                styles: {
                    top_mount: {styleId: "top_mount", title: "Top Mount", url: "top-mount"},
                    side_mount: {styleId: "side_mount", title: "Side Mount", url: "side-mount"},
                }
            },
        }
    },
    evaporators_unit_coolers: {
        groupId: "evaporators_unit_coolers", title: "Evaporators / Unit Coolers", url: "evaporators-unit-coolers",
        categories: {
            walk_in_unit_coolers: {
                categoryId: "walk_in_unit_coolers", title: "Walk-In Unit Coolers", url: "walk-in-unit-coolers",
                styles: {
                    low_profile: {styleId: "low_profile", title: "Low Profile", url: "low-profile"},
                    medium_profile: {styleId: "medium_profile", title: "Medium Profile", url: "medium-profile"},
                    center_mount: {styleId: "center_mount", title: "Center Mount", url: "center-mount"},
                    low_velocity_center_mount: {styleId: "low_velocity_center_mount", title: "Low Velocity Center Mount", url: "low-velocity-center-mount"},
                }
            },
        }
    },
};

Axios.get<any, AxiosResponse<SiteInfo>>('/api/heatcraft/site/info')
    .then(response => {
        response.data.brands = brands; // TODO: fetch from Content Types
        response.data.groups = groups; // TODO: fetch from Content Types
        ReactDOM.render(
            <AppContext.Provider value={response.data}>
                <App/>
            </AppContext.Provider>,
            document.getElementById('root')
        );
    })
    .catch(error => {
        console.log(error);
        ReactDOM.render(<div>{error.toString()}</div>, document.getElementById('root'));
    })

