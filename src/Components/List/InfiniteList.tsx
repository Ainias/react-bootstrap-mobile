import React, { useCallback, useState } from 'react';
import InfiniteLoader from "react-window-infinite-loader";
import { List, ListProps } from "./List";
import { withMemo } from "../../helper/withMemo";

export type InfiniteListProps<ItemType> = ListProps<ItemType> &{
    hasNextPage: boolean,
    loadNextPage: () => unknown | Promise<unknown>,
};

export const InfiniteList = withMemo(function InfiniteList<ItemType>({
                                                                         renderItem,
                                                                         itemHeight,
                                                                         items,
                                                                         renderBefore,
                                                                         keyExtractor,
                                                                         hasNextPage,
                                                                         loadNextPage,
                                                                         style,
                                                                         className
                                                                     }: InfiniteListProps<ItemType>) {
    // Refs

    // States/Variables/Selectors
    const [isPageLoading, setIsPageLoading] = useState(false);

    // Dispatch

    // Callbacks
    const isItemLoaded = useCallback((index: number) => !hasNextPage || index < items.length, [hasNextPage, items]);

    const loadMore = useCallback(async () => {
        if (!isPageLoading) {
            setIsPageLoading(true);
            try {
                loadNextPage();
            } finally {
                setIsPageLoading(false);
            }
        }
    }, [isPageLoading, loadNextPage]);

    // Effects

    // Other

    // RenderFunctions

    return <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadMore}
                           itemCount={hasNextPage ? items.length + 1 : items.length}>{({onItemsRendered, ref}) => (
        <List
            items={items} renderItem={renderItem} style={style} className={className} itemHeight={itemHeight}
            renderBefore={renderBefore} keyExtractor={keyExtractor} ref={ref} onItemsRendered={onItemsRendered}/>
    )}
    </InfiniteLoader>;
});
