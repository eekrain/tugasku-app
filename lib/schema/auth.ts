import * as z from "zod";

const baseAccountSchema = z.object({
  email: z
    .string({ message: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
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
  email: true,
  password: true,
});
export type TLoginForm = z.infer<typeof loginSchema>;
