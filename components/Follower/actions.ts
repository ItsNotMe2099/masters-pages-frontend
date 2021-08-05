import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IFollowerList{
  limit?: number,
  page?: number,
  sort?: string,
  sortOrder?: string

}

interface IFollowerItemCommentList{
  type: string
  profileGalleryId: number,
  limit: number,
  page: number
}
export const createFollower = (data: any) => action(ActionTypes.CREATE_FOLLOWER, { data })
export const createFollowerRequest = (data) => action(ActionTypes.CREATE_FOLLOWER_REQUEST, {
  api: {
    url: `/api/profile-followers`,
    method: 'POST',
    data: {...data},
  }
})

export const fetchFollowerList = (data: IFollowerList) => action(ActionTypes.FETCH_FOLLOWER_LIST, {
  api: {
    url: `/api/profile-followers/following?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const deleteFollower = (id: number) => action(ActionTypes.DELETE_FOLLOWER, { id})
export const deleteFollowerRequest = (id: number) => action(ActionTypes.DELETE_FOLLOWER_REQUEST, {
  api: {
    url: `/api/profile-followers/${id}`,
    method: 'DELETE'
  }
})

export const resetFollowerList = () => action(ActionTypes.RESET_FOLLOWER_LIST)

export const setPageFollower = (page: number) => action(ActionTypes.SET_FOLLOWER_PAGE, page)
