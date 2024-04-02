import React from "react";

export default function ActionLink(props: Omit<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "onClick"> & { action: () => void }) {
    const {action, ...restOfProps} = props;

    function actionLinkOnClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        action();
    }

    return <a {...restOfProps} onClick={actionLinkOnClick}/>
}