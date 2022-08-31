import * as React from 'react';
import {
    Cell,
    Column as RTColumn,
    HeaderGroup,
    PluginHook,
    Row,
    TableOptions,
    useSortBy,
    UseSortByOptions,
    useTable,
} from 'react-table';
import { RbmComponentProps } from '../RbmComponentProps';
import { ReactNode } from 'react';
import { withMemo } from '../../helper/withMemo';

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

export type TableSortOptions<DataType extends string | number | Record<string, unknown>> = UseSortByOptions<
    Record<string, DataType>
> & {
    renderSortIndicator?: (column: HeaderGroup<Record<string, DataType>>) => ReactNode;
};

export type TableProps<DataType extends string | number | Record<string, unknown>> = RbmComponentProps<{
    columns: Column<DataType>[];
    data: Record<string, DataType>[];
    cellRenderer?: ({ value }: { value: DataType }) => ReactNode;
    sortOptions?: TableSortOptions<DataType>;
    getCellProperties?: (row: Cell<Record<string, DataType>>) => React.TdHTMLAttributes<HTMLTableDataCellElement>;
    getRowProperties?: (row: Row<Record<string, DataType>>) => React.HTMLAttributes<HTMLTableRowElement>;
}>;

const defaultPropertiesGetter = () => ({});

function Table<DataType extends string | number | Record<string, unknown>>({
    columns,
    data,
    cellRenderer,
    sortOptions,
    className,
    style,
    getCellProperties = defaultPropertiesGetter,
    getRowProperties = defaultPropertiesGetter,
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

    let tableOptions: TableOptions<Record<string, DataType>> = {
        columns,
        data,
    };

    const plugins: PluginHook<Record<string, DataType>>[] = [];

    if (sortOptions) {
        tableOptions = {
            autoResetSortBy: false,
            ...sortOptions,
            ...tableOptions,
        };
        plugins.push(useSortBy);
    }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<Record<string, DataType>>(
        tableOptions,
        ...plugins
    );

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions
    const renderSorting = (column: HeaderGroup<Record<string, DataType>>) => {
        if (sortOptions?.renderSortIndicator) {
            return sortOptions.renderSortIndicator(column);
        }
        if (column.isSorted) return <span>{column.isSortedDesc ? ' ↓' : ' ↑'}</span>;
        return null;
    };

    return (
        // apply the table props
        <table className={className} {...getTableProps()} style={style}>
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
                                    <th
                                        {...column.getHeaderProps(
                                            sortOptions ? column.getSortByToggleProps() : undefined
                                        )}
                                    >
                                        {
                                            // Render the header
                                            column.render('Header')
                                        }
                                        {renderSorting(column)}
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
                            <tr {...row.getRowProps(getRowProperties(row))}>
                                {
                                    // Loop over the rows cells
                                    row.cells.map((cell) => {
                                        const width = cell.column.width || undefined;

                                        // Apply the cell props
                                        return (
                                            <td {...cell.getCellProps(getCellProperties(cell))} width={width}>
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
        </table>
    );
}

const tmp = withMemo(Table);
export { tmp as Table };
