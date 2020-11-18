import { SkillData } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'


export const createSkill = (profileId: number, data: SkillData) => action(ActionTypes.UPDATE_SKILL, {profileId, data})
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
export const deleteSkillRequest = (profileId: number, skillId: number) => action(ActionTypes.DELETE_SKILL, {
  api: {
    url: `/api/profile/${profileId}/skill/${skillId}`,
    method: 'DELETE'
  }
})
