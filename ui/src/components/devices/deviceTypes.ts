import { z } from "zod";

export const deviceFormDefaults = {
  deviceName: "",
  address: "",
} as Device;

export const deviceSchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  address: z.string(),
  lastSuccessfulPing: z.string().optional(),
  failedPingCounter: z.number().optional(),
});

export type Device = z.infer<typeof deviceSchema>;
