"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { JobSchema, TJobSchema } from "@/lib/type";
import { ChevronRight, Plus } from "lucide-react";

import Field from "@/components/Field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resumeMonths, resumeYears } from "@/data/resumeFormData";
import { handleNext, handlePrev } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useSession } from "next-auth/react";

type Props = {
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const WorkExperience = ({ formStep, setFormStep }: Props) => {
  const { data: userSession } = useSession();

  const getYears = resumeYears();

  const form = useForm<TJobSchema>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      employer: "",
      location: "",
      startMonth: undefined,
      startYear: undefined,
      endMonth: undefined,
      endYear: undefined,
      description: "",
      present: false,
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    reset,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: TJobSchema) => {
    try {
      const response = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast({
          title: "Job Added!",
          description: "Add another job!",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-green-800 text-white hover:text-black"
            >
              Add More
            </ToastAction>
          ),
          duration: 2000,
        });
        reset();
      }

      if (!response.ok) {
        toast({
          title: "Failed to add job!",
          description: "Please try again...",
          action: (
            <ToastAction
              altText="Back to form"
              className="bg-red-800 text-white hover:text-black"
            >
              Sure
            </ToastAction>
          ),
          duration: 2000,
        });
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextError = () => {
    if (isSubmitSuccessful) {
      return handleNext(setFormStep);
    }
    toast({
      title: "No Added Jobs",
      description:
        "You must add a job to continue!\n Hint: Press the Add Job button",
      action: (
        <ToastAction altText="Back to form" className="bg-red-800 text-white">
          Dismiss
        </ToastAction>
      ),
      duration: 2000,
    });
  };

  watch();

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <Button className="flex items-center" type="submit">
              {isSubmitting ? "Adding..." : "Add Job"}
              <Plus className="w-5 ml-[3px]" />
            </Button>
          </div>
          <div className="relative flex flex-col md:flex-row  gap-4 overflow-auto max-h-[575px] md:h-auto pb-6 px-1 job-experience-scroll scroll-smooth">
            <div className="grid grid-cols-1 gap-4  flex-1 min-w-full">
              <div className="flex flex-col md:flex-row gap-2">
                <Field
                  control={control}
                  label="Job Title"
                  name={`title`}
                  placeholder="Job Title"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="Location"
                  className="bg-white"
                />
              </div>
              <div className="flex md:flex-row flex-col gap-2">
                <Field
                  control={control}
                  label="Employer"
                  name={`employer`}
                  placeholder="Employer"
                  className="bg-white"
                />

                <div className="flex flex-[0.7] gap-[1px] w-full">
                  <Field
                    label="Start Date"
                    name={`startMonth`}
                    control={control}
                    render={(field) => (
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="bg-white rounded-tr-none border-r-0 rounded-br-none">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {resumeMonths.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Field
                    label="&#8205;"
                    name={`startYear`}
                    control={control}
                    render={(field) => (
                      <Select
                        onValueChange={(val) => {
                          field.onChange(parseInt(val));
                        }}
                      >
                        <SelectTrigger className="bg-white flex-1 rounded-tl-none border-l-0 rounded-bl-none">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {getYears.map((val, i) => (
                            <SelectItem
                              key={i}
                              value={val}
                              className="capitalize"
                            >
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex gap-2 flex-1">
                  <div className="flex flex-1 gap-[1px]">
                    <Field
                      label="End Date"
                      name={`endMonth`}
                      rules={{
                        required: !!getValues("present"),
                      }}
                      control={control}
                      render={(field) => (
                        <Select
                          onValueChange={field.onChange}
                          disabled={getValues(`present`)}
                        >
                          <SelectTrigger className="bg-white rounded-tr-none border-r-0 rounded-br-none">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {resumeMonths.map((val, i) => (
                              <SelectItem
                                key={i}
                                value={val}
                                className="capitalize"
                              >
                                {val}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Field
                      label="&#8205;"
                      name={`endYear`}
                      rules={{
                        required: !!getValues("present"),
                      }}
                      control={control}
                      render={(field) => (
                        <Select
                          disabled={getValues(`present`)}
                          onValueChange={(val) => {
                            field.onChange(parseInt(val));
                          }}
                        >
                          <SelectTrigger className="bg-white rounded-tl-none border-l-0 rounded-bl-none">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {getYears.map((val, i) => (
                              <SelectItem
                                key={i}
                                value={val}
                                className="capitalize"
                              >
                                {val}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <Field
                    label="&#8205;"
                    name={`present`}
                    size={0.1}
                    control={control}
                    render={(field) => (
                      <div className="flex gap-1 items-center">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(val) => {
                            if (val) {
                              setValue("endMonth", undefined);
                              setValue("endYear", undefined);
                            }
                            field.onChange(val);
                          }}
                        />
                        <label className="font-semibold text-sm">
                          Present?
                        </label>
                      </div>
                    )}
                  />
                </div>
              </div>

              <Field
                label="Description"
                name={`description`}
                control={control}
                render={(field) => (
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Description"
                    className="bg-white"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              className={`absolute bottom-6 right-6 bg-green-700 hover:bg-green-300 hover:text-black shadow-none`}
              onClick={handleNextError}
            >
              Project Experience
              <ChevronRight className="w-5l -mr-2" />
            </Button>
            <Button
              variant={"secondary"}
              type="button"
              className="absolute bottom-6 left-6"
              onClick={() => handlePrev(setFormStep)}
            >
              Previous
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default WorkExperience;
