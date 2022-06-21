import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const updateOrganizationAvatar = (id: number, data: any, formKey?: string) => action(ActionTypes.UPDATE_ORG_AVATAR, {id, data, formKey})

export const updateOrganization = (id: number, data: any) => action(ActionTypes.UPDATE_ORG, {
  api: {
    url: `/api/organization/${id}`,
    method: 'PATCH',
    data: data,
  }
})

export const showOrganizationForm = (key: string) => action(ActionTypes.SHOW_FORM, {key})
export const hideOrganizationForm = (key: string) => action(ActionTypes.HIDE_FORM, {key})
export const updateOrganizationByForm = (id: number, data: any, key: string) => action(ActionTypes.UPDATE_ORG_BY_FORM, {id, data, key})
