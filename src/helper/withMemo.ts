import React, { FunctionComponent } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

export function withMemo<P extends Record<string, any>>(component: FunctionComponent<P>, styles?: any) {
    const c: FunctionComponent<P> = styles ? withStyles(styles)(component) : component;
    return React.memo(c) as FunctionComponent<P>;
}
