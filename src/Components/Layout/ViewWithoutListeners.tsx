import * as React from 'react';
import { ComponentRef, DOMAttributes, ForwardedRef, ReactElement, RefAttributes } from 'react';
import { View, ViewProps } from './View';

export type ViewWithoutListenersProps<AsType extends keyof JSX.IntrinsicElements> = Omit<
    ViewProps<AsType>,
    keyof DOMAttributes<AsType>
> & { children?: React.ReactNode, dangerouslySetInnerHTML?: {
        // Should be InnerHTML['innerHTML'].
        // But unfortunately we're mixing renderer-specific type declarations.
        __html: string | TrustedHTML;
    } | undefined;   };

function ViewWithoutListeners<AsType extends keyof JSX.IntrinsicElements>(
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
}

// Need ViewWithoutListenersMemo for autocompletion of phpstorm
const ViewWithoutListenersMemo: <AsType extends keyof JSX.IntrinsicElements>(
    props: ViewWithoutListenersProps<AsType> & RefAttributes<ComponentRef<AsType>>
) => ReactElement | null = React.memo(React.forwardRef(ViewWithoutListeners));
export { ViewWithoutListenersMemo as ViewWithoutListeners };
