import React from "react";

export default function SubMenu(props: {visible: boolean}) {
    return <div className={`tab-sub-menu ${props.visible ? "active-menu" : ""}`}>
        <a href="#" className="tab-sub-menu__link">Regulatory</a>
        {' '}
        <a href="#" className="tab-sub-menu__link">Submittals</a>
        {' '}
        <a href="#" className="tab-sub-menu__link">Product Availability &amp; Lead Time</a>
        {' '}
        <a href="#" className="tab-sub-menu__link">Parts Lookup</a>
    </div>;
}