import * as React from 'react';
import { ComponentRef, DOMAttributes, ForwardedRef } from 'react';
import { View, ViewProps } from './View';
import { withMemo } from "../../helper/withMemo";
import { withForwardRef } from "../../helper/withForwardRef";

export type ViewWithoutListenersProps<AsType extends keyof JSX.IntrinsicElements> = Omit<
    ViewProps<AsType>,
    keyof DOMAttributes<AsType>
> & { children?: React.ReactNode, dangerouslySetInnerHTML?: {
        // Should be InnerHTML['innerHTML'].
        // But unfortunately we're mixing renderer-specific type declarations.
        __html: string | TrustedHTML;
    } | undefined;   };

export const ViewWithoutListeners = withForwardRef(function ViewWithoutListeners<AsType extends keyof JSX.IntrinsicElements>(
    { children, ...props }: ViewWithoutListenersProps<AsType>,
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
        <View {...props} ref={ref}>
            {children}
        </View>
    );
}, undefined, "all");
