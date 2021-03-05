import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface SetPushTokenData{
  platform: string,
  pushToken: string
  deviceId: string
}
export const setPushToken = ({pushToken}) => action(ActionTypes.SET_PUSH_TOKEN, {pushToken})
export const setPushTokenRequest = (data: SetPushTokenData) => action(ActionTypes.SET_PUSH_TOKEN_REQUEST, {
  api: {
    url: `/api/auth/device`,
    method: 'POST',
    data
  },
})

export const deleteDeviceRequest = (deviceId) => action(ActionTypes.DELETE_DEVICE_REQUEST, {
  api: {
    url: `/api/auth/device/${deviceId}`,
    method: 'DELETE'
  },
})
