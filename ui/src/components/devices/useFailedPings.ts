import { useQuery } from "@tanstack/react-query";
import { failedPingsKeys } from "../../utils/queryKeyFactory";
import { axiosInstance } from "../../services/requests/axiosConfig";
import { API_FAILED_PINGS } from "../../utils/BackendConstants";
import { Device } from "./deviceTypes.ts";
import { FailedPing } from "./failedPingTypes.ts";

const getFailedPings = ({ deviceId }: { deviceId: Device["id"] }): Promise<FailedPing[]> => {
  return axiosInstance.get(`${API_FAILED_PINGS}/${deviceId}`).then((response) => {
    return response.data;
  });
};

export const useFailedPings = ({ deviceId }: { deviceId: Device["id"] }) => {
  const { data: failedPings, ...rest } = useQuery<FailedPing[]>({
    queryFn: () => getFailedPings({ deviceId }),
    queryKey: failedPingsKeys.single(deviceId),
  });
  return {
    failedPings,
    ...rest,
  };
};
