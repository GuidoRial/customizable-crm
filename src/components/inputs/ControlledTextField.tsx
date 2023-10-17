import React from "react"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
import { Controller } from "react-hook-form"
import { ControlledInputProps } from "../../interfaces/shared"

function ControlledTextField({
  disabled = false,
  label,
  required = false,
  name,
  control,
  rules,
  type = "text",
  endDecorator,
}: ControlledInputProps) {
  //            errorMessage={error ? error.message : ''}
  // error={!!error?.message}
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // console.log({ error })
        return (
          <FormControl required={required} error={!!error?.message}>
            <FormLabel>{required ? `${label} *` : label}</FormLabel>
            <Input
              endDecorator={endDecorator}
              type={type}
              disabled={disabled}
              onChange={onChange}
              value={value}
            />
            {!!error?.message && (
              <FormHelperText className={`form-helper-text-error`}>
                {error ? error.message : ""}
              </FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}

export default ControlledTextField
