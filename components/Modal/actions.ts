import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const signInOpen = () => action(ActionTypes.SIGN_IN_OPEN)
export const signUpOpen = () => action(ActionTypes.SIGN_UP_OPEN)
export const phoneConfirmOpen = () => action(ActionTypes.PHONE_CONFIRM_OPEN)
export const PWRecoveryOpen = () => action(ActionTypes.PASSWORD_RECOVERY_FIRST_STEP_OPEN)
export const PWRecoverySuccessOpen = () => action(ActionTypes.PASSWORD_RECOVERY_SUCCESS)
export const modalClose = () => action(ActionTypes.MODAL_CLOSE)
export const loaderOpen = () => action(ActionTypes.LOADER_OPEN)
export const changePasswordOpen = () => action(ActionTypes.CHANGE_PASSWORD_OPEN)
export const skillModalOpen = () => action(ActionTypes.SKILL_MODAL_OPEN)
export const skillCategoryModalOpen = () => action(ActionTypes.SKILL_CATEGORY_MODAL_OPEN)
export const confirmOpen = (data: any) => action(ActionTypes.CONFIRM_MODAL_OPEN, data)
export const confirmChangeData = (data: any) => action(ActionTypes.CHANGE_CONFIRM_DATA, data)
