import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';
import styles from './layout.scss';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';
import { withMemo } from "../../helper/withMemo";
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export type InlineProps<AsType extends keyof IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType>
>;

export const Inline = withMemo(function Inline<AsType extends keyof JSX.IntrinsicElements = 'span'>(
    { children, as = 'span' as AsType, className, ...props }: InlineProps<AsType>,
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
        >
            {children}
        </ViewWithoutListeners>
    );
}, styles);
