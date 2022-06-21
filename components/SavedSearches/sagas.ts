import { confirmChangeData, modalClose } from 'components/Modal/actions'

import ApiActionTypes from 'constants/api'
import { takeLatest, put, take } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {
  deleteSavedProfileSearch,
  deleteSavedProfileSearchRequest,
  deleteSavedTaskSearch,
  deleteSavedTaskSearchRequest,
  fetchSavedProfileSearchesRequest, fetchSavedTaskSearchesRequest,
  saveProfileSearchRequest,
  saveTaskSearch,
  saveTaskSearchRequest
} from 'components/SavedSearches/actions'
function* SavedSearchesSaga() {
  yield takeLatest(ActionTypes.DELETE_SAVED_TASK_SEARCHES,
    function* (action: ActionType<typeof deleteSavedTaskSearch>) {
      yield put(confirmChangeData({loading: true}))
      yield put(deleteSavedTaskSearchRequest(action.payload.id))
      const result = yield take([ActionTypes.DELETE_SAVED_TASK_SEARCHES_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SAVED_TASK_SEARCHES_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SAVED_TASK_SEARCHES_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose())
      }
    })
  yield takeLatest(ActionTypes.DELETE_SAVED_PROFILE_SEARCHES_REQUEST,
    function* (action: ActionType<typeof deleteSavedProfileSearch>) {
      yield put(confirmChangeData({loading: true}))
      yield put(deleteSavedProfileSearchRequest(action.payload.id))
      const result = yield take([ActionTypes.DELETE_SAVED_PROFILE_SEARCHES_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SAVED_PROFILE_SEARCHES_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SAVED_PROFILE_SEARCHES_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose())
      }
    })

  yield takeLatest(ActionTypes.SAVED_TASK_SEARCH_CREATE,
    function* (action: ActionType<typeof saveTaskSearch>) {
      yield put(confirmChangeData({loading: true}))
      yield put(saveTaskSearchRequest(action.payload))
      yield take([ActionTypes.SAVED_TASK_SEARCH_CREATE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.SAVED_TASK_SEARCH_CREATE_REQUEST + ApiActionTypes.FAIL])
      yield put(modalClose())

      yield put(fetchSavedTaskSearchesRequest(1, 100))

    })

  yield takeLatest(ActionTypes.SAVED_PROFILE_SEARCH_CREATE,
    function* (action: ActionType<typeof saveTaskSearch>) {
      yield put(confirmChangeData({loading: true}))
      yield put(saveProfileSearchRequest(action.payload))
      yield take([ActionTypes.SAVED_PROFILE_SEARCH_CREATE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.SAVED_PROFILE_SEARCH_CREATE_REQUEST + ApiActionTypes.FAIL])
      yield put(modalClose())
      yield put(fetchSavedProfileSearchesRequest(1, 100))
    })

}

export default SavedSearchesSaga
