import React, { ComponentType, ForwardedRef, useEffect, useState } from 'react';

export function withRenderBrowserOnly<C extends ComponentType<any>>(Component: C) {
    type RefType = React.ComponentRef<C>;
    type Props = React.ComponentProps<C>;

    const displayName = `WithRenderBrowserOnly(${Component.displayName || Component.name})`;

    function HocComponent({ children, ...props }: Props, ref?: ForwardedRef<RefType>) {
        const [isBrowser, setIsBrowser] = useState(false);

        useEffect(() => setIsBrowser(true), []);
        if (!isBrowser) {
            return null;
        }

        const newProps: Record<string, any> = props;
        if (ref && Object.keys(ref).length > 0) {
            newProps.ref = ref;
        }

        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Component {...(newProps as Props)}>{children}</Component>
        );
    }
    HocComponent.displayName = displayName;
    return HocComponent as C;
}
