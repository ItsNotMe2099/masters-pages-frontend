import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface PhoneConfirmSubmitData{
  code: string,
}
export const phoneConfirmSubmit = (data: PhoneConfirmSubmitData) => action(ActionTypes.PHONE_CONFIRM_SUBMIT, data)
export const phoneConfirmReset = () => action(ActionTypes.PHONE_CONFIRM_RESET)
