import * as React from 'react';
import { Column as RTColumn, useTable } from 'react-table';
import { RbmComponentProps } from '../RbmComponentProps';
import { Table as RBTable, TableProps as RBTableProps } from 'react-bootstrap';
import { Override } from '../TypeHelpers';
import { ReactNode } from 'react';

export type ColumnCellData<DataType extends string | number | Record<string, unknown>> = {
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

export type Column<DataType extends string | number | Record<string, unknown>> = RTColumn<Record<string, DataType>> & {
    Cell?: (cellData: ColumnCellData<DataType>) => ReactNode;
};

export type TableProps<DataType extends string | number | Record<string, unknown>> = RbmComponentProps<
    Override<
        RBTableProps,
        {
            columns: Column<DataType>[];
            data: Record<string, DataType>[];
            cellRenderer?: ({ value }: { value: DataType }) => ReactNode;
        }
    >
>;

function Table<DataType extends string | number | Record<string, unknown>>({
    columns,
    data,
    cellRenderer,
}: TableProps<DataType>) {
    // Variables

    if (cellRenderer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columns.forEach((c) => (c.Cell = c.Cell ?? cellRenderer));
    }

    columns.forEach((c) => {
        if (!('width' in c)) {
            c.width = 0;
        }
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Record<string, DataType>>({
        columns,
        data,
    });

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        // apply the table props
        <RBTable {...getTableProps()}>
            <thead>
                {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                // Loop over the headers in each row
                                headerGroup.headers.map((column) => (
                                    // Apply the header cell props
                                    <th {...column.getHeaderProps()}>
                                        {
                                            // Render the header
                                            column.render('Header')
                                        }
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {
                    // Loop over the table rows
                    rows.map((row) => {
                        // Prepare the row for display
                        prepareRow(row);
                        return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {
                                    // Loop over the rows cells
                                    row.cells.map((cell) => {
                                        const width = cell.column.width || undefined;

                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps()} width={width}>
                                                {
                                                    // Render the cell contents
                                                    cell.render('Cell')
                                                }
                                            </td>
                                        );
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        </RBTable>
    );
}

const tmp = React.memo(Table) as typeof Table;
export { tmp as Table };
