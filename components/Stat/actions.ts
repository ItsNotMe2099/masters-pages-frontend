import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchStatRequest = () => action(ActionTypes.FETCH_STAT_REQUEST, {
  api: {
    url: '/api/stats',
    method: 'GET'
  }
})
