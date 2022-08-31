import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './layout.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type GrowProps = RbmComponentProps<{
    center?: boolean;
}>;

function Grow({ className, children, center = false, style }: GrowProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions
    return (
        <div className={classNames(styles.grow, { [styles.center]: center }, className)} style={style}>
            {children}
        </div>
    );
}

const tmp = withMemo(Grow, styles);
export { tmp as Grow };
