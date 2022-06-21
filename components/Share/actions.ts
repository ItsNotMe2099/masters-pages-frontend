import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const shareByEmailRequest = (data) => action(ActionTypes.SHARE_BY_EMAIL_REQUEST, {
  api: {
    url: '/api/share',
    method: 'POST',
    data: {...data},
  }
})
export const resetShareByEmail = () => action(ActionTypes.SHARE_BY_EMAIL_RESET)
