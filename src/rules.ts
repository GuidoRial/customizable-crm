export const fieldRequired = (field: string) => {
  return {
    validate: (value: any) => !!value || `The field ${field} is required`,
  }
}

export const isEmail = () => {
  return {
    validate: (value: any) => {
      console.log(value)
      return (
        value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) || "Invalid email address"
      )
    },
  }
}

export const mustMatch = (
  field_name: string,
  getValues: any,
  comparator: string,
) => {
  return {
    validate: (value: any) =>
      !!(value === getValues(field_name)) ||
      `This field must match with the ${comparator} field`,
  }
}
