import ApiActionTypes from "constants/api";
import {ProfileData, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'


export const changeProfileEmail = (id: number, email: string) => action(ActionTypes.CHANGE_EMAIL, {id, email})
export const updateProfileAvatar = (id: number, data: ProfileData, formKey?: string) => action(ActionTypes.UPDATE_PROFILE_AVATAR, {id, data, formKey})

export const createProfile = (role: string, data: ProfileData) => action(ActionTypes.CREATE_PROFILE, {role, data})
export const updateProfile = (id: number, data: ProfileData) => action(ActionTypes.UPDATE_PROFILE, {
  api: {
    url: `/api/profile/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchProfile = (role: string) => action(ActionTypes.FETCH_PROFILE, {
  api: {
    url: `/api/profile/${role}`,
    method: 'POST',
    data: {},
  }
})

export const setCurrentSkill = (skill: SkillData) => action(ActionTypes.SET_CURRENT_SKILL, {skill})

export const changeRole = (role: string) => action(ActionTypes.CHANGE_ROLE, {role})
export const changeRoleNative = (role: string) => action(ActionTypes.CHANGE_ROLE_NATIVE, {role})
export const changeRoleSuccess = (role: string) => action(ActionTypes.CHANGE_ROLE_SUCCESS, {role})
export const fetchProfileSuccess = (data) => action(ActionTypes.FETCH_PROFILE + ApiActionTypes.SUCCESS, data)

export const deleteProfile = (role: string) => action(ActionTypes.DELETE_PROFILE, {role})
export const deleteProfileRequest = (role: string) => action(ActionTypes.DELETE_PROFILE_REQUEST, {
  api: {
    url: `/api/profile/${role}`,
    method: 'DELETE',
  }
})

export const resetProfileForm = () => action(ActionTypes.FORM_RESET)


export const showProfileForm = (key: string) => action(ActionTypes.SHOW_FORM, {key})
export const hideProfileForm = (key: string) => action(ActionTypes.HIDE_FORM, {key})
export const updateProfileByForm = (id: number, data: ProfileData, key: string) => action(ActionTypes.UPDATE_PROFILE_BY_FORM, {id, data, key})
