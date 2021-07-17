import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface registrationPhoneSubmitData{
  phone: string,
  password?: string
}

interface changePhoneSubmitData{
  newPhone: string,
  password?: string
}
export const registrationPhoneSubmit = (data: registrationPhoneSubmitData) => action(ActionTypes.REGISTRATION_PHONE_SUBMIT, data)
export const registrationPhoneSubmitRequest = (data: registrationPhoneSubmitData) => action(ActionTypes.REGISTRATION_PHONE_SUBMIT_REQUEST, {
  api: {
    url: `/api/auth/register`,
    method: 'POST',
    data
  },
})

export const registrationPhoneChange = (data: changePhoneSubmitData) => action(ActionTypes.REGISTRATION_PHONE_CHANGE, data)
export const registrationPhoneChangeRequest = (data: changePhoneSubmitData) => action(ActionTypes.REGISTRATION_PHONE_CHANGE_REQUEST, {
  api: {
    url: `/api/auth/phoneChange`,
    method: 'POST',
    data
  },
})


export const registrationPhoneSetCallback = (cb: (phone) => void) => action(ActionTypes.REGISTRATION_PHONE_SET_CALLBACK, cb)
export const registrationPhoneReset = () => action(ActionTypes.REGISTRATION_PHONE_RESET)
export const registrationPhoneConfirm = ({code}) => action(ActionTypes.REGISTRATION_PHONE_CONFIRM, {code})
export const registrationPhoneChangeConfirmRequest = ({phone, code}) => action(ActionTypes.REGISTRATION_PHONE_CHANGE_CONFIRM_REQUEST, {
  api: {
    url: `/api/auth/phoneChangeConfirmation`,
    method: 'POST',
    data: {
      phone,
      code
    },
  },
})
