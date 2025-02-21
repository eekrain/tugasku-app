import { z } from "zod";

const envSchema = z.object({
  POSTGRES_URL: z.string(),
});
export const serverEnv = envSchema.parse(process.env);

if (process.env.NODE_ENV !== "production") {
  console.log("🚀 ~ serverEnv:", serverEnv);
}
