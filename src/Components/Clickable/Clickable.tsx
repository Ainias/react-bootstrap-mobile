import * as React from 'react';
import {RbmComponentProps} from '../RbmComponentProps';
import {OptionalListener, useListener} from '../Hooks/useListener';

import styles from './clickable.scss';
import classNames from 'classnames';
import {useCallback, MouseEvent as ReactMouseEvent, ForwardedRef, useEffect, MouseEvent} from 'react';
import {withForwardRef} from '../../helper/withForwardRef';
import {useComposedRef} from "../Hooks/useComposedRef";

type OnClickListener<Data> = OptionalListener<'onClick', Data>;
type OnMouseDownListener<Data> = OptionalListener<'onMouseDown', Data>;
type OnMouseUpListener<Data> = OptionalListener<'onMouseUp', Data>;
type OnMouseMoveListener<Data> = OptionalListener<'onMouseMove', Data>;
type OnDropListener<Data> = OptionalListener<'onDrop', Data>;
type OnDragOverListener<Data> = OptionalListener<'onDragOver', Data>;

export type ClickableProps<
    OnClickData,
    OnMouseDownData,
    OnMouseMoveData,
    OnMouseUpData,
    OnClickCaptureData,
    OnDropData,
    OnDragOverData,
    OnMouseEnterData,
    OnMouseLeaveData,
    OnDoubleClickData,
    HrefType extends string | undefined
> = RbmComponentProps<
    {
        interactable?: boolean;
        href?: HrefType;
        target?: string
        preventDefault?: boolean;
        stopPropagation?: boolean;
        useReactOnMouseLeave?: boolean;
    } & OnClickListener<OnClickData> &
    OnMouseDownListener<OnMouseDownData> &
    OnMouseMoveListener<OnMouseMoveData> &
    OnMouseUpListener<OnMouseUpData> &
    OnDropListener<OnDropData> &
    OnDragOverListener<OnDragOverData> &
    OptionalListener<'onClickCapture', OnClickCaptureData> &
    OptionalListener<'onMouseEnter', OnMouseEnterData> &
    OptionalListener<'onMouseLeave', OnMouseLeaveData, MouseEvent|ReactMouseEvent> &
    OptionalListener<'onDoubleClick', OnDoubleClickData>
>;

function Clickable<
    OnClickData,
    OnMouseDownData,
    OnMouseMoveData,
    OnMouseUpData,
    OnClickCaptureData,
    OnDropData,
    OnDragOverData,
    OnMouseEnterData,
    OnMouseLeaveData,
    OnDoubleClickData,
    HrefType extends string | undefined
>(
    {
        className,
        children,
        style,
        href,
        target,
        interactable = true,
        preventDefault = false,
        stopPropagation = true,
        useReactOnMouseLeave = false,
        ...clickData
    }: ClickableProps<OnClickData, OnMouseDownData, OnMouseMoveData, OnMouseUpData, OnClickCaptureData, OnDropData, OnDragOverData,OnMouseEnterData, OnMouseLeaveData, OnDoubleClickData, HrefType>,
    ref: ForwardedRef<HrefType extends string ? HTMLAnchorElement : HTMLSpanElement>
) {
    // Variables

    // States

    // Refs
    const clickableRef = useComposedRef(ref);

    // Callbacks
    const onClickInner = useListener<'onClick', OnClickData>('onClick', clickData);
    const realOnClick = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onClick) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onClickInner(e);
            }
        },
        [clickData.onClick, onClickInner, preventDefault, stopPropagation]
    );

    const onMouseDownInner = useListener<'onMouseDown', OnMouseDownData>('onMouseDown', clickData);
    const realOnMouseDown = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onMouseDown) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onMouseDownInner(e);
            }
        },
        [clickData.onMouseDown, onMouseDownInner, preventDefault, stopPropagation]
    );

    const onMouseMoveInner = useListener<'onMouseMove', OnMouseMoveData>('onMouseMove', clickData);
    const realOnMouseMove = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onMouseMove) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onMouseMoveInner(e);
            }
        },
        [clickData.onMouseMove, onMouseMoveInner, preventDefault, stopPropagation]
    );

    const onMouseUpInner = useListener<'onMouseUp', OnMouseUpData>('onMouseUp', clickData);
    const realOnMouseUp = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onMouseUp) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onMouseUpInner(e);
            }
        },
        [clickData.onMouseUp, onMouseUpInner, preventDefault, stopPropagation]
    );

    const onClickCaptureInner = useListener<'onClickCapture', OnClickCaptureData>('onClickCapture', clickData);
    const realOnClickCapture = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onClickCapture) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onClickCaptureInner(e);
            }
        },
        [clickData.onClickCapture, onClickCaptureInner, preventDefault, stopPropagation]
    );

    const onDropInner = useListener<'onDrop', OnDropData>('onDrop', clickData);
    const realOnDrop = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onDrop) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onDropInner(e);
            }
        },
        [clickData.onDrop, onDropInner, preventDefault, stopPropagation]
    );

    const onDragOver = useListener<'onDragOver', OnDragOverData>('onDragOver', clickData);
    const realOnDragOver = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onDragOver) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onDragOver(e);
            }
        },
        [clickData.onDragOver, onDragOver, preventDefault, stopPropagation]
    );

    const onMouseEnter = useListener<'onMouseEnter', OnMouseEnterData>('onMouseEnter', clickData);
    const realOnMouseEnter = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onMouseEnter) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onMouseEnter(e);
            }
        },
        [clickData.onMouseEnter, onMouseEnter, preventDefault, stopPropagation]
    );

    const onMouseLeave = useListener<'onMouseLeave', OnMouseLeaveData>('onMouseLeave', clickData);
    const realOnMouseLeave = useCallback(
        (e: Event|ReactMouseEvent) => {
            if (clickData.onMouseLeave) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onMouseLeave(e);
            }
        },
        [clickData.onMouseLeave, onMouseLeave, preventDefault, stopPropagation]
    );

    const onDoubleClick = useListener<'onDoubleClick', OnDoubleClickData>('onDoubleClick', clickData);
    const realOnDoubleClick = useCallback(
        (e: Event|ReactMouseEvent) => {
            if (clickData.onDoubleClick) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onDoubleClick(e);
            }
        },
        [clickData.onDoubleClick, onDoubleClick, preventDefault, stopPropagation]
    );

    // Effects
    useEffect(() => {
        if (useReactOnMouseLeave) {
            return undefined;
        }
        const elem = clickableRef.current;
        elem?.addEventListener('mouseleave', realOnMouseLeave);
        return () => {
            elem?.removeEventListener('mouseleave', realOnMouseLeave);
        };
    }, [useReactOnMouseLeave, clickableRef, realOnMouseLeave]);

    // Other

    // Render Functions
    const props = {
        style,
        target,
        role: interactable ? 'button' : undefined,
        'aria-hidden': interactable ? undefined : true,
        className: classNames(styles.clickable, className),
        onClick: realOnClick,
        onMouseDown: realOnMouseDown,
        onMouseMove: realOnMouseMove,
        onMouseUp: realOnMouseUp,
        onClickCapture: realOnClickCapture,
        onDrop: realOnDrop,
        onDragOver: realOnDragOver,
        onMouseEnter: realOnMouseEnter,
        onMouseLeave: useReactOnMouseLeave ? realOnMouseLeave : undefined,
        onDoubleClick: realOnDoubleClick,
        tabIndex: interactable ? 0 : undefined,
    };
    if (typeof href === 'string') {
        return (
            <a {...props} href={href} ref={clickableRef as ForwardedRef<HTMLAnchorElement>}>
                {children}
            </a>
        );
    }
    return (
        <span {...props} ref={clickableRef as ForwardedRef<HTMLSpanElement>}>
            {children}
        </span>
    );
}

const ClickableMemo = withForwardRef(Clickable, styles);
export {ClickableMemo as Clickable};
