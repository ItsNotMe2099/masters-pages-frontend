import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'

import {
  createProfileRecommendation,
  createProfileRecommendationRequest,
  deleteProfileRecommendation,
  deleteProfileRecommendationRequest,
  fetchProfileRecommendationShortList
} from 'components/ProfileRecommendations/actions'
import {confirmChangeData, modalClose} from 'components/Modal/actions'
function* ProfileRecommendationSaga() {
  console.log("ProfileRecommendationSaga")
  yield takeLatest(ActionTypes.CREATE_PROFILE_RECOMMENDATION,
    function* (action: ActionType<typeof createProfileRecommendation>) {
    console.log("Create");
      yield put(createProfileRecommendationRequest(action.payload.profileId));
      const result = yield take([ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.SUCCESS){
        console.log("CREATE RECOMMNEDATION SUCCESS")
        yield put(fetchProfileRecommendationShortList(action.payload.profileId))

      }
    })
  yield takeLatest(ActionTypes.DELETE_PROFILE_RECOMMENDATION,
    function* (action: ActionType<typeof deleteProfileRecommendation>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteProfileRecommendationRequest(action.payload.recommendationId));
      const result = yield take([ActionTypes.DELETE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE DELETE_PROFILE_RECOMMENDATION SUCCESS")
        yield put(modalClose());
      }
    })
}

export default ProfileRecommendationSaga