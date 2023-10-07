import { IconSource } from "../Icon/Icon";
import React, { ReactNode } from "react";
import { RbmComponentProps, WithChildren } from "../RbmComponentProps";
import Element = React.JSX.Element;
export type MenuItemProps<Item = undefined> = RbmComponentProps<{
    icon?: IconSource;
    iconColor?: string;
    className?: string;
    children: string | ReactNode;
    disabled?: boolean;
    active?: boolean;
} & ({
    onClick: (item: Item) => void;
    onMouseEnter?: (item: Item) => void;
    onMouseLeave?: (item: Item) => void;
    item?: undefined;
} | {
    onClick: (item: Item) => void;
    onMouseEnter?: (item: Item) => void;
    onMouseLeave?: (item: Item) => void;
    item: Item;
}), WithChildren>;
export declare const MenuItem: <Item>({ children, icon, iconColor, className, onClick, onMouseEnter, onMouseLeave, active, item, disabled, ...props }: MenuItemProps<Item>) => Element;
