import * as React from 'react';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export type ListProps<ItemType> = RbmComponentProps<{
    renderItem: (item: ItemType, style: CSSProperties, index: number) => ReactElement;
    itemHeight?: number;
    items: ItemType[];
    renderBefore?: (item: ItemType, index: number) => ReactNode;
    keyExtractor?: (item: ItemType, index: number) => string;
}>;
export declare const List: <ItemType>({ items, renderItem, itemHeight: initialItemHeight, className, style, }: ListProps<ItemType>) => React.JSX.Element;
