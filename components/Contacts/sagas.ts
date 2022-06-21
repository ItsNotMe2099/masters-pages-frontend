import {put, take, takeLatest} from 'redux-saga/effects'
import ActionTypes from './const'
import {ActionType} from 'typesafe-actions'
import {deleteSavedPeople, deleteSavedPeopleRequest} from './actions'
import {confirmChangeData, modalClose} from 'components/Modal/actions'
import ApiActionTypes from 'constants/api'


function* ContactsSaga() {

  yield takeLatest(ActionTypes.DELETE_SAVED_PEOPLE,
    function* (action: ActionType<typeof deleteSavedPeople>) {
      yield put(confirmChangeData({loading: true}))
      yield put(deleteSavedPeopleRequest(action.payload.id))
      const result = yield take([ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.FAIL])
      if(result.type === ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS){
        yield put(modalClose())
      }
    })
}

export default ContactsSaga
