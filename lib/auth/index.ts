import { db } from "@/db";
import { roleEnum, sessionTable, userTable } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import { Narvik, Session } from "narvik";

export const narvik = new Narvik({
  data: {
    saveSession: async (session: Session): Promise<void> => {
      // Save the session to your database
      try {
        await db.insert(sessionTable).values(session);
      } catch (error) {
        console.error(error);
      }
    },
    fetchSession: async (sessionId: string): Promise<Session | null> => {
      // Fetch the session from your database
      try {
        const found = await db.query.sessionTable.findFirst({
          where: (t, { eq }) => eq(t.id, sessionId),
          with: {
            user: {
              columns: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                role: true,
              },
            },
          },
        });
        if (!found) {
          console.error("Session not found");
          return null;
        }
        return {
          id: found.id,
          userId: found.userId,
          expiresAt: new Date(found.expiresAt),
          firstName: found.user.firstName,
          lastName: found.user.lastName ?? "",
          username: found.user.username,
          role: found.user.role,
        };
      } catch (error) {
        console.error("Error fetching session", error);
        return null;
      }
    },
    updateSessionExpiry: async (
      sessionId: string,
      updateExpiresAt: Date,
    ): Promise<void> => {
      // Update the session expiry in your database
      try {
        await db
          .update(sessionTable)
          .set({ expiresAt: updateExpiresAt })
          .where(eq(sessionTable.id, sessionId));
      } catch (error) {
        console.error("Error updating session expiry", error);
      }
    },
    deleteSession: async (sessionId: string): Promise<void> => {
      // Delete the session from your database
      try {
        await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
      } catch (error) {
        console.error("Error deleting session", error);
      }
    },
  },
  cookie: {
    cookieExpiresInMs: 1000 * 60 * 60 * 24 * 7, // 7 days
    attributes: {
      // Sets the cookie to be secure in production
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "narvik" {
  interface AdditionalSessionData {
    firstName: string;
    lastName: string;
    username: string;
    role: (typeof roleEnum.enumValues)[number];
  }
}

export type User = Omit<
  typeof userTable.$inferSelect,
  "passwordHash" | "createdAt" | "updatedAt"
>;
