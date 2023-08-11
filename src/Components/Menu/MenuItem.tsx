import {Icon, IconSource} from "../Icon/Icon";
import {withMemo} from "../../helper/withMemo";
import {Clickable} from "../Clickable/Clickable";
import classNames from "classnames";
import styles from "./menu.scss";
import {Text} from "../Text/Text";
import React, {ReactNode, useCallback} from "react";
import {RbmComponentProps, WithChildren} from "../RbmComponentProps";
import Element = React.JSX.Element;
import {useMenuClose} from "./MenuCloseContext";
import {Block} from "../Layout/Block";

export type MenuItemProps<Item = undefined> = RbmComponentProps<{
    icon?: IconSource;
    iconColor?: string;
    className?: string;
    children: string | ReactNode
    disabled?: boolean;
    active?: boolean;
} & ({
    onClick: (item: Item) => void;
    onMouseEnter?: (item: Item) => void;
    onMouseLeave?: (item: Item) => void;
    item?: undefined
} | {
    onClick: (item: Item) => void;
    onMouseEnter?: (item: Item) => void;
    onMouseLeave?: (item: Item) => void;
    item: Item
}), WithChildren>

export const MenuItem = withMemo(function MenuItem<Item>({
                                                             children,
                                                             icon,
                                                             iconColor,
                                                             className,
                                                             onClick,
                                                             onMouseEnter,
                                                             onMouseLeave,
                                                             active,
                                                             item,
                                                             disabled = false,
                                                             ...props
                                                         }: MenuItemProps<Item>) {
    // Refs

    // States/Variables/Selectors
    const close = useMenuClose();

    // Dispatch

    // Callbacks
    const onClickInner = useCallback(() => {
        if (disabled) {
            return;
        }
        onClick(item as Item);
        close();
    }, [close, disabled, item, onClick]);

    const onMouseEnterInner = useCallback(() => {
        if (disabled) {
            return;
        }
        onMouseEnter?.(item as Item);
    }, [disabled, item, onMouseEnter]);

    const onMouseLeaveInner = useCallback(() => {
        if (disabled) {
            return;
        }
        onMouseLeave?.(item as Item);
    }, [disabled, item, onMouseLeave]);

    // Effects

    // Other
    const childElements = typeof children === "string" ? <Text>{children}</Text> : children as Element;

    // RenderFunctions

    return <Clickable
        className={classNames(styles.item, {[styles.disabled]: disabled, [styles.active]: active}, className)}
        {...props}
        onClick={onClickInner}
        onMouseEnter={onMouseEnterInner}
        onMouseLeave={onMouseLeaveInner}
        __allowChildren="all"
    >
        <Block className={classNames(styles.itemChildren)}>
            {!!icon && <Icon icon={icon} color={iconColor} className={styles.icon}/>}
            {childElements}
        </Block>
    </Clickable>;
}, styles, "text");
