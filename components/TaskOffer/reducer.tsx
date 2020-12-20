import ApiActionTypes from "constants/api";
import { ITask, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";
export interface TaskOfferState {
  formLoading: boolean,
  formError?: string,
  currentTask?: ITask

}

const initialState: TaskOfferState = {
  formLoading: false,

}

export default function TaskOfferReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.TASK_OFFER_SET_CURRENT_TASK:
      console.log("TASK_OFFER_SET_CURRENT_TASK", action.payload)
      state.currentTask = action.payload;
      break
    case ActionTypes.TASK_OFFER_ACCEPT_REQUEST:
      state.formLoading = true;
      break
    case ActionTypes.TASK_OFFER_ACCEPT_REQUEST + ApiActionTypes.SUCCESS:
      state.formLoading = false;
      break
    case ActionTypes.TASK_OFFER_ACCEPT_REQUEST + ApiActionTypes.FAIL:
      state.formLoading = false;
      break

  }

  return state
}
