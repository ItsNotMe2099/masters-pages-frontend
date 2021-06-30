import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab, SkillData} from "types";
import ActionTypes from './const'

import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IContactsList{
  limit: number,
  page: number,
  sort?: string,
  sortOrder?: string
  role?: string
  categoryId?: number
  subCategoryId?: number
  search?: string
  type?: string
}

export const fetchProfileContacts = (data: IContactsList) => action(ActionTypes.FETCH_PROFILE_CONTACT_LIST, {
  api: {
    url: `/api/profile-contacts?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const deleteSavedPeople = (id: number) => action(ActionTypes.DELETE_SAVED_PEOPLE, {id})
export const deleteSavedPeopleRequest = (id: number) => action(ActionTypes.DELETE_SAVED_PEOPLE_REQUEST, {
  api: {
    url: `/api/profile/saved-profiles/${id}`,
    method: 'DELETE'
  }
})
export const resetProfileContactsList = () => action(ActionTypes.RESET_PROFILE_CONTACT_LIST)
export const setPageProfileContactsList = (page: number) => action(ActionTypes.SET_PAGE_PROFILE_CONTACT_LIST, page)
