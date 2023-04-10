/// <reference types="react" />
import { RbmComponentProps } from '../../RbmComponentProps';
export type GridItemProps = RbmComponentProps<{
    size: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    print?: number;
    startXs?: number;
    startSm?: number;
    startMd?: number;
    startLg?: number;
    startXl?: number;
    startXxl?: number;
    startPrint?: number;
    orderXs?: number;
    orderSm?: number;
    orderMd?: number;
    orderLg?: number;
    orderXl?: number;
    orderXxl?: number;
    orderPrint?: number;
}>;
declare function GridItem({ style, children, className, __allowChildren, size, sm, md, lg, xl, xxl, print, startXs, startMd, startSm, startLg, startXl, startXxl, startPrint, orderXs, orderSm, orderMd, orderLg, orderXxl, orderXl, orderPrint, }: GridItemProps): JSX.Element;
declare const GridItemMemo: typeof GridItem;
export { GridItemMemo as GridItem };
