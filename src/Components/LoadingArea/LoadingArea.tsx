import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

export type LoadingAreaProps = RbmComponentProps<{
    opacity?: number;
    loading: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fullSize?: boolean;
}>;

export const LoadingArea = React.memo<LoadingAreaProps>(function LoadingArea({
    loading,
    fullWidth = false,
    fullSize = false,
    fullHeight = false,
    opacity = 0.65,
    className,
    children,
}) {
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
    const classes = ['loading-area'];
    const otherClasses = [className];
    if (fullHeight) otherClasses.push('full-height');
    if (fullWidth) otherClasses.push('full-width');

    // Render Functions

    return (
        <span className={prefixClass(classes, otherClasses)}>
            {children}
            {loading ? (
                <span className={prefixClass('loading-area-curtain')} style={{ opacity }}>
                    <LoadingCircle />
                </span>
            ) : null}
        </span>
    );
});
