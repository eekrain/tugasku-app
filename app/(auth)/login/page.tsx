"use client";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { MyLink } from "@/components/common/my-link";
import { TextField } from "@/components/common/text-field";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginForm } from "@/lib/schema/auth";

type Props = {};

const LoginPage = (props: Props) => {
  const form = useForm<TLoginForm>({ resolver: zodResolver(loginSchema) });

  return (
    <Card
      title="Login"
      description="Silahkan login dengan email anda"
      className="mx-auto max-w-md"
    >
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("🚀 ~ <formonSubmit={form.handleSubmit ~ data:", data);
        })}
        className="flex flex-col gap-4"
      >
        <TextField form={form} name="email" label="Email" />
        <TextField form={form} name="password" label="Password" />

        <Button type="submit" className="mt-4">
          Login
        </Button>

        <p className="text-center">
          <span>Belum punya akun? </span>{" "}
          <MyLink href="/register">Daftar disini</MyLink>.
        </p>
      </form>
    </Card>
  );
};

export default LoginPage;
