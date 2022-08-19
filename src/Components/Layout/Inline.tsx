import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './layout.scss';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';
import { withForwardRef } from '../../helper/withForwardRef';
import { ComponentRef, ForwardedRef } from 'react';

export type InlineProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType>
>;

function Inline<AsType extends keyof JSX.IntrinsicElements = 'span'>(
    { children, as = 'span' as AsType, className, ...props }: InlineProps<AsType>,
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
            className={classNames(styles.inline, className)}
            as={as as AsType}
            {...(props as ViewWithoutListenersProps<AsType>)}
            ref={ref}
        >
            {children}
        </ViewWithoutListeners>
    );
}

// Need InlineMemo for autocompletion of phpstorm
const InlineMemo = withForwardRef(Inline, styles);
export { InlineMemo as Inline };
