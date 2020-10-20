import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface RegistrationSubmitData{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  city: string,
  password: string
}
export const registrationCompleteSubmit = (data: RegistrationSubmitData) => action(ActionTypes.REGISTRATION_COMPLETE_SUBMIT, data)
export const registrationCompleteReset = () => action(ActionTypes.REGISTRATION_COMPLETE_RESET)
