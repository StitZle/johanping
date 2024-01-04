import { Device } from "../components/devices/deviceTypes.ts";

export const authKeys = {
  all: ["auth"] as const,
  id: () => [...authKeys.all, "id"] as const,
};

export const deviceKeys = {
  all: ["device"] as const,
  list: () => [...deviceKeys.all, "list"] as const,
  single: (deviceId: Device["id"]) => [...deviceKeys.all, "single", deviceId] as const,
};

export const failedPingsKeys = {
  all: ["failedPings"] as const,
  single: (deviceId: Device["id"]) => [...failedPingsKeys.all, "single", deviceId] as const,
};
