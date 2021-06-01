import {IProfileRecommendation, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IProfileRecommendationList{
  page: number,
  limit: number,
}
export const createProfileRecommendation = (profileId: number) => action(ActionTypes.CREATE_PROFILE_RECOMMENDATION, { profileId })
export const createProfileRecommendationRequest = (profileId: number) => action(ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST, {
  api: {
    url: `/api/profile-recommendations`,
    method: 'POST',
    data: {
      profileId
    },
  }
})


export const deleteProfileRecommendation = (recommendationId: number) => action(ActionTypes.DELETE_PROFILE_RECOMMENDATION, { recommendationId })
export const deleteProfileRecommendationRequest = (recommendationId: number) => action(ActionTypes.DELETE_PROFILE_RECOMMENDATION_REQUEST, {
  api: {
    url: `/api/profile-recommendations/${recommendationId}`,
    method: 'DELETE',
    data: {
      recommendationId
    },
  }
})

export const fetchProfileRecommendationForProfileList = (profileId: number, data: IProfileRecommendationList) => action(ActionTypes.FETCH_PROFILE_RECOMMENDATION_LIST, {
  api: {
    url: `/api/profile-recommendations/${profileId}?${queryString.stringify({
      ...data,
      sort: 'createdAt',
      sortOrder: 'DESC'
    })}`,
    method: 'GET',
  }
})

export const fetchProfileRecommendationList = (profileId: number, data: IProfileRecommendationList) => action(ActionTypes.FETCH_PROFILE_RECOMMENDATION_LIST, {
  api: {
    url: `/api/profile-recommendations?${queryString.stringify({
      ...data,
      sort: 'createdAt',
      sortOrder: 'DESC'
    })}`,
    method: 'GET',
  }
})

export const fetchProfileRecommendationShortList = (profileId: number) => action(ActionTypes.FETCH_PROFILE_RECOMMENDATION_SHORT_LIST, {
  api: {
    url: `/api/profile-recommendations/${profileId}?${queryString.stringify({
      limit: 3,
      page: 1,
      sort: 'createdAt',
      sortOrder: 'DESC'
    })}`,
    method: 'GET',
  }
})


export const resetProfileRecommendationList = () => action(ActionTypes.RESET_PROFILE_RECOMMENDATION_LIST)
export const setPageProfileRecommendation = (page: number) => action(ActionTypes.SET_PROFILE_RECOMMENDATION_PAGE, page)
