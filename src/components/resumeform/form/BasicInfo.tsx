"use client";

import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BasicInfoSchema, TBasicInfoSchema, UserSession } from "@/lib/type";
import { handleNext } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
  session?: UserSession;
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const BasicInfo = ({ session, formStep, setFormStep }: Props) => {
  const form = useForm<TBasicInfoSchema>({
    resolver: zodResolver(BasicInfoSchema),
    defaultValues: {
      firstname: session?.firstname ? session.firstname : "",
      lastname: session?.lastname ? session.lastname : "",
      location: "",
      phone: "",
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: TBasicInfoSchema) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response?.ok) {
        toast({
          title: "Step one done!",

          description: "Lets keep going, just a few more to go!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Next Step
            </ToastAction>
          ),
        });
        handleNext(setFormStep);
        reset();
      }

      if (!response?.ok) {
        toast({
          title: "Failed to submit info",
          variant: "destructive",
          description: "Please try again!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-gray-100 text-black "
            >
              Dismiss
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  watch();
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Field
              control={control}
              name="firstname"
              label="First Name"
              inputMode="text"
            />
            <Field
              control={control}
              name="lastname"
              label="Last Name"
              inputMode="text"
            />
            <Field
              control={control}
              name="location"
              label="Location"
              inputMode="text"
            />
            <Field
              control={control}
              name="phone"
              label="Mobile"
              inputMode="tel"
            />
          </div>
          <div className="flex justify-between mt-14">
            <Button className="absolute right-6 bottom-6 bg-cyan-600 hover:bg-cyan-900 ">
              {isSubmitting ? "Submitting..." : "Job Experience"}
              <ChevronRight className="w-5 mt-[1px]" />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BasicInfo;
