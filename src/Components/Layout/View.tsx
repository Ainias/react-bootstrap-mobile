import * as React from 'react';
import { ComponentRef, ForwardedRef, PropsWithChildren } from 'react';
import { Override } from '../../TypeHelpers';
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;
import { withMemo } from "../../helper/withMemo";

export type ViewProps<AsType extends keyof IntrinsicElements> = PropsWithChildren<
    Override<React.ComponentPropsWithoutRef<AsType>, { as?: AsType; children?: React.ReactNode, ref?: ForwardedRef<ComponentRef<AsType>> }>
>;

export const View = withMemo(function View<AsType extends keyof JSX.IntrinsicElements>(
    {children, as,ref, ...otherProps}: ViewProps<AsType>
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
