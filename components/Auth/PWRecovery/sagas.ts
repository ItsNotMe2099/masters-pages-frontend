import { phoneConfirmOpen, PWRecoverySuccessOpen } from "components/Auth/actions";
import { takeLatest, put, select, takeEvery } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import {
  PWRecoverySubmit,
  PWRecoverySecondSubmit,
  PWRecoveryIsSuccess,
  PWRecoveryFinalSubmit,
  PWRecoveryError,
  PWRecoveryFinalError,
  PWRecoverySecondError,
  PWRecoverySuccess,
  PWRecoverySecondSuccess,
  PWRecoveryFinalSuccess
} from './actions'
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
        yield put(PWRecoverySuccess())
        yield put({type: ActionTypes.RESET_PW_FIRST_STEP_SUCCESS})
      }else{
        yield put(PWRecoveryError(res.err?.errors))
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
          yield put(PWRecoverySecondSuccess());
          yield put(PWRecoverySuccessOpen());
        }else{
          yield put(PWRecoverySecondError(res.err?.errors))
        }

      })

      yield takeLatest(ActionTypes.RESET_PW_FINAL_STEP_SUBMIT,
        function* (action: ActionType<typeof PWRecoveryFinalSubmit>) {
          const res: IResponse = yield requestGen({
            url: `/api/auth/resetPass`,
            method: 'POST',
            data: {
              password: action.payload.password,
            },
          } as IRequestData)
          console.log("Res password", res)
          if(!res.err){
        //    yield put(PWRecoveryFinalSuccess());
            window.location.href = '';
          }else{
            yield put(PWRecoveryFinalError(res.err?.errors))
          }

        })

}

export default PWRecoverySaga
