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
