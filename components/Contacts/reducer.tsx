import ApiActionTypes from "constants/api";
import {IProfileGalleryItem, IProfileTab, ProfileData, SkillData, SkillListItem} from "types";
import ActionTypes from './const'

export interface ContactsState {
  list: ProfileData[],
  page: number
  total: number
  listLoading: boolean,
}

const initialState: ContactsState = {
  list: [],
  total: 0,
  page: 1,
  listLoading: false,
}

export default function ContactsReducer(state = {...initialState}, action) {
  switch(action.type) {

    case ActionTypes.FETCH_MESSAGES_CONTACT_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_MESSAGES_CONTACT_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data];
      state.total = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_MESSAGES_CONTACT_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.RESET_MESSAGES_CONTACT_LIST:
      state.listLoading = false;
      state.total = 0;
      state.page = 1;
      state.list = [];
      break
    case ActionTypes.SET_MESSAGES_CONTACT_PAGE:
      state.page = action.payload;
      break
  }

  return state
}
