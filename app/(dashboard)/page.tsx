import { db } from "@/db";
import { ListTugas } from "./ListTugas";
import { TaskStatistic, TaskStats } from "./TaskStatistic";
import { getUser } from "@/lib/auth/helper";
import { redirect } from "next/navigation";
import { tasks } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { User } from "@/lib/auth";

const getStatistic = async (user: User) => {
  if (user.role !== "team") return null;

  const res = await Promise.all([
    db
      .select({ total: count() })
      .from(tasks)
      .where(eq(tasks.assignedTo, user.id)),
    db
      .select({
        status: tasks.status,
        count: count(),
      })
      .from(tasks)
      .where(eq(tasks.assignedTo, user.id))
      .groupBy(tasks.status),
  ]);
  console.log("🚀 ~ getStatistic ~ res:", res);

  const result: TaskStats = {
    all: res[0][0].total,
    not_started: 0,
    on_progress: 0,
    done: 0,
    reject: 0,
  };
  res[1].forEach(({ status, count }) => {
    result[status as keyof typeof result] = count;
  });

  return result;
};

export default async function Home() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const isLead = user.role === "lead";
  const stats = await getStatistic(user);

  return (
    <div className="container relative mb-16 mt-6">
      {/* Lead tidak memerlukan pengecekan statistik */}
      {isLead ? (
        <div className="mx-auto max-w-4xl">
          <ListTugas isLead={isLead} />
        </div>
      ) : (
        <div className="relative grid gap-y-8 lg:grid-cols-[60%_40%] lg:gap-y-0 lg:space-x-8">
          <ListTugas isLead={false} />
          {stats && <TaskStatistic stats={stats} />}
        </div>
      )}
    </div>
  );
}
