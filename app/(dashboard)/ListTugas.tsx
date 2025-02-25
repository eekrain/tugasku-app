"use client";
import { useState } from "react";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { Select } from "@/components/common/select";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/lib/services/getTasks";
import { TaskStatusEnum } from "@/db/schema";
import { FaPen } from "react-icons/fa6";
import { FILTER_OPTS, SORT_OPTS } from "@/lib/constant";

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

type Props = {
  isLead: boolean;
};

export const ListTugas = ({ isLead }: Props) => {
  const [status, setStatus] = useState(FILTER_OPTS[0].value);
  const [sort, setSort] = useState(SORT_OPTS[0].value);

  const { data: tasks } = useQuery({
    queryKey: ["getTasks", status, sort],
    queryFn: () => getTasks(status as TaskStatusEnum, sort),
  });

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-title text-2xl font-semibold">Tugas</h2>

        {isLead && (
          <Link href="/task/new">
            <Button size="sm">Buat tugas</Button>
          </Link>
        )}
      </div>

      <div className="mt-4 flex flex-col items-center justify-end gap-6 lg:flex-row">
        <div className="flex items-center gap-2">
          <span>Filter</span>
          <Select
            options={FILTER_OPTS}
            onChange={(val) => setStatus(val)}
            className="w-36"
            centerItem
          />
        </div>
        <div className="flex items-center gap-2">
          <span>Sort</span>
          <Select
            options={SORT_OPTS}
            onChange={(val) => setSort(val)}
            className="w-20"
            centerItem
          />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {tasks && tasks.length > 0 ? (
          tasks.map((item) => (
            <div key={item.id} className="rounded-md border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-title text-lg font-semibold">{item.title}</p>

                <Link href={`/task/edit/${item.id}`}>
                  <Button variant="outline" size="icon">
                    <FaPen />
                  </Button>
                </Link>
              </div>
              <p className="mt-2 text-sm">{item.description}</p>

              <div className="mt-4 flex items-center justify-end">
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 mt-8 w-full text-center text-lg">
            Tidak ada tasks ditemukan
          </div>
        )}
      </div>
    </Card>
  );
};
