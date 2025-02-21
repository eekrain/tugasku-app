import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 items-center justify-center bg-gray-50 px-4 lg:grid-cols-2 lg:px-0">
      <div className="w-full py-16">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Image src="/logo.png" width={40} height={40} alt="Tugasku Logo" />
          <p className="font-title text-2xl font-semibold">Tugasku</p>
        </div>

        {children}
      </div>

      <img
        src="/login-illustration.svg"
        alt="Vercel logomark"
        className="hidden lg:block"
      />
    </section>
  );
}
