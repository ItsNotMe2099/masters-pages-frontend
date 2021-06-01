import ApiActionTypes from "constants/api";
import {IProfileGalleryItem, IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
export interface NewsState {
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

const initialState: NewsState = {
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

export default function NewsReducer(state = {...initialState}, action) {
  switch(action.type) {

  }

  return state
}
