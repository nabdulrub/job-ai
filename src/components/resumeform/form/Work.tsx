"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TResumeSchema } from "@/lib/type";
import { XSquareIcon } from "lucide-react";

import React, { useState } from "react";
import { Control, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";

type Props = {
  control: Control;
  fieldArray: UseFieldArrayReturn;
  register: UseFormRegister<TResumeSchema>;
};

const WorkExperience = ({ control, fieldArray, register }: Props) => {
  const error = control?._formState?.errors;

  const { fields, append, prepend, remove, swap, move, insert } = fieldArray;

  const getError = (idx: number, name: string) => {
    return error?.jobs[idx][name]?.message || "";
  };

  const errorsCheck = Object.keys(error).length > 0 && error.jobs?.length > 0;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
        <Button type="button" onClick={() => append({})}>
          Add Job
        </Button>
      </div>
      <div className="relative flex flex-row flex-wrap   gap-4 ">
        {fields.map((job, index) => (
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
            <div className="flex flex-col md:flex-row gap-2 ">
              <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">Job Title</label>
                <Input
                  className="bg-white"
                  {...control.register(`jobs[${index}].title`)}
                  placeholder="Job Title"
                />
                {errorsCheck ? (
                  <p className="text-red-500 text-sm ml-[2px]">
                    {getError(index, "title")}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1 flex-[0.5]">
                <label className="font-semibold">Start Date</label>
                <Input
                  className="bg-white"
                  {...control.register(`jobs[${index}].start`)}
                  placeholder="Start"
                />
                {errorsCheck ? (
                  <p className="text-red-500 text-sm ml-[2px]">
                    {getError(index, "start")}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1 flex-[0.5]">
                <label className="font-semibold">End Date</label>
                <Input
                  className="bg-white"
                  {...control.register(`jobs[${index}].end`)}
                  placeholder="End"
                />
                {errorsCheck ? (
                  <p className="text-red-500 text-sm ml-[2px]">
                    {getError(index, "end")}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              <div className="flex flex-col gap-1 flex-1">
                <label className="font-semibold">Employer</label>
                <Input
                  {...control.register(`jobs[${index}].employer`)}
                  className="bg-white"
                  placeholder="Employer"
                />
                {errorsCheck ? (
                  <p className="text-red-500 text-sm ml-[2px]">
                    {getError(index, "employer")}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1 flex-[0.5]">
                <label className="font-semibold">Location</label>
                <Input
                  className="bg-white"
                  {...control.register(`jobs[${index}].location`)}
                  placeholder="Location"
                />
                {errorsCheck ? (
                  <p className="text-red-500 text-sm ml-[2px]">
                    {getError(index, "location")}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Description</label>
              <Textarea
                rows={4}
                className="bg-white"
                {...control.register(`jobs[${index}].description`)}
                placeholder="Description"
              />
              {errorsCheck ? (
                <p className="text-red-500 text-sm ml-[2px]">
                  {getError(index, "description")}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkExperience;
