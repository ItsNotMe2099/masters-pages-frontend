import ApiActionTypes from 'constants/api'
import {IProfileRecommendation} from 'types'
import ActionTypes from './const'
export interface ProfileRecommendationState {
  list: IProfileRecommendation[],
  listShort: IProfileRecommendation[],
  total: number
  totalShort: number
  page: number
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  listShortLoading: boolean,
  formLoading: boolean,
}

const initialState: ProfileRecommendationState = {
  list: [],
  listShort: [],
  total: 0,
  totalShort: 0,
  page: 1,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  listShortLoading: false,
}

export default function ProfileRecommendationReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = true
      break
    case ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true
      state.formLoading = false

      break
    case ActionTypes.CREATE_PROFILE_RECOMMENDATION_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false
      state.formLoading = false
      break


    case ActionTypes.FETCH_PROFILE_RECOMMENDATION_LIST:
      state.listLoading = true
      break
    case ActionTypes.FETCH_PROFILE_RECOMMENDATION_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data]
      state.total = action.payload.total
      state.listLoading = false
      break
    case ActionTypes.FETCH_PROFILE_RECOMMENDATION_LIST + ApiActionTypes.FAIL:
      state.listLoading = false
      break

    case ActionTypes.FETCH_PROFILE_RECOMMENDATION_SHORT_LIST:
      state.listShortLoading = true
      break
    case ActionTypes.FETCH_PROFILE_RECOMMENDATION_SHORT_LIST + ApiActionTypes.SUCCESS:
      state.listShort = action.payload.data
      state.totalShort = action.payload.total
      state.listShortLoading = false
      break
    case ActionTypes.FETCH_PROFILE_RECOMMENDATION_SHORT_LIST + ApiActionTypes.FAIL:
      state.listShortLoading = false
      break

    case ActionTypes.RESET_PROFILE_RECOMMENDATION_LIST:
      state.listLoading = false
      state.total = 0
      state.page = 1
      state.list = []
      break
    case ActionTypes.SET_PROFILE_RECOMMENDATION_PAGE:
      state.page = action.payload
      break
  }

   return {...state}
}
