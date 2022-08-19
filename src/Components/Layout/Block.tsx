import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './layout.scss';
import { ComponentRef, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';

export type BlockProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType>
>;

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
        <ViewWithoutListeners
            className={classNames(styles.block, className)}
            as={as as AsType}
            ref={ref}
            {...(props as ViewWithoutListenersProps<AsType>)}
        >
            {children}
        </ViewWithoutListeners>
    );
}

// Need BlockMemo for autocompletion of phpstorm
const BlockMemo = withForwardRef(Block, styles);
export { BlockMemo as Block };
