import React, { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import ViewPassword from "./auth/ViewPassword";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  FieldPath,
  RegisterOptions,
  UseControllerProps,
} from "react-hook-form";
import {
  TBasicInfoSchema,
  TEducationSkillsSchema,
  TJobSchema,
  TProjectSchema,
} from "@/lib/type";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: FieldPath<
    TJobSchema | TBasicInfoSchema | TEducationSkillsSchema | TProjectSchema
  >;
  label?: string;
  view?: boolean;
  password?: boolean;
  placeholder?: string;
  className?: string;
  size?: number;
  value?: string | undefined;
  rules?:
    | Omit<
        RegisterOptions<
          | TJobSchema
          | TBasicInfoSchema
          | TEducationSkillsSchema
          | TProjectSchema
        >,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  setView?: (view: boolean) => void;
  render?: (field: any) => ReactNode; // New prop for rendering custom elements
}

const Field = ({
  control,
  name,
  label,
  view,
  setView,
  password = false,
  placeholder,
  className,
  render,
  rules,
  value,
  size = 1,
  ...props
}: FieldProps) => {
  const flex = `flex-[${size}]`;

  return (
    <FormField
      control={control}
      rules={rules}
      name={name}
      render={({ field }) => (
        <FormItem style={{ flex: size }}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className={`${password && "relative"}`}>
              {password && (
                <ViewPassword view={view || false} setView={setView} />
              )}
              {/* Use the render prop to render the input or custom element */}
              {render ? (
                render(field)
              ) : (
                <Input
                  type="text" // You can make this dynamic based on prop if needed
                  className={className}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Field;
