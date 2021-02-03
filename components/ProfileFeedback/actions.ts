import ActionTypes from './const'
import { action } from 'typesafe-actions'

export const fetchFeedbacksToProfile = () => action(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE)

export const fetchFeedbacksToProfileRequest = () => action(ActionTypes.FETCH_FEEDBACKS_TO_PROFILE_REQUEST, {
  api: {
    url: `/api/feedback?page=1&limit=50&sort=createdAt&sortOrder=DESC`,
    method: 'GET',
  }
})

export const fetchLatestFeedbacksToProfile = () => action(ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE)

export const fetchLatestFeedbacksToProfileRequest = () => action(ActionTypes.FETCH_LATEST_FEEDBACKS_TO_PROFILE_REQUEST, {
  api: {
    url: '/api/feedback/latest?page=1&limit=50&sort=createdAt&sortOrder=DESC',
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

