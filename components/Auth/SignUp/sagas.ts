import { phoneConfirmOpen } from "components/Modal/actions";
import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { signUpError, signUpSubmit, signUpSuccess } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import {phoneConfirmSetCode} from "../PhoneConfirm/actions";

function* signUpSaga() {


  yield takeLatest(ActionTypes.SIGN_UP_SUBMIT,
    function* (action: ActionType<typeof signUpSubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/auth/register`,
        method: 'POST',
        data: {
          phone: action.payload.phone,
        },
      } as IRequestData)
      console.log("Res signup", res)

      if(!res.err){
        if(res.data.code){
          yield put(phoneConfirmSetCode(res.data.code));
        }
        yield put(signUpSuccess());
        yield put(phoneConfirmOpen());
      }else{
        yield put(signUpError(res.err?.errors))
      }

    })

}

export default signUpSaga
