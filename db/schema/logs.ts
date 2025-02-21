import { createId } from "@paralleldrive/cuid2";
import { pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { userTable } from "./auth";
import { relations } from "drizzle-orm";
import { tasks } from "./task";

export const logActionEnum = pgEnum("log_action", ["create", "update"]);

export const logs = pgTable("logs", {
  id: varchar({ length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  action: logActionEnum().notNull(),
  taskId: varchar({ length: 128 })
    .notNull()
    .references(() => tasks.id),
  author: varchar({ length: 128 })
    .notNull()
    .references(() => userTable.id),
  changes: text("changes"),
  created_at: timestamp("created_at").defaultNow(),
});

export const logsRelations = relations(logs, ({ one }) => ({
  author: one(userTable, {
    fields: [logs.author],
    references: [userTable.id],
  }),
  task: one(tasks, {
    fields: [logs.taskId],
    references: [tasks.id],
  }),
}));
