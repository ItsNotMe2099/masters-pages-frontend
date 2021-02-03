
import SocketActionTypes from "constants/socket";
import { action } from 'typesafe-actions'
export const sendMessage = (type: string , payload: any = {}) => action(SocketActionTypes.SOCKET_SEND_MESSAGE, {type, data: payload})
export const socketDisconnected = () => action(SocketActionTypes.SOCKET_DISCONNECTED)
export const socketConnecting = (payload: { connecting: boolean }) => action(SocketActionTypes.SOCKET_CONNECTING, payload)

