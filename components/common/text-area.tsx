import React, { ComponentProps } from "react";
import { UseFormReturn } from "react-hook-form";
type Props = {
  name: string;
  label: string;
  placeholder?: string;
  form: UseFormReturn<any, any, undefined>;
} & Pick<ComponentProps<"textarea">, "rows">;

export const TextAreaField = ({
  name,
  label,
  form,
  rows = 3,
  ...rest
}: Props) => {
  const errMsg = form.formState.errors[name]?.message;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1">
        {label}
      </label>
      <textarea
        id={name}
        rows={rows}
        className="rounded border border-input px-4 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        {...rest}
        {...form.register(name)}
      />

      {errMsg && (
        <span className="mt-1 text-sm text-red-600">{String(errMsg)}</span>
      )}
    </div>
  );
};
