import * as React from 'react';
import { withMemo } from '../../../helper/withMemo';
import { RbmComponentProps } from '../../RbmComponentProps';

export type ListItemProps = RbmComponentProps<Record<string, never>>;

function ListItem({ className, children, style }: ListItemProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <li className={className} style={style}>
            {children}
        </li>
    );
}

// Need ListItemMemo for autocompletion of phpstorm
const ListItemMemo = withMemo(ListItem);
export { ListItemMemo as ListItem };
