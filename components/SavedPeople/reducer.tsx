import ApiActionTypes from "constants/api";
import { ISavedPeople } from "types";
import ActionTypes from "./const";
export interface SavedPeopleState {
  list: ISavedPeople[]
}

const initialState: SavedPeopleState = {
  list: []
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_PEOPLE:
      state.list = action.payload
      console.log('working')
      break
  }

  return state
}
