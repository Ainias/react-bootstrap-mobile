import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { OptionalListener, useListener } from '../Hooks/useListener';

import styles from './clickable.scss';
import classNames from 'classnames';
import { useCallback, MouseEvent, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';

type OnClickListener<Data> = OptionalListener<'onClick', Data>;
type OnMouseDownListener<Data> = OptionalListener<'onMouseDown', Data>;
type OnMouseUpListener<Data> = OptionalListener<'onMouseUp', Data>;
type OnMouseMoveListener<Data> = OptionalListener<'onMouseMove', Data>;

export type ClickableProps<
    OnClickData,
    OnMouseDownData,
    OnMouseMoveData,
    OnMouseUpData,
    HrefType extends string | undefined
> = RbmComponentProps<
    { interactable?: boolean; href?: HrefType } & OnClickListener<OnClickData> &
        OnMouseDownListener<OnMouseDownData> &
        OnMouseMoveListener<OnMouseMoveData> &
        OnMouseUpListener<OnMouseUpData>
>;

function Clickable<OnClickData, OnMouseDownData, OnMouseMoveData, OnMouseUpData, HrefType extends string | undefined>(
    {
        className,
        children,
        interactable = true,
        style,
        href,
        ...clickData
    }: ClickableProps<OnClickData, OnMouseDownData, OnMouseMoveData, OnMouseUpData, HrefType>,
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
                e.stopPropagation();
                e.preventDefault();
                onClickInner(e);
            }
        },
        [clickData.onClick, onClickInner]
    );

    const onMouseDownInner = useListener<'onMouseDown', OnMouseDownData>('onMouseDown', clickData);
    const realOnMouseDown = useCallback(
        (e: MouseEvent) => {
            if (clickData.onMouseDown) {
                e.stopPropagation();
                e.preventDefault();
                onMouseDownInner(e);
            }
        },
        [clickData.onMouseDown, onMouseDownInner]
    );

    const onMouseMoveInner = useListener<'onMouseMove', OnMouseMoveData>('onMouseMove', clickData);
    const realOnMouseMove = useCallback(
        (e: MouseEvent) => {
            if (clickData.onMouseMove) {
                e.stopPropagation();
                e.preventDefault();
                onMouseMoveInner(e);
            }
        },
        [clickData.onMouseMove, onMouseMoveInner]
    );

    const onMouseUpInner = useListener<'onMouseUp', OnMouseUpData>('onMouseUp', clickData);
    const realOnMouseUp = useCallback(
        (e: MouseEvent) => {
            if (clickData.onMouseUp) {
                e.stopPropagation();
                e.preventDefault();
                onMouseUpInner(e);
            }
        },
        [clickData.onMouseUp, onMouseUpInner]
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
export { ClickableMemo as Clickable };
