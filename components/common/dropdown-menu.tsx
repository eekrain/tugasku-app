import React, { useState, useRef, useEffect, ComponentProps } from "react";
import { Button } from "./button";
import { twMerge } from "tailwind-merge";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export const DropdownMenu = ({ trigger, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center"
      >
        {trigger}
      </Button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="py-2">{children}</ul>
        </div>
      )}
    </div>
  );
};

type ItemProps = {
  children: React.ReactNode;
} & ComponentProps<"li">;

export const DropdownItem = ({ children, className, ...rest }: ItemProps) => {
  return (
    <li
      className={twMerge(
        "cursor-pointer px-4 py-2 hover:bg-gray-100",
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
};
