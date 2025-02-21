import { narvik, User } from "@/lib/auth";
import { cache } from "react";
import { cookies } from "next/headers";
import { db } from "@/db";
import { type Session } from "narvik";

export const getUserByUsername = async (username: string) => {
  const user = await db.query.userTable.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });
  return user ?? null;
};

export const getUser = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(narvik.cookieName)?.value ?? null;
  if (!sessionToken) {
    return null;
  }

  let user: User | null = null;

  try {
    const session = await narvik.validateSession(sessionToken);
    if (session && (session.new || session.extended)) {
      const cookie = narvik.createCookie(sessionToken);
      cookieStore.set(cookie.name, cookie.value, cookie.attributes);
    }
    if (!session) {
      const cookie = narvik.createBlankCookie();
      cookieStore.set(cookie.name, cookie.value, cookie.attributes);
      return null;
    }

    // Fetch the user from your database using your existing user fetching implementation
    user = (await getUserByUsername(session.username)) || null;
  } catch (error) {
    // Catch as Next.js doesn't allow the setting of cookies when rendering pages.
    console.error("🚀 ~ getUser ~ error:", error);
    return null;
  }
  return user;
});

export const isLead = cache(async (): Promise<boolean> => {
  const user = await getUser();
  return user?.role === "lead";
});

export const isAuthenticated = cache(async (): Promise<boolean> => {
  const user = await getUser();
  return Boolean(user);
});

export const startSession = async (userId: string) => {
  const { token } = await narvik.createSession(userId, {} as Session);
  const cookie = narvik.createCookie(token);
  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

export const endSession = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(narvik.cookieName)?.value ?? null;
  if (sessionToken) {
    await narvik.invalidateSession(sessionToken);
    const cookie = narvik.createBlankCookie();
    cookieStore.set(cookie.name, cookie.value, cookie.attributes);
  }
};
