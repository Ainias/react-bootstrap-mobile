import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

// export function withMemo<P extends Record<string, any>>(component: FunctionComponent<P>, styles?: any) {
//     const c: FunctionComponent<P> = styles ? withStyles(styles)(component) : component;
//     return React.memo(c) as FunctionComponent<P>;
// }

export function withMemo<T extends Record<string, any>>(component: T, styles?: any) {
    const c: any = styles ? withStyles(styles)(component) : component;
    return React.memo(c) as unknown as T;
}
