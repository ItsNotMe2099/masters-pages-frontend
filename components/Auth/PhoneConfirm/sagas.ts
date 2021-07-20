import { modalClose, phoneConfirmOpen } from "components/Modal/actions";
import { phoneConfirmError, phoneConfirmSubmit } from "components/Auth/PhoneConfirm/actions";
import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
function* phoneConfirmSaga() {


  yield takeLatest(ActionTypes.PHONE_CONFIRM_SUBMIT,
    function* (action: ActionType<typeof phoneConfirmSubmit>) {
      console.log("Data", action.payload)
      const phone = yield select((state: IRootState) => state.authSignUp.phone)
      const res = yield requestGen({
        url: `/api/auth/phoneConfirmation`,
        method: 'POST',
        data: {
          code: action.payload.code,
          phone: phone
        },
      } as IRequestData)
      console.log("Res signup", res)
      if(!res.err) {
        cookie.set("token", res.data.accessToken, { expires: 365 * 3 });
          window.location.href = '/RegistrationPage';

      }else{
        yield put(phoneConfirmError(res.err?.errors));
      }

    })

}

export default phoneConfirmSaga
