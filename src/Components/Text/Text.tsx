import * as React from 'react';
import classNames from 'classnames';

import styles from './text.scss';
import { Recursive, ValueOf } from '../../TypeHelpers';
import { WrongChildError } from '../../WrongChildError';
import withStyles from 'isomorphic-style-loader/withStyles';
import { Inline } from '../Layout/Inline';
import { ViewProps } from '../Layout/View';

export const TEXT_PRIO = {
    primary: styles.primary,
    secondary: styles.secondary,
    tertiary: styles.tertiary,
    heading: styles.heading,
};

export const TEXT_SIZE = {
    xSmall: styles.xsmall,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    xLarge: styles.xlarge,
    xxLarge: styles.xxlarge,
};

export type TextProps<AsType extends keyof JSX.IntrinsicElements> = {
    block?: boolean;
    prio?: ValueOf<typeof TEXT_PRIO>;
    size?: ValueOf<typeof TEXT_SIZE>;
    className?: string;
    children: Recursive<string | undefined | null | number>;
} & ViewProps<AsType>;

function Text<AsType extends keyof JSX.IntrinsicElements = 'span'>({
    className,
    children,
    block = false,
    prio,
    size = TEXT_SIZE.medium,
    as = 'span' as AsType,
    ...props
}: TextProps<AsType>) {
    // Variables
    prio = prio ?? styles.primaryDefault;

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
        <Inline
            __allowChildren="text"
            as={as}
            {...props}
            className={classNames(styles.text, { [styles.block]: block }, prio, size, className)}
        >
            {children}
        </Inline>
    );
}

const tmp = React.memo(withStyles(styles)(Text)) as typeof Text;
export { tmp as Text };
