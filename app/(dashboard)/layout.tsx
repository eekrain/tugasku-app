import { Navbar } from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-clip bg-gray-50">
      <Navbar />
      {children}
    </div>
  );
}
