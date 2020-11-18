import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface ChangePasswordSubmitData{
  oldPassword: string,
  password: string,
}
export const changePassword = (data: ChangePasswordSubmitData) => action(ActionTypes.CHANGE_PASSWORD, data)
export const changePasswordSuccess = () => action(ActionTypes.CHANGE_PASSWORD_SUCCESS)
export const changePasswordError = (error) => action(ActionTypes.CHANGE_PASSWORD_ERROR, {error})
