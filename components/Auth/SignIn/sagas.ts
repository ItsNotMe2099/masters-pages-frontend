import {modalClose, phoneConfirmOpen} from "components/Modal/actions";
import { signInError, signInSubmit } from "components/Auth/SignIn/actions";
import { takeLatest, put, select, call } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
import {afterAuthRedirect} from 'utils/auth'
function* signInSaga() {


  yield takeLatest(ActionTypes.SIGN_IN_SUBMIT,
    function* (action: ActionType<typeof signInSubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/auth/login`,
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      console.log("Res signup", res.data)
      if(!res.err){
        cookie.set("token", res.data.accessToken, { expires: 365 * 3 });
        yield put(modalClose());
        afterAuthRedirect();
      }else{
        yield put(signInError(res.err?.errors));
      }

    })

}

export default signInSaga
