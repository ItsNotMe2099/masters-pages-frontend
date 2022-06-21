import {confirmChangeData, modalClose} from 'components/Modal/actions'

import ApiActionTypes from 'constants/api'
import {takeLatest, put, take} from 'redux-saga/effects'
import {ActionType} from 'typesafe-actions'
import ActionTypes from './const'
import {
  createFollower,
  createFollowerRequest,
  deleteFollower,
  deleteFollowerRequest,
} from 'components/Follower/actions'

function* FollowerSaga() {
  yield takeLatest(ActionTypes.CREATE_FOLLOWER,
    function* (action: ActionType<typeof createFollower>) {
      yield put(createFollowerRequest(action.payload.data))
      const result = yield take([ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS) {

      }
    })


  yield takeLatest(ActionTypes.DELETE_FOLLOWER,
    function* (action: ActionType<typeof deleteFollower>) {
      yield put(confirmChangeData({loading: true}))
      yield put(deleteFollowerRequest(action.payload.id))
      const result = yield take([ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(modalClose())

      }
    })


}

export default FollowerSaga
