import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')



export const fetchSavedTaskSearchesRequest = (page?: number, limit?: number) => action(ActionTypes.FETCH_SAVED_TASK_SEARCHES_REQUEST, {
  api: {
    url: `/api/task-searches?page=${page || 1}&limit=${limit || 10}`,
    method: 'GET',
  }
})
export const fetchSavedProfileSearchesRequest = (page?: number, limit?: number) => action(ActionTypes.FETCH_SAVED_PROFILE_SEARCHES_REQUEST, {
  api: {
    url: `/api/profile-searches?page=${page || 1}&limit=${limit || 10}`,
    method: 'GET',
  }
})


export const deleteSavedTaskSearch = (id: number) => action(ActionTypes.DELETE_SAVED_TASK_SEARCHES, {id})
export const deleteSavedTaskSearchRequest = (id: number) => action(ActionTypes.DELETE_SAVED_TASK_SEARCHES_REQUEST, {
  api: {
    url: `/api/task-searches/${id}`,
    method: 'DELETE'
  }
})


export const deleteSavedProfileSearch = (id: number) => action(ActionTypes.DELETE_SAVED_PROFILE_SEARCHES, {id})
export const deleteSavedProfileSearchRequest = (id: number) => action(ActionTypes.DELETE_SAVED_PROFILE_SEARCHES_REQUEST, {
  api: {
    url: `/api/profile-searches/${id}`,
    method: 'DELETE'
  }
})

export const resetSavedSearchesList = () => action(ActionTypes.RESET_SAVED_SEARCHES_LIST)

export const saveTaskSearch = (data) => action(ActionTypes.SAVED_TASK_SEARCH_CREATE, data)
export const saveTaskSearchRequest = (data: any) => action(ActionTypes.SAVED_TASK_SEARCH_CREATE_REQUEST, {
  api: {
    url: '/api/task-searches',
    method: 'POST',
    data,
  }
})
export const saveProfileSearch = (data) => action(ActionTypes.SAVED_PROFILE_SEARCH_CREATE, data)
export const saveProfileSearchRequest = (data: any) => action(ActionTypes.SAVED_PROFILE_SEARCH_CREATE_REQUEST, {
  api: {
    url: '/api/profile-searches',
    method: 'POST',
    data,
  }
})
