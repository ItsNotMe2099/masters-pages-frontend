import {confirmChangeData, modalClose} from "components/Modal/actions";

import ApiActionTypes from "constants/api";
import {takeLatest, put, take, select} from 'redux-saga/effects'
import {IRootState} from "types";
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import {hideProfileForm} from 'components/Profile/actions'
import {
  createFollower,
  createFollowerRequest,
  deleteFollower,
  deleteFollowerRequest,
} from 'components/Follower/actions'

function* FollowerSaga() {
  console.log("FollowerSaga")
  yield takeLatest(ActionTypes.CREATE_FOLLOWER,
    function* (action: ActionType<typeof createFollower>) {
      console.log("Create");
      yield put(createFollowerRequest(action.payload.data));
      const result = yield take([ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("CREATE FOLLOWER SUCCESS")

      }
    })


  yield takeLatest(ActionTypes.DELETE_FOLLOWER,
    function* (action: ActionType<typeof deleteFollower>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteFollowerRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS) {
        console.log("DELETE SKILL SUCCESS")
        yield put(modalClose());

      }
    })


}

export default FollowerSaga
