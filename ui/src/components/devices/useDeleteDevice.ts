import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/requests/axiosConfig";
import { API_DEVICES } from "../../utils/BackendConstants";
import { deviceKeys } from "../../utils/queryKeyFactory";
import { Device } from "./deviceTypes.ts";

const deleteDeviceR = (deviceId: Device["id"]): Promise<Device> => {
  return axiosInstance.delete(`${API_DEVICES}/${deviceId}`).then((response) => {
    return response.data;
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteDevice, ...rest } = useMutation({
    mutationFn: deleteDeviceR,
    onSuccess: (deletedDevice) => {
      queryClient.setQueryData<Device[]>(deviceKeys.list(), (oldDevice) =>
        oldDevice ? oldDevice.filter((device) => device.id !== deletedDevice.id) : [],
      );
    },
  });

  return { deleteDevice, ...rest };
};
