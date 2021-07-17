import { modalClose, phoneConfirmOpen } from "components/Modal/actions";
import { changePassword, changePasswordError, changePasswordSuccess } from "components/Auth/ChangePassword/actions";
import { signInError, signInSubmit } from "components/Auth/SignIn/actions";
import { takeLatest, put, select, call } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { IRequestData, IResponse, IRootState } from 'types'
function* signInSaga() {


  yield takeLatest(ActionTypes.CHANGE_PASSWORD,
    function* (action: ActionType<typeof changePassword>) {

      const res: IResponse = yield requestGen({
        url: `/api/auth/resetPassByCurrentUser`,
        method: 'POST',
        data: action.payload,
      } as IRequestData)
      console.log("Res changePassword", res)
      if(!res.err){
        yield put(changePasswordSuccess());
        yield put(modalClose())
      }else{
        yield put(changePasswordError(res.err?.errors));
      }

    })

}

export default signInSaga
