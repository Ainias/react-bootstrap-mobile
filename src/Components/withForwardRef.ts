import React, { ForwardedRef, PropsWithoutRef, ReactElement, RefAttributes } from 'react';

export type RefComponent<PropTypes, ForwardedRefType> = (
    props: PropsWithoutRef<PropTypes> & RefAttributes<ForwardedRefType>
) => ReactElement;

export function withForwardRef<PropTypes, ForwardedRefType>(
    component: (props: PropTypes, ref: ForwardedRef<ForwardedRefType>) => ReactElement
) {
    return React.memo(React.forwardRef(component)) as RefComponent<PropTypes, ForwardedRefType>;
}
