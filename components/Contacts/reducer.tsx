import ApiActionTypes from "constants/api";
import {IProfileGalleryItem, IProfileTab, ProfileData, SkillData, SkillListItem} from "types";
import ActionTypes from './const'

export interface ContactsState {
  list: ProfileData[],
  contactsList: any[]
  page: number
  total: number
  totalContacts: number
  listLoading: boolean,
  contactsListLoading: boolean,
}

const initialState: ContactsState = {
  list: [],
  contactsList: [],
  totalContacts: 0,
  total: 0,
  page: 1,
  listLoading: false,
  contactsListLoading: false
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

    case ActionTypes.FETCH_CONTACT_LIST:
      state.contactsListLoading = true;
      break
    case ActionTypes.FETCH_CONTACT_LIST + ApiActionTypes.SUCCESS:
      state.contactsList = [...state.list, ...action.payload.data];
      state.totalContacts = action.payload.total
      state.contactsListLoading = false;
      break
    case ActionTypes.FETCH_CONTACT_LIST + ApiActionTypes.FAIL:
      state.contactsListLoading = false;
      break

    case ActionTypes.RESET_MESSAGES_CONTACT_LIST:
      state.listLoading = false;
      state.total = 0;
      state.page = 1;
      state.list = [];
      break

    case ActionTypes.RESET_PROFILE_CONTACT_LIST:
      state.contactsListLoading = false;
      state.totalContacts = 0;
      state.contactsList = [];
      break

    case ActionTypes.SET_MESSAGES_CONTACT_PAGE:
      state.page = action.payload;
      break
  }

  return state
}
