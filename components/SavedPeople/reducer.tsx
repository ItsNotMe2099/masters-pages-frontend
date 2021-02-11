import ApiActionTypes from "constants/api";
import ActionTypes from "./const";
export interface SavedPeopleState {
  list: any[]
  isLoading: boolean,
  savingProfileId?: number,
  listTotal: number
}

const initialState: SavedPeopleState = {
  list: [],
  isLoading: false,
  listTotal: 0
}

export default function TaskUserReducer(state = {...initialState}, action) {
  switch(action.type) {
    case ActionTypes.FETCH_SAVED_PEOPLE:

      break

    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST:
      state.isLoading = true;
      break
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      state.isLoading = false;
      state.list = [...state.list, ...action.payload.data]
      state.listTotal = action.payload.total
      console.log('payload data!!!', action.payload.data)
      break
    case ActionTypes.FETCH_SAVED_PEOPLE_REQUEST + ApiActionTypes.FAIL:
      state.isLoading = false;
      break
    case ActionTypes.DELETE_SAVED_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      console.log("Delete success", action.payload);
      state.list = state.list.filter(item => item.id !== action.payload.id)
      break
    case ActionTypes.SAVE_PEOPLE_REQUEST:
      state.savingProfileId = action.payload.api.data.profileId;
      break;
    case ActionTypes.SAVE_PEOPLE_REQUEST + ApiActionTypes.SUCCESS:
      state.savingProfileId = null;
      break;

    case ActionTypes.SAVE_PEOPLE_REQUEST + ApiActionTypes.FAIL:
      state.savingProfileId = null;
      break;
    case ActionTypes.RESET_SAVED_PEOPLE_LIST:
      state.isLoading = false;
      state.list = []
      state.listTotal = 0
      break
  }

  return state
}
