import { ReactNode } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export declare type ListProps<ItemType> = RbmComponentProps<{
    renderItem: (item: ItemType, index: number) => ReactNode;
    renderBefore?: (item: ItemType, index: number) => ReactNode;
    keyExtractor: (item: ItemType, index: number) => string;
    items: ItemType[];
}>;
declare function List<ItemType>({ items, renderItem, renderBefore, keyExtractor, className, ...props }: ListProps<ItemType>): JSX.Element;
declare const tmp: typeof List;
export { tmp as List };
