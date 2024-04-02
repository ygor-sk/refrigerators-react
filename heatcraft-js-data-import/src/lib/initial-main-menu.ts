interface MainMenuNode {
    id: string,
    title?: string,
    url?: string,
    additionalClass?: string,
    children?: MainMenuNode[]
}

export interface MainMenuItem {
    'ID': string,
    'Title': string,
    'URL': string,
    'Order': number,
    'Additional Class': string
}

export function initialMainMenu(): MainMenuItem[] {
    function nodeToItems(node: MainMenuNode, nodeIndex: number, nodeLevel: number, parentId: string, parentOrder: number): MainMenuItem[] {
        let result: MainMenuItem[] = [];
        let parent: MainMenuItem = {
            ID: parentId + '/' + node.id,
            Title: node.title || '',
            URL: node.url || '',
            "Additional Class": node.additionalClass || "",
            Order: parentOrder + Math.pow(10, nodeLevel) * (nodeIndex + 1)
        };
        result.push(parent)
        if (node.children !== undefined) {
            node.children.forEach((child, childIdx) => result.push(...nodeToItems(child, childIdx, nodeLevel - 1, parent.ID, parent.Order)));
        }
        return result
    }

    return nodes.flatMap((node, idx) => nodeToItems(node, idx, 4, '', 0));
}

const nodes: MainMenuNode[] = [
        {
            "id": "home",
            "title": "Home",
            "url": "http://heatcraftrpd.com/",
        },
        {
            "id": "products",
            "title": "Products",
            "children": [
                {
                    "id": "all-products",
                    "title": "All Products",
                    "url": "http://heatcraftrpd.com/products",
                },
                {
                    "id": "all-brands",
                    "title": "All Brands",
                    "url": "http://heatcraftrpd.com/about/brands/",
                    "children": [
                        {
                            "id": "brands",
                            "children": [
                                {
                                    "id": "bohn",
                                    "title": "Bohn",
                                    "url": "http://heatcraftrpd.com/about/brands/bohn.asp",
                                },
                                {
                                    "id": "larkin",
                                    "title": "Larkin",
                                    "url": "http://heatcraftrpd.com/about/brands/larkin.asp",
                                },
                                {
                                    "id": "climate_control",
                                    "title": "Climate Control",
                                    "url": "http://heatcraftrpd.com/about/brands/climatecontrol.asp",
                                },
                                {
                                    "id": "chandler",
                                    "title": "Chandler",
                                    "url": "http://heatcraftrpd.com/about/brands/chandler.asp",
                                },
                                {
                                    "id": "magna",
                                    "title": "MAGNA",
                                    "url": "http://heatcraftrpd.com/magna",
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "evaporators-unit-coolers",
                    "title": "Evaporators / Unit Coolers",
                    "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC007",
                    "children": [
                        {
                            "id": "walk-in",
                            "title": "Walk in Unit Coolers",
                            // "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC009",
                            "url": "/products/evaporators-unit-coolers/walk-in-unit-coolers?filterBy=brand_bohn",
                            "children": [
                                {
                                    "id": "low-profile",
                                    "title": "Low Profile",
                                    "url": "/products/evaporators-unit-coolers/walk-in-unit-coolers/low-profile?filterBy=brand_bohn",
                                },
                                {
                                    "id": "low-velocity",
                                    "title": "Low Velocity Center Mount",
                                    // "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC059",
                                    "url": "/products/evaporators-unit-coolers/walk-in-unit-coolers/low-velocity-center-mount?filterBy=brand_bohn",
                                },
                                {
                                    "id": "center-mount",
                                    "title": "Center Mount",
                                    // "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC057",
                                    "url": "/products/evaporators-unit-coolers/walk-in-unit-coolers/center-mount?filterBy=brand_bohn",
                                },
                                {
                                    "id": "medium-profile",
                                    "title": "Medium Profile",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC106",
                                }
                            ]
                        },
                        {
                            "id": "warehouse",
                            "title": "Refrigerated Warehouse Unit Coolers",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC112",
                            "children": [
                                {
                                    "id": "large",
                                    "title": "Large Unit Cooler",
                                }
                            ]
                        },
                        {
                            "id": "reach-in",
                            "title": "Reach-In Unit Coolers",
                            "children": [
                                {
                                    "id": "large",
                                    "title": "Large Unit Cooler",
                                },
                                {
                                    "id": "thin-air",
                                    "title": "Thin Profile Air Defrost",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC068",
                                },
                                {
                                    "id": "thin-electric",
                                    "title": "Thin Profile Electric Defrost",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC069",
                                },
                                {
                                    "id": "v-profile",
                                    "title": "V ProfileC Profile",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC070",
                                },
                                {
                                    "id": "mullion",
                                    "title": "Mullion",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC072",
                                },
                                {
                                    "id": "reverse-mullion",
                                    "title": "Reverse Mullion",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC073",
                                },
                                {
                                    "id": "back-bar",
                                    "title": "Back Bar",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC074",
                                },
                                {
                                    "id": "dual-air",
                                    "title": "Dual Air",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC075",
                                },
                                {
                                    "id": "twin-flow",
                                    "title": "Twin Flow",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC076",
                                }
                            ]
                        },
                        {
                            "id": "step-in",
                            "title": "Step-In Unit Coolers",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC065",
                            "children": [
                                {
                                    "id": "step-in",
                                    "title": "Step-In Unit Coolers",
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "compressorized",
                    "title": "Compressorized",
                    "url": "http://heatcraftrpd.com/productcatalog/categorylist.aspx?catID=HC108",
                    "children": [
                        {
                            "id": "air-cooled",
                            "title": "Air Cooled Condensing Units",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=ND&FilterCol=&FilterVal=&LPNO=5&catID=HC115",
                            "children": [
                                {
                                    "id": "6hp",
                                    "title": "½ - 6 HP Horizontal Air Discharge",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=ND116",
                                },
                                {
                                    "id": "22hp",
                                    "title": "3 - 22 HP Horizontal Air Discharge",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=ND117-118",
                                },
                                {
                                    "id": "50hp",
                                    "title": "12 - 50 HP Vertical Air Discharge",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=ND124-126",
                                },
                                {
                                    "id": "100hp",
                                    "title": "24 - 100 HP Dual Vertical Air Discharge",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=ND127-128",
                                }
                            ]
                        },
                        {
                            "id": "water-cooled",
                            "title": "Water Cooled Condensing Units",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC119",
                            "children": [
                                {
                                    "id": "6hp",
                                    "title": "½ - 6 HP",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC120",
                                },
                                {
                                    "id": "22hp",
                                    "title": "¾ - 22 HP",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC121",
                                }
                            ]
                        },
                        {
                            "id": "unit-coolers",
                            "title": "Remote Compressor Units",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC122",
                            "children": [
                                {
                                    "id": "22hp",
                                    "title": "¾ - 22 HP",
                                    "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC123",
                                }
                            ]
                        },
                        {
                            "id": "pro3-packaged",
                            "title": "PRO3 Package Systems",
                            // "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=ND&FilterCol=&FilterVal=&LPNO=5&catID=HC039",
                            "url": "/products/compressorized/pro3-packaged?filterBy=brand_bohn",
                            "children": [
                                {
                                    "id": "topMount",
                                    "title": "Top Mount",
                                    "url": "/products/compressorized/pro3-packaged/top-mount?filterBy=brand_bohn",
                                },
                                {
                                    "id": "sideMount",
                                    "title": "Side Mount",
                                    "url": "/products/compressorized/pro3-packaged/side-mount?filterBy=brand_bohn",
                                },
                            ]
                        }
                    ]
                },
                {
                    "id": "condensers",
                    "title": "Condensers & Fluid Coolers",
                    "url": "http://heatcraftrpd.com/productcatalog/categorylist.aspx?catID=HC109",
                    "children": [
                        {
                            "id": "air-cooled",
                            "title": "Air Cooled Condenser",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC044",
                            "children": [
                                {
                                    "id": "26ton",
                                    "title": "1 - 26 Ton",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC045",
                                },
                                {
                                    "id": "224ton",
                                    "title": "11 - 264 Ton",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC049",
                                }
                            ]
                        },
                        {
                            "id": "fluid-coolers",
                            "title": "Fluid Coolers",
                            "url": "http://heatcraftrpd.com/productcatalog/search.aspx?ProductType=HC&FilterCol=&FilterVal=&LPNO=5&catID=HC046",
                            "children": [
                                {
                                    "id": "fn",
                                    "title": "FN Fluid Coolers",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC162",
                                },
                                {
                                    "id": "small",
                                    "title": "Small Fluid Cooler",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC047",
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "technologies",
                    "title": "Technologies & Other Products",
                    "url": "http://heatcraftrpd.com/productcatalog/categorylist.aspx?catID=HC110",
                    "children": [
                        {
                            "id": "refrigeration-controls",
                            "title": "Refrigeration Controls",
                            "children": [
                                {
                                    "id": "intelliGen",
                                    "title": "IntelliGen Refrigeration Controller",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC0163",
                                },
                                {
                                    "id": "quick-response",
                                    "title": "Quick Response Controller",
                                    "url": "http://heatcraftrpd.com/qrc",
                                },
                                {
                                    "id": "beacon2",
                                    "title": "Beacon II Refrigeration System",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail3.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC015",
                                },
                                {
                                    "id": "remote",
                                    "title": "Remote Refrigeration Control",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC027",
                                },
                                {
                                    "id": "lead-lag",
                                    "title": "Lead Lag Temperature Controller",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC0156",
                                },
                                {
                                    "id": "orbus",
                                    "title": "Orbus Controller",
                                },
                                {
                                    "id": "smart",
                                    "title": "Smart Defrost Kit",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC017",
                                }
                            ]
                        },
                        {
                            "id": "other",
                            "title": "Other Products",
                            "children": [
                                {
                                    "id": "air",
                                    "title": "Air Cooled Package Chillers",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC158",
                                },
                                {
                                    "id": "screw",
                                    "title": "Screw Compressor Condensing Units",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC160",
                                },
                                {
                                    "id": "mohave",
                                    "title": "Mohave Adv. Hot Gas Defrost System",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC022",
                                },
                                {
                                    "id": "two-stage",
                                    "title": "Two Stage Cond. Unite & Systems",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC023",
                                },
                                {
                                    "id": "flex-pack",
                                    "title": "FlexPack",
                                    "url": "http://heatcraftrpd.com/productcatalog/familydetail2.aspx?&FilterCol=&FilterVal=&LPNO=5&catID=HC024",
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "support",
            "title": "Support",
            "url": "http://heatcraftrpd.com/support/",
        },
        {
            "id": "training-support",
            "title": "Training & Certification",
            "url": "http://heatcraftrpd.com/training-certification",
        },
        {
            "id": "tools-resources",
            "title": "Tools & Resources",
            "url": "http://heatcraftrpd.com/tools-resources",
        },
        {
            "id": "about",
            "title": "About",
            "url": "http://heatcraftrpd.com/about",
        },
        {
            "id": "contact",
            "title": "Contact",
            "url": "http://heatcraftrpd.com/contact",
        },
        {
            "id": "the-hub",
            "title": "The HUB",
            "url": "http://www.heatcraftrpd.com/the-hub/",
            "additionalClass": "hub"
        }
    ]
;
