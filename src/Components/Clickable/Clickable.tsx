import * as React from 'react';
import {RbmComponentProps} from '../RbmComponentProps';
import {OptionalListener, useListener} from '../Hooks/useListener';

import styles from './clickable.scss';
import classNames from 'classnames';
import {
    useCallback,
    MouseEvent as ReactMouseEvent,
    ForwardedRef,
    useEffect,
    MouseEvent,
    PointerEvent,
    useRef
} from 'react';
import {withForwardRef} from '../../helper/withForwardRef';
import {useComposedRef} from "../Hooks/useComposedRef";

type OnClickListener<Data> = OptionalListener<'onClick', Data>;
type OnPointerDownListener<Data> = OptionalListener<'onPointerDown', Data, PointerEvent>;
type OnPointerUpListener<Data> = OptionalListener<'onPointerUp', Data, PointerEvent>;
type OnPointerMoveListener<Data> = OptionalListener<'onPointerMove', Data, PointerEvent>;
type OnDropListener<Data> = OptionalListener<'onDrop', Data>;
type OnDragStartListener<Data> = OptionalListener<'onDragStart', Data>;
type OnDragOverListener<Data> = OptionalListener<'onDragOver', Data>;

export type ClickableProps<
    OnClickData,
    OnMouseDownData,
    OnMouseMoveData,
    OnMouseUpData,
    OnClickCaptureData,
    OnDropData,
    OnDragStartData,
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
        id?: string;
        tabIndex?: number;
        draggable?: boolean
        title?: string;
    } & OnClickListener<OnClickData> &
    OnPointerDownListener<OnMouseDownData> &
    OnPointerMoveListener<OnMouseMoveData> &
    OnPointerUpListener<OnMouseUpData> &
    OnDropListener<OnDropData> &
    OnDragStartListener<OnDragStartData> &
    OnDragOverListener<OnDragOverData> &
    OptionalListener<'onClickCapture', OnClickCaptureData> &
    OptionalListener<'onMouseEnter', OnMouseEnterData> &
    OptionalListener<'onMouseLeave', OnMouseLeaveData, MouseEvent|ReactMouseEvent> &
    OptionalListener<'onDoubleClick', OnDoubleClickData>
>;

function Clickable<
    OnClickData,
    OnPointerDownData,
    OnPointerMoveData,
    OnPointerUpData,
    OnClickCaptureData,
    OnDropData,
    OnDragStartData,
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
        id,
        interactable = true,
        preventDefault = false,
        stopPropagation = true,
        useReactOnMouseLeave = false,
        tabIndex,
        draggable,
        title,
        ...clickData
    }: ClickableProps<OnClickData, OnPointerDownData, OnPointerMoveData, OnPointerUpData, OnClickCaptureData, OnDropData,OnDragStartData, OnDragOverData,OnMouseEnterData, OnMouseLeaveData, OnDoubleClickData, HrefType>,
    ref: ForwardedRef<HrefType extends string ? HTMLAnchorElement : HTMLSpanElement>
) {
    // Variables

    // States

    // Refs
    const clickableRef = useRef<HrefType extends string ? HTMLAnchorElement : HTMLSpanElement>(null);
    const refSetter = useComposedRef(ref, clickableRef);

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

    const onPointerDownInner = useListener<'onPointerDown', OnPointerDownData>('onPointerDown', clickData);
    const realOnPointerDown = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onPointerDown) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onPointerDownInner(e);
            }
        },
        [clickData.onPointerDown, onPointerDownInner, preventDefault, stopPropagation]
    );

    const onPointerMoveInner = useListener<'onPointerMove', OnPointerMoveData>('onPointerMove', clickData);
    const realOnPointerMove = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onPointerMove) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onPointerMoveInner(e);
            }
        },
        [clickData.onPointerMove, onPointerMoveInner, preventDefault, stopPropagation]
    );

    const onPointerUpInner = useListener<'onPointerUp', OnPointerUpData>('onPointerUp', clickData);
    const realOnPointerUp = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onPointerUp) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onPointerUpInner(e);
            }
        },
        [clickData.onPointerUp, onPointerUpInner, preventDefault, stopPropagation]
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

    const onDragStartListener = useListener<'onDragStart', OnDragStartData>('onDragStart', clickData);
    const realOnDragStartListener = useCallback(
        (e: ReactMouseEvent) => {
            if (clickData.onDragStart) {
                if (stopPropagation) {
                    e.stopPropagation();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
                onDragStartListener(e);
            }
        },
        [clickData.onDragStart, onDragStartListener, preventDefault, stopPropagation]
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
        id,
        role: interactable ? 'button' : undefined,
        'aria-hidden': interactable ? undefined : true,
        className: classNames(styles.clickable, className),
        onClick: realOnClick,
        onPointerDown: realOnPointerDown,
        onPointerMove: realOnPointerMove,
        onPointerUp: realOnPointerUp,
        onClickCapture: realOnClickCapture,
        onDrop: realOnDrop,
        onDragOver: realOnDragOver,
        onMouseEnter: realOnMouseEnter,
        onMouseLeave: useReactOnMouseLeave ? realOnMouseLeave : undefined,
        onDoubleClick: realOnDoubleClick,
        tabIndex: interactable ? 0 : tabIndex,
        draggable,
        onDragStart: realOnDragStartListener,
        title,
    };
    if (typeof href === 'string') {
        return (
            <a {...props} className={classNames(styles.link, props.className)} href={href} ref={refSetter as ForwardedRef<HTMLAnchorElement>}>
                {children}
            </a>
        );
    }
    return (
        <span {...props} ref={refSetter as ForwardedRef<HTMLSpanElement>}>
            {children}
        </span>
    );
}

const ClickableMemo = withForwardRef(Clickable, styles);
export {ClickableMemo as Clickable};
