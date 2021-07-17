import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface PhoneConfirmSubmitData{
  code: string,
}
export const phoneConfirmSetCode = (code: string) => action(ActionTypes.PHONE_CONFIRM_SET_CODE, code)
export const phoneConfirmSubmit = (data: PhoneConfirmSubmitData) => action(ActionTypes.PHONE_CONFIRM_SUBMIT, data)
export const phoneConfirmError = (error) => action(ActionTypes.PHONE_CONFIRM_ERROR, {error})
export const phoneConfirmSuccess = () => action(ActionTypes.PHONE_CONFIRM_SUCCESS)
export const phoneConfirmReset = () => action(ActionTypes.PHONE_CONFIRM_RESET)
