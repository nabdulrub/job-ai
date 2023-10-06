"use client";

import { ChangePasswordSchema, TChangePasswordSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import Field from "../Field";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ButtonLoading from "../ButtonLoading";

type Props = {};

const ChangePassword = (props: Props) => {
  const router = useRouter();

  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      verifyNewPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: TChangePasswordSchema) => {
    try {
      if (data.newPassword !== data.verifyNewPassword) {
        return setError("verifyNewPassword", {
          message: "Passwords do not match",
        });
      }

      const response = await fetch("/api/user/changepassword", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      reset();
      router.refresh();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        <div className="flex gap-4 md:flex-row flex-col">
          <Field
            control={control}
            name="oldPassword"
            label="Old Password"
            type="text"
          />
          <Field
            control={control}
            name="newPassword"
            label="New Password"
            type="text"
          />
          <Field
            control={control}
            name="verifyNewPassword"
            label="Verify New Password"
            type="text"
          />
        </div>
        <div className="self-end">
          <ButtonLoading
            text="Change Password"
            loadingText="Changing..."
            isLoading={isSubmitting}
            variant={"secondary"}
          />
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;