import * as React from 'react';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { DroppableProps } from 'react-beautiful-dnd';
export type DropAreaProps = RbmComponentProps<Omit<DroppableProps, 'children'>, WithNoStringAndChildrenProps>;
declare function DropArea({ children, style, className, ...dropProps }: DropAreaProps): React.JSX.Element | null;
declare const DropAreaMemo: typeof DropArea;
export { DropAreaMemo as DropArea };
