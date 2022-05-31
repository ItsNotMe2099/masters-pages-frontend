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
  phone: string
}

export interface AuthPhoneConfirmFormData {
  phone: string,
  code: string
}
