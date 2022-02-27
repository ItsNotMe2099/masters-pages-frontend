import {ProfileWorkExperience} from 'types'
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IProfileWorkExperienceList{
  profileId: number,
  categoryId: number,
  subCategoryId: number
}
export const resetProfileWorkExperienceForm = () => action(ActionTypes.RESET_WORK_EXPERIENCE_FORM)

export const createProfileWorkExperience = (data: ProfileWorkExperience, formKey: string) => action(ActionTypes.CREATE_WORK_EXPERIENCE, { data, formKey})
export const createProfileWorkExperienceRequest = (data: ProfileWorkExperience) => action(ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST, {
  api: {
    url: '/api/profile-work-experience',
    method: 'POST',
    data: {...data},
  }
})

export const updateProfileWorkExperience = (id: number, data: ProfileWorkExperience, formKey: string) => action(ActionTypes.UPDATE_WORK_EXPERIENCE, { id, data, formKey})
export const updateProfileWorkExperienceRequest = (id: number, data: ProfileWorkExperience) => action(ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST, {
  api: {
    url: `/api/profile-work-experience/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchProfileWorkExperienceList = (data: IProfileWorkExperienceList) => action(ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE_LIST, {
  api: {
    url: `/api/profile-work-experience?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const resetProfileWorkExperienceList = () => action(ActionTypes.RESET_PROFILE_WORK_EXPERIENCE_LIST)

export const fetchProfileWorkExperience = (id: number) => action(ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE, {
  api: {
    url: `/api/profile-work-experience/${id}`,
    method: 'GET',
  }
})
export const deleteProfileWorkExperience = (id: number) => action(ActionTypes.DELETE_WORK_EXPERIENCE, { id})
export const deleteProfileWorkExperienceRequest = (id: number) => action(ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST, {
  api: {
    url: `/api/profile-work-experience/${id}`,
    method: 'DELETE'
  }
})
