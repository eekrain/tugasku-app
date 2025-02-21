"use client";

type Props = {
  title: string;
  message: string;
};

export function ErrorCard({ title, message }: Props) {
  return (
    <div className="mx-auto mt-6 max-w-lg rounded-md bg-red-50 p-4">
      <h3 className="text-center text-2xl font-semibold text-destructive">
        {title}
      </h3>
      <p className="mt-1 text-center text-sm text-red-700">{message}</p>
    </div>
  );
}
