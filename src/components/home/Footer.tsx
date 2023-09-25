"use client";

import React from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

type Props = {};

const Footer = (props: Props) => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = () => {};

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center p-16 text-center gap-4 mt-8">
      <div>
        <h2 className="text-2xl">Job AI</h2>
        <h2 className="mt-4">We are consistently adding new features!</h2>
        <p>Sign up for our newsletter to recieve emails about new features!</p>
      </div>
      <div className="w-full max-w-[400px]">
        <div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-end gap-2">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          inputMode="email"
                          placeholder="ex. johndoe@example.com"
                          className="bg-white text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant={"outline"}>Subscribe</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <span className="w-full bg-white h-[1px] mt-12"></span>
      <div className="flex md:flex-row flex-col w-full text-gray-400 justify-between items-center mt-4">
        <p>© 2023 Job AI. All rights reserved.</p>
        <ul className="flex gap-4 ">
          <li>Terms</li>
          <li>Privacy</li>
          <li>Cookies</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
