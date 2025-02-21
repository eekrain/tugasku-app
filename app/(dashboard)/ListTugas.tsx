"use client";
import { useState } from "react";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Select } from "@/components/common/select";

const sortOptions = [
  { label: "A - Z", value: "asc" },
  { label: "Z - A", value: "desc" },
];

const filterOptions = [
  { label: "Not Started", value: "not_started" },
  { label: "On Progress", value: "on_progress" },
  { label: "Done", value: "done" },
  { label: "Reject", value: "reject" },
];

type Task = { id: string; title: string; description: string; status: string };

const MOCK_TASKS: Task[] = [
  {
    id: "asjdnajsnd",
    title: "Design Mockups",
    description: "Create initial design drafts.",
    status: "not_started",
  },
  {
    id: "asdjansjn",
    title: "Develop Hero Section",
    description: "Build hero component..",
    status: "on_progress",
  },
  {
    id: "lksdmfks",
    title: "Implement Header",
    description: "Code website header.",
    status: "done",
  },
  {
    id: "askdmsk",
    title: "Set up Development Env",
    description: "Configure dev tools.",
    status: "reject",
  },
];

const badgeStyles: Record<string, string> = {
  not_started: "bg-gray-300 text-gray-700",
  on_progress: "bg-yellow-300 text-yellow-700",
  done: "bg-emerald-300 text-emerald-700",
  reject: "bg-red-300 text-red-700",
};
const statusTitles: Record<string, string> = {
  not_started: "Not Started",
  on_progress: "On Progress",
  done: "Done",
  reject: "Reject",
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${badgeStyles[status]}`}
    >
      {statusTitles[status]}
    </span>
  );
};

export const ListTugas = () => {
  const [status, setStatus] = useState(filterOptions[0].value);
  const [sort, setSort] = useState(sortOptions[0].value);

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-title text-2xl font-semibold">Tugas</h2>

        <Button size="sm">Buat tugas</Button>
      </div>
      <div className="mt-4 flex flex-col items-center justify-end gap-6 lg:flex-row">
        <div className="flex items-center gap-2">
          <span>Filter</span>
          <Select
            options={filterOptions}
            onChange={(val) => setSort(val)}
            className="w-36"
            centerItem
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Sort</span>
          <Select
            options={sortOptions}
            onChange={(val) => setSort(val)}
            className="w-16"
            centerItem
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {MOCK_TASKS.map((item) => (
          <div key={item.id} className="rounded-md border border-border p-4">
            <p className="font-title text-lg font-semibold">{item.title}</p>
            <p className="mt-2 text-sm">{item.description}</p>

            <div className="flex items-center justify-end">
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
