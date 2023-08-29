import * as React from 'react';
import {withMemo} from '../../helper/withMemo';
import {RbmComponentProps, WithNoStringAndChildrenProps} from '../RbmComponentProps';
import {Draggable, DraggableProps} from 'react-beautiful-dnd';

export type DragItemProps = RbmComponentProps<Omit<DraggableProps, 'children'>, WithNoStringAndChildrenProps>;

function DragItem({children, className, ...dragProps}: DragItemProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Draggable {...dragProps}>
            {({innerRef, dragHandleProps, draggableProps}) => (
                <div className={className} {...draggableProps} {...dragHandleProps} ref={innerRef}>
                    {children}
                </div>
            )}
        </Draggable>
    );
}

// Need DragItemMemo for autocompletion of phpstorm
const DragItemMemo = withMemo(DragItem);
export {DragItemMemo as DragItem};
