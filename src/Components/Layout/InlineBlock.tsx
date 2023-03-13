import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './layout.scss';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';
import { ComponentRef, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';

export type InlineBlockProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType>
>;

function InlineBlock<AsType extends keyof JSX.IntrinsicElements = 'span'>(
    { children, as = 'span' as AsType, className, ...props }: InlineBlockProps<AsType>,
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
            {...(props as ViewWithoutListenersProps<AsType>)}
            className={classNames(styles.inlineBlock, className)}
            as={as as AsType}
            ref={ref}
        >
            {children}
        </ViewWithoutListeners>
    );
}

// Need InlineMemo for autocompletion of phpstorm
const InlineBlockMemo = withForwardRef(InlineBlock, styles);
export { InlineBlockMemo as InlineBlock };
