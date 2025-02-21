import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/helper";
import { NewTaskForm } from "./NewTaskForm";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  // if (user.role !== "lead") {
  //   return (
  //     <ErrorCard
  //       title="Unauthorized"
  //       message="You are not authorized to access this page"
  //     />
  //   );
  // }

  return (
    <div className="container mt-6">
      <NewTaskForm />
    </div>
  );
}
