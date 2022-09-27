/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type LoadingAreaProps = RbmComponentProps<{
    opacity?: number;
    loading: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    fullSize?: boolean;
}>;
declare function LoadingArea({ loading, fullWidth, fullSize, fullHeight, opacity, className, style, children, }: LoadingAreaProps): JSX.Element;
declare const LoadingAreaMemo: typeof LoadingArea;
export { LoadingAreaMemo as LoadingArea };
