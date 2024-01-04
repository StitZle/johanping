import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Device } from "./deviceTypes.ts";
import { axiosInstance } from "../../services/requests/axiosConfig.ts";
import { API_DEVICES } from "../../utils/BackendConstants.ts";
import { deviceKeys } from "../../utils/queryKeyFactory.ts";

const postDevice = (device: Device): Promise<Device> => {
  return axiosInstance.post(API_DEVICES, device).then((response) => {
    return response.data;
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  const { mutate: createDevice, ...rest } = useMutation({
    mutationFn: postDevice,
    onSuccess: (createdDevice) => {
      queryClient.setQueryData<Device[]>(deviceKeys.list(), (oldDevices) =>
        oldDevices ? [...oldDevices, createdDevice] : [createdDevice],
      );
    },
  });

  return { createDevice, ...rest };
};
