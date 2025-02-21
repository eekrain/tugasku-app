"use server";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { authActionClient } from "@/lib/safe-action";
import { newTaskSchema } from "@/lib/validation/task";

export const createTaskAction = authActionClient
  .schema(newTaskSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.session.role !== "lead")
      throw new Error("Unathorized! Only lead can create task");

    const res = await db
      .insert(tasks)
      .values({
        title: parsedInput.title,
        description: parsedInput.description,
        author: ctx.session.id,
        assignedTo: parsedInput.assignedTo,
      })
      .returning({ title: tasks.title });

    return res;
  });
