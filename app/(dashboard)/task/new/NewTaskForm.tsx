"use client";
import { Card } from "@/components/common/card";
import { TextField } from "@/components/common/text-field";
import { useForm } from "react-hook-form";
import { TNewTaskForm, newTaskSchema } from "@/lib/validation/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextAreaField } from "@/components/common/text-area";
import { SelectSearch } from "@/components/common/select-search";
import { useState } from "react";
import { Button } from "@/components/common/button";
import { useQuery } from "@tanstack/react-query";
import { getTeamMember } from "@/lib/services/getTeamMember";
import { useDebounce } from "@uidotdev/usehooks";
import { useAction } from "next-safe-action/hooks";
import { createTaskAction } from "./action";

type Props = {};

export const NewTaskForm = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: teamMembers } = useQuery({
    queryKey: ["getTeamMember", debouncedSearchTerm],
    queryFn: () => getTeamMember(debouncedSearchTerm),
  });

  const form = useForm<TNewTaskForm>({
    resolver: zodResolver(newTaskSchema),
  });

  const { execute, result } = useAction(createTaskAction);

  const onSubmit = form.handleSubmit((data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    execute(data);
  });

  const assignedErr = form.formState.errors["assignedTo"]?.message;
  return (
    <Card title="Buat Tugas Baru" className="mx-auto max-w-xl">
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
        <TextField form={form} name="title" label="Judul Tugas" />
        <TextAreaField form={form} name="description" label="Deskripsi Tugas" />

        <div className="flex flex-col">
          <span className="mb-1">Tugas Untuk</span>
          <input type="hidden" {...form.register("assignedTo")} />
          <SelectSearch
            placeholder="Pilih anggota team"
            options={teamMembers}
            onSearchChanged={(val) => setSearchTerm(val)}
            onSelectChanged={(val) => form.setValue("assignedTo", val)}
          />
          {assignedErr && (
            <span className="text-sm text-red-600">{assignedErr}</span>
          )}
        </div>

        <Button type="submit">Create</Button>
      </form>
    </Card>
  );
};
