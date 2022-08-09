import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { View, ViewProps } from './View';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './layout.scss';

export type InlineProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<ViewProps<AsType>>;

function Inline<AsType extends keyof JSX.IntrinsicElements = 'span'>({
    children,
    as = 'span' as AsType,
    className,
    ...props
}: InlineProps<AsType>) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <View className={classNames(styles.inline, className)} as={as} {...(props as ViewProps<AsType>)}>
            {children}
        </View>
    );
}

// Need InlineMemo for autocompletion of phpstorm
const InlineMemo = withMemo(Inline, styles);
export { InlineMemo as Inline };
