import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface PWRecoveryData{
  phone: string,
}
interface PWRecoveryDataSecond{
  phone: PWRecoveryData,
  code: string
}

interface PWRecoveryFinalData{
  password: string
}
export const PWRecoverySubmit = (data: PWRecoveryData) => action(ActionTypes.RESET_PW_FIRST_STEP_SUBMIT, data)
export const PWRecoveryError = (error) => action(ActionTypes.RESET_PW_FIRST_STEP_ERROR, {error})
export const PWRecoverySuccess = () => action(ActionTypes.RESET_PW_FIRST_STEP_SUCCESS)

export const PWRecoverySecondSubmit = (data: PWRecoveryDataSecond) => action(ActionTypes.RESET_PW_SECOND_STEP_SUBMIT, data)
export const PWRecoverySecondError = (error) => action(ActionTypes.RESET_PW_SECOND_STEP_ERROR, {error})
export const PWRecoverySecondSuccess = () => action(ActionTypes.RESET_PW_SECOND_STEP_SUCCESS)

export const PWRecoveryResetState = () => action(ActionTypes.RESET_PW_RESET)
export const PWRecoveryIsOpen = () => action(ActionTypes.RESET_PW_IS_OPEN)
export const PWRecoveryIsSuccess = () =>  action(ActionTypes.RESET_PW_IS_OPEN_SUCCESS)
export const PWRecoveryFinalSubmit = (data: PWRecoveryFinalData) => action(ActionTypes.RESET_PW_FINAL_STEP_SUBMIT, data)
export const PWRecoveryFinalError = (error) => action(ActionTypes.RESET_PW_FINAL_STEP_ERROR, {error})
export const PWRecoveryFinalSuccess = () => action(ActionTypes.RESET_PW_FINAL_STEP_SUCCESS)
