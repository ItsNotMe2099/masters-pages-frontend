import ActionTypes from "./const";

export interface State {
  modalKey: string,
}

const initialState: State = {
  modalKey: ''
}

export default function authReducer(state = {...initialState}, action) {

  switch(action.type) {

  }

  return state
}
