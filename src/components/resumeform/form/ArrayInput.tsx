import { Input } from "@/components/ui/input";
import { TResumeSchema } from "@/lib/type";
import React, { ReactNode } from "react";
import { Control } from "react-hook-form";

type Props = {
  label: string;
  control: any;
  index: number;
  placeholder?: string;
  fieldname: string;
  object: string;
  size?: number;
  children?: ReactNode;
};

const ArrayInput: React.FC<Props> = ({
  label,
  control,
  index,
  fieldname,

  object,
  size = 1,
  children,
}: Props) => {
  const error = control?._formState?.errors;

  const getError = (idx: number, name: string) => {
    return error?.jobs[idx]?.[name]?.message || "";
  };

  const errorsCheck = Object.keys(error).length > 0 && error.jobs?.length > 0;

  return (
    <div className={`flex flex-col gap-1 flex-[${size}]`}>
      <label className="font-semibold text-sm">{label}</label>
      {children &&
        React.cloneElement(children as React.ReactElement, {
          ...control.register(`${object}[${index}].${fieldname}`),
        })}
      {errorsCheck ? (
        <p className="text-red-500 text-sm ml-[2px]">
          {getError(index, fieldname)}
        </p>
      ) : null}
    </div>
  );
};

export default ArrayInput;
