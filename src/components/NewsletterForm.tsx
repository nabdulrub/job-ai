"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { NewsSchema, TNewsSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const NewsletterForm = (props: Props) => {
  const form = useForm<TNewsSchema>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TNewsSchema) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result) return setError("email", { message: "Failed to sign up" });
    } catch (error) {
      if (error) {
        return setError("email", { message: "Failed to sign up" });
      }
    } finally {
      reset();
    }
  };

  return (
    <>
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
              <Button type="submit" variant={"outline"} disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default NewsletterForm;
