import { confirmChangeData, modalClose } from "components/Modal/actions";
import {
  deleteSavedSearch,
  deleteSavedSearchRequest,
  fetchSavedSearches,
  fetchSavedSearchesRequest
} from "components/SavedSearches/actions";
import { deleteTaskUser, deleteTaskUserRequest, fetchTaskUserStatRequest } from "components/TaskUser/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SavedSearchesSaga() {
  yield takeLatest(ActionTypes.FETCH_SAVED_SEARCHES,
    function* (action: ActionType<typeof fetchSavedSearches>) {
      yield put(fetchSavedSearchesRequest());

    })
  yield takeLatest(ActionTypes.DELETE_SAVED_SEARCHES,
    function* (action: ActionType<typeof deleteSavedSearch>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteSavedSearchRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_SAVED_SEARCHES_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SAVED_SEARCHES_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SAVED_SEARCHES_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE SavedSearch SUCCESS")
        yield put(modalClose());
      }
    })

}

export default SavedSearchesSaga
