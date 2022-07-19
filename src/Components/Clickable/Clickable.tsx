import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { Listener, useListener } from '../Hooks/useListener';

import styles from './clickable.scss';
import classNames from 'classnames';
import { withMemo } from '../../helper/withMemo';

export type ClickableProps<OnClickData> = RbmComponentProps<
    { interactable?: boolean; style?: React.CSSProperties } & Listener<'onClick', OnClickData>
>;

function Clickable<OnClickData>({
    className,
    children,
    interactable = true,
    style,
    ...clickData
}: ClickableProps<OnClickData>) {
    // Variables

    // States

    // Refs

    // Callbacks
    const realOnClick = useListener('onClick', clickData);

    // Effects

    // Other

    // Render Functions
    if (interactable) {
        return (
            <span
                style={style}
                role="button"
                className={classNames(styles.clickable, className)}
                onClick={realOnClick}
                tabIndex={0}
            >
                {children}
            </span>
        );
    }

    return (
        <span
            style={style}
            aria-hidden={true}
            className={classNames(styles.clickable, className)}
            onClick={realOnClick}
        >
            {children}
        </span>
    );
}

const ClickableMemo = withMemo(Clickable, styles);
export { ClickableMemo as Clickable };
