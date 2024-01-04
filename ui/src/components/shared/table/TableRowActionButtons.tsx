import { useMemo } from "react";
import RowActions, { ActionButton } from "../table/RowActions";
import { RowData } from "@tanstack/table-core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";

type HandleClickPropsFunction<TData> = (props: TData) => any;

export type TableRowActionButtonsProps<TData extends RowData> = {
  onView?: HandleClickPropsFunction<TData>;
  onEdit?: HandleClickPropsFunction<TData>;
  onDelete?: HandleClickPropsFunction<TData>;
  target: TData;
};

const TableRowActionButtons = <TData extends RowData>({
  onView,
  onEdit,
  onDelete,
  target,
}: TableRowActionButtonsProps<TData>) => {
  const buttons = useMemo(
    () => [
      ...(onView
        ? [
            {
              Icon: IconEye,
              onClick: onView,
            } as ActionButton<TData>,
          ]
        : []),
      ...(onEdit
        ? [
            {
              Icon: IconEdit,
              onClick: onEdit,
            } as ActionButton<TData>,
          ]
        : []),
      ...(onDelete
        ? [
            {
              Icon: IconTrash,
              onClick: onDelete,
            } as ActionButton<TData>,
          ]
        : []),
    ],
    [onEdit, onDelete],
  );

  return <RowActions actionButtons={buttons} target={target} />;
};

export default TableRowActionButtons;
