import "dotenv/config";
import * as process from "node:process";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    TOKEN: z.string(),
    LOGS_CHANNEL: z.string(),
  },
  runtimeEnv: process.env,
});
