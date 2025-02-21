import { pgTable, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { tasks } from "./task";

export const roleEnum = pgEnum("role", ["lead", "team"]);

export const userTable = pgTable("user", {
  id: varchar({ length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  username: varchar({ length: 128 }).notNull().unique(),
  firstName: varchar({ length: 128 }).notNull(),
  lastName: varchar({ length: 128 }),
  passwordHash: varchar({ length: 255 }).notNull().unique(),
  role: roleEnum().notNull().default("team"),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const sessionTable = pgTable("session", {
  id: varchar({ length: 255 }).primaryKey(),
  userId: varchar({ length: 128 }).notNull(),
  expiresAt: timestamp().notNull(),
});

export const userRelations = relations(userTable, ({ one, many }) => ({
  sessions: many(sessionTable),
}));

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id],
  }),
}));
