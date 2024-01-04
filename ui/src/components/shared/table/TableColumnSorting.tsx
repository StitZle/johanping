import { Column, SortDirection } from "@tanstack/react-table";
import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";

type ComponentProps = {
  column: Column<any, any>;
};
const TableColumnSorting = ({ column }: ComponentProps) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted: SortDirection | false = column.getIsSorted();

  return (
    <ActionIcon size={16} onClick={column.getToggleSortingHandler()}>
      {!sorted && <IconSelector size={16} />}
      {sorted === "asc" && <IconChevronDown size={16} />}
      {sorted === "desc" && <IconChevronUp size={16} />}
    </ActionIcon>
  );
};

export default TableColumnSorting;
