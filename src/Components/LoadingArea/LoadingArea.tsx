import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './loadingArea.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type LoadingAreaProps = RbmComponentProps<{
    opacity?: number;
    loading: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fullSize?: boolean;
}>;

function LoadingArea({
    loading,
    fullWidth = false,
    fullSize = false,
    fullHeight = false,
    opacity = 0.65,
    className,
    style,
    children,
}: LoadingAreaProps) {
    // Variables
    if (fullSize) {
        fullHeight = true;
        fullWidth = true;
    }

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <span
            className={classNames(styles.loadingArea, className, {
                'full-height': fullHeight,
                'full-width': fullWidth,
            })}
            style={style}
        >
            {children}
            {loading ? (
                <span className={styles.curtain} style={{ opacity }}>
                    <LoadingCircle />
                </span>
            ) : null}
        </span>
    );
}

const LoadingAreaMemo = withMemo(LoadingArea, styles);
export { LoadingAreaMemo as LoadingArea };
