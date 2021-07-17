import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchProfileSettingsRequest = () => action(ActionTypes.FETCH_PROFILE_SETTINGS, {
  api: {
    url: `/api/profile/settings`,
    method: 'GET',
  },
})


export const updateProfileSettings = (data: any) => action(ActionTypes.UPDATE_PROFILE_SETTINGS, {data})
export const updateProfileSettingsRequest = (data: any) => action(ActionTypes.UPDATE_PROFILE_SETTINGS_REQUEST, {
  api: {
    url: `/api/profile/settings`,
    method: 'POST',
    data
  },
})
