import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';
import styles from './layout.scss';
import { ComponentRef, ForwardedRef } from 'react';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';
import { withMemo } from "../../helper/withMemo";
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export type BlockProps<AsType extends keyof IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType> & {
    ref?: ForwardedRef<ComponentRef<AsType>>
}
>;

export const Block = withMemo(function Block<AsType extends keyof JSX.IntrinsicElements = 'div'>(
    { children, as = 'div' as AsType, className, ref, ...props }: BlockProps<AsType>,
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
}, styles);
