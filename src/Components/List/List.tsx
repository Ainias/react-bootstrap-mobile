import * as React from 'react';
import { ReactNode } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';

import styles from './list.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

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
        <ul {...props} className={classNames(styles.list, className)}>
            {items.map((item, index) => {
                let before = null;
                if (renderBefore) {
                    before = <span>{renderBefore(item, index)}</span>;
                }

                return (
                    <li className={styles.item} key={keyExtractor(item, index)}>
                        {before}
                        <span className={styles.itemMain}>{renderItem(item, index)}</span>
                    </li>
                );
            })}
        </ul>
    );
}

const tmp = withMemo(List, styles);
export { tmp as List };
