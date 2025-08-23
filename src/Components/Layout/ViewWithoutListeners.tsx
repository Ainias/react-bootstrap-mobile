import * as React from 'react';
import { DOMAttributes, ForwardedRef } from 'react';
import { View, ViewProps } from './View';
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;
import { withMemo } from "../../helper/withMemo";

export type ViewWithoutListenersProps<AsType extends keyof IntrinsicElements> = Omit<
    ViewProps<AsType>,
    keyof DOMAttributes<AsType>
> & { children?: React.ReactNode, dangerouslySetInnerHTML?: {
        // Should be InnerHTML['innerHTML'].
        // But unfortunately we're mixing renderer-specific type declarations.
        __html: string | TrustedHTML;
    } | undefined;   };

export const ViewWithoutListeners = withMemo(function ViewWithoutListeners<AsType extends keyof JSX.IntrinsicElements>(
    { children,ref, ...props }: ViewWithoutListenersProps<AsType>,
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
        <View {...props} ref={ref as ForwardedRef<SVGElement|HTMLElement>}>
            {children}
        </View>
    );
}, undefined, "all");
