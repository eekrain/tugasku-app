import { createId } from "@paralleldrive/cuid2";
import { pgTable, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { userTable } from "./auth";
import { relations } from "drizzle-orm";

export const taskStatus = pgEnum("task_status", [
  "not_started",
  "on_progress",
  "done",
  "reject",
]);

export const tasks = pgTable("tasks", {
  id: varchar({ length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  status: taskStatus().notNull().default("not_started"),
  author: varchar({ length: 128 })
    .references(() => userTable.id)
    .notNull(),
  assignedTo: varchar({ length: 128 }).references(() => userTable.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  author: one(userTable, {
    relationName: "author",
    fields: [tasks.author],
    references: [userTable.id],
  }),
  assignedTo: one(userTable, {
    relationName: "assignedTo",
    fields: [tasks.assignedTo],
    references: [userTable.id],
  }),
}));
