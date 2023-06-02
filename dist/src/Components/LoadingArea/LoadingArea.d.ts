import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export type LoadingAreaProps = RbmComponentProps<{
    opacity?: number;
    loading: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fullSize?: boolean;
}>;
declare function LoadingArea({ loading, fullWidth, fullSize, fullHeight, opacity, className, style, children, }: LoadingAreaProps): React.JSX.Element;
declare const LoadingAreaMemo: typeof LoadingArea;
export { LoadingAreaMemo as LoadingArea };
