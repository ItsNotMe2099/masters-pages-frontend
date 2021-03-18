import { signInError, signInSubmit } from "components/Auth/SignIn/actions";
import { takeLatest, put, select, call } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {deleteDeviceRequest} from "../Push/actions";
import cookie from "js-cookie";
import Router from "next/router";
import {getDeviceId} from "../../utils/deviceId";
function* authSaga() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT,
    function* (action: ActionType<typeof signInSubmit>) {
      const deviceId = yield getDeviceId();
        yield put(deleteDeviceRequest(deviceId));
      cookie.remove("token");
      cookie.remove("mode");
      window.location.href = '/';
    })
}

export default authSaga
