import { phoneConfirmOpen, PWRecoverySuccessOpen } from "components/Auth/actions";
import { takeLatest, put, select, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import {  PWRecoverySubmit, PWRecoverySecondSubmit, PWRecoveryIsSuccess, PWRecoveryFinalSubmit } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
import PWRecoverySucces from "./Success";

function* PWRecoverySaga() {


  yield takeLatest(ActionTypes.RESET_PW_FIRST_STEP_SUBMIT,
    function* (action: ActionType<typeof PWRecoverySubmit>) {
      const res: IResponse = yield requestGen({
        url: `/api/auth/forgot`,
        method: 'POST',
        data: {
          phone: action.payload.phone,
        },
      } as IRequestData)
      console.log("Res phone", res)
      if(!res.err){
        yield put({type: ActionTypes.RESET_PW_FIRST_STEP_SUCCESS})
      }

    })

    yield takeLatest(ActionTypes.RESET_PW_SECOND_STEP_SUBMIT,
      function* (action: ActionType<typeof PWRecoverySecondSubmit>) {
        const res: IResponse = yield requestGen({
          url: `/api/auth/phoneConfirmation`,
          method: 'POST',
          data: {
            phone: action.payload.phone,
            code: action.payload.code,
          },
        } as IRequestData)
        console.log("Res payload", res)
        if(!res.err){
          cookie.set("token", res.data.accessToken, { expires: 1 });
          yield put(PWRecoveryIsSuccess());
        }
  
      })

      yield takeLatest(ActionTypes.RESET_PW_FINAL_STEP_SUBMIT,
        function* (action: ActionType<typeof PWRecoveryFinalSubmit>) {
          const res: IResponse = yield requestGen({
            url: `/api/auth/resetPass`,
            method: 'POST',
            data: {
              password: action.payload.password_confirm,
            },
          } as IRequestData)
          console.log("Res password", res)
          if(!res.err){
            window.location.href = '';
          }
    
        })

}

export default PWRecoverySaga
