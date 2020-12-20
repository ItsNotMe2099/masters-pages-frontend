import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedPeople = (data: any = {}) => action(ActionTypes.FETCH_SAVED_PEOPLE, {
  api: {
    url: `/api/profile-searches`,
    method: 'GET',
  }
})
