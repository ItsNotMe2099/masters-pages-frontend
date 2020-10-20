import { phoneConfirmOpen } from "components/Auth/actions";
import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { registrationCompleteSubmit } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
function* registrationCompleteSaga() {


  yield takeLatest(ActionTypes.REGISTRATION_COMPLETE_SUBMIT,
    function* (action: ActionType<typeof registrationCompleteSubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/auth/completeRegistration`,
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      console.log("Res signup", res)
      if(!res.err){
        cookie.set("token", res.data.accessToken, { expires: 1 });
        window.location.href = '/';
      }

    })

}

export default registrationCompleteSaga
