import ApiActionTypes from "constants/api";
import { formatSkillList } from "utils/skills";
import ActionTypes from "./const";
import cookie from "js-cookie";
import {parse, format} from 'date-fns'
import { FullProfileData, SkillData } from "types";

export interface PublicProfileState {
  profile: any
  loading: boolean
  skills: any[]
}

const initialState: PublicProfileState = {
  loading: false,
  profile: {},
  skills: []
}

export default function ProfileReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_PROFILE_BY_ID:
      state.loading = true;
      break
    case ActionTypes.FETCH_PROFILE_BY_ID + ApiActionTypes.SUCCESS:
      state.profile = {...action.payload}
      state.skills = formatSkillList(action.payload.skills)
      console.log("skills",   state.skills);
      state.loading = false;
      break
    case ActionTypes.FETCH_PROFILE_BY_ID + ApiActionTypes.FAIL:
      state.loading = false;
      break
}
return state
}
