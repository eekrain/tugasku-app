"use client";
import { Card } from "@/components/common/card";
import React from "react";

export type TaskStats = {
  all: number;
  not_started: number;
  on_progress: number;
  done: number;
  reject: number;
};

type Props = {
  stats: TaskStats;
};

export const TaskStatistic = ({ stats }: Props) => {
  return (
    <Card className="-order-1 lg:sticky lg:right-0 lg:top-[80px] lg:order-1 lg:h-fit">
      <h2 className="font-title text-2xl font-semibold">Statistik</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div className="rounded-md border bg-card p-4">
          <p className="font-semibold uppercase">All</p>
          <p className="border-l-4 border-border pl-2 font-semibold">
            {stats.all}
          </p>
        </div>

        <div className="rounded-md border bg-card p-4">
          <p className="font-semibold uppercase">Not Started</p>
          <p className="border-l-4 border-border pl-2 font-semibold">
            {stats.not_started}
          </p>
        </div>

        <div className="rounded-md border bg-card p-4">
          <p className="font-semibold uppercase">On Progress</p>
          <p className="border-l-4 border-border pl-2 font-semibold">
            {stats.on_progress}
          </p>
        </div>

        <div className="rounded-md border bg-card p-4">
          <p className="font-semibold uppercase">Done</p>
          <p className="border-l-4 border-border pl-2 font-semibold">
            {stats.done}
          </p>
        </div>

        <div className="rounded-md border bg-card p-4">
          <p className="font-semibold uppercase">Reject</p>
          <p className="border-l-4 border-border pl-2 font-semibold">
            {stats.reject}
          </p>
        </div>
      </div>
    </Card>
  );
};
