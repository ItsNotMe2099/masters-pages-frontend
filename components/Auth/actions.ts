import ActionTypes from './const'
import { action } from 'typesafe-actions'
export const logout = () => action(ActionTypes.AUTH_LOGOUT)
