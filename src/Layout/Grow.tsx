import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../helper';

export type GrowProps = RbmComponentProps<{
    center?: boolean;
}>;

function Grow({ className, children, center = false }: GrowProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other
    const classes = ['grow'];
    if (center) classes.push('center');

    // Render Functions

    return <div className={prefixClass(classes, className)}>{children}</div>;
}

const tmp = React.memo(Grow) as typeof Grow;
export { tmp as Grow };
