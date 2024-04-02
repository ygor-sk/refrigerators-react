import React from "react";
import {JumpLinkTargets} from "./Accordion";
import ActionLink from "../ActionLink";

export default function JumpLinks(props: { jumpLinkTargets: JumpLinkTargets, onToggleSubMenu: () => void }) {
    return <ul className="nav nav-jumplinks">
        <li className="nav-item">
            <a
                className="nav-link nav-link__selected"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
            >Overview</a
            >
        </li>
        <li className="nav-item">
            <a
                className="nav-link jump-link"
                data-toggle="collapse"
                href=""
                data-target={props.jumpLinkTargets.specifications.sectionId}
                aria-expanded="true"
                aria-controls={props.jumpLinkTargets.specifications.section}
                onClick={props.jumpLinkTargets.specifications.action}>
                Specifications
            </a>
        </li>
        <li className="nav-item">
            <a
                className="nav-link jump-link"
                data-toggle="collapse"
                href=""
                data-target={props.jumpLinkTargets.supportDocuments.sectionId}
                aria-expanded="true"
                aria-controls={props.jumpLinkTargets.supportDocuments.section}
                onClick={props.jumpLinkTargets.supportDocuments.action}>
                Support &amp; Documents
            </a>
        </li>
        <li>
            <ActionLink className="nav-link show-hide-submenu" action={props.onToggleSubMenu}>
                <i className="fa fa-plus"/>
                {' '}
                More Options
            </ActionLink>
        </li>
    </ul>;
}