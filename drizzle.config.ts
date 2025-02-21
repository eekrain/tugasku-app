import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { serverEnv } from "./lib/env/server";

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.POSTGRES_URL,
  },
  casing: "snake_case",
});
