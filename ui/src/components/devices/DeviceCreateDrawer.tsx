import { Button, Drawer, Group } from "@mantine/core";
import DrawerHeader from "../shared/utils/DrawerHeader.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_DRAWER_PADDING, DEFAULT_DRAWER_POSITION, DEFAULT_DRAWER_WIDTH } from "../../utils/Constants.ts";
import DeviceForm from "./DeviceForm.tsx";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Device, deviceFormDefaults, deviceSchema } from "./deviceTypes.ts";
import { useCreateDevice } from "./useCreateDevice.ts";
import { showErrorNotification, showSuccessNotification } from "../../shared/notifications/notifications.ts";

const DeviceCreateDrawer = () => {
  const navigate = useNavigate();

  const { createDevice, isPending } = useCreateDevice();

  const { control, handleSubmit, reset } = useForm<Device>({
    mode: "all",
    defaultValues: deviceFormDefaults,
    resolver: zodResolver(deviceSchema),
  });

  const onSubmit: SubmitHandler<Device> = (device) => {
    createDevice(device, {
      onSuccess: () => {
        showSuccessNotification({
          titleId: "common.notifications.save.success",
          messageId: "device.create.message.success",
        });
        onClose();
      },
      onError: () => {
        showErrorNotification({
          titleId: "common.notifications.save.error",
          messageId: "device.create.message.error",
        });
      },
    });
  };

  const onClose = () => {
    !isPending && reset();
    navigate("..");
  };

  return (
    <Drawer
      opened
      onClose={onClose}
      title={<DrawerHeader headerTranslationId="device.drawer.create.headline" />}
      size={DEFAULT_DRAWER_WIDTH}
      padding={DEFAULT_DRAWER_PADDING}
      position={DEFAULT_DRAWER_POSITION}
    >
      <DeviceForm control={control} />
      <Group justify="flex-end" mt="md">
        <Button onClick={onClose} color="red" disabled={isPending}>
          <FormattedMessage id="common.button.cancel" />
        </Button>
        <Button loading={isPending} onClick={handleSubmit(onSubmit)}>
          <FormattedMessage id="common.button.save" />
        </Button>
      </Group>
    </Drawer>
  );
};

export default DeviceCreateDrawer;
