import React, { ComponentType, ForwardedRef } from 'react';
import { RbmComponentProps } from '../Components/RbmComponentProps';
import { WrongChildError } from '../WrongChildError';

export const RESTRICT_CHILDREN = {
    allowChildren: undefined as undefined | 'all' | 'html' | 'text',
};

export function withRestrictedChildren<C extends ComponentType<RbmComponentProps<Record<string, any>>>>(
    Component: C,
    defaultAllowChildren?: typeof RESTRICT_CHILDREN['allowChildren']
) {
    type RefType = React.ComponentRef<C>;
    type Props = React.ComponentProps<C>;

    const displayName = `WithRestrictedChildren(${Component.displayName || Component.name})`;

    const hocComponent = (
        { children, __allowChildren = defaultAllowChildren ?? RESTRICT_CHILDREN.allowChildren, ...otherProps }: Props,
        ref?: ForwardedRef<RefType>
    ) => {
        if (__allowChildren !== 'all') {
            if (__allowChildren !== 'html') {
                React.Children.forEach(children, (c) => {
                    if (c && typeof c === 'object' && 'type' in c && typeof c.type === 'string') {
                        throw new WrongChildError('No HTML Elements', 'HTML Elements', c, displayName);
                    }
                });
            }
            if (__allowChildren !== 'text') {
                React.Children.forEach(children, (c) => {
                    if (typeof c === 'string') {
                        throw new WrongChildError('Not String', 'string', c, displayName);
                    }
                });
            }
        }

        const newProps: Record<string, any> = otherProps;

        if (ref && Object.keys(ref).length > 0) {
            newProps.ref = ref;
        }

        return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Component {...(newProps as Props)}>{children}</Component>
        );
    };
    hocComponent.displayName = displayName;
    return hocComponent as C;
}
