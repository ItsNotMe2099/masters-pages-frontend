import { SkillData } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const resetSkillForm = () => action(ActionTypes.RESET_SKILL_FORM)
export const createSkillCategory = (profileId: number, data: any) => action(ActionTypes.CREATE_SKILL_CATEGORY, {profileId, data})
export const createSkillCategoryRequest = (profileId: number, data: any) => action(ActionTypes.CREATE_SKILL_CATEGORY_REQUEST, {
  api: {
    url: `/api/profile/${profileId}/skill/category`,
    method: 'POST',
    data: {...data},
  }
})
export const createSkill = (profileId: number, data: SkillData) => action(ActionTypes.CREATE_SKILL, {profileId, data})
export const createSkillRequest = (profileId: number, data: SkillData) => action(ActionTypes.CREATE_SKILL_REQUEST, {
  api: {
    url: `/api/profile/${profileId}/skill`,
    method: 'POST',
    data: {...data},
  }
})

export const updateSkill = (profileId: number, skillId: number, data: SkillData) => action(ActionTypes.UPDATE_SKILL, {profileId, skillId, data})
export const updateSkillRequest = (profileId: number, skillId: number, data: SkillData) => action(ActionTypes.UPDATE_SKILL_REQUEST, {
  api: {
    url: `/api/profile/${profileId}/skill/${skillId}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchSkillList = (profileId: number) => action(ActionTypes.FETCH_SKILL_LIST, {
  api: {
    url: `/api/profile/${profileId}/skill`,
    method: 'GET',
  }
})

export const fetchSkill = (profileId: number, skillId: number) => action(ActionTypes.FETCH_SKILL, {
  api: {
    url: `/api/profile/${profileId}/skill/${skillId}`,
    method: 'GET',
  }
})
export const deleteSkill = (profileId: number, skillId: number) => action(ActionTypes.DELETE_SKILL, {profileId, skillId})
export const deleteSkillRequest = (profileId: number, skillId: number) => action(ActionTypes.DELETE_SKILL_REQUEST, {
  api: {
    url: `/api/profile/${profileId}/skill/${skillId}`,
    method: 'DELETE'
  }
})

export const deleteSkillCategory = (profileId: number, categoryId: number) => action(ActionTypes.DELETE_SKILL_CATEGORY, {profileId, categoryId})
export const deleteSkillCategoryRequest = (profileId: number, categoryId: number) => action(ActionTypes.DELETE_SKILL_CATEGORY_REQUEST, {
  api: {
    url: `/api/profile/${profileId}/skill/by-category/${categoryId}`,
    method: 'DELETE'
  }
})
