import React from "react";
import NextLink, { LinkProps } from "next/link";

type Props = {
  children: React.ReactNode;
} & LinkProps;

export const MyLink = ({ children, ...rest }: Props) => {
  return (
    <NextLink
      className="inline text-primary underline-offset-2 hover:underline"
      {...rest}
    >
      {children}
    </NextLink>
  );
};
