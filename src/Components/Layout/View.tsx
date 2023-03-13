import * as React from 'react';
import { ComponentRef, ForwardedRef, PropsWithChildren, ReactElement, RefAttributes } from 'react';
import { Override } from '../../TypeHelpers';

export type ViewProps<AsType extends keyof JSX.IntrinsicElements> = PropsWithChildren<
    Override<React.ComponentPropsWithoutRef<AsType>, { as?: AsType; children?: React.ReactNode }>
>;

function View<AsType extends keyof JSX.IntrinsicElements>(
    { children, as, ...otherProps }: ViewProps<AsType>,
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
}

// Need ViewMemo for autocompletion of phpstorm
const ViewMemo: <AsType extends keyof JSX.IntrinsicElements>(
    props: ViewProps<AsType> & RefAttributes<ComponentRef<AsType>>
) => ReactElement | null = React.memo(React.forwardRef(View));
export { ViewMemo as View };
