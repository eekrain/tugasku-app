import { db } from "@/db";
import { logs } from "@/db/schema";
import { getUser } from "@/lib/auth/helper";
import { redirect } from "next/navigation";
import React from "react";
import { Timeline, TimelineItem } from "./Timeline";

const getLogs = async () => {
  const data = await db.query.logs.findMany({
    columns: {
      id: true,
      action: true,
      changes: true,
      created_at: true,
    },
    with: {
      author: {
        columns: { username: true },
      },
      task: {
        columns: { id: true, title: true },
      },
    },
  });

  const result: TimelineItem[] = data.map((val) => {
    return {
      id: val.id,
      action: val.action,
      changes: Object.entries(JSON.parse(val.changes!)).map(([key, value]) => ({
        key,
        value: value as string,
      })),
      byUsername: val.author.username,
      taskTitle: val.task.title,
      taskId: val.task.id,
      date: val.created_at!,
    };
  });

  return result;
};

export default async function Page() {
  const user = await getUser();
  if (user?.role !== "lead") {
    redirect("/login");
  }

  const logs = await getLogs();

  return (
    <div className="container mt-12">
      <div className="mx-auto max-w-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Riwayat (Logs)</h2>

        <Timeline data={logs} />
      </div>
    </div>
  );
}
