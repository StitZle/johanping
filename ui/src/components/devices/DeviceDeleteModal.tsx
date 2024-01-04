import { Button, Group, Modal } from "@mantine/core";
import { FormattedMessage, useIntl } from "react-intl";
import { showErrorNotification, showSuccessNotification } from "../../shared/notifications/notifications";
import InfoBox, { InfoBoxType } from "../shared/alert/InfoBox";
import { Device } from "./deviceTypes.ts";
import { useDeleteDevice } from "./useDeleteDevice.ts";

type DeleteOrganisationModalProps = {
  device: Device;
  onClose: () => void;
};

const DeviceDeleteModal = ({ device, onClose }: DeleteOrganisationModalProps) => {
  const { formatMessage } = useIntl();
  const { deleteDevice, isPending } = useDeleteDevice();

  const handleDeleteOrganisation = () => {
    deleteDevice(device.id, {
      onSuccess: () => {
        showSuccessNotification({
          titleId: "common.notifications.delete.success",
          messageId: "device.delete.message.success",
        });
        onClose();
      },
      onError: () => {
        showErrorNotification({
          titleId: "common.notifications.delete.error",
          messageId: "device.delete.message.error",
        });
      },
    });
  };

  return (
    <Modal
      opened
      onClose={() => !isPending && onClose()}
      title={formatMessage({ id: "device.delete.headline" })}
      centered
      size="lg"
      radius="md"
    >
      <InfoBox type={InfoBoxType.WARNING} titleId="device.delete.info.headline" textId="device.delete.info.text" />

      <Group mt="md">
        <Button onClick={handleDeleteOrganisation}>
          <FormattedMessage id="common.button.delete" />
        </Button>
        <Button disabled={isPending} onClick={onClose}>
          <FormattedMessage id="common.button.cancel" />
        </Button>
      </Group>
    </Modal>
  );
};

export default DeviceDeleteModal;
