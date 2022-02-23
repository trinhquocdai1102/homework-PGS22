export interface ILoginParams {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface IRegisterParams {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  gender: string;
  region: number;
  state: number;
}

export interface IRegisterValidation {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  gender: string;
  region: number | string;
  state: number | string;
}
