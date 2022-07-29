import React, { ForwardedRef, PropsWithoutRef, ReactElement, RefAttributes } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

export type RefComponent<PropTypes, ForwardedRefType> = (
    props: PropsWithoutRef<PropTypes> & RefAttributes<ForwardedRefType>
) => ReactElement;

export function withForwardRef<PropTypes, ForwardedRefType>(
    component: (props: PropTypes, ref: ForwardedRef<ForwardedRefType>) => ReactElement,
    styles?: any
) {
    const c: (props: PropTypes, ref: ForwardedRef<ForwardedRefType>) => ReactElement = styles
        ? withStyles(styles)(React.forwardRef(component))
        : React.forwardRef(component);

    return React.memo(c) as RefComponent<PropTypes, ForwardedRefType>;
}
