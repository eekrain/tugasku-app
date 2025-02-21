import { getUser } from "@/lib/auth/helper";
import { redirect } from "next/navigation";
import { SettingsCard } from "./SettingsCard";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mt-6">
      <SettingsCard user={user} />
    </div>
  );
}
