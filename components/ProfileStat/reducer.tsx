import ApiActionTypes from "constants/api";
import {IProfilePortfolio, IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
export interface ProfileStatState {
  list: SkillData[],
  isLoading: boolean
}

const initialState: ProfileStatState = {
  list: [],
  isLoading: false

}

export default function ProfileStatReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_PROFILE_STAT_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_STAT_REQUEST + ApiActionTypes.SUCCESS:
      state.list = action.payload;
      state.isLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_STAT_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break

  }

  return state
}