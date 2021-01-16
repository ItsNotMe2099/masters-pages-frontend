import { SkillData } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const resetSkillForm = () => action(ActionTypes.RESET_SKILL_FORM)
export const createSkillCategory = (data: any) => action(ActionTypes.CREATE_SKILL_CATEGORY, {data})
export const createSkillCategoryRequest = (data: any) => action(ActionTypes.CREATE_SKILL_CATEGORY_REQUEST, {
  api: {
    url: `/api/profile/skill/category`,
    method: 'POST',
    data: {...data},
  }
})
export const createSkill = (data: SkillData) => action(ActionTypes.CREATE_SKILL, { data})
export const createSkillRequest = (data: SkillData) => action(ActionTypes.CREATE_SKILL_REQUEST, {
  api: {
    url: `/api/profile/skill`,
    method: 'POST',
    data: {...data},
  }
})

export const updateSkill = (skillId: number, data: SkillData) => action(ActionTypes.UPDATE_SKILL, { skillId, data})
export const updateSkillRequest = (skillId: number, data: SkillData) => action(ActionTypes.UPDATE_SKILL_REQUEST, {
  api: {
    url: `/api/profile/skill/${skillId}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchSkillList = () => action(ActionTypes.FETCH_SKILL_LIST, {
  api: {
    url: `/api/profile/skill`,
    method: 'GET',
  }
})

export const fetchSkill = (skillId: number) => action(ActionTypes.FETCH_SKILL, {
  api: {
    url: `/api/profile/skill/${skillId}`,
    method: 'GET',
  }
})
export const deleteSkill = (skillId: number) => action(ActionTypes.DELETE_SKILL, { skillId})
export const deleteSkillRequest = (skillId: number) => action(ActionTypes.DELETE_SKILL_REQUEST, {
  api: {
    url: `/api/profile/skill/${skillId}`,
    method: 'DELETE'
  }
})

export const deleteSkillCategory = (categoryId: number) => action(ActionTypes.DELETE_SKILL_CATEGORY, { categoryId})
export const deleteSkillCategoryRequest = (categoryId: number) => action(ActionTypes.DELETE_SKILL_CATEGORY_REQUEST, {
  api: {
    url: `/api/profile/skill/by-category/${categoryId}`,
    method: 'DELETE'
  }
})
