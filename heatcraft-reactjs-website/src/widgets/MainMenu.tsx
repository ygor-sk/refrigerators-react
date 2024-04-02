import * as React from "react";
import {DotCmsLink} from "../app/DotCmsLink";
import ActionLink from "./ActionLink";
import {AppContext} from "../app/AppContext";
import {MainMenuNode} from "heatcraft-js-shared/lib/site";

interface MainMenuState {
    productsMenuExpanded: boolean,
    mobileMenuExpanded: boolean,
}

export default class MainMenu extends React.Component<any, MainMenuState> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            productsMenuExpanded: false,
            mobileMenuExpanded: false,
        }
    }

    private toggleProductsMenu = () => {
        this.setState((previousState) => ({productsMenuExpanded: !previousState.productsMenuExpanded}))
    }

    private toggleMobileMenu = () => {
        this.setState((previousState) => ({mobileMenuExpanded: !previousState.mobileMenuExpanded}))
    }

    private closeProductMenu = () => {
        this.setState({productsMenuExpanded: false})
    }

    MenuLink = (props: { className?: string, node: MainMenuNode }) => {
        if (props.node.url && (props.node.url.startsWith("http://") || props.node.url.startsWith("https://"))) {
            return <a href={props.node.url} className={props.className}>{props.node.title}</a>;
        } else {
            return <DotCmsLink uri={props.node.url} className={props.className}
                               onClick={this.closeProductMenu}>{props.node.title}</DotCmsLink>
        }
    }

    render() {
        return <header
            className={`primary-nav ${this.state.productsMenuExpanded ? 'expanded-mega-nav' : ''} ${this.state.mobileMenuExpanded ? "menu-showing" : ""}`}
            ref={node => {
                if (node) {
                    node.style.setProperty("position", "relative", "important");
                }
            }}
        >
            <div className="primary-nav__container">
                <div className="container">
                    <div className="row">
                        <div className="col d-flex justify-content-between flex-wrap">
                            {this.renderHeader()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col justify-content-center">
                            <AppContext.Consumer>
                                {siteInfo => this.renderMenu(siteInfo.mainMenuNode, 0)}
                            </AppContext.Consumer>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    }

    private renderHeader() {
        return <AppContext.Consumer>
            {siteInfo => <>
                <a href="/" className="logo">
                    {/*<AssetImage image={siteInfo.assets.logoImage} width="190"/>*/}
                    <img src="/application/themes/heatcraft/build/images/heatcraft-logo.svg"/>
                </a>

                <ActionLink href="#" className="d-block d-md-none mobile-menu-trigger" action={this.toggleMobileMenu}>
                    <i className="fa fa-bars"></i>
                </ActionLink>
                <div className="find-a-rep">
                    <div className="input-group mb-3 align-items-center">
                        <div className="input-group-prepend">

                            <button
                                className="btn btn-outline-secondary dropdown-toggle find-a-rep__button"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                ref={node => {
                                    if (node) {
                                        node.style.setProperty('border-radius', "8px", "important")
                                    }
                                }}
                            >
                                I need to contact a...{' '}
                            </button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" target="_blank"
                                   href="http://www.heatcraftrpd.com/contact/find-a-sales-rep.asp">Sales Rep</a>
                                <a className="dropdown-item" target="_blank"
                                   href="http://www.heatcraftrpd.com/contact/find-a-wholesaler.asp">Wholesaler</a>
                                <a className="dropdown-item" target="_blank"
                                   href="http://www.heatcraftrpd.com/contact/find-a-contractor.asp">Contractor</a>
                                <a className="dropdown-item" target="_blank"
                                   href="http://www.heatcraftrpd.com/contact/hccn-members.asp">Certified
                                    Contractor</a>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </AppContext.Consumer>;
    }

    private renderMenu(node: MainMenuNode, level: number) {
        const renderChildren = () => node.children.map(item => this.renderMenu(item, level + 1))

        switch (level) {
            case 0:
                return <nav className="primary-nav__items" key={node.id}>{renderChildren()}</nav>
            case 1:
                return <div className="primary-nav__item" key={node.id}>
                    {node.children.length == 0 ?
                        <this.MenuLink node={node} className={`primary-nav__link ${node.additionalClass ?? ""}`} key={node.id}/> :
                        <>
                            <ActionLink href={node.url || "#"}
                                        className={`primary-nav__link with-icon ${this.state.productsMenuExpanded ? 'show-submenu' : ''} ${node.additionalClass ?? ""}`}
                                        action={this.toggleProductsMenu}>
                                {node.title}
                                <i className="fa fa-chevron-down"></i>
                            </ActionLink>
                            <div className="primary-nav__mega-menu">
                                <div className="container-fluid">
                                    <div className="mega-nav">
                                        {renderChildren()}
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            case 2:
                return <div className="mega-nav__column col" key={node.id}>
                    <this.MenuLink node={node} className={`mega-nav__title ${node.additionalClass ?? ""}`}/>
                    {renderChildren()}
                </div>
            case 3:
                if (node.title) { // "All Brands" do not have 3rd level
                    return <React.Fragment key={node.id}>
                        <this.MenuLink node={node} className={node.additionalClass ?? ""}/>
                        <div className="mega-nav__sub-nav">
                            {renderChildren()}
                        </div>
                    </React.Fragment>
                } else {
                    return renderChildren();
                }
            case 4:
                return <this.MenuLink node={node} key={node.id} className={node.additionalClass ?? ""}/>
        }
        return;
    }
}
