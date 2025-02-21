import { myfetch } from "./fetcher";
import type { tasks, TaskStatusEnum } from "@/db/schema";

export const getTasks = async (status: TaskStatusEnum, sort: string) => {
  const query = new URLSearchParams();
  query.append("status", status);
  query.append("sort", sort);

  const res = await myfetch
    .get(`/api/getTasks?${query.toString()}`)
    .errorMessage("Fetch tasks gagal")
    .execute<(typeof tasks.$inferSelect)[]>();

  return res;
};
