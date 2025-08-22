import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
import { Block } from '../Layout/Block';
import classNames from 'classnames';
import styles from './menu.scss';
import { useEffect, useRef, useState } from 'react';
import { withRenderBrowserOnly } from '../../helper/withRenderBrowserOnly';
import { useWindow } from '../../WindowContext/WindowContext';
import { MenuItem } from "./MenuItem";
import { MenuCloseContextProvider } from "./MenuCloseContext";
import { createPortal } from "react-dom";
import { useClientLayoutEffect } from "../Hooks/useClientLayoutEffect";

export type MenuItemType = {
    label: string;
    icon?: IconSource | { icon: IconSource, color: string };
    key: string;
    className?: string;
    callback: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

export type MenuProps = RbmComponentProps<
    {
        items?: MenuItemType[];
        x: number;
        y: number;
        isOpen: boolean;
        onClose: () => void,
        offsetX?: number,
        offsetY?: number
    }
>;

export const MENU_CONTAINER_CLASS = "rbm-menu-container";

export const Menu = withMemo(
    withRenderBrowserOnly(function Menu({
                                            className,
                                            style,
                                            items,
                                            y,
                                            x,
                                            isOpen,
                                            onClose,
                                            children,
                                            offsetY = 0,
                                            offsetX = 0,
                                        }: MenuProps) {
        // Variables

        // Refs
        const menuRef = useRef<HTMLDivElement>(null);
        const window = useWindow();

        // States
        const [portalContainer] = useState<HTMLDivElement>(() => {
            return document.createElement('div');
        });

        const [innerX, setInnerX] = useState(x);
        const [innerY, setInnerY] = useState(y);

        // Selectors

        // Callbacks

        // Effects
        useEffect(() => {
            if (isOpen) {
                const listener = (e: MouseEvent | TouchEvent) => {
                    if (!menuRef.current?.contains(e.target as Node)) {
                        onClose();
                    }
                };
                window?.addEventListener('mousedown', listener, {capture: true});
                window?.addEventListener('touchstart', listener, {capture: true});
                return () => {
                    window?.removeEventListener('mousedown', listener, {capture: true});
                    window?.removeEventListener('touchstart', listener, {capture: true});
                };
            }
            return undefined;
        }, [isOpen, onClose, window]);

        useClientLayoutEffect(() => {
            if (!isOpen) {
                return;
            }
            let elem = window?.document.body.querySelector(`.${MENU_CONTAINER_CLASS}`);
            if (!elem) {
                elem = window?.document.body;
            }
            elem?.appendChild(portalContainer);
        }, [isOpen, portalContainer, window?.document.body]);

        useClientLayoutEffect(() => {
            if (!menuRef.current) {
                return undefined;
            }
            const menuElement = menuRef.current;

            const updateInnerPositions = () => {
                const computedStyle = getComputedStyle(menuElement);
                const height = parseFloat(computedStyle.height);
                let newY = y;
                if (newY > (window?.innerHeight ?? 0) - height) {
                    newY -= height + offsetY;
                }
                setInnerY(Math.max(0, newY));

                const width = parseFloat(computedStyle.width);
                let newX = x;
                if (newX > (window?.innerWidth ?? 0) - width) {
                    newX -= width + offsetX;
                }
                setInnerX(Math.max(0, newX));

            };

            const observer = new ResizeObserver(() => {
                updateInnerPositions();
            });
            observer.observe(menuElement);
            updateInnerPositions();

            return () => {
                observer.disconnect();
            };
        }, [window, x, y, offsetX, offsetY]);

        // Other

        // Render Functions
        if (!isOpen) {
            return null;
        }

        return (
            <>
                {createPortal(
                    <MenuCloseContextProvider value={onClose}>
                        <Block
                            className={classNames(className, styles.menu)}
                            style={{...style, top: innerY, left: innerX}}
                            ref={menuRef}
                            __allowChildren="all"
                        >
                            {items?.map((item) => {
                                const icon = (!!item.icon && typeof item.icon === "object" && "color" in item.icon) ? item.icon.icon : item.icon;
                                const iconColor = (!!item.icon && typeof item.icon === "object" && "color" in item.icon) ? item.icon.color : undefined;

                                return <MenuItem key={item.key}
                                                 onClick={item.callback}
                                                 className={classNames(styles.item, item.className)}
                                                 onMouseEnter={item.onMouseEnter}
                                                 icon={icon}
                                                 iconColor={iconColor}
                                                 onMouseLeave={item.onMouseLeave}>{item.label}</MenuItem>;
                            })}
                            {children}
                        </Block>
                    </MenuCloseContextProvider>
                    , portalContainer)}
            </>
        );
    }),
    styles
);
