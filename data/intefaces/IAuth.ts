export interface IAuthResponse{
  accessToken?: string
}
export interface IPhoneConfirmResponse{
  code?: string,
  codeCanRetryIn?: number
}

export interface AuthLoginFormData {
  phone: string,
  password: string
}

export interface AuthRegisterFormData {
  email: string
}

export interface AuthEmailConfirmFormData {
  email: string,
  code: string
}
