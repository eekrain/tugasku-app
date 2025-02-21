import { getUser } from "@/lib/auth/helper";
import { redirect } from "next/navigation";
import { EditTaskForm } from "./EditTaskForm";
import { db } from "@/db";
import { TUpdateTaskForm } from "@/lib/validation/task";

type Props = {
  params: Promise<{ taskId: string }>;
};

const getTaskById = async (id: string) => {
  const res = await db.query.tasks.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });

  return res;
};

export default async function Page({ params }: Props) {
  const user = await getUser();
  if (!user) redirect("/login");

  const { taskId } = await params;
  const initialValues = await getTaskById(taskId);
  if (!initialValues) redirect("/");

  return (
    <div className="container mt-6">
      <EditTaskForm initialValues={initialValues} />
    </div>
  );
}
