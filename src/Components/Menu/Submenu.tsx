import {RbmComponentProps, WithNoStringAndChildrenProps} from "../RbmComponentProps";
import {Icon, IconSource} from "../Icon/Icon";
import {Clickable} from "../Clickable/Clickable";
import classNames from "classnames";
import styles from "./menu.scss";
import React, {useCallback, useRef, useState} from "react";
import {Text} from "../Text/Text";
import {withMemo} from "../../helper/withMemo";
import {Block} from "../Layout/Block";
import {useWindow} from "../../WindowContext/WindowContext";
import {Flex} from "../Layout/Flex";
import {Grow} from "../Layout/Grow";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {MenuCloseContextProvider, useMenuClose} from "./MenuCloseContext";

export type SubmenuProps = RbmComponentProps<{
    label: string, icon?: IconSource;
    iconColor?: string;
    disabled?: boolean;
}, WithNoStringAndChildrenProps>;

export const Submenu = withMemo(function Submenu({
                                                     children,
                                                     label,
                                                     icon,
                                                     iconColor,
                                                     className,
                                                     style,
                                                     disabled = false
                                                 }: SubmenuProps) {
    // Refs

    // States/Variables/Selectors
    const window = useWindow();
    const containerRef = useRef<HTMLDivElement>(null);
    const submenuRef = useRef<HTMLDivElement>(null);

    const [openLeft, setOpenLeft] = useState(false);
    const [openTop, setOpenTop] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Dispatch

    // Callbacks
    const recalculateSubmenuPosition = useCallback(() => {
        if (!submenuRef.current || !containerRef.current) {
            return;
        }
        const {width, height} = getComputedStyle(containerRef.current);
        const {right, top} = submenuRef.current.getBoundingClientRect();

        setOpenLeft(right + parseFloat(width) >= (window?.innerWidth ?? 0));
        setOpenTop(top + parseFloat(height) >= (window?.innerHeight ?? 0));
        setIsOpen(true);
    }, [window?.innerHeight, window?.innerWidth]);

    const closeSubmenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const closeParent = useMenuClose();
    const closeAllMenus = useCallback(() => {
        closeSubmenu();
        closeParent();
    }, [closeParent, closeSubmenu]);

    // Effects

    // Other

    // RenderFunctions

    return <MenuCloseContextProvider value={closeAllMenus}>
        <Clickable
            onMouseEnter={recalculateSubmenuPosition}
            onMouseLeave={closeSubmenu}
            className={classNames(styles.item, styles.submenu, {
                [styles.open]: isOpen,
                [styles.openLeft]: openLeft,
                [styles.openTop]: openTop,
                [styles.disabled]: disabled
            }, className)}
            style={style}
        >
            <Flex ref={submenuRef} className={classNames(styles.itemChildren)} horizontal={true}>
                {!!icon && <Icon icon={icon} color={iconColor} className={styles.icon}/>}
                <Grow><Text>{label}</Text></Grow>
                <Icon icon={faChevronRight}/>
            </Flex>
            <Block className={styles.container} __allowChildren="all" ref={containerRef}>
                {children}
            </Block>
        </Clickable>
    </MenuCloseContextProvider>;
}, styles);
