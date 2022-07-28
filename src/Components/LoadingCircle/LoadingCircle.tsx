import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './loadingCircle.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type LoadingCircleProps = RbmComponentProps<{
    size?: number;
}>;

function LoadingCircle({ size = 32, className }: LoadingCircleProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <svg
            className={classNames(styles.loadingCircle, className)}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
        >
            <circle cx="50%" cy="50%" r="40%" fill="none" className={styles.spinner} />
        </svg>
    );
}

const LoadingCircleMemo = withMemo(LoadingCircle, styles);
export { LoadingCircleMemo as LoadingCircle };
