import * as React from 'react';
import classNames from 'classnames';

import styles from './text.scss';
import { Recursive, ValueOf } from '../../TypeHelpers';
import { WrongChildError } from '../../WrongChildError';
import withStyles from 'isomorphic-style-loader/withStyles';

export const TEXT_PRIO = {
    primary: styles.primary,
    secondary: styles.secondary,
};

export const TEXT_SIZE = {
    medium: styles.medium,
    small: styles.small,
};

export type TextProps = {
    block?: boolean;
    prio?: ValueOf<typeof TEXT_PRIO>;
    size?: ValueOf<typeof TEXT_SIZE>;
    className?: string;
    children: Recursive<string | undefined | null | number>;
};

function Words({ className, children, block = false, prio = TEXT_PRIO.primary, size = TEXT_SIZE.medium }: TextProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other
    React.Children.forEach(children, (child) => {
        const type = typeof child;
        if (
            (type !== 'string' && type !== 'undefined' && type !== 'object' && type !== 'number') ||
            (type === 'object' && child !== null)
        ) {
            throw new WrongChildError('string, number, undefined, null', type, child, 'Text');
        }
    });

    // Render Functions
    return (
        <span className={classNames(styles.text, { [styles.block]: block }, prio, size, className)}>{children}</span>
    );
}

const tmp = React.memo(withStyles(styles)(Words)) as typeof Words;
export { tmp as Words };
