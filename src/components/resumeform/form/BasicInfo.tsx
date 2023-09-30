"use client";

import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicInfoSchema, TBasicInfoSchema, UserSession } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import StepsBtn from "../StepsBtn";
import { Check } from "lucide-react";

type Props = {
  session: UserSession;
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
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = (data: TBasicInfoSchema) => {
    console.log(data);
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
              type="number"
            />
          </div>
          <div className="flex justify-between mt-16">
            <button type="submit">
              <StepsBtn
                setFormStep={setFormStep}
                text="Next"
                goNext
                type="submit"
                errors={errors}
              />
            </button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BasicInfo;
