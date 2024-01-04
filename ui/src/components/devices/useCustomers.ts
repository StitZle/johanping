import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/requests/axiosConfig.ts";
import { Device } from "./deviceTypes.ts";
import { API_DEVICES } from "../../utils/BackendConstants.ts";
import { deviceKeys } from "../../utils/queryKeyFactory.ts";

const getDevices = (): Promise<Device[]> => {
  return axiosInstance.get(API_DEVICES).then((response) => {
    return response.data;
  });
};

export const useDevices = () => {
  const { data: devices, ...rest } = useQuery({
    queryKey: deviceKeys.list(),
    queryFn: getDevices,
  });

  return {
    devices,
    ...rest,
  };
};
