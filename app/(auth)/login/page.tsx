"use client";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { MyLink } from "@/components/common/my-link";
import { TextField } from "@/components/common/text-field";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginForm } from "@/lib/validation/auth";
import { loginAction } from "@/lib/auth/action";
import { useAction } from "next-safe-action/hooks";

type Props = {};

const LoginPage = (props: Props) => {
  const form = useForm<TLoginForm>({ resolver: zodResolver(loginSchema) });
  const { execute, result } = useAction(loginAction);

  const onSubmit = form.handleSubmit((data) => {
    execute(data);
  });

  return (
    <Card
      title="Login"
      description="Silahkan login dengan email anda"
      className="mx-auto max-w-md"
    >
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-4">
        <TextField form={form} name="username" label="Username" />
        <TextField
          form={form}
          name="password"
          type="password"
          label="Password"
        />

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
