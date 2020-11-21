import ApiActionTypes from "constants/api";
import { SkillData, SkillListItem } from "types";
import ActionTypes from "./const";
import cookie from "js-cookie";
import {parse, format} from 'date-fns'
export interface SkillState {
  list: SkillListItem[],
  currentSkill?: SkillData,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: SkillState = {
  list: [],
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

const formatList = (data) => {
  const categoryMap = {};
  for(const item of data){
    if(!categoryMap[item.categoryId]){
      categoryMap[item.categoryId] = {...item.category, skills: []}
    }
    categoryMap[item.categoryId].skills.push(item);
  }
  const list = []
  for (const [key, value] of Object.entries(categoryMap)) {
    list.push(value);
  }
  return list;
}
export default function ProfileReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_SKILL_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_SKILL_CATEGORY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_SKILL_CATEGORY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_SKILL_CATEGORY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_SKILL_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_SKILL_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_SKILL_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_SKILL_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_SKILL_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_SKILL_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_SKILL_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_SKILL_LIST + ApiActionTypes.SUCCESS:
      state.list = formatList(action.payload)
      state.listLoading = false;
      break
    case ActionTypes.FETCH_SKILL_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_SKILL:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_SKILL + ApiActionTypes.SUCCESS:
      state.currentSkill = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_SKILL + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break
  }

  return state
}
