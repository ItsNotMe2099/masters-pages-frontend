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
  data: string
}

export interface AuthConfirmFormData {
  email?: string,
  phone?: string
  code: string
}
