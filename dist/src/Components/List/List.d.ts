import { CSSProperties, ReactElement, ReactNode } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export declare type ListProps<ItemType> = RbmComponentProps<{
    renderItem: (item: ItemType, style: CSSProperties, index: number) => ReactElement;
    itemHeight?: number;
    items: ItemType[];
    renderBefore?: (item: ItemType, index: number) => ReactNode;
    keyExtractor?: (item: ItemType, index: number) => string;
}>;
declare function List<ItemType>({ items, renderItem, itemHeight: initialItemHeight, className, style, }: ListProps<ItemType>): JSX.Element;
declare const tmp: typeof List;
export { tmp as List };
