/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type LoadingCircleProps = RbmComponentProps<{
    size?: number;
}>;
declare function LoadingCircle({ size, className }: LoadingCircleProps): JSX.Element;
declare const LoadingCircleMemo: typeof LoadingCircle;
export { LoadingCircleMemo as LoadingCircle };
