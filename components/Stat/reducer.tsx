import ApiActionTypes from "constants/api";
import {IStat, ITask} from "types";
import ActionTypes from "./const";

export interface StatState {
  stat?: IStat[]
  loading: boolean
}

const initialState: StatState = {
  loading: false,
}

export default function StatReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_STAT_REQUEST:
      state.loading = true;
      break
    case ActionTypes.FETCH_STAT_REQUEST + ApiActionTypes.SUCCESS:
      state.stat = action.payload
      state.loading = false;
      break
    case ActionTypes.FETCH_STAT_REQUEST + ApiActionTypes.FAIL:
      state.loading = false;
      break
}
return state
}
