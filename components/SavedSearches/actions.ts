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


export const deleteSavedSearch = (id: number) => action(ActionTypes.DELETE_SAVED_SEARCHES, {id})
export const deleteSavedSearchRequest = (id: number) => action(ActionTypes.DELETE_SAVED_SEARCHES_REQUEST, {
  api: {
    url: `/api/task-searches/${id}`,
    method: 'DELETE'
  }
})
