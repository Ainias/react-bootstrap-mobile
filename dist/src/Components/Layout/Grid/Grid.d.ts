import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
export type GridProps = RbmComponentProps<{
    columns?: number;
    rows?: number;
}>;
declare function Grid({ style, children, columns, rows, className, __allowChildren }: GridProps): React.JSX.Element;
declare const GridMemo: typeof Grid;
export { GridMemo as Grid };
