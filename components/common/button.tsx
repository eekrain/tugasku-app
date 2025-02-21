"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

const baseStyles =
  "rounded-md font-title text-lg transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-600";

const sizeStyles = {
  default: "py-2 px-4 text-lg font-medium",
  sm: "py-2 px-3 font-medium text-sm",
  icon: "size-8",
};

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
};

type Props = {
  size?: "default" | "icon" | "sm";
  variant?: "default" | "destructive";
  children: React.ReactNode;
  className?: string;
} & Pick<React.ComponentProps<"button">, "type">;

export const Button = ({
  size = "default",
  variant = "default",
  children,
  type = "button",
  className,
}: Props) => {
  return (
    <button
      className={twMerge(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      type={type}
    >
      {children}
    </button>
  );
};
