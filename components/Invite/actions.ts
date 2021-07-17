import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const inviteRequest = (data) => action(ActionTypes.INVITE_REQUEST, {
  api: {
    url: `/api/invite`,
    method: 'POST',
    data: {...data},
  }
})
export const resetInviteForm = () => action(ActionTypes.INVITE_RESET)
