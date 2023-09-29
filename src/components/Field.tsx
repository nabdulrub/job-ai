import React, { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import ViewPassword from "./auth/ViewPassword";

type Props = {
  control: any;
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  view?: boolean;
  password?: boolean;
  placeholder?: string;
  className?: string;
  inputMode?:
    | "email"
    | "search"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal"
    | undefined;
  setView?: (view: boolean) => void;
};

const Field = ({
  control,
  name,
  label,
  view,
  setView,
  password = false,
  type = "text",
  placeholder,
  className,
  inputMode = "text",
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className={`${password && "relative"}`}>
              {password && (
                <ViewPassword view={view || false} setView={setView} />
              )}
              <Input
                type={type}
                className={className}
                placeholder={placeholder}
                {...field}
                inputMode={inputMode}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Field;
