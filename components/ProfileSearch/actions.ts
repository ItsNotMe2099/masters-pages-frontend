import { ITask } from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')

export const fetchProfileSearchList = (data:any = {} ) => action(ActionTypes.FETCH_PROFILE_SEARCH, data)

export const fetchProfileSearchListRequest = (data: any) => action(ActionTypes.FETCH_PROFILE_SEARCH_REQUEST, {
  api: {
    url: `/api/profile/search?${queryString.stringify({...data, budgetMin: data.price?.min, budgetMax: data.price?.max, price: undefined})}`,
    method: 'GET',
  }
})

export const resetProfileSearchList = () => action(ActionTypes.RESET_PROFILE_SEARCH)
export const setPageProfileSearch = (page: number) => action(ActionTypes.PROFILE_SEARCH_SET_PAGE, page)
export const taskSearchSetCurrentTask = (task: ITask) => action(ActionTypes.PROFILE_SEARCH_SET_CURRENT_TASK, task)
export const setFilterProfileSearch = (data: any) => action(ActionTypes.PROFILE_SEARCH_SET_FILTER, data)
export const setSortProfileSearch = (data: string) => action(ActionTypes.PROFILE_SEARCH_SET_SORT, data)
export const setUseLocationFilter = (useFilter: boolean, exactLocation: boolean) => action(ActionTypes.PROFILE_SEARCH_SET_USE_LOCATION_FILTER, {useFilter, exactLocation})
export const saveProfileSearchList = (data: any) => action(ActionTypes.PROFILE_SEARCH_SAVE_SEARCH, data)
export const saveProfileSearchListRequest = (data: any) => action(ActionTypes.PROFILE_SEARCH_SAVE_SEARCH_REQUEST, {
  api: {
    url: `/api/profile-searches`,
    method: 'POST',
    data,
  }
})

export const setRoleProfileSearch = (role) => action(ActionTypes.PROFILE_SEARCH_SET_ROLE, role)
