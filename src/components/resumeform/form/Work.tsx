import { Input } from "@/components/ui/input";
import { TResumeSchema } from "@/lib/type";
import React from "react";
import { Control, UseFieldArrayReturn, UseFormRegister } from "react-hook-form";

type Props = {
  control: any;
  fieldArray: UseFieldArrayReturn;
  register: UseFormRegister<TResumeSchema>;
};

const WorkExperience = ({ control, fieldArray, register }: Props) => {
  const { fields, append, prepend, remove, swap, move, insert } = fieldArray;

  return (
    <div>
      <h2>Work Experience</h2>
      {fields.map((job, index) => (
        <div key={job.id}>
          <Input
            {...control.register(`jobs[${index}].title`)} // Register the field
            placeholder="Title"
          />
          <Input
            {...control.register(`jobs[${index}].employer`)} // Register the field
            placeholder="Employer"
          />
          {/* Add other job fields similarly */}
          <button type="button" onClick={() => remove(index)}>
            Remove Job
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({})}>
        Add Job
      </button>
    </div>
  );
};

export default WorkExperience;
