import { createId } from "@paralleldrive/cuid2";
import { pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { userTable } from "./auth";

export const logs = pgTable("logs", {
  id: varchar({ length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  action: varchar("action", { length: 50 }).notNull(),
  taskId: varchar({ length: 128 }).notNull(),
  author: varchar({ length: 128 })
    .notNull()
    .references(() => userTable.id),
  changes: text("changes"),
  created_at: timestamp("created_at").defaultNow(),
});
