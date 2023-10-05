"use client";

import { SignInSchema, TSignInSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import Field from "../Field";
import { Form } from "../ui/form";

type Props = {};

const SignInForm = (props: Props) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { refresh, replace } = useRouter();

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TSignInSchema) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        replace("/dashboard");
      }

      if (!response?.ok) {
        setError("password", { message: "Invalid Password or Email" });
        setError("email", { message: "Invalid Password or Email" });
      } else {
        replace("/");
        refresh();
      }
    } catch (err) {}
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Field control={control} name="email" label="Email" type="text" />

            <Field
              control={control}
              name="password"
              label="Password"
              view={viewPassword}
              password
              setView={setViewPassword}
              type={viewPassword ? "text" : "password"}
            />
            <CardDescription>
              Don&apos;t have an account?{" "}
              <Link
                href={"/register"}
                className="border-b-[1px] border-black cursor-pointer hover:text-black transition-all duration-150"
              >
                Register
              </Link>
            </CardDescription>
            <Button
              variant={"secondary"}
              className="hover:bg-black hover:text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
