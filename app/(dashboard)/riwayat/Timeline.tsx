"use client";
import React from "react";
import { logs } from "@/db/schema";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export type TimelineItem = {
  changes: { key: string; value: string }[];
  byUsername: string;
  taskId: string;
  taskTitle: string;
  date: Date;
} & Pick<typeof logs.$inferSelect, "id" | "action">;

type Props = {
  data: TimelineItem[];
};

export const Timeline = ({ data }: Props) => {
  return (
    <div className="relative border-l-2 border-blue-500">
      {data.map((item, index) => (
        <div key={item.id} className="mb-8 ml-4">
          <div className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <p className="font-semibold uppercase">{item.action}</p>
              <p className="text-sm text-muted-foreground">
                {dayjs().to(item.date)}
              </p>
            </div>

            {/* Changes */}

            <table className="text-xs">
              {item.changes.map((val) => (
                <tr key={val.key}>
                  <td className="capitalize">{val.key}</td>
                  <td className="px-2">:</td>
                  <td>{val.value}</td>
                </tr>
              ))}
            </table>

            <div className="flex justify-end text-sm">
              by: {item.byUsername}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
