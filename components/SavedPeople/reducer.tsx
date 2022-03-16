import ApiActionTypes from 'constants/api'
import ActionTypes from './const'
export interface SavedPeopleState {
  list: any[]
  listLoading: boolean,
  savingProfileId?: number,
  total: number
  page: number
}

const initialState: SavedPeopleState = {
  list: [],
  listLoading: false,
  total: 0,
  page: 1
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {


    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST:
      state.listLoading = true
      break
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      state.listLoading = false
      state.list = [...state.list, ...action.payload.data]
      state.total = action.payload.total
      break
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST + ApiActionTypes.FAIL:
      state.listLoading = false
      break

    case ActionTypes.SAVE_PEOPLE_REQUEST:
      state.savingProfileId = action.payload.api.data.profileId
      break
    case ActionTypes.SAVE_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      state.savingProfileId = null
      break

    case ActionTypes.SAVE_PEOPLE_REQUEST + ApiActionTypes.FAIL:
      state.savingProfileId = null
      break
    case ActionTypes.RESET_SAVED_PEOPLE_LIST:
      state.listLoading = false
      state.list = []
      state.total = 0
      state.page = 1
      break
  }

   return {...state}
}
