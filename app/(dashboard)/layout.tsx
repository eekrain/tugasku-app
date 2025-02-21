import { Navbar } from "@/components/Navbar";
import { getUser } from "@/lib/auth/helper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="relative min-h-screen overflow-clip bg-gray-50">
      <Navbar user={user} />
      {children}
    </div>
  );
}
