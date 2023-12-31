"use client"

import React, {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import ViewPassword from "./auth/ViewPassword"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { FieldPath, RegisterOptions, UseControllerProps } from "react-hook-form"
import {
  TBasicInfoSchema,
  TChangePasswordSchema,
  TEducationSkillsSchema,
  TJobSchema,
  TProjectSchema,
  TRegisterSchema,
  TSignInSchema,
} from "@/types/type"

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any
  name: FieldPath<
    | TJobSchema
    | TChangePasswordSchema
    | TBasicInfoSchema
    | TEducationSkillsSchema
    | TProjectSchema
    | TRegisterSchema
    | TSignInSchema
  >
  label?: string
  password?: boolean
  placeholder?: string
  className?: string
  size?: number
  description?: string
  labelStyle?: string
  rules?:
    | Omit<
        RegisterOptions<
          | TRegisterSchema
          | TChangePasswordSchema
          | TSignInSchema
          | TJobSchema
          | TBasicInfoSchema
          | TEducationSkillsSchema
          | TProjectSchema
        >,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined
  render?: (field: any) => ReactNode // New prop for rendering custom elements
}

const Field = ({
  control,
  name,
  label,
  password = false,
  placeholder,
  className,
  render,
  rules,
  description,
  labelStyle,
  size = 1,
  ...props
}: FieldProps) => {
  const [viewPassword, setViewPassword] = useState(false)

  return (
    <FormField
      control={control}
      rules={rules}
      name={name}
      render={({ field }) => (
        <FormItem style={{ flex: size }}>
          <FormLabel className={labelStyle}>{label}</FormLabel>
          <FormControl>
            <div className={`${password && "relative"}`}>
              {password && (
                <ViewPassword view={viewPassword} setView={setViewPassword} />
              )}
              {render ? (
                render(field)
              ) : (
                <Input
                  type={
                    password
                      ? viewPassword
                        ? "text"
                        : !viewPassword
                        ? "password"
                        : "text"
                      : "text"
                  }
                  className={className}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                />
              )}
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Field
