import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { Text, TEXT_PRIO, TEXT_SIZE } from './Text';
import { RbmComponentProps, WithStringProps } from '../RbmComponentProps';

export type HeadingProps = RbmComponentProps<{}, WithStringProps>;

function Heading({ children }: HeadingProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Text as="h1" size={TEXT_SIZE.xxlarge} prio={TEXT_PRIO.heading}>
            {children}
        </Text>
    );
}

// Need HeadingMemo for autocompletion of phpstorm
const HeadingMemo = withMemo(Heading, undefined, 'text');
export { HeadingMemo as Heading };
