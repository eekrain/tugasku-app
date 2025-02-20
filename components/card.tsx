import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ title, description, className, children }: Props) => {
  return (
    <div
      className={twMerge(
        "max-w-3xl rounded-lg border border-border bg-card p-6 text-card-foreground",
        className,
      )}
    >
      {title && (
        <h3 className="text-center font-title text-3xl font-semibold">
          {title}
        </h3>
      )}
      {description && <p className="mt-2 text-center">{description}</p>}

      <div className="mt-4">{children}</div>
    </div>
  );
};
