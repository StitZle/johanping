import { z } from "zod";

export const failedPingSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
  failedPingTime: z.string(),
});

export type FailedPing = z.infer<typeof failedPingSchema>;
