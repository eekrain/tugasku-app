"use client";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { MyLink } from "@/components/my-link";
import { TextField } from "@/components/text-field";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, TRegisterForm } from "@/lib/schema/auth";

type Props = {};

const RegisterPage = (props: Props) => {
  const form = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <Card
      title="Pendaftaran"
      description="Segera mendaftar untuk mengelola tugas dengan mudah bersama Tugasku"
      className="mx-auto max-w-lg"
    >
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("🚀 ~ <formonSubmit={form.handleSubmit ~ data:", data);
        })}
        className="flex flex-col gap-4"
      >
        <TextField form={form} name="email" label="Email" />
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
          Login
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
