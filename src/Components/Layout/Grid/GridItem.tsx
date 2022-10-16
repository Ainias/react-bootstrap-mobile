import * as React from 'react';
import { withMemo } from '../../../helper/withMemo';
import { RbmComponentProps } from '../../RbmComponentProps';
import { InlineBlock } from '../InlineBlock';
import classNames from 'classnames';

import styles from './grid.scss';

export type GridItemProps = RbmComponentProps<{
    size: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    startXs?: number;
    startSm?: number;
    startMd?: number;
    startLg?: number;
    startXl?: number;
    startXxl?: number;
    orderXs?: number;
    orderSm?: number;
    orderMd?: number;
    orderLg?: number;
    orderXl?: number;
    orderXxl?: number;
}>;

function GridItem({
    style,
    children,
    className,
    __allowChildren,
    size,
    sm,
    md,
    lg,
    xl,
    xxl,
    startXs,
    startMd,
    startSm,
    startLg,
    startXl,
    startXxl,
    orderXs,
    orderSm,
    orderMd,
    orderLg,
    orderXxl,
    orderXl,
}: GridItemProps) {
    // Variables

    const classes = [`item-xs-${size}`];
    if (sm) {
        classes.push(`item-sm-${sm}`);
    }
    if (md) {
        classes.push(`item-md-${md}`);
    }
    if (lg) {
        classes.push(`item-lg-${lg}`);
    }
    if (xl) {
        classes.push(`item-xl-${xl}`);
    }
    if (xxl) {
        classes.push(`item-xxl-${xxl}`);
    }

    if (startXs) {
        classes.push(`start-xs-${startXs}`);
    }
    if (startSm) {
        classes.push(`start-sm-${startSm}`);
    }
    if (startMd) {
        classes.push(`start-md-${startMd}`);
    }
    if (startLg) {
        classes.push(`start-lg-${startLg}`);
    }
    if (startXl) {
        classes.push(`start-xl-${startXl}`);
    }
    if (startXxl) {
        classes.push(`start-xxl-${startXxl}`);
    }

    if (orderXs) {
        classes.push(`order-xs-${orderXs}`);
    }
    if (orderSm) {
        classes.push(`order-sm-${orderSm}`);
    }
    if (orderMd) {
        classes.push(`order-md-${orderMd}`);
    }
    if (orderLg) {
        classes.push(`order-lg-${orderLg}`);
    }
    if (orderXl) {
        classes.push(`order-xl-${orderXl}`);
    }
    if (orderXxl) {
        classes.push(`order-xxl-${orderXxl}`);
    }

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <InlineBlock
            style={style}
            className={classNames(...classes.map((name) => styles[name]), styles.item, className)}
            __allowChildren={__allowChildren as 'all'}
        >
            {children}
        </InlineBlock>
    );
}

// Need GridItemMemo for autocompletion of phpstorm
const GridItemMemo = withMemo(GridItem, styles);
export { GridItemMemo as GridItem };