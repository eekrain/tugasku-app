"use client";
import { MyLink } from "@/components/common/my-link";
import { User } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { IoMdMenu, IoMdClose } from "react-icons/io";

type Props = {
  user?: User | null;
};

export const Navbar = ({ user }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu when navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("#mobile-menu")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);

  return (
    <div className="sticky left-0 top-0 z-50 bg-white py-2 shadow-lg">
      <header className="container relative flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="size-8 md:size-10"
            src="/logo.png"
            width={40}
            height={40}
            alt="Tugasku Logo"
          />
          <p className="font-title text-lg font-semibold md:text-2xl">
            Tugasku
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <IoMdMenu className="size-6" />
        </button>

        {/* Mobile Drawer & Backdrop */}
        <div
          className={twMerge(
            "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
            open ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
        <nav
          id="mobile-menu"
          className={twMerge(
            "fixed inset-y-0 right-0 z-50 w-[60%] bg-white p-6 shadow-lg transition-transform duration-300 sm:w-[40%] md:hidden",
            open ? "translate-x-0" : "translate-x-full",
          )}
          aria-hidden={!open}
        >
          {/* Close Button */}
          <button
            className="absolute right-4 top-4 p-2"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <IoMdClose className="size-6" />
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-4">
            <NavLinks user={user} />
          </ul>
        </nav>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:gap-6">
          <NavLinks user={user} />
        </ul>
      </header>
    </div>
  );
};

// Extracted Navigation Links Component
const NavLinks = ({ user }: { user?: User | null }) => {
  const pathname = usePathname();

  return (
    <>
      <li>
        <MyLink
          href="/"
          variant={pathname === "/" ? "navActive" : "navInactive"}
        >
          Tugas
        </MyLink>
      </li>
      {user?.role === "lead" && (
        <li>
          <MyLink
            href="/riwayat"
            variant={pathname === "/riwayat" ? "navActive" : "navInactive"}
          >
            Riwayat
          </MyLink>
        </li>
      )}
      <li>
        <MyLink
          href="/settings"
          variant={pathname === "/settings" ? "navActive" : "navInactive"}
        >
          Settings
        </MyLink>
      </li>
    </>
  );
};
