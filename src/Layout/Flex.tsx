import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../helper';

export type FlexProps = RbmComponentProps<{
    vertical?: boolean;
}>;

function Flex({ className, children, vertical = false }: FlexProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other
    const classes = ['flex'];
    if (vertical) {
        classes.push('vertical');
    }

    // Render Functions

    return <div className={prefixClass(classes, className)}>{children}</div>;
}

const tmp = React.memo(Flex) as typeof Flex;
export { tmp as Flex };
