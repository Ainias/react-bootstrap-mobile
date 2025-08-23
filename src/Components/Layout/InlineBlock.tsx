import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';
import styles from './layout.scss';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;
import { withMemo } from "../../helper/withMemo";

export type InlineBlockProps<AsType extends keyof IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType> & {
    id?: string
    title?: string
}
>;

export const InlineBlock = withMemo(function InlineBlock<AsType extends keyof JSX.IntrinsicElements = 'span'>(
    { children, as = 'span' as AsType, className, ...props }: InlineBlockProps<AsType>,
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
        >
            {children}
        </ViewWithoutListeners>
    );
}, styles);
