import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedSearches = (data: any = {}) => action(ActionTypes.FETCH_SAVED_SEARCHES, {
  api: {
    url: `/api/task-searches`,
    method: 'GET',
  }
})
