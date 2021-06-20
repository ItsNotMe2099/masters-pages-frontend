import { confirmChangeData, modalClose } from "components/Modal/actions";
import {
  deleteSavedPeople,
  deleteSavedPeopleRequest,
  fetchSavedPeopleRequest
} from "components/SavedPeople/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { IRootState } from "types";
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* SavedPeopleSaga() {

  yield takeLatest(ActionTypes.DELETE_SAVED_PEOPLE,
    function* (action: ActionType<typeof deleteSavedPeople>) {
      yield put(confirmChangeData({loading: true}));
      yield put(deleteSavedPeopleRequest(action.payload.id));
      const result = yield take([ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS){
        console.log("DELETE SavedSearch SUCCESS")
        yield put(modalClose());
      }
    })
}

export default SavedPeopleSaga
