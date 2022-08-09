import * as React from 'react';
import { View, ViewProps } from './View';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './layout.scss';
import { ComponentRef, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';

export type BlockProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<ViewProps<AsType>>;

function Block<AsType extends keyof JSX.IntrinsicElements = 'div'>(
    { children, as = 'div' as AsType, className, ...props }: BlockProps<AsType>,
    ref?: ForwardedRef<ComponentRef<AsType>>
) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <View className={classNames(styles.block, className)} as={as} ref={ref} {...(props as ViewProps<AsType>)}>
            {children}
        </View>
    );
}

// Need BlockMemo for autocompletion of phpstorm
const BlockMemo = withForwardRef(Block, styles);
export { BlockMemo as Block };
