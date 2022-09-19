import {modalClose, registrationPhoneConfirmOpen} from 'components/Modal/actions'
import {
  registrationPhoneChange,
  registrationPhoneChangeConfirmRequest,
  registrationPhoneChangeRequest, registrationPhoneConfirm,
  registrationPhoneSubmit, registrationPhoneSubmitRequest
} from 'components/Auth/RegistrationPhone/actions'
import {takeLatest, put, select, take} from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import ActionTypes from './const'
import { IRootState } from 'types'
import ApiActionTypes from '../../../constants/api'
function* registrationPhoneSaga() {


  yield takeLatest(ActionTypes.REGISTRATION_PHONE_SUBMIT,
    function* (action: ActionType<typeof registrationPhoneSubmit>) {
      yield put(registrationPhoneSubmitRequest(action.payload))
      const result = yield take([ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(registrationPhoneConfirmOpen())
      }

    })

  yield takeLatest(ActionTypes.REGISTRATION_PHONE_CHANGE,
    function* (action: ActionType<typeof registrationPhoneChange>) {
      yield put(registrationPhoneChangeRequest(action.payload))
      const result = yield take([ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST + ApiActionTypes.SUCCESS) {
        yield put(registrationPhoneConfirmOpen())
      }

    })

  yield takeLatest(ActionTypes.REGISTRATION_PHONE_CONFIRM,
    function* (action: ActionType<typeof registrationPhoneConfirm>) {

      const phone = yield select((state: IRootState) => state.registrationPhone.phone)
      yield put(registrationPhoneChangeConfirmRequest({code: action.payload.code, phone}))
      const result = yield take([ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST + ApiActionTypes.SUCCESS, ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST + ApiActionTypes.FAIL])
      if (result.type === ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST + ApiActionTypes.SUCCESS) {
         const cb = yield select((state: IRootState) => state.registrationPhone.cb)
        cb(phone)
        yield put(modalClose())

      }

    })

}

export default registrationPhoneSaga
