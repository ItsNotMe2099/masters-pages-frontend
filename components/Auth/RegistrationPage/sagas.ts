import {phoneConfirmOpen, registrationSuccessOpen} from "components/Modal/actions";
import {takeLatest, put, select, take} from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import ProfileActionTypes from 'components/Profile/const'
import { registrationCompleteError, registrationCompleteSubmit, registrationCompleteSuccess } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
import {fetchProfile} from 'components/Profile/actions'
import ApiActionTypes from 'constants/api'
function* registrationCompleteSaga() {


  yield takeLatest(ActionTypes.REGISTRATION_COMPLETE_SUBMIT,
    function* (action: ActionType<typeof registrationCompleteSubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/auth/completeRegistration`,
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      console.log("Res signup", res)
      yield put(fetchProfile('client'));
      yield take([ProfileActionTypes.FETCH_PROFILE + ApiActionTypes.SUCCESS, ProfileActionTypes.FETCH_PROFILE + ApiActionTypes.FAIL])

      if(!res.err){
        cookie.set("token", res.data.accessToken, { expires: 1 });
        yield put(registrationCompleteSuccess())
        yield put(registrationSuccessOpen());
      }else{
        yield put(registrationCompleteError(res.err?.errors));
      }

    })

}

export default registrationCompleteSaga
