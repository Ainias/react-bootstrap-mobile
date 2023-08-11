import * as React from 'react';
import {RbmComponentProps} from '../RbmComponentProps';
import {OptionalListener, useListener} from '../Hooks/useListener';

import styles from './clickable.scss';
import classNames from 'classnames';
import {useCallback, MouseEvent, ForwardedRef} from 'react';
import {withForwardRef} from '../../helper/withForwardRef';

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
    HrefType extends string | undefined
> = RbmComponentProps<
    {
        interactable?: boolean;
        href?: HrefType;
        preventDefault?: boolean;
        stopPropagation?: boolean;
    } & OnClickListener<OnClickData> &
    OnMouseDownListener<OnMouseDownData> &
    OnMouseMoveListener<OnMouseMoveData> &
    OnMouseUpListener<OnMouseUpData> &
    OnDropListener<OnDropData> &
    OnDragOverListener<OnDragOverData> &
    OptionalListener<'onClickCapture', OnClickCaptureData> &
    OptionalListener<'onMouseEnter', OnMouseEnterData> &
    OptionalListener<'onMouseLeave', OnMouseLeaveData>
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
    HrefType extends string | undefined
>(
    {
        className,
        children,
        style,
        href,
        interactable = true,
        preventDefault = false,
        stopPropagation = true,
        ...clickData
    }: ClickableProps<OnClickData, OnMouseDownData, OnMouseMoveData, OnMouseUpData, OnClickCaptureData, OnDropData, OnDragOverData,OnMouseEnterData, OnMouseLeaveData, HrefType>,
    ref: ForwardedRef<HrefType extends string ? HTMLAnchorElement : HTMLSpanElement>
) {
    // Variables

    // States

    // Refs

    // Callbacks
    const onClickInner = useListener<'onClick', OnClickData>('onClick', clickData);
    const realOnClick = useCallback(
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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
        (e: MouseEvent) => {
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

    // Effects

    // Other

    // Render Functions
    const props = {
        style,
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
        onMouseLeave: realOnMouseLeave,
        tabIndex: interactable ? 0 : undefined,
    };
    if (typeof href === 'string') {
        return (
            <a {...props} href={href} ref={ref as ForwardedRef<HTMLAnchorElement>}>
                {children}
            </a>
        );
    }
    return (
        <span {...props} ref={ref as ForwardedRef<HTMLSpanElement>}>
            {children}
        </span>
    );
}

const ClickableMemo = withForwardRef(Clickable, styles);
export {ClickableMemo as Clickable};
