import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface SignUpSubmitData{
  phone: string,
}
export const signUpSubmit = (data: SignUpSubmitData) => action(ActionTypes.SIGN_UP_SUBMIT, data)
export const signUpReset = () => action(ActionTypes.SIGN_UP_RESET)
