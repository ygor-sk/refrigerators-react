import React, {CSSProperties, MouseEventHandler, ReactNode} from "react";
import {Link} from "react-router-dom";
import {dotCmsContext} from "../lib/dotCmsContext";

export interface DotCmsLinkProps {
    uri: string, // TODO: rename to "to"
    children: ReactNode,
    id?: string
    className?: string,
    role?: string,
    style?: CSSProperties,
    onClick?: MouseEventHandler,
}

export function DotCmsLink(props: DotCmsLinkProps) {
    const {uri, ...restOfProps} = props;
    if (dotCmsContext.editMode) {
        return <a href={uri} {...restOfProps}/>
    } else {
        return <Link to={uri || ""} {...restOfProps}/>
    }
}