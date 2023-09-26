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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ViewPassword from "./ViewPassword";

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
    getValues,
    setError,
    formState: { errors, isLoading, isSubmitSuccessful, isSubmitting },
  } = form;

  const onSubmit = async (data: TSignInSchema) => {
    try {
      const response = await signIn("credentials", {
        email: getValues("email"),
        password: getValues("password"),
        redirect: false,
      });

      if (response?.error) {
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
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} inputMode="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passowrd</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ViewPassword
                        view={viewPassword}
                        setView={setViewPassword}
                      />
                      <Input
                        type={viewPassword ? "text" : "password"}
                        {...field}
                        inputMode="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
