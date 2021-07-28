import ApiActionTypes from "constants/api";
import {IProfileGalleryItem, IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
export interface PostState {
  list: IProfileGalleryItem[],
  currentItem: IProfileGalleryItem
  currentItemIndex: number
  currentItemCommentList: any[],
  currentItemCommentTotal: number,
  currentItemCommentLoading: boolean,
  currentItemCommentPage: number
  commentIsSending: boolean,
  commentSentSuccess: boolean,
  commentSentError: any,

  likeIsSending: boolean
  likeSentError: any,

  page: number
  total: number
  currentProfileTab?: IProfileGalleryItem,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentItemLoading: boolean
  formLoading: boolean,
}

const initialState: PostState = {
  list: [],
  total: 0,
  page: 1,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentItem: null,
  currentItemIndex: 0,
  currentItemLoading: false,
  currentItemCommentList: [],
  currentItemCommentTotal: 0,
  currentItemCommentPage: 1,
  currentItemCommentLoading: false,

  commentIsSending: false,
  commentSentSuccess: false,
  commentSentError: null,

  likeIsSending: false,
  likeSentError: null
}

export default function PostReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_POST_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_POST_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_POST_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = !state.currentProfileTab || state.currentProfileTab?.id === action.payload.profileTabId ? [action.payload, ...state.list] : state.list;
      break
    case ActionTypes.CREATE_POST_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_POST_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_POST_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.map(item => item.id === action.payload.id ? ({...item, ...action.payload}) : item);
      break
    case ActionTypes.UPDATE_POST_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_POST_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_POST_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.filter(item => item.id !== action.payload.id);
      break
    case ActionTypes.DELETE_POST_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_POST_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_POST_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data];
      state.total = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_POST_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_POST:
      state.currentItemLoading = true;

      break
    case ActionTypes.FETCH_POST + ApiActionTypes.SUCCESS:
      state.currentItem = action.payload
      state.currentItemLoading = false;
      break
    case ActionTypes.FETCH_POST + ApiActionTypes.FAIL:
      state.currentItemLoading = false;
      break

    case ActionTypes.FETCH_POST_ITEM_COMMENT_LIST_REQUEST:
      state.currentItemCommentLoading = true;

      break
    case ActionTypes.FETCH_POST_ITEM_COMMENT_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.currentItemCommentList = [...state.currentItemCommentList, ...action.payload.data];
      state.currentItemCommentTotal = action.payload.total
      state.currentItemCommentLoading = false;
      break
    case ActionTypes.FETCH_POST_ITEM_COMMENT_LIST_REQUEST + ApiActionTypes.FAIL:
      state.currentItemCommentLoading = false;
      break

    case ActionTypes.SET_POST_TAB:
      state.currentProfileTab = action.payload.tab;
      break
    case ActionTypes.RESET_POST_LIST:
      state.listLoading = false;
      state.total = 0;
      state.page = 1;
      state.list = [];
      break
    case ActionTypes.SET_POST_ITEM_COMMENT_PAGE:
      state.currentItemCommentPage = action.payload;
      break
    case ActionTypes.SET_POST_CURRENT:
      state.currentItem = action.payload;
      state.currentItemCommentList = [];
      state.currentItemCommentTotal = 0;
      state.currentItemCommentLoading = false;
      state.currentItemCommentPage = 1;
      state.likeIsSending = false;
      state.likeSentError = null;
      state.commentIsSending = false
      state.commentSentSuccess = false
      state.commentSentError = null
      break
    case ActionTypes.SET_POST_CURRENT_INDEX:
      state.currentItemIndex = action.payload;
      break

    case ActionTypes.CREATE_POST_COMMENT:
      state.commentIsSending = true
      state.commentSentSuccess = false
      state.commentSentError = null
      break

    case ActionTypes.CREATE_POST_COMMENT_SUCCESS:
      state.commentIsSending = false
      state.commentSentSuccess = true
      state.commentSentError = null
      state.currentItemCommentList = [action.payload, ...state.currentItemCommentList]
      if(state.currentItem) {
        state.currentItem.commentsCount = parseInt(state.currentItem.commentsCount as string, 10)  + 1;
      }
      state.list = state.list.map(item =>{
        if(item.id === action.payload.profileGalleryId){
          return {...item, commentsCount: parseInt(item.commentsCount as string, 10) + 1}
        }
        return item;
      })

      break
    case ActionTypes.CREATE_POST_COMMENT_FAIL:
      state.commentIsSending = false
      state.commentSentSuccess = false
      state.commentSentError = action.payload.error || action.payload.errors || 'Unknow error'
      break


    case ActionTypes.CREATE_POST_COMMENT_LIKE_REQUEST:
      state.likeIsSending = true;

      break
    case ActionTypes.CREATE_POST_COMMENT_LIKE_REQUEST + ApiActionTypes.SUCCESS:
      state.likeIsSending = false;
      if(state.currentItem) {
        state.currentItem.likesCount =  parseInt(state.currentItem.likesCount as string, 10) + 1;
      }
      state.list = state.list.map(item =>{
        if(item.id === action.payload.profileGalleryId){
          return {...item, likesCount: parseInt(item.likesCount as string, 10) + 1}
        }
        return item;
      })
      break
    case ActionTypes.CREATE_POST_COMMENT_LIKE_REQUEST + ApiActionTypes.FAIL:
      state.likeIsSending = false;
      state.likeSentError = action.payload.error || action.payload.errors || 'Unknow error'
      break
  }

  return state
}
