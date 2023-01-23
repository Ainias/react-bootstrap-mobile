import * as React from 'react';
import { CSSProperties, ReactElement, ReactNode, useCallback, useState } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './list.scss';
import { withMemo } from '../../helper/withMemo';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { SizeCalculator } from '../SizeCalculator/SizeCalculator';

export type ListProps<ItemType> = RbmComponentProps<{
    renderItem: (item: ItemType, style: CSSProperties, index: number) => ReactElement;
    itemHeight?: number;
    items: ItemType[];
    renderBefore?: (item: ItemType, index: number) => ReactNode;
    keyExtractor?: (item: ItemType, index: number) => string;
}>;

function List<ItemType>({
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
    const renderItemInner = useCallback(
        ({ index, style }) => {
            return renderItem(items[index], style, index);
        },
        [items, renderItem]
    );

    const setHeight = useCallback((_, height) => {
        setItemHeight(height);
    }, []);

    // Effects

    // Other

    // Render Functions

    return (
        <AutoSizer onResize={(size) => console.log('LOG-d onResize', size)}>
            {({ height, width }) => {
                console.log('LOG-d sizes', height, width);
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
                    </>
                );
            }}
        </AutoSizer>
    );

    // return (
    //     <ul {...props} className={classNames(styles.list, className)}>
    //         {items.map((item, index) => {
    //             let before = null;
    //             if (renderBefore) {
    //                 before = <span>{renderBefore(item, index)}</span>;
    //             }
    //
    //             return (
    //                 <li className={styles.item} key={keyExtractor(item, index)}>
    //                     {before}
    //                     <span className={styles.itemMain}>{renderItem(item, index)}</span>
    //                 </li>
    //             );
    //         })}
    //     </ul>
    // );
}

const tmp = withMemo(List, styles);
export { tmp as List };
