import { socketConnecting, socketDisconnected } from 'actions/socketActions'
import io from 'socket.io-client'
import { eventChannel, END } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'

import SocketActionTypes from '../../constants/socket'
import ChatActionTypes from './const'
import { chatLogout, newChatMessage } from './actions'


function connect() {
  const socket = io(`${process.env.NEXT_PUBLIC_API_URL || ''}`, {
    path: '/api/chat-socket',
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })
  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      resolve(socket)
    })
    socket.on('reconnect_failed', (err: any) => {
      reject(new Error('ws:reconnect_failed '))
    })
  }).then(
    response => ({ socket: response })
  ).catch(
    error => ({ socket, error })
  )
}

function subscribe(socket: SocketIOClient.Socket) {
  return eventChannel(emit => {
    socket.on('message', (data: any) => {
    })
    socket.on('chat:message', (data: any) => {
      emit(newChatMessage(data))
    })

    socket.on('disconnect', (e: any) => {
      emit(END)
    })
    return () => {
    }
  })
}

function* read(socket: SocketIOClient.Socket) {
  const channel = yield call(subscribe, socket)

  try {
    while (true) {
      const action = yield take(channel)
      yield put(action)
    }
  } finally {
    yield put(socketDisconnected())
  }
}

function* write(socket: SocketIOClient.Socket) {
  try {
    while (true) {
      const { payload } = yield take(SocketActionTypes.SOCKET_SEND_MESSAGE)
      socket.emit(payload.type, payload.data)
    }
  } catch (e) {
    //return
  }
}

function* handleIO(socket: SocketIOClient.Socket) {
  yield fork(read, socket)
  yield fork(write, socket)
}

function* flow({ chatId }: any) {
  try {
    while (true) {
      yield put(socketConnecting({ connecting: true }))
      const { socket, error } = yield call(connect)
      yield put(socketConnecting({ connecting: false }))

      if (error) {
        yield call([socket, socket.disconnect])
        yield put(chatLogout())
        break
      }

      if (socket) {
        const startTime = new Date()
        socket.emit('chat:join', {
          chatId,
        })

        const task = yield fork(handleIO, socket)

        const action = yield take([ChatActionTypes.CHAT_LOGOUT, SocketActionTypes.SOCKET_DISCONNECTED])
        yield cancel(task)
        socket.emit('chatLogout', { chatId })
        yield call([socket, socket.disconnect])
        if (action.type === SocketActionTypes) {
          break
        }
      }
    }
  } finally {

  }
}

export default function* ChatSocketSaga() {
  let myFlow
  while (true) {
    const { payload } = yield take(`${ChatActionTypes.CHAT_LOGIN}`)
    if (myFlow) {
      yield cancel(myFlow)
    }
    myFlow = yield fork(flow, payload)
  }
}
