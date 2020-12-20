
import { confirmChangeData, modalClose } from "components/Modal/actions";
import { acceptTaskOffer, acceptTaskOfferRequest } from "components/TaskOffer/actions";
import ApiActionTypes from "constants/api";
import { takeLatest, put, take, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
function* TaskOfferSaga() {

  yield takeLatest(ActionTypes.TASK_OFFER_ACCEPT,
    function* (action: ActionType<typeof acceptTaskOffer>) {
    console.log("TASK_OFFER_ACCEPT")
      yield put(acceptTaskOfferRequest(action.payload.taskId, action.payload.data));
      const result = yield take([ActionTypes.TASK_OFFER_ACCEPT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.TASK_OFFER_ACCEPT_REQUEST + ApiActionTypes.FAIL])

      if(result.type === ActionTypes.TASK_OFFER_ACCEPT_REQUEST + ApiActionTypes.SUCCESS){
        console.log("ACCEPT TASK OFFER SUCCESS")
        yield put(modalClose());
      }
    })
}

export default TaskOfferSaga
