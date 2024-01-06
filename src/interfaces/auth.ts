export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export interface Condition {
  cb: (value: string) => boolean;
  msg: string;
}

export interface FieldConditions {
  field: string;
  conditions: Condition[];
}

export interface AuthUserDTO extends IUser {
  confirmPassword?: string;
  identifier?: string;
}

export interface ErrorMessages {
  [key: string]: string;
}
