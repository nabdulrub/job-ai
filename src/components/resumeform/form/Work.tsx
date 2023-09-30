"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JobSchema, TJobSchema } from "@/lib/type";
import { XSquareIcon } from "lucide-react";

import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFieldArrayReturn,
  UseFormRegister,
  useFieldArray,
  useForm,
} from "react-hook-form";
import ArrayInput from "./ArrayInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resumeMonths, resumeYears } from "@/data/resumeFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "@/components/Field";
import { Checkbox } from "@/components/ui/checkbox";
import StepsBtn from "../StepsBtn";

type Props = {
  formStep: number;
  setFormStep: (forStep: number) => void;
};

const WorkExperience = ({ formStep, setFormStep }: Props) => {
  const getYears = resumeYears();

  const form = useForm<TJobSchema>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      jobs: [
        {
          title: "",
          employer: "",
          location: "",
          startMonth: "January",
          startYear: 2020,
          endMonth: null,
          endYear: null,
          description: "",
          present: false,
        },
      ],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    watch,
    getValues,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = (data: TJobSchema) => {
    console.log(data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobs",
  });

  const newJob = () => {
    append({
      title: "",
      employer: "",
      location: "",
      startMonth: "February",
      startYear: 2023,
      endMonth: null,
      endYear: null,
      description: "",
      present: false,
    });
  };

  const error = control?._formState?.errors;

  const errorsCheck = Object.keys(error).length > 0 && error?.jobs?.length > 0;
  const getError = (idx: number, name: string) => {
    if (errorsCheck) {
      return error?.jobs[idx]?.[name]?.message || "";
    } else {
      return "";
    }
  };

  watch();

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
            <Button type="button" onClick={newJob}>
              Add Job
            </Button>
          </div>
          <div className="relative flex flex-row flex-wrap gap-4 ">
            {fields.map((job, index: number) => (
              <div
                key={job.id}
                className="grid grid-cols-1 gap-4 border-[1px] border-gray-300 p-4  rounded-xl relative bg-gray-100 flex-1 min-w-[300px]"
              >
                <div className="flex justify-between">
                  <h3>Job #{index + 1}</h3>
                  {index > 0 && (
                    <button
                      className="mr-1"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <XSquareIcon strokeWidth={1} />
                    </button>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <Field
                    control={control}
                    label="Job Title"
                    name={`jobs[${index}].title`}
                    placeholder="Job Title"
                    className="bg-white"
                  />

                  <Field
                    control={control}
                    label="Location"
                    name={`jobs[${index}].location`}
                    placeholder="Location"
                    className="bg-white"
                  />
                </div>
                <div className="flex md:flex-row flex-col gap-2">
                  <Field
                    control={control}
                    label="Employer"
                    name={`jobs[${index}].employer`}
                    placeholder="Employer"
                    className="bg-white"
                  />

                  <div className="flex flex-1 gap-[1px]">
                    <Field
                      label="Start Date"
                      name={`jobs[${index}].startMonth`}
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
                      name={`jobs[${index}].startYear`}
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

                  <div className="flex gap-2 flex-1 items-center">
                    <div className="flex flex-1 gap-[1px]">
                      <Field
                        label="End Date"
                        name={`jobs[${index}].endMonth`}
                        control={control}
                        render={(field) => (
                          <Select
                            onValueChange={field.onChange}
                            disabled={getValues(
                              `jobs[${index}].present` as `jobs.${number}.present`
                            )}
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
                        name={`jobs[${index}].endYear`}
                        control={control}
                        render={(field) => (
                          <Select
                            disabled={getValues(
                              `jobs[${index}].present` as `jobs.${number}.present`
                            )}
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
                      name={`jobs[${index}].present`}
                      size={0.1}
                      control={control}
                      render={(field) => (
                        <div className="flex gap-1 items-center">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(val) => {
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
                  name={`jobs[${index}].description`}
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
            ))}
          </div>
          <Button>Next</Button>
          <div className="flex justify-between mt-16">
            <StepsBtn
              setFormStep={setFormStep}
              text="Next"
              goNext
              type="submit"
              errors={errors}
            />

            <StepsBtn
              setFormStep={setFormStep}
              text="Previous"
              goPrev
              type="submit"
              errors={errors}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default WorkExperience;
