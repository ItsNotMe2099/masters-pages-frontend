import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchSavedPeopleRequest = (data: {page: number, limit?: number}) => action(ActionTypes.FETCH_SAVED_PEOPLE_REQUEST, {
  api: {
    url: `/api/profile/saved-profiles?page=${data.page || 1}&limit=${data.limit || 10}`,
    method: 'GET',
  }
})

export const saveProfileRequest = (profileId: number) => action(ActionTypes.SAVE_PEOPLE_REQUEST, {
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
    url: `/api/profile/saved-profiles/${id}`,
    method: 'DELETE'
  }
})

export const resetSavedPeopleList = () => action(ActionTypes.RESET_SAVED_PEOPLE_LIST)
