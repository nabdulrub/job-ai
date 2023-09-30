import React, { HTMLAttributes, ReactNode } from "react";
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

type Props = {
  control: any;
  name: string;
  label?: string;
  view?: boolean;
  password?: boolean;
  placeholder?: string;
  className?: string;
  size?: number;
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
  render?: (field: any) => ReactNode; // New prop for rendering custom elements
};

const Field = ({
  control,
  name,
  label,
  view,
  setView,
  password = false,
  placeholder,
  className,
  inputMode = "text",
  render,
  size = 1,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex-[${size}]`}>
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
                  inputMode={inputMode}
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
