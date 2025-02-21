"use client";
import { MyLink } from "@/components/common/my-link";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 z-50 bg-white py-2 shadow-lg">
      <header className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" width={40} height={40} alt="Tugasku Logo" />
          <p className="font-title text-2xl font-semibold">Tugasku</p>
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <MyLink
              href="/"
              variant={pathname === "/" ? "navActive" : "navInactive"}
            >
              Tugas
            </MyLink>
          </li>
          <li>
            <MyLink
              href="/riwayat"
              variant={pathname === "/riwayat" ? "navActive" : "navInactive"}
            >
              Riwayat
            </MyLink>
          </li>

          <li>
            <MyLink
              href="/settings"
              variant={pathname === "/settings" ? "navActive" : "navInactive"}
            >
              Settings
            </MyLink>
          </li>
        </ul>
      </header>
    </div>
  );
};
