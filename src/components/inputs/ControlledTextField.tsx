import React from "react"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
import { Control, Controller } from "react-hook-form"
interface ControlledInputProps {
  control: any
  label: string
  name: string
  disabled?: boolean
  type?: string
  rules?: any
  required?: boolean
}
function ControlledTextField({
  disabled = false,
  label,
  required = false,
  name,
  control,
  rules,
  type = "text",
}: ControlledInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl required={required} error={!!error?.message}>
          <FormLabel>{required ? `${label} *` : label}</FormLabel>
          <Input
            type={type}
            disabled={disabled}
            onChange={onChange}
            value={value}
          />
          {error && (
            <FormHelperText className={`form-helper-text-error`}>
              {error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

export default ControlledTextField
