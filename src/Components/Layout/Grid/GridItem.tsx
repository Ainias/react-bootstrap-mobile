import * as React from 'react';
import { withMemo } from '../../../helper/withMemo';
import { RbmComponentProps } from '../../RbmComponentProps';
import { InlineBlock } from '../InlineBlock';
import classNames from 'classnames';

import styles from './grid.scss';

export type GridItemProps = RbmComponentProps<{
    size: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    print?: number;
    startXxs?: number;
    startXs?: number;
    startSm?: number;
    startMd?: number;
    startLg?: number;
    startXl?: number;
    startXxl?: number;
    startPrint?: number;
    orderXxs?: number;
    orderXs?: number;
    orderSm?: number;
    orderMd?: number;
    orderLg?: number;
    orderXl?: number;
    orderXxl?: number;
    orderPrint?: number;
}>;

function GridItem({
    style,
    children,
    className,
    __allowChildren,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    print,
    startXxs,
    startXs,
    startMd,
    startSm,
    startLg,
    startXl,
    startXxl,
    startPrint,
    orderXxs,
    orderXs,
    orderSm,
    orderMd,
    orderLg,
    orderXxl,
    orderXl,
    orderPrint,
}: GridItemProps) {
    // Variables

    const classes = [`item-xxs-${size}`];
    if (xs) {
        classes.push(`item-xs-${xs}`);
    }
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
    if (print) {
        classes.push(`item-print-${print}`);
    }

    if (startXxs) {
        classes.push(`start-xxs-${startXxs}`);
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
    if (startPrint) {
        classes.push(`start-print-${startPrint}`);
    }

    if (orderXxs) {
        classes.push(`order-xxs-${orderXxs}`);
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
    if (orderPrint) {
        classes.push(`order-print-${orderPrint}`);
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
