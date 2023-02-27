import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './layout.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type GrowProps = RbmComponentProps<{
    center?: boolean;
    weight?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}>;

function Grow({ className, children, center = false, style, weight = 1 }: GrowProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions
    return (
        <div
            className={classNames(
                styles.grow,
                {
                    [styles.center]: center,
                    [styles.weight0]: weight === 0,
                    [styles.weight1]: weight === 1,
                    [styles.weight2]: weight === 2,
                    [styles.weight3]: weight === 3,
                    [styles.weight4]: weight === 4,
                    [styles.weight5]: weight === 5,
                    [styles.weight6]: weight === 6,
                },
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
}

const tmp = withMemo(Grow, styles);
export { tmp as Grow };
