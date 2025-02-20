"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const baseStyles =
  "rounded-md px-6 font-title py-3 text-lg transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-600";

const sizeStyles = {
  default: "py-3 px-6 text-lg font-medium",
  icon: "size-8",
};

const variantStyles = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
};

type Props = {
  size?: "default" | "icon";
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
