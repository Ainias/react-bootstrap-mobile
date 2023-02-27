import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';
import { useStrictEnabled } from './useStrictEnabled';

export type DropAreaProps = RbmComponentProps<Omit<DroppableProps, 'children'>, WithNoStringAndChildrenProps>;

function DropArea({ children, style, className, ...dropProps }: DropAreaProps) {
    // Variables

    // Refs

    // States
    const enabled = useStrictEnabled();

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions
    if (!enabled) {
        return null;
    }

    return (
        <Droppable {...dropProps}>
            {({ innerRef, droppableProps }) => (
                <div {...droppableProps} ref={innerRef} style={style} className={className}>
                    {children}
                </div>
            )}
        </Droppable>
    );
}

// Need DropAreaMemo for autocompletion of phpstorm
const DropAreaMemo = withMemo(DropArea);
export { DropAreaMemo as DropArea };
