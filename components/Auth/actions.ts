import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const signInOpen = () => action(ActionTypes.SIGN_IN_OPEN)
export const signInClose = () => action(ActionTypes.SIGN_IN_CLOSE)
export const signUpOpen = () => action(ActionTypes.SIGN_UP_OPEN)
export const signUpClose = () => action(ActionTypes.SIGN_UP_CLOSE)
export const phoneConfirmOpen = () => action(ActionTypes.PHONE_CONFIRM_OPEN)
export const phoneConfirmClose = () => action(ActionTypes.PHONE_CONFIRM_CLOSE)
