import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface SignInSubmitData{
  phone: string,
  password: string
}
export const signInSubmit = (data: SignInSubmitData) => action(ActionTypes.SIGN_IN_SUBMIT, data)
export const signInError = (error) => action(ActionTypes.SIGN_IN_ERROR, {error})

export const signInReset = () => action(ActionTypes.SIGN_IN_RESET)
