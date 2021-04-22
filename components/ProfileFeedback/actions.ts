import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
export interface IProfileFeedbackList{
  profileId: number,
  subCategoryId?: number
  page: number,
  limit: number,

}
export const fetchFeedbacksToProfile = (data: IProfileFeedbackList) => action(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE, {data})

export const fetchFeedbacksToProfileRequest = (data: IProfileFeedbackList) => action(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST, {
  api: {
    url: `/api/feedback/profile?${queryString.stringify({...data,
      sort: 'createdAt',
      sortOrder: 'DESC'
    })}`,
    method: 'GET',
  }
})

export const fetchFeedbacksToProfileShortRequest = (profileId, subCategoryId?: number) => action(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_SHORT_REQUEST, {
  api: {
    url: `/api/feedback/profile?${queryString.stringify({
      profileId,
      subCategoryId,
      limit: 3,
      page: 1,
      sort: 'createdAt',
      sortOrder: 'DESC'
    })}`,
    method: 'GET',
  }
})

export const fetchFeedbacksSiteRequest = (data: any) => action(ActionTypes.FETCH_FEEDBACKS_SITE_REQUEST, {
  api: {
    url: `/api/feedback/site?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchFeedbacksMainPageRequest = () => action(ActionTypes.FETCH_FEEDBACKS_MAIN_PAGE_REQUEST, {
  api: {
    url: '/api/feedback/main-page?page=1&limit=3&sort=createdAt&sortOrder=DESC',
    method: 'GET',
  }
})

export const createFeedBackMasterRequest = (data: any) => action(ActionTypes.CREATE_FEEDBACK_MASTER_REQUEST, {
  api: {
    url: '/api/feedback/master',
    method: 'POST',
    data
  }
})
export const createFeedBackSite = (data: any) => action(ActionTypes.CREATE_FEEDBACK_SITE, {data})
export const createFeedBackSiteRequest = (data: any) => action(ActionTypes.CREATE_FEEDBACK_SITE_REQUEST, {
  api: {
    url: '/api/feedback/site',
    method: 'POST',
    data
  }
})
export const setPageFeedback = (page: number) => action(ActionTypes.FEEDBACK_SET_PAGE, page)
export const resetFeedbackList = () => action(ActionTypes.RESET_FEEDBACK_LIST)

