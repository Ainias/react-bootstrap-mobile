import { Column as RTColumn } from 'react-table';
import { RbmComponentProps } from '../RbmComponentProps';
import { TableProps as RBTableProps } from 'react-bootstrap';
import { Override } from '../TypeHelpers';
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
export declare type TableProps<DataType extends string | number | Record<string, unknown>> = RbmComponentProps<Override<RBTableProps, {
    columns: Column<DataType>[];
    data: Record<string, DataType>[];
    cellRenderer?: ({ value }: {
        value: DataType;
    }) => ReactNode;
}>>;
declare function Table<DataType extends string | number | Record<string, unknown>>({ columns, data, cellRenderer, }: TableProps<DataType>): JSX.Element;
declare const tmp: typeof Table;
export { tmp as Table };
