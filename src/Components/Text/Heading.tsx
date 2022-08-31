import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { Text, TEXT_PRIO, TEXT_SIZE } from './Text';
import { RbmComponentProps, WithStringProps } from '../RbmComponentProps';

import styles from './heading.scss';
import classNames from 'classnames';

export type HeadingProps = RbmComponentProps<Record<string, never>, WithStringProps>;

function Heading({ children, className, style }: HeadingProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Text
            as="h1"
            size={TEXT_SIZE.xxlarge}
            prio={TEXT_PRIO.heading}
            className={classNames(styles.heading, className)}
            style={style}
        >
            {children}
        </Text>
    );
}

// Need HeadingMemo for autocompletion of phpstorm
const HeadingMemo = withMemo(Heading, styles, 'text');
export { HeadingMemo as Heading };
