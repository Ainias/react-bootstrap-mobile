import React from "react";
import { RbmChildWithoutString, RbmComponentProps, WithNoStringAndChildrenProps } from "../RbmComponentProps";
export type HoverMenuProps = RbmComponentProps<{
    items: RbmChildWithoutString;
    openToSide?: boolean;
    onClick?: () => void | boolean;
    onClose?: () => void;
}, WithNoStringAndChildrenProps>;
export declare const HoverMenu: ({ children, items, className, style, onClick, onClose, openToSide }: HoverMenuProps) => React.JSX.Element;
