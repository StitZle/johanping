import styles from "./RowActions.module.scss";
import { RowData } from "@tanstack/table-core";
import { Icon } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

export type ActionButton<TData extends RowData> = {
  Icon: Icon;
  iconSize?: number;
  labelText?: string;
  dataTestId?: string;
  onClick: (target: TData) => any;
};

type RowActions<TData extends RowData> = {
  actionButtons: ActionButton<TData>[];
  target: TData;
};

const RowActions = <TData extends RowData>({ actionButtons, target }: RowActions<TData>) => {
  return (
    <div className={styles.actionCell}>
      {actionButtons.map((button, index) => {
        return (
          <ActionIcon
            className={styles.actionButton}
            key={index}
            variant="outline"
            color="red"
            onClick={() => button.onClick(target)}
          >
            <button.Icon size={button.iconSize ? button.iconSize : 14} />
          </ActionIcon>
        );
      })}
    </div>
  );
};

export default RowActions;
