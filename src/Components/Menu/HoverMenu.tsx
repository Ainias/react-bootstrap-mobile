import {withMemo} from "../../helper/withMemo";
import React, {useCallback, useRef, useState} from "react";
import {Clickable} from "../Clickable/Clickable";
import classNames from "classnames";
import styles from "./menu.scss";
import {RbmChildWithoutString, RbmComponentProps, WithNoStringAndChildrenProps} from "../RbmComponentProps";
import {Menu} from "./Menu";

export type HoverMenuProps = RbmComponentProps<{
    items: RbmChildWithoutString,
    openToSide?: boolean;
    onClick?: () => void | boolean;
    onClose?: () => void;
}, WithNoStringAndChildrenProps>;

export const HoverMenu = withMemo(function HoverMenu({
                                                         children,
                                                         items,
                                                         className,
                                                         style,
                                                         onClick,
                                                         onClose,
                                                         openToSide
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
        const {top, left, bottom, right, width, height} = hoverItemRef.current.getBoundingClientRect();
        if (openToSide) {
            setPosition({x: right, y: top});
            setOffset({x: width, y: -height});
        } else {
            setPosition({x: left, y: bottom});
            setOffset({x: -width, y: height});
        }
    }, [openToSide]);

    const close = useCallback(() => {
        setIsOpen(false);
        onClose?.();
    }, [onClose]);

    const open = useCallback(() => {
        recalculatePosition();
        setIsOpen(true);
    }, [recalculatePosition]);

    const onClickInner = useCallback(() => {
        if (onClick?.() !== false) {
            open();
        }
    }, [onClick, open]);

    // Effects

    // Other

    // RenderFunctions

    return <Clickable
        onMouseEnter={open}
        onMouseLeave={close}
        useReactOnMouseLeave={true}
        onClick={onClickInner}
        className={classNames(styles.hoverMenu, {[styles.open]: isOpen}, className)}
        style={style}
        ref={hoverItemRef}
        __allowChildren="all"
    >
        {children}
        <Menu x={position.x} y={position.y} isOpen={true} onClose={close} offsetX={offset.x} offsetY={offset.y}
              className={classNames({[styles.hidden]: !isOpen})}>
            {items}
        </Menu>
    </Clickable>;
}, styles);
