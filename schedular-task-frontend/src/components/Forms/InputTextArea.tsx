/* eslint-disable @typescript-eslint/no-unused-vars */


import React from "react"
import { getErrorMessageByPropertyName } from "@/utils/schema-validator"
import { Controller, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Textarea } from "../ui/textarea"

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
          "flex min-h-[10px] w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

const InputTextArea = ({
  name,
  
  
 
  
  placeholder,
  
  label,
 
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
          <Textarea className={cn({})} {...field} placeholder={placeholder} />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  )
}

export default InputTextArea