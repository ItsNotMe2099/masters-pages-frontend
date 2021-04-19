import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IProfileGalleryList{
  profileTabId?: number
  profileId: number,
  categoryId: number,
  subCategoryId: number,
  limit: number,
  page: number,
  sort?: string,
  sortOrder?: string
}

interface IProfileGalleryItemCommentList{
  type: string
  profileGalleryId: number,
  limit: number,
  page: number
}
export const resetProfileGalleryForm = () => action(ActionTypes.RESET_PROFILE_GALLERY_FORM)

export const createProfileGallery = (data: IProfileGalleryItem, formKey: string) => action(ActionTypes.CREATE_PROFILE_GALLERY, { data, formKey})
export const createProfileGalleryRequest = (data: IProfileGalleryItem) => action(ActionTypes.CREATE_PROFILE_GALLERY_REQUEST, {
  api: {
    url: `/api/profile-gallery`,
    method: 'POST',
    data: {...data},
  }
})

export const updateProfileGallery = (id: number, data: IProfileGalleryItem, formKey: string) => action(ActionTypes.UPDATE_PROFILE_GALLERY, { id, data, formKey})
export const updateProfileGalleryRequest = (id: number, data: IProfileGalleryItem) => action(ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST, {
  api: {
    url: `/api/profile-gallery/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchProfileGalleryList = (data: IProfileGalleryList) => action(ActionTypes.FETCH_PROFILE_GALLERY_LIST, {
  api: {
    url: `/api/profile-gallery?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchProfileGallery = (id: number) => action(ActionTypes.FETCH_PROFILE_GALLERY, {
  api: {
    url: `/api/profile-gallery/${id}`,
    method: 'GET',
  }
})
export const deleteProfileGallery = (id: number) => action(ActionTypes.DELETE_PROFILE_GALLERY, { id})
export const deleteProfileGalleryRequest = (id: number) => action(ActionTypes.DELETE_PROFILE_GALLERY_REQUEST, {
  api: {
    url: `/api/profile-gallery/${id}`,
    method: 'DELETE'
  }
})

export const fetchProfileGalleryItemCommentList = (data: IProfileGalleryItemCommentList) => action(ActionTypes.FETCH_PROFILE_GALLERY_ITEM_COMMENT_LIST_REQUEST, {
  api: {
    url: `/api/comment?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const createProfileGalleryLikeRequest = (profileGalleryId: number) => action(ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_LIKE_REQUEST, {
  api: {
    url: `/api/like`,
    method: 'POST',
    data: {
      profileGalleryId
    }
  }
})


export const setProfileGalleryTab = (tab: IProfileTab) => action(ActionTypes.SET_PROFILE_GALLERY_TAB, { tab })

export const resetProfileGalleryList = () => action(ActionTypes.RESET_PROFILE_GALLERY_LIST)
export const setPageProfileGalleryCurrentItemCommentsPage = (page: number) => action(ActionTypes.SET_PROFILE_GALLERY_ITEM_COMMENT_PAGE, page)
export const setProfileGalleryCurrentItem = (item: IProfileGalleryItem) => action(ActionTypes.SET_PROFILE_GALLERY_CURRENT, item)
export const setProfileGalleryCurrentItemIndex = (index: number) => action(ActionTypes.SET_PROFILE_GALLERY_CURRENT_INDEX, index)

export const createProfileGalleryComment = (data: IProfileGalleryComment, onSuccess) => action(ActionTypes.CREATE_PROFILE_GALLERY_COMMENT, {data, onSuccess})
export const createProfileGalleryCommentSuccess = (data: IProfileGalleryComment) => action(ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_SUCCESS, data)
export const createProfileGalleryCommentFailed = (err: any) => action(ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_FAIL, err)
