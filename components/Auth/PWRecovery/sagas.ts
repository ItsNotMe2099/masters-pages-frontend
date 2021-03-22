import { phoneConfirmOpen, PWRecoverySuccessOpen } from "components/Modal/actions";
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
  PWRecoveryFinalSuccess, PWRecoverySetCode
} from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
import PWRecoverySucces from "./Success";
import {afterAuthRedirect} from 'utils/auth'

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
        if(res.data.code){
          yield put(PWRecoverySetCode(res.data.code));
        }
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
          const phone = yield select((state: IRootState) => state.PWRecovery.phone)
          const code = yield select((state: IRootState) => state.PWRecovery.code)

          const res: IResponse = yield requestGen({
            url: `/api/auth/passwordChangeConfirmation`,
            method: 'POST',
            data: {
              newPassword: action.payload.password,
              code: code,
              phone: phone,
            },
          } as IRequestData)
          console.log("Res password", res)
          if(!res.err){
            cookie.set("token", res.data.accessToken, { expires: 1 });
            afterAuthRedirect();
          }else{

            yield put(PWRecoveryFinalError(res.err?.errors))
          }

        })

}

export default PWRecoverySaga
