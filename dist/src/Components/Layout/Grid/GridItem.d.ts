/// <reference types="react" />
import { RbmComponentProps } from '../../RbmComponentProps';
export declare type GridItemProps = RbmComponentProps<{
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
declare function GridItem({ style, children, className, __allowChildren, size, sm, md, lg, xl, xxl, startXs, startMd, startSm, startLg, startXl, startXxl, orderXs, orderSm, orderMd, orderLg, orderXxl, orderXl, }: GridItemProps): JSX.Element;
declare const GridItemMemo: typeof GridItem;
export { GridItemMemo as GridItem };
