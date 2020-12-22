import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedPeople = () => action(ActionTypes.FETCH_SAVED_PEOPLE)

export const fetchSavedPeopleRequest = () => action(ActionTypes.FETCH_SAVED_PEOPLE_REQUEST, {
  api: {
    url: `/api/profile/saved-profiles`,
    method: 'GET',
  }
})
