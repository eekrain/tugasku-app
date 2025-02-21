"use server";
import { redirect } from "next/navigation";
import { endSession, getUserByUsername, startSession } from "./helper";
import { hash, verify } from "argon2";
import { registerSchema, loginSchema } from "../validation/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { authActionClient, actionClient } from "../safe-action";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput }) => {
    const existingUser = await db.query.userTable.findFirst({
      where: (t, { eq }) => eq(t.username, parsedInput.username),
    });

    if (existingUser) {
      return { error: "Username already exists" };
    }

    const user = await db
      .insert(userTable)
      .values({
        username: parsedInput.username,
        passwordHash: await hash(parsedInput.password),
        firstName: parsedInput.firstName,
        lastName: parsedInput.lastName,
      })
      .returning({ id: userTable.id });

    await startSession(user[0].id);
    redirect("/");
  });

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const user = await getUserByUsername(parsedInput.username);

    if (!user) {
      return { error: "User not found" };
    }

    const verifiedAuth = await verify(user.passwordHash, parsedInput.password);
    if (!verifiedAuth) {
      return { error: "Incorrect username or password" };
    }

    await startSession(user.id);
    redirect("/");
  });

export const logoutAction = authActionClient.action(async () => {
  await endSession();
  redirect("/login");
});
