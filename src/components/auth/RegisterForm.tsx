"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { RegisterSchema, TRegisterSchema } from "@/lib/type";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import TextLoop from "react-text-loop";
import ViewPassword from "./ViewPassword";
import { useRouter } from "next/navigation";

type Props = {};

const RegisterForm = (props: Props) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewVerifyPassword, setViewVerifyPassword] = useState(false);
  const [matchError, setMatchError] = useState(null);

  const router = useRouter();

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    register,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      if (data.password !== data.verifyPassword) {
        return setError("verifyPassword", {
          message: "Passwords do not match",
        });
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error.meta.target === "User_email_key") {
        return setError("email", {
          message: "Email already in use! Login Instead",
        });
      }
      reset();
    } catch (error) {
      throw new Error("User was not created");
      return setError("root.serverError", { type: "400" });
    }
  };

  watch();
  return (
    <>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Start your journey today!</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-4">
                <FormField
                  control={control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} inputMode="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} inputMode="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ViewPassword
                          view={viewPassword}
                          setView={setViewPassword}
                        />
                        <Input
                          type={viewPassword ? "text" : "password"}
                          {...field}
                          inputMode="text"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="verifyPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-enter Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ViewPassword
                          view={viewVerifyPassword}
                          setView={setViewVerifyPassword}
                        />
                        <Input
                          type={viewVerifyPassword ? "text" : "password"}
                          {...field}
                          inputMode="text"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardDescription>
                Already have an account?{" "}
                <Link
                  href={"/signin"}
                  className="border-b-[1px] border-black cursor-pointer hover:text-black transition-all duration-150"
                >
                  Sign In
                </Link>
              </CardDescription>
              <Button
                variant={"secondary"}
                className="hover:bg-black hover:text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering User..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterForm;
