import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const signInOpen = () => action(ActionTypes.SIGN_IN_OPEN)
export const signUpOpen = () => action(ActionTypes.SIGN_UP_OPEN)
export const phoneConfirmOpen = () => action(ActionTypes.PHONE_CONFIRM_OPEN)
export const modalClose = () => action(ActionTypes.MODAL_CLOSE)
