import { Drawer } from "@mantine/core";
import DrawerHeader from "../shared/utils/DrawerHeader.tsx";
import { DEFAULT_DRAWER_PADDING, DEFAULT_DRAWER_POSITION, DEFAULT_DRAWER_WIDTH } from "../../utils/Constants.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useFailedPings } from "./useFailedPings.ts";
import GenericTable from "../shared/table/GenericTable.tsx";
import StateLayout from "../shared/layout/StateLayout.tsx";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import dayjs from "dayjs";
import { FailedPing } from "./failedPingTypes.ts";
import InfoBox, { InfoBoxType } from "../shared/alert/InfoBox.tsx";

const DeviceCreateDrawer = () => {
  const navigate = useNavigate();
  const params = useParams();

  const deviceId = params.deviceId;

  const { failedPings } = useFailedPings({ deviceId });

  const onClose = () => {
    navigate("..");
  };

  const columnHelper = createColumnHelper<FailedPing>();
  const columns = useMemo<ColumnDef<FailedPing, any>[]>(
    () => [
      columnHelper.accessor("failedPingTime", {
        id: "failedPingTime",
        header: "Failed Ping Zeit",
        cell: (props) => <span>{dayjs(props.getValue()).format("DD-MM-YYYY, hh:mm:ss")}</span>,
      }),
    ],
    [columnHelper],
  );

  return (
    <Drawer
      opened
      onClose={onClose}
      title={<DrawerHeader headerTranslationId="device.drawer.view.headline" />}
      size={DEFAULT_DRAWER_WIDTH}
      padding={DEFAULT_DRAWER_PADDING}
      position={DEFAULT_DRAWER_POSITION}
    >
      {failedPings && failedPings.length == 0 ? (
        <InfoBox type={InfoBoxType.INFO} titleId="device.view.info.headline" textId="device.view.info.text" />
      ) : (
        <StateLayout data={failedPings}>
          <GenericTable data={failedPings} columns={columns} activateRowSelection defaultPageSize={10} />
        </StateLayout>
      )}
    </Drawer>
  );
};

export default DeviceCreateDrawer;
