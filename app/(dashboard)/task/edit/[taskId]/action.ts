"use server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { logs } from "@/db/schema/logs";
import { authActionClient } from "@/lib/safe-action";
import { updateTaskSchema } from "@/lib/validation/task";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Task = typeof tasks.$inferSelect;

export const updateTaskAction = authActionClient
  .schema(updateTaskSchema)
  .action(async ({ parsedInput, ctx }) => {
    await db.transaction(async (tx) => {
      const prevData = await db.query.tasks.findFirst({
        where: (t, { eq }) => eq(t.id, parsedInput.id),
      });
      const values: Partial<Task> = {};
      if (parsedInput.title !== prevData?.title)
        values.title = parsedInput.title;
      if (parsedInput.description !== prevData?.description)
        values.description = parsedInput.description;
      if (parsedInput.status !== prevData?.status)
        values.status = parsedInput.status;

      const res = await db
        .update(tasks)
        .set(values)
        .where(eq(tasks.id, parsedInput.id))
        .returning({ id: tasks.id, title: tasks.title });

      await db.insert(logs).values({
        action: "update",
        author: ctx.session.id,
        taskId: res[0].id,
        changes: JSON.stringify(values),
      });
    });

    redirect("/");
  });
