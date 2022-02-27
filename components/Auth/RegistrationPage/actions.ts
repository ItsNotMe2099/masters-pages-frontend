import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface RegistrationSubmitData{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  city: string,
  password: string
  organization: any
}
export const registrationCompleteSubmit = (data: RegistrationSubmitData) => action(ActionTypes.REGISTRATION_COMPLETE_SUBMIT, data)
export const registrationCompleteSuccess = () => action(ActionTypes.REGISTRATION_COMPLETE_SUCCESS)
export const registrationCompleteError = (error) => action(ActionTypes.REGISTRATION_COMPLETE_ERROR, {error})
export const registrationCompleteReset = () => action(ActionTypes.REGISTRATION_COMPLETE_RESET)
