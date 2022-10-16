/// <reference types="react" />
import { RbmComponentProps } from '../../RbmComponentProps';
export declare type GridProps = RbmComponentProps<{
    columns?: number;
    rows?: number;
}>;
declare function Grid({ style, children, columns, rows, className, __allowChildren }: GridProps): JSX.Element;
declare const GridMemo: typeof Grid;
export { GridMemo as Grid };
