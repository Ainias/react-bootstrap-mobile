import { RbmComponentProps, WithNoStringAndChildrenProps } from "../RbmComponentProps";
import { IconSource } from "../Icon/Icon";
import React from "react";
export type SubmenuProps = RbmComponentProps<{
    label: string;
    icon?: IconSource;
    iconColor?: string;
    disabled?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}, WithNoStringAndChildrenProps>;
export declare const Submenu: ({ children, label, icon, iconColor, className, style, disabled, onMouseEnter, onMouseLeave, }: SubmenuProps) => React.JSX.Element;
