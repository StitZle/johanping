import { useMemo, useState } from "react";
import { useIsMobile } from "../../utils/hooks/useIsMobile.ts";
import { useDevices } from "./useCustomers.ts";
import { useDisclosure } from "@mantine/hooks";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import TableRowActionButtons from "../shared/table/TableRowActionButtons.tsx";
import GenericTable from "../shared/table/GenericTable.tsx";
import StateLayout from "../shared/layout/StateLayout.tsx";
import { Device } from "./deviceTypes.ts";
import DeviceDeleteModal from "./DeviceDeleteModal.tsx";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const DeviceTable = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<Device | undefined>();
  const [deleteOpened, handlers] = useDisclosure(false);

  const { isMobile } = useIsMobile();

  const { devices } = useDevices();

  const handleView = (deviceToView: Device) => {
    navigate(`./view/${deviceToView.id}`);
  };

  const handleDelete = (deviceToDelete: Device) => {
    setSelectedDevice(deviceToDelete);
    handlers.open();
  };

  const columnHelper = createColumnHelper<Device>();
  const columns = useMemo<ColumnDef<Device, any>[]>(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
      }),
      columnHelper.accessor("address", {
        id: "address",
        header: "Adresse",
      }),
      columnHelper.accessor("lastSuccessfulPing", {
        id: "lastSuccessfulPing",
        header: "Letzter erfolgreicher Ping ",
        cell: (props) => (
          <span>{props.getValue() != null ? dayjs(props.getValue()).format("DD-MM-YYYY, hh:mm:ss") : "-"}</span>
        ),
      }),
      columnHelper.accessor("failedPingCounter", {
        id: "failedPingCounter",
        header: "Failed Ping Counter ",
      }),
      columnHelper.display({
        id: "actions",
        enableSorting: false,
        enableColumnFilter: false,
        cell: ({ row: { original } }) => (
          <TableRowActionButtons target={original} onView={handleView} onDelete={handleDelete} />
        ),
      }),
    ],
    [columnHelper, handleView, handleDelete],
  );

  return (
    <StateLayout data={devices}>
      <GenericTable
        data={devices}
        columns={columns}
        activateRowSelection
        defaultPageSize={10}
        columnVisibility={isMobile ? { lastSuccessfulPing: false, failedPingCounter: false } : undefined}
      />
      {deleteOpened && selectedDevice && <DeviceDeleteModal device={selectedDevice} onClose={handlers.close} />}
    </StateLayout>
  );
};

export default DeviceTable;
