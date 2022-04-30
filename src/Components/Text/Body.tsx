import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';

export type BodyProps = RbmComponentProps<{
    block?: boolean;
    prio?: 'primary' | 'secondary';
    size?: 'medium' | 'small' | 'large';
}>;

function Body({ className, children, block = false, prio = 'primary', size = 'medium' }: BodyProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other
    const classes = ['body'];
    if (block) classes.push('block');
    classes.push(prio);
    classes.push(size);

    // Render Functions
    return <span className={prefixClass(classes, className)}>{children}</span>;
}

const tmp = React.memo(Body) as typeof Body;
export { tmp as Body };
