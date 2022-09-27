import * as React from 'react';
import { Cell, Column as RTColumn, HeaderGroup, Row, UseSortByOptions } from 'react-table';
import { RbmComponentProps } from '../RbmComponentProps';
import { ReactNode } from 'react';
export declare type ColumnCellData<DataType extends string | number | Record<string, unknown>> = {
    value: DataType;
    cell: {
        column: {
            id: string;
        };
        row: {
            original: Record<string, DataType>;
            index: number;
            id: string;
        };
    };
};
export declare type Column<DataType extends string | number | Record<string, unknown>> = RTColumn<Record<string, DataType>> & {
    Cell?: (cellData: ColumnCellData<DataType>) => ReactNode;
};
export declare type TableSortOptions<DataType extends string | number | Record<string, unknown>> = UseSortByOptions<Record<string, DataType>> & {
    renderSortIndicator?: (column: HeaderGroup<Record<string, DataType>>) => ReactNode;
};
export declare type TableProps<DataType extends string | number | Record<string, unknown>> = RbmComponentProps<{
    columns: Column<DataType>[];
    data: Record<string, DataType>[];
    cellRenderer?: ({ value }: {
        value: DataType;
    }) => ReactNode;
    sortOptions?: TableSortOptions<DataType>;
    getCellProperties?: (row: Cell<Record<string, DataType>>) => React.TdHTMLAttributes<HTMLTableDataCellElement>;
    getRowProperties?: (row: Row<Record<string, DataType>>) => React.HTMLAttributes<HTMLTableRowElement>;
}>;
declare function Table<DataType extends string | number | Record<string, unknown>>({ columns, data, cellRenderer, sortOptions, className, style, getCellProperties, getRowProperties, }: TableProps<DataType>): JSX.Element;
declare const tmp: typeof Table;
export { tmp as Table };
