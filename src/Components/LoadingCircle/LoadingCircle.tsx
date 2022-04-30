import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';

export type LoadingCircleProps = RbmComponentProps<{
    size?: number;
}>;

export const LoadingCircle = React.memo(function LoadingCircle({ size = 32, className }: LoadingCircleProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <svg
            className={prefixClass('loading-circle', className)}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
        >
            <circle cx="50%" cy="50%" r="40%" fill="none" className={prefixClass('loading-circle-spinner')} />
        </svg>
    );
});
