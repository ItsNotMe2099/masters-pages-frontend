import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedPeople = () => action(ActionTypes.FETCH_SAVED_PEOPLE)

export const fetchSavedPeopleRequest = (page?: number, limit?: number) => action(ActionTypes.FETCH_SAVED_PEOPLE_REQUEST, {
  api: {
    url: `/api/profile/saved-profiles?page=${page || 1}&limit=${limit || 10}`,
    method: 'GET',
  }
})

export const saveProfileRequest = (profileId: number) => action(ActionTypes.FETCH_SAVED_PEOPLE_REQUEST, {
  api: {
    url: `/api/profile/saved-profiles`,
    method: 'POST',
    data: {
      profileId
    }
  }
})

export const deleteSavedPeople = (id: number) => action(ActionTypes.DELETE_SAVED_PEOPLE, {id})
export const deleteSavedPeopleRequest = (id: number) => action(ActionTypes.DELETE_SAVED_PEOPLE_REQUEST, {
  api: {
    url: `/api/saved-profiles/${id}`,
    method: 'DELETE'
  }
})

export const resetSavedPeopleList = () => action(ActionTypes.RESET_SAVED_PEOPLE_LIST)
