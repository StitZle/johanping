import { Table } from "@tanstack/react-table";
import styles from "./TablePagination.module.scss";

import { RowData } from "@tanstack/table-core";
import { ActionIcon, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type TablePaginationProps<TData extends RowData> = {
  table: Table<TData>;
  pageSizeOption: number[];
};
const TablePagination = <TData extends RowData>({ table }: TablePaginationProps<TData>) => {

  return (
    <div className={styles.wrapper}>
      <ActionIcon.Group>
        <ActionIcon onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <IconChevronLeft size={16} />
        </ActionIcon>

        <ActionIcon onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <IconChevronRight size={16} />
        </ActionIcon>
      </ActionIcon.Group>

      <Text>
        Seite {table.getState().pagination.pageIndex + 1} von {table.getPageCount()}
      </Text>

      {/*<Select
            value={dropdownValue}
            onChange={(value: any) => {
                table.setPageSize(value.value);
            }}
            data={pageSizeOption.map((size: number) => {
                return { value: size, label: size };
            })}
        />*/}
    </div>
  );
};

export default TablePagination;
