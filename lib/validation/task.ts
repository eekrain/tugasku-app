import * as z from "zod";

const taskSchema = z.object({
  title: z
    .string({ message: "Judul tugas harus diisi" })
    .min(1, "Judul tugas harus diisi"),
  description: z
    .string({ message: "Deskripsi tugas harus diisi" })
    .min(1, "Deskripsi tugas harus diisi"),
  status: z.enum(["not_started", "on_progress", "done", "reject"]),
  assignedTo: z
    .string({ message: "Pilih anggota team untuk mengerjakan task" })
    .min(1, "Pilih anggota team untuk mengerjakan task"),
});

export const newTaskSchema = taskSchema.omit({ status: true });
export type TNewTaskForm = z.infer<typeof newTaskSchema>;
