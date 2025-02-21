import "dotenv/config";
import { serverEnv } from "@/lib/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// You can specify any property from the node-postgres connection options
export const db = drizzle({
  connection: {
    connectionString: serverEnv.POSTGRES_URL,
  },
  schema,
  casing: "snake_case",
});
