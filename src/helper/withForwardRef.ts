import React, { ForwardedRef, ForwardRefRenderFunction, PropsWithoutRef, ReactElement, RefAttributes } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { RESTRICT_CHILDREN, withRestrictedChildren } from './withRestrictedChildren';
import { memoComparator } from './memoComparator';

export interface RefComponent<PropTypes, ForwardedRefType> {
    (props: PropsWithoutRef<PropTypes> & RefAttributes<ForwardedRefType>): ReactElement | null;

    displayName?: string | undefined;
}

export function withForwardRef<PropTypes, ForwardedRefType>(
    component: ForwardRefRenderFunction<ForwardedRefType, PropTypes>,
    styles?: any,
    defaultAllowChildren?: typeof RESTRICT_CHILDREN['allowChildren']
) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const forwardedComp = React.forwardRef(withRestrictedChildren(React.forwardRef(component), defaultAllowChildren));
    const c: (props: PropTypes, ref: ForwardedRef<ForwardedRefType>) => ReactElement = styles
        ? withStyles(styles)(forwardedComp)
        : forwardedComp;

    const memoizedComponent = React.memo(c, memoComparator) as RefComponent<PropTypes, ForwardedRefType>;
    memoizedComponent.displayName = `Memoized-Forwarded(${component.displayName || component.name})`;

    return memoizedComponent;
}
