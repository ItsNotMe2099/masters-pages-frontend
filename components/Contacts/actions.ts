import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IContactsList{
  profileId?: number,
  limit: number,
  page: number,
  sort?: string,
  sortOrder?: string
}

interface IContactsItemCommentList{
  type: string
  profileGalleryId: number,
  limit: number,
  page: number
}
export const fetchChatContactsList = (data: IContactsList) => action(ActionTypes.FETCH_MESSAGES_CONTACT_LIST, {
  api: {
    url: `/api/chat/contacts?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchProfileContacts = (data: IContactsList) => action(ActionTypes.FETCH_CONTACT_LIST, {
  api: {
    url: `/api/profile-contacts?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const resetProfileContactsList = () => action(ActionTypes.RESET_PROFILE_CONTACT_LIST)

export const resetContactsChatList = () => action(ActionTypes.RESET_MESSAGES_CONTACT_LIST)
export const setPageContactsChatList = (page: number) => action(ActionTypes.SET_MESSAGES_CONTACT_PAGE, page)
