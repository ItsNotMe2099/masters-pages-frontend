import ApiActionTypes from "constants/api";
import { ProfileData } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const createProfile = (role: string, data: ProfileData) => action(ActionTypes.CREATE_PROFILE, {
  api: {
    url: `/api/profile/${role}`,
    method: 'POST',
    data: {...data},
  }
})
export const updateProfile = (id: number, data: ProfileData) => action(ActionTypes.UPDATE_PROFILE, {
  api: {
    url: `/api/profile/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchProfile = (role: string) => action(ActionTypes.FETCH_PROFILE, {
  api: {
    url: `/api/profile`,
    method: 'POST',
    data: {role},
  }
})

export const changeRole = (role: string) => action(ActionTypes.CHANGE_ROLE, {role})
export const changeRoleSuccess = (role: string) => action(ActionTypes.CHANGE_ROLE_SUCCESS, {role})
export const fetchProfileSuccess = (data) => action(ActionTypes.FETCH_PROFILE + ApiActionTypes.SUCCESS, data)
/*
Получить профиль
Если нет профиля то на создание
 */
