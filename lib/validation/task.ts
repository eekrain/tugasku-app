import * as z from "zod";

const taskSchema = z.object({
  id: z.string().min(3),
  title: z
    .string({ message: "Judul tugas harus diisi" })
    .min(1, "Judul tugas harus diisi"),
  description: z
    .string({ message: "Deskripsi tugas harus diisi" })
    .min(1, "Deskripsi tugas harus diisi"),
  status: z.enum(["not_started", "on_progress", "done", "reject"], {
    message: "Pilih status yang valid",
  }),
  assignedTo: z
    .string({ message: "Pilih anggota team untuk mengerjakan task" })
    .min(1, "Pilih anggota team untuk mengerjakan task"),
});

export const newTaskSchema = taskSchema.omit({ status: true, id: true });
export type TNewTaskForm = z.infer<typeof newTaskSchema>;

export const updateTaskSchema = taskSchema.omit({ assignedTo: true });
export type TUpdateTaskForm = z.infer<typeof updateTaskSchema>;
