import ApiActionTypes from 'constants/api'
import {IProfilePortfolio, IProfileTab} from 'types'
import ActionTypes from './const'
export interface ProfilePortfolioState {
  list: IProfilePortfolio[],
  total: number
  page: number
  currentProfilePortfolio?: IProfilePortfolio,
  currentProfileTab?: IProfileTab,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
}

const initialState: ProfilePortfolioState = {
  list: [],
  total: 0,
  page: 1,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  currentLoading: false,
}

export default function ProfilePortfolioReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.RESET_PROFILE_PORTFOLIO_FORM:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = false
      break
    case ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = true
      break
    case ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true
      state.formLoading = false
      const shouldAdd = !state.currentProfileTab || state.currentProfileTab?.id === action.payload.profileTabId

      state.list = shouldAdd ? [action.payload, ...state.list] : state.list

      if(shouldAdd){
        state.total++
      }
      break
    case ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false
      state.formLoading = false
      break
    case ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = true
      break
    case ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true
      state.formLoading = false
      state.list = state.list.map(item => item.id === action.payload.id ? ({...item, ...action.payload}) : item)
      if(state.currentProfileTab){
        state.list = state.list.filter(i => i.profileTabId === state.currentProfileTab?.id)
      }
      break
    case ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false
      state.formLoading = false
      break
    case ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST:
      state.formError = ''
      state.formIsSuccess = false
      state.formLoading = true
      break
    case ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true
      state.formLoading = false
      state.list = state.list.filter(item => item.id !== action.payload.id)
      break
    case ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false
      state.formLoading = false
      break

    case ActionTypes.FETCH_PROFILE_PORTFOLIO_LIST:
      state.listLoading = true
      break
    case ActionTypes.FETCH_PROFILE_PORTFOLIO_LIST + ApiActionTypes.SUCCESS:
      state.list = [...state.list, ...action.payload.data]
      state.total = action.payload.total
      state.listLoading = false
      break
    case ActionTypes.FETCH_PROFILE_PORTFOLIO_LIST + ApiActionTypes.FAIL:
      state.listLoading = false
      break

    case ActionTypes.FETCH_PROFILE_PORTFOLIO:
      state.currentLoading = true
      break
    case ActionTypes.FETCH_PROFILE_PORTFOLIO + ApiActionTypes.SUCCESS:
      state.currentProfilePortfolio = action.payload
      state.currentLoading = false
      break
    case ActionTypes.FETCH_PROFILE_PORTFOLIO + ApiActionTypes.FAIL:
      state.currentLoading = false
      break

    case ActionTypes.SET_PROFILE_PORTFOLIO_TAB:
      state.currentProfileTab = action.payload.tab
      break
    case ActionTypes.RESET_PROFILE_PORTFOLIO_LIST:
      state.listLoading = false
      state.total = 0
      state.page = 1
      state.list = []
      break
    case ActionTypes.SET_PROFILE_PORTFOLIO_PAGE:
      state.page = action.payload
      break
  }

  return state
}
