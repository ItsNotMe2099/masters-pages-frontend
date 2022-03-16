import { signInSubmit } from 'components/Auth/SignIn/actions'
import { takeLatest, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import {deleteDeviceRequest} from '../Push/actions'
import cookie from 'js-cookie'
import {getDeviceId} from '../../utils/deviceId'
import {CookiesType} from 'types/enums'
function* authSaga() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT,
    function* (action: ActionType<typeof signInSubmit>) {
      const deviceId = yield getDeviceId()
        yield put(deleteDeviceRequest(deviceId))
      cookie.remove(CookiesType.accessToken)
      cookie.remove(CookiesType.profileRole)
      window.location.href = '/'
    })
}

export default authSaga
