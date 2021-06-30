import ApiActionTypes from "constants/api";
import {ContactData, IProfileGalleryItem, IProfileTab, ProfileData, SkillData, SkillListItem} from "types";
import ActionTypes from './const'
import FollowerActionTypes from 'components/Follower/const'

export interface ContactsState {
  list: ContactData[],
  page: number
  total: number
  listLoading: boolean,
}

const initialState: ContactsState = {
  list: [],
  total: 0,
  page: 1,
  listLoading: false
}

export default function ContactsReducer(state = {...initialState}, action) {
  switch(action.type) {

    case ActionTypes.FETCH_PROFILE_CONTACT_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_CONTACT_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data];
      state.total = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_CONTACT_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break
    case ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      console.log("Delete success1", action.payload);
      state.list = state.list.filter(item => item.contactProfileId !== action.payload.id)
      break
    case FollowerActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS:
      console.log("Delete success2", action.payload);
      state.list = state.list.filter(item => item.contactProfileId !== action.payload.targetProfileId)
      break
    case ActionTypes.SET_PAGE_PROFILE_CONTACT_LIST:
      state.page = action.payload;
      break

    case ActionTypes.RESET_PROFILE_CONTACT_LIST:
      state.listLoading = false;
      state.total = 0;
      state.list = [];
      state.page = 1;
      break

  }

  return state
}
