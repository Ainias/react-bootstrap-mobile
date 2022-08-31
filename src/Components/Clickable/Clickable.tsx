import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { OptionalListener, useListener } from '../Hooks/useListener';

import styles from './clickable.scss';
import classNames from 'classnames';
import { useCallback, MouseEvent, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';

type OnClickListener<Data> = OptionalListener<'onClick', Data>;

export type ClickableProps<OnClickData, HrefType extends string | undefined> = RbmComponentProps<
    { interactable?: boolean; href?: HrefType } & OnClickListener<OnClickData>
>;

function Clickable<OnClickData, HrefType extends string | undefined>(
    { className, children, interactable = true, style, href, ...clickData }: ClickableProps<OnClickData, HrefType>,
    ref: ForwardedRef<HrefType extends string ? HTMLAnchorElement : HTMLSpanElement>
) {
    // Variables

    // States

    // Refs

    // Callbacks
    const onClickInner = useListener('onClick', clickData);
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

    // Effects

    // Other

    // Render Functions
    const props = {
        style,
        role: interactable ? 'button' : undefined,
        'aria-hidden': interactable ? undefined : true,
        className: classNames(styles.clickable, className),
        onClick: realOnClick,
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
