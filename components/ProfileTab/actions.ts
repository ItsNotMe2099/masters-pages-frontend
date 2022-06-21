import {IProfileTab} from 'types'
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IProfileTabList{
  profileId: number,
  categoryId: number,
  subCategoryId: number
}
export const resetProfileTabForm = () => action(ActionTypes.RESET_PROFILE_TAB_FORM)

export const createProfileTab = (data: IProfileTab, formKey: string) => action(ActionTypes.CREATE_PROFILE_TAB, { data, formKey})
export const createProfileTabRequest = (data: IProfileTab) => action(ActionTypes.CREATE_PROFILE_TAB_REQUEST, {
  api: {
    url: '/api/profile-tab',
    method: 'POST',
    data: {...data},
  }
})

export const updateProfileTab = (id: number, data: IProfileTab, formKey: string) => action(ActionTypes.UPDATE_PROFILE_TAB, { id, data, formKey})
export const updateProfileTabRequest = (id: number, data: IProfileTab) => action(ActionTypes.UPDATE_PROFILE_TAB_REQUEST, {
  api: {
    url: `/api/profile-tab/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchProfileTabList = (data: IProfileTabList) => action(ActionTypes.FETCH_PROFILE_TAB_LIST, {
  api: {
    url: `/api/profile-tab?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchProfileTab = (id: number) => action(ActionTypes.FETCH_PROFILE_TAB, {
  api: {
    url: `/api/profile-tab/${id}`,
    method: 'GET',
  }
})
export const deleteProfileTab = (id: number, formKey: string, onDelete) => action(ActionTypes.DELETE_PROFILE_TAB, { id, formKey, onDelete})
export const deleteProfileTabRequest = (id: number) => action(ActionTypes.DELETE_PROFILE_TAB_REQUEST, {
  api: {
    url: `/api/profile-tab/${id}`,
    method: 'DELETE'
  }
})
