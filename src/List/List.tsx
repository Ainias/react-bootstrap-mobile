import * as React from 'react';
import { ReactNode } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../helper';

export type ListProps<ItemType> = RbmComponentProps<{
    renderItem: (item: ItemType, index: number) => ReactNode;
    renderBefore?: (item: ItemType, index: number) => ReactNode;
    keyExtractor: (item: ItemType, index: number) => string;
    items: ItemType[];
}>;

function List<ItemType>({ items, renderItem, renderBefore, keyExtractor, className, ...props }: ListProps<ItemType>) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <ul {...props} className={prefixClass('list', className)}>
            {items.map((item, index) => {
                let before = null;
                if (renderBefore) {
                    before = <span className={prefixClass('list-item-before')}>{renderBefore(item, index)}</span>;
                }

                return (
                    <li className={prefixClass('list-item')} key={keyExtractor(item, index)}>
                        {before}
                        <span className={prefixClass('list-item-main')}>{renderItem(item, index)}</span>
                    </li>
                );
            })}
        </ul>
    );
}

const tmp = React.memo(List) as typeof List;
export { tmp as List };
