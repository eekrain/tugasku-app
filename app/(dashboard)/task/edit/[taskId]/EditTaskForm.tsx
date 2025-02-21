"use client";
import { Card } from "@/components/common/card";
import { TextField } from "@/components/common/text-field";
import { useForm, Controller } from "react-hook-form";
import {
  TNewTaskForm,
  TUpdateTaskForm,
  newTaskSchema,
  updateTaskSchema,
} from "@/lib/validation/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextAreaField } from "@/components/common/text-area";
import { SelectSearch } from "@/components/common/select-search";
import { useState } from "react";
import { Button } from "@/components/common/button";
import { useQuery } from "@tanstack/react-query";
import { getTeamMember } from "@/lib/services/getTeamMember";
import { useDebounce } from "@uidotdev/usehooks";
import { Select } from "@/components/common/select";
import { FILTER_OPTS } from "@/lib/constant";
import { tasks } from "@/db/schema";
import { updateTaskAction } from "./action";
import { useAction } from "next-safe-action/hooks";

type Props = {
  initialValues?: typeof tasks.$inferSelect;
};

export const EditTaskForm = ({ initialValues }: Props) => {
  const form = useForm<TUpdateTaskForm>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: initialValues?.id!,
      description: initialValues?.description!,
      status: initialValues?.status!,
      title: initialValues?.title!,
    },
  });
  const { execute, result } = useAction(updateTaskAction);

  const onSubmit = form.handleSubmit((data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    execute(data);
  });

  const statusErr = form.formState.errors["status"]?.message;

  return (
    <Card title="Edit Tugas" className="mx-auto max-w-xl">
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
        <TextField form={form} name="title" label="Judul Tugas" />
        <TextAreaField form={form} name="description" label="Deskripsi Tugas" />

        <input type="hidden" {...form.register("id")} />
        <input type="hidden" {...form.register("status")} />

        <div className="flex flex-col">
          <span className="mb-1">Status Pengerjaan</span>

          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select
                options={FILTER_OPTS}
                value={field.value}
                onChange={field.onChange}
                className="w-40"
                centerItem
              />
            )}
          />

          {statusErr && (
            <span className="text-sm text-red-600">{statusErr}</span>
          )}
        </div>

        <Button type="submit">Update</Button>
      </form>
    </Card>
  );
};
