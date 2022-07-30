import React, { ComponentType } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { withRestrictedChildren } from './withRestrictedChildren';

export function withMemo<C extends ComponentType<any>>(component: C, styles?: any) {
    const withNoStrings = withRestrictedChildren(component);
    const c: any = styles ? withStyles(styles)(withNoStrings) : withNoStrings;
    const memoizedComponent = React.memo(c) as unknown as C;
    memoizedComponent.displayName = `Memoized(${component.displayName || component.name})`;
    return memoizedComponent;
}