import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IPostList{
  profileId: number,
  limit: number,
  page: number,
  sort?: string,
  sortOrder?: string
}

interface IPostItemCommentList{
  type: string
  profileGalleryId: number,
  limit: number,
  page: number
}
export const resetPostForm = () => action(ActionTypes.RESET_POST_FORM)

export const createPost = (data: IProfileGalleryItem, formKey: string) => action(ActionTypes.CREATE_POST, { data, formKey})
export const createPostRequest = (data: IProfileGalleryItem) => action(ActionTypes.CREATE_POST_REQUEST, {
  api: {
    url: `/api/profile-gallery`,
    method: 'POST',
    data: {...data},
  }
})

export const updatePost = (id: number, data: IProfileGalleryItem, formKey: string) => action(ActionTypes.UPDATE_POST, { id, data, formKey})
export const updatePostRequest = (id: number, data: IProfileGalleryItem) => action(ActionTypes.UPDATE_POST_REQUEST, {
  api: {
    url: `/api/profile-gallery/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchPostList = (data: IPostList) => action(ActionTypes.FETCH_POST_LIST, {
  api: {
    url: `/api/profile-gallery?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchPost = (id: number) => action(ActionTypes.FETCH_POST, {
  api: {
    url: `/api/profile-gallery/${id}`,
    method: 'GET',
  }
})
export const deletePost = (id: number) => action(ActionTypes.DELETE_POST, { id})
export const deletePostRequest = (id: number) => action(ActionTypes.DELETE_POST_REQUEST, {
  api: {
    url: `/api/profile-gallery/${id}`,
    method: 'DELETE'
  }
})

export const fetchPostItemCommentList = (data: IPostItemCommentList) => action(ActionTypes.FETCH_POST_ITEM_COMMENT_LIST_REQUEST, {
  api: {
    url: `/api/comment?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const createPostLikeRequest = (profileGalleryId: number) => action(ActionTypes.CREATE_POST_COMMENT_LIKE_REQUEST, {
  api: {
    url: `/api/like`,
    method: 'POST',
    data: {
      profileGalleryId
    }
  }
})


export const setPostTab = (tab: IProfileTab) => action(ActionTypes.SET_POST_TAB, { tab })

export const resetPostList = () => action(ActionTypes.RESET_POST_LIST)
export const setPagePostCurrentItemCommentsPage = (page: number) => action(ActionTypes.SET_POST_ITEM_COMMENT_PAGE, page)
export const setPostCurrentItem = (item: IProfileGalleryItem) => action(ActionTypes.SET_POST_CURRENT, item)
export const setPostCurrentItemIndex = (index: number) => action(ActionTypes.SET_POST_CURRENT_INDEX, index)

export const createPostComment = (data: IProfileGalleryComment, onSuccess) => action(ActionTypes.CREATE_POST_COMMENT, {data, onSuccess})
export const createPostCommentSuccess = (data: IProfileGalleryItem) => action(ActionTypes.CREATE_POST_COMMENT_SUCCESS, data)
export const createPostCommentFailed = (err: any) => action(ActionTypes.CREATE_POST_COMMENT_FAIL, err)
