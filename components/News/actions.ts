import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab} from 'types'
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface INewsList{
  profileId?: number,
  limit: number,
  page: number,
  sort?: string,
  sortOrder?: string
  projectId?: number
}

interface INewsItemCommentList{
  type: string
  profileGalleryId: number,
  limit: number,
  page: number
}
export const fetchNewsList = (data: INewsList) => action(ActionTypes.FETCH_NEWS_LIST, {
  api: {
    url: `/api/news?${queryString.stringify(data)}`,
    method: 'GET',
  }
})


export const fetchNewsItemCommentList = (data: INewsItemCommentList) => action(ActionTypes.FETCH_NEWS_ITEM_COMMENT_LIST_REQUEST, {
  api: {
    url: `/api/comment?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const createNewsLikeRequest = (profileGalleryId: number) => action(ActionTypes.CREATE_NEWS_COMMENT_LIKE_REQUEST, {
  api: {
    url: '/api/like',
    method: 'NEWS',
    data: {
      profileGalleryId
    }
  }
})


export const setNewsTab = (tab: IProfileTab) => action(ActionTypes.SET_NEWS_TAB, { tab })

export const resetNewsList = () => action(ActionTypes.RESET_NEWS_LIST)
export const setPageNewsCurrentItemCommentsPage = (page: number) => action(ActionTypes.SET_NEWS_ITEM_COMMENT_PAGE, page)
export const setNewsCurrentItem = (item: IProfileGalleryItem) => action(ActionTypes.SET_NEWS_CURRENT, item)
export const setNewsCurrentItemIndex = (index: number) => action(ActionTypes.SET_NEWS_CURRENT_INDEX, index)

export const createNewsComment = (data: IProfileGalleryComment, onSuccess) => action(ActionTypes.CREATE_NEWS_COMMENT, {data, onSuccess})
export const createNewsCommentSuccess = (data: IProfileGalleryItem) => action(ActionTypes.CREATE_NEWS_COMMENT_SUCCESS, data)
export const createNewsCommentFailed = (err: any) => action(ActionTypes.CREATE_NEWS_COMMENT_FAIL, err)
