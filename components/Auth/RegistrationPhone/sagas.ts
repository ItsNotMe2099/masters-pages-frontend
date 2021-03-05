import {modalClose, phoneConfirmOpen, registrationPhoneConfirmOpen} from "components/Modal/actions";
import {
  registrationPhoneChange,
  registrationPhoneChangeConfirmRequest,
  registrationPhoneChangeRequest, registrationPhoneConfirm,
  registrationPhoneSubmit, registrationPhoneSubmitRequest
} from "components/Auth/RegistrationPhone/actions";
import {takeLatest, put, select, call, take} from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { IRequestData, IResponse, IRootState } from 'types'
import cookie from "js-cookie";
import ApiActionTypes from "../../../constants/api";
import {fetchChat} from "../../Chat/actions";
function* registrationPhoneSaga() {


  yield takeLatest(ActionTypes.REGISTRATION_PHONE_SUBMIT,
    function* (action: ActionType<typeof registrationPhoneSubmit>) {
      yield put(registrationPhoneSubmitRequest(action.payload));
      const result = yield take([ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(registrationPhoneConfirmOpen());
      }

    })

  yield takeLatest(ActionTypes.REGISTRATION_PHONE_CHANGE,
    function* (action: ActionType<typeof registrationPhoneChange>) {
      yield put(registrationPhoneChangeRequest(action.payload));
      const result = yield take([ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(registrationPhoneConfirmOpen());
      }

    })

  yield takeLatest(ActionTypes.REGISTRATION_PHONE_CONFIRM,
    function* (action: ActionType<typeof registrationPhoneConfirm>) {

      const phone = yield select((state: IRootState) => state.registrationPhone.phone)

      yield put(registrationPhoneChangeConfirmRequest({code: action.payload.code, phone}));
      const result = yield take([ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS) {
        const red = yield select((state: IRootState) => state.registrationPhone)
        console.log("red", red)
        const cb = yield select((state: IRootState) => state.registrationPhone.cb)
        console.log("CB", cb);
        cb(phone)
        yield put(modalClose());

      }

    })

}

export default registrationPhoneSaga
