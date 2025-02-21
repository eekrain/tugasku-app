import React from "react";
import NextLink, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

const linkStyles = {
  default: "inline text-primary underline-offset-2 hover:underline",
  navInactive:
    "inline font-medium text-gray-700 hover:text-primary font-semibold",
  navActive: "inline font-medium text-primary font-semibold",
};

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof linkStyles;
} & LinkProps;

export const MyLink = ({
  children,
  className,
  variant = "default",
  ...rest
}: Props) => {
  return (
    <NextLink className={twMerge(linkStyles[variant], className)} {...rest}>
      {children}
    </NextLink>
  );
};
