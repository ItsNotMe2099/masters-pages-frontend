import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedSearches = () => action(ActionTypes.FETCH_SAVED_SEARCHES)

export const fetchSavedSearchesRequest = () => action(ActionTypes.FETCH_SAVED_SEARCHES_REQUEST, {
  api: {
    url: `/api/task-searches`,
    method: 'GET',
  }
})
