import ApiActionTypes from "constants/api";
import {IProfileGalleryItem, IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
export interface FollowerState {
  list: IProfileGalleryItem[],
  currentItem: IProfileGalleryItem

  page: number
  total: number
  currentProfileTab?: IProfileGalleryItem,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentItemLoading: boolean
  formLoading: boolean,
  isSubscribed: boolean
}

const initialState: FollowerState = {
  list: [],
  total: 0,
  page: 1,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentItem: null,
  currentItemLoading: false,
  isSubscribed: false

}

export default function FollowerReducer(state = {...initialState}, action) {
  switch(action.type) {

    case ActionTypes.SET_FOLLOWER_PAGE:
      state.page = action.payload.page
      break
    case ActionTypes.CREATE_FOLLOWER_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.isSubscribed = true;
      state.list = !state.currentProfileTab || state.currentProfileTab?.id === action.payload.profileTabId ? [action.payload, ...state.list] : state.list;
      break
    case ActionTypes.CREATE_FOLLOWER_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.DELETE_FOLLOWER_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.filter(item => item.id !== action.payload.id);
      break
    case ActionTypes.DELETE_FOLLOWER_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_FOLLOWER_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_FOLLOWER_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data];
      state.total = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_FOLLOWER_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_FOLLOWER:
      state.currentItemLoading = true;

      break
    case ActionTypes.FETCH_FOLLOWER + ApiActionTypes.SUCCESS:
      state.currentItem = action.payload
      state.currentItemLoading = false;
      break
    case ActionTypes.FETCH_FOLLOWER + ApiActionTypes.FAIL:
      state.currentItemLoading = false;
      break

    case ActionTypes.RESET_FOLLOWER_LIST:
      state.listLoading = false;
      state.total = 0;
      state.page = 1;
      state.list = [];
      break

  }

  return state
}
