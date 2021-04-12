import ApiActionTypes from "constants/api";
import {ProfileWorkExperience, SkillData, SkillListItem} from "types";
import { formatSkillList } from "utils/skills";
import ActionTypes from "./const";
export interface ProfileWorkExperienceState {
  list: ProfileWorkExperience[],
  listTotal: number,
  currentProfileWorkExperience?: ProfileWorkExperience,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: ProfileWorkExperienceState = {
  list: [],
  listTotal: 0,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

export default function ProfileWorkExperienceReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_WORK_EXPERIENCE_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = [action.payload, ...state.list];
      break
    case ActionTypes.CREATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.map(item => item.id === action.payload.id ? ({...item, ...action.payload}) : item);
      break
    case ActionTypes.UPDATE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.filter(item => item.id !== action.payload.id);
      break
    case ActionTypes.DELETE_WORK_EXPERIENCE_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE_LIST + ApiActionTypes.SUCCESS:
      state.list = action.payload.data
      state.listTotal = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE + ApiActionTypes.SUCCESS:
      state.currentProfileWorkExperience = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_WORK_EXPERIENCE + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break
  }

  return state
}
