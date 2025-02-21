"use server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { logs } from "@/db/schema/logs";
import { authActionClient } from "@/lib/safe-action";
import { newTaskSchema } from "@/lib/validation/task";

export const createTaskAction = authActionClient
  .schema(newTaskSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.session.role !== "lead")
      throw new Error("Unathorized! Only lead can create task");

    await db.transaction(async (tx) => {
      const values = {
        title: parsedInput.title,
        description: parsedInput.description,
        status: "not_started",
      } as const;

      const res = await db
        .insert(tasks)
        .values({
          ...values,
          author: ctx.session.id,
          assignedTo: parsedInput.assignedTo,
        })
        .returning({ id: tasks.id, title: tasks.title });

      await db.insert(logs).values({
        action: "create",
        author: ctx.session.id,
        taskId: res[0].id,
        changes: JSON.stringify(values),
      });
    });

    return { message: `Tugas ${parsedInput.title} berhasil dibuat` };
  });
