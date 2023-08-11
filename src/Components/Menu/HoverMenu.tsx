import {withMemo} from "../../helper/withMemo";
import React, {useCallback, useLayoutEffect, useRef, useState} from "react";
import {Clickable} from "../Clickable/Clickable";
import classNames from "classnames";
import styles from "./menu.scss";
import {RbmChildWithoutString, RbmComponentProps, WithNoStringAndChildrenProps} from "../RbmComponentProps";
import {Menu} from "./Menu";

export type HoverMenuProps = RbmComponentProps<{
    items: RbmChildWithoutString,
    onClick?: () => void;
}, WithNoStringAndChildrenProps>;

export const HoverMenu = withMemo(function HoverMenu({
                                                         children,
                                                         items,
                                                         className,
                                                         style,
                                                         onClick,
                                                     }: HoverMenuProps) {
    // Refs

    // States/Variables/Selectors
    const hoverItemRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [offset, setOffset] = useState({x: 0, y: 0});

    // Dispatch

    // Callbacks
    const recalculatePosition = useCallback(() => {
        if (!hoverItemRef.current) {
            return;
        }
        const {left, bottom, width, height} = hoverItemRef.current.getBoundingClientRect();
        setPosition({x: left, y: bottom});
        setOffset({x: -width, y: height});
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const open = useCallback(() => {
        recalculatePosition();
        setIsOpen(true);
    }, [recalculatePosition]);

    // Effects

    // Other

    // RenderFunctions

    return <Clickable
        onMouseEnter={open}
        onMouseLeave={close}
        onClick={onClick}
        className={classNames(styles.hoverMenu, {[styles.open]: isOpen}, className)}
        style={style}
        ref={hoverItemRef}
        __allowChildren="all"
    >
        {children}
        <Menu x={position.x} y={position.y} isOpen={true} onClose={close} offsetX={offset.x} offsetY={offset.y}>
            {items}
        </Menu>
    </Clickable>;
}, styles);
