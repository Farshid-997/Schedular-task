/* eslint-disable @typescript-eslint/no-unused-vars */


import React from "react"
import { getErrorMessageByPropertyName } from "@/utils/schema-validator"
import { Controller, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

interface IInput {
  name: string
  type?: string
  size?: "large" | "small"
  value?: string | string[] | undefined
  id?: string
  placeholder?: string
  validation?: object
  label?: string
  readonly?: boolean
  required?: boolean
}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  readonly,
  required,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const errorMessage = getErrorMessageByPropertyName(errors, name)

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            type={type}
            className={cn({})}
            {...field}
            placeholder={placeholder}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  )
}

export default FormInput
