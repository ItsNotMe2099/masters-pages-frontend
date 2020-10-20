import { phoneConfirmOpen } from "components/Auth/actions";
import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import {  signUpSubmit } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'

function* signUpSaga() {


  yield takeLatest(ActionTypes.SIGN_UP_SUBMIT,
    function* (action: ActionType<typeof signUpSubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/auth/signUp`,
        method: 'POST',
        data: {
          phone: action.payload.phone,
        },
      } as IRequestData)
      console.log("Res signup", res)
      if(!res.err){
        yield put(phoneConfirmOpen());
      }

    })

}

export default signUpSaga
