import ApiActionTypes from "constants/api";
import {IProfileGalleryItem, IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
export interface ProfileGalleryState {
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

const initialState: ProfileGalleryState = {
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

export default function ProfileGalleryReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_PROFILE_GALLERY_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.CREATE_PROFILE_GALLERY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      console.log("CreateGallerySuccess", state.currentProfileTab, state.currentProfileTab?.id , action.payload.profileTabId)
      const shouldAdd = !state.currentProfileTab || state.currentProfileTab?.id === action.payload.profileTabId;
      state.list = shouldAdd ? [action.payload, ...state.list] : state.list;
      if(shouldAdd){
        state.total++;
      }
      break
    case ActionTypes.CREATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.map(item => item.id === action.payload.id ? ({...item, ...action.payload}) : item);
      break
    case ActionTypes.UPDATE_PROFILE_GALLERY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_PROFILE_GALLERY_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_PROFILE_GALLERY_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = state.list.filter(item => item.id !== action.payload.id);
      break
    case ActionTypes.DELETE_PROFILE_GALLERY_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_GALLERY_LIST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_GALLERY_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data];
      state.total = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_GALLERY_LIST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_GALLERY:
      state.currentItemLoading = true;

      break
    case ActionTypes.FETCH_PROFILE_GALLERY + ApiActionTypes.SUCCESS:
      state.currentItem = action.payload
      state.currentItemLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_GALLERY + ApiActionTypes.FAIL:
      state.currentItemLoading = false;
      break

    case ActionTypes.FETCH_PROFILE_GALLERY_ITEM_COMMENT_LIST_REQUEST:
      state.currentItemCommentLoading = true;

      break
    case ActionTypes.FETCH_PROFILE_GALLERY_ITEM_COMMENT_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.currentItemCommentList = [...state.currentItemCommentList, ...action.payload.data];
      state.currentItemCommentTotal = action.payload.total
      state.currentItemCommentLoading = false;
      break
    case ActionTypes.FETCH_PROFILE_GALLERY_ITEM_COMMENT_LIST_REQUEST + ApiActionTypes.FAIL:
      state.currentItemCommentLoading = false;
      break

    case ActionTypes.SET_PROFILE_GALLERY_TAB:
      state.currentProfileTab = action.payload.tab;
      break
    case ActionTypes.RESET_PROFILE_GALLERY_LIST:
      state.listLoading = false;
      state.total = 0;
      state.page = 1;
      state.list = [];
      break
    case ActionTypes.SET_PROFILE_GALLERY_ITEM_COMMENT_PAGE:
      state.currentItemCommentPage = action.payload;
      break
    case ActionTypes.SET_PROFILE_GALLERY_CURRENT:
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
    case ActionTypes.SET_PROFILE_GALLERY_CURRENT_INDEX:
      state.currentItemIndex = action.payload;
      break

    case ActionTypes.CREATE_PROFILE_GALLERY_COMMENT:
      state.commentIsSending = true
      state.commentSentSuccess = false
      state.commentSentError = null
      break

    case ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_SUCCESS:
      state.commentIsSending = false
      state.commentSentSuccess = true
      state.commentSentError = null
      state.currentItemCommentList = [action.payload, ...state.currentItemCommentList]
      state.currentItemCommentTotal++;
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
    case ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_FAIL:
      state.commentIsSending = false
      state.commentSentSuccess = false
      state.commentSentError = action.payload.error || action.payload.errors || 'Unknow error'
      break


    case ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_LIKE_REQUEST:
      state.likeIsSending = true;

      break
    case ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_LIKE_REQUEST + ApiActionTypes.SUCCESS:
      state.likeIsSending = false;
      if(state.currentItem) {
        state.currentItem.likesCount =  state.currentItem.likesCount ? parseInt(state.currentItem.likesCount as string, 10) + 1 : 1;
        state.currentItem.isLiked = true;

      }
      state.list = state.list.map(item =>{
        if(item.id === action.payload.profileGalleryId){
          return {...item, isLiked: true, likesCount: parseInt(item.likesCount as string, 10) + 1}
        }
        return item;
      })
      break
    case ActionTypes.CREATE_PROFILE_GALLERY_COMMENT_LIKE_REQUEST + ApiActionTypes.FAIL:
      state.likeIsSending = false;
      state.likeSentError = action.payload.error || action.payload.errors || 'Unknow error'
      break
  }

  return state
}
