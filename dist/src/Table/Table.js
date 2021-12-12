var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { useTable } from 'react-table';
import { Table as RBTable } from 'react-bootstrap';
function Table(_a) {
    // Variables
    var columns = _a.columns, data = _a.data, cellRenderer = _a.cellRenderer;
    if (cellRenderer) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columns.forEach(function (c) { var _a; return (c.Cell = (_a = c.Cell) !== null && _a !== void 0 ? _a : cellRenderer); });
    }
    columns.forEach(function (c) {
        if (!('width' in c)) {
            c.width = 0;
        }
    });
    var _b = useTable({
        columns: columns,
        data: data,
    }), getTableProps = _b.getTableProps, getTableBodyProps = _b.getTableBodyProps, headerGroups = _b.headerGroups, rows = _b.rows, prepareRow = _b.prepareRow;
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    // Render Functions
    return (
    // apply the table props
    React.createElement(RBTable, __assign({}, getTableProps()),
        React.createElement("thead", null, 
        // Loop over the header rows
        headerGroups.map(function (headerGroup) { return (
        // Apply the header row props
        React.createElement("tr", __assign({}, headerGroup.getHeaderGroupProps()), 
        // Loop over the headers in each row
        headerGroup.headers.map(function (column) { return (
        // Apply the header cell props
        React.createElement("th", __assign({}, column.getHeaderProps()), 
        // Render the header
        column.render('Header'))); }))); })),
        React.createElement("tbody", __assign({}, getTableBodyProps()), 
        // Loop over the table rows
        rows.map(function (row) {
            // Prepare the row for display
            prepareRow(row);
            return (
            // Apply the row props
            React.createElement("tr", __assign({}, row.getRowProps()), 
            // Loop over the rows cells
            row.cells.map(function (cell) {
                var width = cell.column.width || undefined;
                // Apply the cell props
                return (React.createElement("td", __assign({}, cell.getCellProps(), { width: width }), 
                // Render the cell contents
                cell.render('Cell')));
            })));
        }))));
}
var tmp = React.memo(Table);
export { tmp as Table };
//# sourceMappingURL=Table.js.map