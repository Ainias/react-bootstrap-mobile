import React, { ComponentType } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { RESTRICT_CHILDREN, withRestrictedChildren } from './withRestrictedChildren';
import { memoComparator } from './memoComparator';

export function withMemo<C extends ComponentType<any>>(
    component: C,
    styles?: any,
    defaultAllowChildren?: typeof RESTRICT_CHILDREN['allowChildren']
) {
    const withNoStrings = withRestrictedChildren(component, defaultAllowChildren);
    const c: any = styles ? withStyles(styles)(withNoStrings) : withNoStrings;
    const memoizedComponent = React.memo(c, memoComparator) as unknown as C;
    memoizedComponent.displayName = `Memoized(${component.displayName || component.name})`;
    return memoizedComponent;
}
