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
export const taskUpdateOpen = () => action(ActionTypes.TASK_UPDATE_MODAL_OPEN)
export const taskOfferAcceptOpen = () => action(ActionTypes.TASK_OFFER_CREATE_OPEN)
export const taskShareOpen = () => action(ActionTypes.TASK_SHARE_OPEN)
export const taskShowOffer = () => action(ActionTypes.TASK_OFFER_SHOW_OPEN)
export const taskHireMasterOpen = () => action(ActionTypes.TASK_HIRE_MASTER_OPEN)
export const taskMarkAsDoneOpen = () => action(ActionTypes.TASK_MARK_AS_DONE_OPEN)
export const finishTaskAsClientOpen = () => action(ActionTypes.FINISH_TASK_AS_CLIENT_OPEN)
export const feedbackByMasterOpen = () => action(ActionTypes.FINISH_TASK_AS_MASTER_OPEN)
export const taskEditConditionsOpen = () => action(ActionTypes.TASK_EDIT_CONDITIONS_OPEN)
export const feedbackSiteOpen = () => action(ActionTypes.FEEDBACK_SITE_OPEN)
export const feedbackSuccessOpen = () => action(ActionTypes.FEEDBACK_SUCCESS_OPEN)
export const taskSuccessOpen = () => action(ActionTypes.TASK_SUCCESS_OPEN)
export const taskOfferOpen = () => action(ActionTypes.TASK_OFFER_OPEN)
export const profileEmailChangeOpen = () => action(ActionTypes.EMAIL_CHANGE_OPEN)

export const registrationSuccessOpen = () => action(ActionTypes.REGISTRATION_SUCCESS_OPEN)
export const registrationPhoneOpen = () => action(ActionTypes.REGISTRATION_PHONE_OPEN)
export const registrationPhoneConfirmOpen = () => action(ActionTypes.REGISTRATION_PHONE_CONFIRM_OPEN)
export const createEventOpen = () => action(ActionTypes.EVENT_CREATE_OPEN)
export const editEventOpen = () => action(ActionTypes.EVENT_EDIT_OPEN)
export const eventExpensePlannedOpen = () => action(ActionTypes.EVENT_EXPENSE_PLANNED_OPEN)
export const eventExpenseActualOpen = () => action(ActionTypes.EVENT_EXPENSE_ACTUAL_OPEN)
