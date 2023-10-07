import * as React from 'react';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { DraggableProps } from 'react-beautiful-dnd';
export type DragItemProps = RbmComponentProps<Omit<DraggableProps, 'children'>, WithNoStringAndChildrenProps>;
declare function DragItem({ children, className, ...dragProps }: DragItemProps): React.JSX.Element;
declare const DragItemMemo: typeof DragItem;
export { DragItemMemo as DragItem };
