"use client";
import { Button } from "@/components/common/button";
import { Card } from "@/components/common/card";
import { User } from "@/lib/auth";
import { logoutAction } from "@/lib/auth/action";
import React from "react";

type Props = {
  user: User;
};

export const SettingsCard = ({ user }: Props) => {
  return (
    <Card title="Settings" className="mx-auto max-w-md text-center">
      <table className="mx-auto mt-6 text-left">
        <tbody>
          <tr>
            <td>Nama</td>
            <td className="px-4">:</td>
            <td>
              {user.firstName} {user.lastName}
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td className="px-4">:</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Role</td>
            <td className="px-4">:</td>
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
      <Button
        variant="destructive"
        className="mt-6 w-48"
        onClick={() => logoutAction()}
      >
        Logout
      </Button>
    </Card>
  );
};
