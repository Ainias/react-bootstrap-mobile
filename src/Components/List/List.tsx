import * as React from 'react';
import { ComponentType, CSSProperties, ReactElement, ReactNode, useCallback, useState } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './list.scss';
import { withMemo } from '../../helper/withMemo';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { SizeCalculator, SizeCalculatorProps } from '../SizeCalculator/SizeCalculator';

export type ListProps<ItemType> = RbmComponentProps<{
    renderItem: (item: ItemType, style: CSSProperties, index: number) => ReactElement;
    itemHeight?: number;
    items: ItemType[];
    renderBefore?: (item: ItemType, index: number) => ReactNode;
    keyExtractor?: (item: ItemType, index: number) => string;
}>;

export const List = withMemo(function List<ItemType>({
    items,
    renderItem,
    itemHeight: initialItemHeight = 0,
    className,
    style,
}: ListProps<ItemType>) {
    // Variables

    // States
    const [itemHeight, setItemHeight] = useState(initialItemHeight);

    // Refs

    // Callbacks
    const renderItemInner = useCallback<ComponentType<ListChildComponentProps>>(
        ({ index, style: itemStyle }) => renderItem(items[index], itemStyle, index),
        [items, renderItem]
    );

    const setHeight = useCallback<SizeCalculatorProps['onSize']>((_, height) => setItemHeight(height), []);

    // Effects

    // Other

    // Render Functions

    return (
        <AutoSizer>
            {({ height, width }: { height?: number; width?: number }) => {
                return (
                    <>
                        {initialItemHeight === 0 && items.length > 0 && (
                            <SizeCalculator onSize={setHeight} absolute={true}>
                                {renderItem(
                                    items[0],
                                    {
                                        position: 'relative',
                                        top: '0px',
                                        left: '0px',
                                        width: '100%',
                                        zIndex: -1,
                                    },
                                    0
                                )}
                            </SizeCalculator>
                        )}
                        {height !== undefined && width !== undefined && (
                            <FixedSizeList
                                height={height}
                                itemCount={items.length}
                                width={width}
                                itemSize={itemHeight}
                                style={style}
                                className={className}
                                itemData={items}
                            >
                                {renderItemInner}
                            </FixedSizeList>
                        )}
                    </>
                );
            }}
        </AutoSizer>
    );
},
styles);
