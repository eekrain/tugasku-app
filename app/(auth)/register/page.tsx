"use client";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { MyLink } from "@/components/common/my-link";
import { TextField } from "@/components/common/text-field";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterForm } from "@/lib/validation/auth";
import { registerAction } from "@/lib/auth/action";
import { useAction } from "next-safe-action/hooks";

type Props = {};

const RegisterPage = (props: Props) => {
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const { execute, result } = useAction(registerAction);
  console.log("🚀 ~ RegisterPage ~ result:", result);

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  return (
    <Card
      title="Pendaftaran"
      description="Segera mendaftar untuk mengelola tugas dengan mudah bersama Tugasku"
      className="mx-auto max-w-lg text-center"
    >
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4 text-left">
        <TextField form={form} name="username" label="Username" />
        <TextField form={form} name="firstName" label="Nama depan" />
        <TextField form={form} name="lastName" label="Nama belakang" />
        <TextField
          form={form}
          name="password"
          type="password"
          label="Password"
        />
        <TextField
          form={form}
          name="passwordConfirm"
          type="password"
          label="Konfirmasi password"
        />

        <Button type="submit" className="mt-4">
          Register
        </Button>

        <p className="text-center">
          <span>Sudah punya akun? </span>{" "}
          <MyLink href="/login">Login disini</MyLink>.
        </p>
      </form>
    </Card>
  );
};

export default RegisterPage;
