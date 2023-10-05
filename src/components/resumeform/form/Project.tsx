"use client";

import ButtonLoading from "@/components/ButtonLoading";
import Field from "@/components/Field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useFormStepContext } from "@/context/FormSteps";
import { resumeMonths, resumeYears } from "@/data/resumeFormData";
import { ProjectSchema, TProjectSchema, UserSession } from "@/lib/type";
import { handleNext, handlePrev } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, GanttChartSquare, Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  session: UserSession;
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const ProjectExperience = ({ session, formStep, setFormStep }: Props) => {
  const { isStepCompleted, setComplete } = useFormStepContext();
  const isComplete = isStepCompleted[formStep]?.completed;

  const getYears = resumeYears();

  const form = useForm<TProjectSchema>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      location: "",
      startMonth: undefined,
      startYear: undefined,
      endMonth: undefined,
      endYear: undefined,
      description: "",
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: TProjectSchema) => {
    try {
      const response = await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Doing Great, Project Added!",
          description: "Add another project!",
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
        setComplete(formStep);
      }

      if (!response.ok) {
        toast({
          title: "Failed to add project!",
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextError = () => {
    if (isComplete) {
      return handleNext(setFormStep);
    }
    toast({
      title: "No Added Projects",
      description: `You must add a project to proceed!\n Hint: Press the "Add Project" button`,
      action: (
        <ToastAction altText="Back to form" className="bg-red-800 text-white">
          Dismiss
        </ToastAction>
      ),
      duration: 3000,
    });
  };

  watch();
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="md:text-xl text-md font-semibold flex gap-2 items-center">
              Project Experience <GanttChartSquare className="w-6" />{" "}
            </h2>
            <div className="flex gap-2">
              {isComplete && (
                <>
                  <ButtonLoading
                    text="Add Project"
                    loadingText="Adding..."
                    type="submit"
                    className="hidden md:block"
                    isLoading={isSubmitting}
                    buttonIcon={<Plus className="w-5 md:ml-[3px]" />}
                  />
                  <ButtonLoading
                    type="submit"
                    isLoading={isSubmitting}
                    className="md:hidden"
                    buttonIcon={<Plus className="w-5 md:ml-[3px]" />}
                  />
                </>
              )}
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row  gap-4 overflow-auto max-h-[575px] md:h-auto pb-6 px-1 job-experience-scroll scroll-smooth">
            <div className="grid grid-cols-1 gap-4 flex-1">
              <div className="flex flex-col md:flex-row gap-2">
                <Field
                  control={control}
                  label="Project Title"
                  name={`title`}
                  placeholder="Enter Project Title"
                  className="bg-white"
                />

                <Field
                  control={control}
                  label="Location"
                  name={`location`}
                  placeholder="Project Location"
                  className="bg-white"
                />
              </div>
              <div className="flex md:flex-row flex-col gap-2">
                <div className="flex flex-1 gap-[1px] w-full">
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

                <div className="flex flex-1 gap-[1px]">
                  <Field
                    label="End Date"
                    name={`endMonth`}
                    control={control}
                    render={(field) => (
                      <Select onValueChange={field.onChange}>
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
                    control={control}
                    render={(field) => (
                      <Select
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
              </div>

              <Field
                label="Description"
                name={`description`}
                control={control}
                render={(field) => (
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Describe the Project"
                    className="bg-white"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            {isComplete ? (
              <Button
                type="button"
                className={`absolute bottom-6 right-6 bg-orange-600 hover:bg-orange-300 hover:text-black shadow-none`}
                onClick={handleNextError}
              >
                Skills & Education
                <ChevronRight className="w-5l -mr-2" />
              </Button>
            ) : (
              <ButtonLoading
                text="Add Project"
                loadingText="Adding..."
                type="submit"
                isLoading={isSubmitting}
                className="absolute right-6 bottom-6"
                buttonIcon={<Plus className="w-5 md:ml-[3px]" />}
              />
            )}
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

export default ProjectExperience;
