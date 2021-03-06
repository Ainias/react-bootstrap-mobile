/* eslint-disable */
import {
    UseColumnOrderInstanceProps,
    UseColumnOrderState,
    UseExpandedHooks,
    UseExpandedInstanceProps,
    UseExpandedOptions,
    UseExpandedRowProps,
    UseExpandedState,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    UseFiltersState,
    UseGlobalFiltersColumnOptions,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    UseGlobalFiltersState,
    UseGroupByCellProps,
    UseGroupByColumnOptions,
    UseGroupByColumnProps,
    UseGroupByHooks,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    UseGroupByState,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsColumnOptions,
    UseResizeColumnsColumnProps,
    UseResizeColumnsOptions,
    UseResizeColumnsState,
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseRowStateCellProps,
    UseRowStateInstanceProps,
    UseRowStateOptions,
    UseRowStateRowProps,
    UseRowStateState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
} from 'react-table';

// https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table
declare module 'react-table' {
    // take this file as-is, or comment out the sections that don't apply to your plugin configuration

    export interface TableOptions<D extends object>
        // UseExpandedOptions<D>,
        // UseFiltersOptions<D>,
        // UseGlobalFiltersOptions<D>,
        // UseGroupByOptions<D>,
        // UsePaginationOptions<D>,
        // UseResizeColumnsOptions<D>,
        // UseRowSelectOptions<D>,
        // UseRowStateOptions<D>,
        extends UseSortByOptions<D> {}

    // note that having Record here allows you to add anything to the options, this matches the spirit of the
    // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
    // feature set, this is a safe default.

    export interface Hooks<D extends object>
        // UseExpandedHooks<D>,
        // UseGroupByHooks<D>,
        // UseRowSelectHooks<D>,
        extends UseSortByHooks<D> {}

    export interface TableInstance<D extends object>
        // UseColumnOrderInstanceProps<D>,
        // UseExpandedInstanceProps<D>,
        // UseFiltersInstanceProps<D>,
        // UseGlobalFiltersInstanceProps<D>,
        // UseGroupByInstanceProps<D>,
        // UsePaginationInstanceProps<D>,
        // UseRowSelectInstanceProps<D>,
        // UseRowStateInstanceProps<D>,
        extends UseSortByInstanceProps<D> {}

    export interface TableState<D extends object>
        // UseColumnOrderState<D>,
        // UseExpandedState<D>,
        // UseFiltersState<D>,
        // UseGlobalFiltersState<D>,
        // UseGroupByState<D>,
        // UsePaginationState<D>,
        // UseResizeColumnsState<D>,
        // UseRowSelectState<D>,
        // UseRowStateState<D>,
        extends UseSortByState<D> {}

    export interface ColumnInterface<D extends object>
        // UseFiltersColumnOptions<D>,
        // UseGlobalFiltersColumnOptions<D>,
        // UseGroupByColumnOptions<D>,
        // UseResizeColumnsColumnOptions<D>,
        extends UseSortByColumnOptions<D> {}

    export interface ColumnInstance<D extends object>
        // UseFiltersColumnProps<D>,
        // UseGroupByColumnProps<D>,
        // UseResizeColumnsColumnProps<D>,
        extends UseSortByColumnProps<D> {}

    // export interface Cell<D extends object, V = any> extends UseGroupByCellProps<D>, UseRowStateCellProps<D> {}
    //
    // export interface Row<D extends object>
    //     extends UseExpandedRowProps<D>,
    //         UseGroupByRowProps<D>,
    //         UseRowSelectRowProps<D>,
    //         UseRowStateRowProps<D> {}
}
