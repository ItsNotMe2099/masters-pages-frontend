
import {takeLatest, put, select, call, take} from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {setPushToken, setPushTokenRequest} from "./actions";
import ApiActionTypes from "constants/api";
import {getDeviceId} from "utils/deviceId";
function* pushSaga() {
  yield takeLatest(ActionTypes.SET_PUSH_TOKEN,
    function* (action: ActionType<typeof setPushToken>) {
      const deviceId = yield getDeviceId();
      yield put(setPushTokenRequest({
        pushToken: action.payload.pushToken,
        deviceId,
        platform: 'web',
      }));
      const result = yield take([ActionTypes.SET_PUSH_TOKEN_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.SET_PUSH_TOKEN_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.SET_PUSH_TOKEN_REQUEST + ApiActionTypes.SUCCESS) {
        window.localStorage.setItem('push_token', action.payload.pushToken)
      }

    })
}

export default pushSaga
