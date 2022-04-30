import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { Listener, useListener } from '../Hooks/useListener';

export type ClickableProps<OnClickData> = RbmComponentProps<
    { interactable?: boolean; style?: React.CSSProperties } & Listener<'onClick', OnClickData>
>;

let Clickable = function Clickable<OnClickData>({
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
                className={prefixClass('clickable', className)}
                onClick={realOnClick}
                tabIndex={0}
            >
                {children}
            </span>
        );
    }

    return (
        <span style={style} aria-hidden={true} className={prefixClass('clickable', className)} onClick={realOnClick}>
            {children}
        </span>
    );
};
Clickable = React.memo(Clickable) as typeof Clickable;
export { Clickable };
