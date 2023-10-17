export interface ControlledInputProps {
  control: any
  label: string
  name: string
  disabled?: boolean
  type?: string
  rules?: any
  required?: boolean
  endDecorator?: JSX.Element
}
