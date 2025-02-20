import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: varchar({ length: 128 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 128 }).notNull(),
  username: varchar({ length: 128 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: varchar({ length: 255 }).primaryKey(),
  userId: varchar({ length: 128 }).notNull(),
  expiresAt: timestamp().notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  sessions: many(session),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));
