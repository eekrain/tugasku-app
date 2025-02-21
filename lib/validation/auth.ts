import * as z from "zod";

const baseAccountSchema = z.object({
  username: z
    .string({ message: "Username harus diisi" })
    .min(3, { message: "Username minimal 3 karakter" }),
  firstName: z
    .string({ message: "Nama depan harus diisi" })
    .min(1, { message: "Nama depan harus diisi" }),
  lastName: z
    .string({ message: "Nama belakang harus diisi" })
    .min(1, { message: "Nama belakang harus diisi" }),
  password: z
    .string({ message: "Password minimal 6 karakter" })
    .min(6, { message: "Password minimal 6 karakter" }),
  passwordConfirm: z
    .string({ message: "Password minimal 6 karakter" })
    .min(6, { message: "Password minimal 6 karakter" }),
});

export const registerSchema = baseAccountSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Password konfirmasi tidak sama",
    path: ["passwordConfirm"],
  },
);
export type TRegisterForm = z.infer<typeof registerSchema>;

export const loginSchema = baseAccountSchema.pick({
  username: true,
  password: true,
});
export type TLoginForm = z.infer<typeof loginSchema>;
