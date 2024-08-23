import * as React from 'react';
import { ComponentRef, ForwardedRef, PropsWithChildren } from 'react';
import { Override } from '../../TypeHelpers';
import { withForwardRef } from "../../helper/withForwardRef";

export type ViewProps<AsType extends keyof JSX.IntrinsicElements> = PropsWithChildren<
    Override<React.ComponentPropsWithoutRef<AsType>, { as?: AsType; children?: React.ReactNode }>
>;

export const View = withForwardRef(function View<AsType extends keyof JSX.IntrinsicElements>(
    {children, as, ...otherProps}: ViewProps<AsType>,
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
    const element = (as as keyof JSX.IntrinsicElements) ?? 'span';
    const props = {
        ...otherProps,
        ref,
    };
    return React.createElement(element, props, children);
}, undefined, "all");
