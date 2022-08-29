import * as React from 'react';
import { withMemo } from '../../../helper/withMemo';
import { RbmComponentProps } from '../../RbmComponentProps';

export type ListItemProps = RbmComponentProps<{}>;

function ListItem({ className, children }: ListItemProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return <li className={className}>{children}</li>;
}

// Need ListItemMemo for autocompletion of phpstorm
const ListItemMemo = withMemo(ListItem);
export { ListItemMemo as ListItem };
