import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'

import {
  createProfileRecommendation,
  createProfileRecommendationRequest, fetchProfileRecommendationShortList
} from 'components/ProfileRecommendations/actions'
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
}

export default ProfileRecommendationSaga
