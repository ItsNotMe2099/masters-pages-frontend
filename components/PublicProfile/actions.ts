import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchProfileById = (id) => action(ActionTypes.FETCH_PROFILE_BY_ID, {
  api: {
    url: `/api/profile/${id}`,
    method: 'GET',
  }
})