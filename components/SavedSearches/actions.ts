import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')


export const fetchSavedSearches = () => action(ActionTypes.FETCH_SAVED_SEARCHES)

export const fetchSavedSearchesRequest = (page?: number, limit?: number) => action(ActionTypes.FETCH_SAVED_SEARCHES_REQUEST, {
  api: {
    url: `/api/task-searches?page=${page || 1}&limit=${limit || 10}`,
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

export const resetSavedSearchesList = () => action(ActionTypes.RESET_SAVED_SEARCHES_LIST)