import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./GenericTable.module.scss";
import classNames from "classnames";
import TableFilterInput from "./TableFilterInput";
import { Group } from "@mantine/core";
import TableColumnSorting from "./TableColumnSorting";
import TablePagination from "./TablePagination";
import { RowData } from "@tanstack/table-core";

export const getColumnFilterValue = (columnFilters: ColumnFiltersState, columnId: string) => {
  return (columnFilters.find(({ id }) => id == columnId)?.value as string) ?? "";
};

export const setColumnFilterValue = (columnFilters: ColumnFiltersState, columnId: string, value: unknown) => {
  return [...columnFilters.filter(({ id }) => id == columnId), { id: columnId, value: value }];
};

export const setColumnFiltersFunction = (
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
  columnId: string,
) => {
  return (value: SetStateAction<string>) =>
    setColumnFilters((prevFilters) => setColumnFilterValue(prevFilters, columnId, value));
};

type GenericTableProps<TData extends RowData> = {
  data: TData[] | undefined;
  columns: ColumnDef<TData, any>[];

  displayHeader?: boolean;

  disableSorting?: boolean;
  disablePagination?: boolean;

  activateRowSelection?: boolean;
  activateMultiRowSelection?: boolean;
  /**
   * Activating the global filter adds a default global filter input field, if 'externalGlobalFilter' and 'setExternalGlobalFilter' are not set.
   */
  activateGlobalFilter?: boolean;
  /**
   * Activating the column filters adds default column filter input fields, if 'externalColumnFilters' and 'setExternalColumnFilter' are not set.
   */
  activateColumnFilters?: boolean;

  onSelectionChange?: (selection: TData) => void;

  defaultPageSize?: number;
  pageSizeOptions?: number[];

  columnVisibility?: Record<string, boolean>;

  /**
   * When setting 'externalGlobalFilter', you also have to set its setter function 'setExternalGlobalFilter' to overwrite the default filter input!
   */
  externalGlobalFilter?: string;
  /**
   * When setting 'setExternalGlobalFilter', you also have to set its value 'externalGlobalFilter' to overwrite the default filter input!
   */
  setExternalGlobalFilter?: Dispatch<SetStateAction<string>>;

  /**
   * When setting 'setting', you also have to set its setter function 'setExternalColumnFilters' to overwrite the default filter inputs!
   */
  externalColumnFilters?: ColumnFiltersState;
  /**
   * When setting 'setExternalColumnFilters', you also have to set its values 'externalColumnFilters' to overwrite the default filter inputs!
   */
  setExternalColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;

  defaultGlobalFilterInputPlaceholder?: string;
  defaultColumnFilterInputPlaceholder?: string;
};

const GenericTable = <TData extends RowData>({
  data,
  columns,
  disableSorting = false,
  disablePagination = false,

  activateRowSelection = false,
  activateGlobalFilter = false,
  activateColumnFilters = false,

  onSelectionChange,

  defaultPageSize = 5,
  pageSizeOptions = [10, 25, 50, 100, 250],

  columnVisibility,

  externalGlobalFilter,
  setExternalGlobalFilter,

  externalColumnFilters,
  setExternalColumnFilters,

  //defaultGlobalFilterInputPlaceholder = "Filter",
  //defaultColumnFilterInputPlaceholder = "Filter",
}: GenericTableProps<TData>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [internalGlobalFilter, setInternalGlobalFilter] = useState<string>("");
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([]);

  const handleRowSelectionChange = (updaterOrValue: Updater<RowSelectionState>) => {
    let newSelection: RowSelectionState;
    if (typeof updaterOrValue === "function") {
      newSelection = updaterOrValue(rowSelection);
    } else {
      newSelection = updaterOrValue;
    }
    setRowSelection(newSelection);

    if (onSelectionChange) {
      const selectedRowObjects = Object.entries(table.getRowModel().rowsById)
        .filter(([key]) => newSelection[key])
        .map(([, value]) => value.original);
      onSelectionChange(selectedRowObjects[0]);
    }
  };

  if (data === undefined) {
    return;
  }

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
    state: {
      globalFilter: activateGlobalFilter
        ? externalGlobalFilter !== undefined && setExternalGlobalFilter
          ? externalGlobalFilter
          : internalGlobalFilter
        : undefined,
      columnFilters: activateColumnFilters
        ? externalColumnFilters && setExternalColumnFilters
          ? externalColumnFilters
          : internalColumnFilters
        : [],
      rowSelection: activateRowSelection ? rowSelection : {},
      columnVisibility: columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    enableSorting: !disableSorting,
    getSortedRowModel: !disableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: !disablePagination ? getPaginationRowModel() : undefined,
    enableRowSelection: activateRowSelection,
    onRowSelectionChange: activateRowSelection ? handleRowSelectionChange : undefined,
    enableGlobalFilter: activateGlobalFilter,
    enableColumnFilters: activateColumnFilters,
    getFilteredRowModel: activateGlobalFilter || activateColumnFilters ? getFilteredRowModel() : undefined,
    onGlobalFilterChange: activateGlobalFilter
      ? externalGlobalFilter !== undefined && setExternalGlobalFilter
        ? setExternalGlobalFilter
        : setInternalGlobalFilter
      : undefined,
    onColumnFiltersChange: activateColumnFilters
      ? externalColumnFilters && setExternalColumnFilters
        ? setExternalColumnFilters
        : setInternalColumnFilters
      : undefined,
  });

  return (
    <>
      {activateGlobalFilter && externalGlobalFilter === undefined && !setExternalGlobalFilter && (
        <TableFilterInput
          //placeholder={defaultGlobalFilterInputPlaceholder}
          //filterValue={internalGlobalFilter}
          //setFilterValue={setInternalGlobalFilter}
        />
      )}
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <Group>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <TableColumnSorting column={header.column} />
                    </Group>
                    {activateColumnFilters &&
                      !externalColumnFilters &&
                      !setExternalColumnFilters &&
                      header.column.getCanFilter() && (
                        <></>
                        /*<TableFilterInput
                                              placeholder={defaultColumnFilterInputPlaceholder}
                                              filterValue={(header.column.getFilterValue() ?? "") as string}
                                              setFilterValue={(value) => header.column.setFilterValue(value)}
                                            />*/
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={classNames({
                  [styles.selectedRow]: row.getIsSelected(),
                  [styles.rowCursorPointer]: row.getCanSelect(),
                })}
                onClick={() => row.toggleSelected()}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!disablePagination && <TablePagination table={table} pageSizeOption={pageSizeOptions} />}
      </div>
    </>
  );
};

export default GenericTable;
