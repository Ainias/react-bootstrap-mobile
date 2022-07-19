import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './text.scss';
import { ValueOf } from '../../TypeHelpers';

export const TEXT_PRIO = {
    primary: styles.primary,
    secondary: styles.secondary,
};

export const TEXT_SIZE = {
    medium: styles.medium,
    small: styles.small,
};

export type TextProps = RbmComponentProps<{
    block?: boolean;
    prio?: ValueOf<typeof TEXT_PRIO>;
    size?: ValueOf<typeof TEXT_SIZE>;
}>;

function Text({ className, children, block = false, prio = TEXT_PRIO.primary, size = TEXT_SIZE.medium }: TextProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions
    return (
        <span className={classNames(styles.text, { [styles.block]: block }, prio, size, className)}>{children}</span>
    );
}

const tmp = React.memo(Text) as typeof Text;
export { tmp as Body };
