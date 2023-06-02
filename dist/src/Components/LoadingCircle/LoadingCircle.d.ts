import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export type LoadingCircleProps = RbmComponentProps<{
    size?: number;
}>;
declare function LoadingCircle({ size, className, style }: LoadingCircleProps): React.JSX.Element;
declare const LoadingCircleMemo: typeof LoadingCircle;
export { LoadingCircleMemo as LoadingCircle };
