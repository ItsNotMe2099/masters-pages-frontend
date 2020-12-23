import { setSortProfileSearch } from "components/ProfileSearch/actions";
import ApiActionTypes from "constants/api";
import { ITask, ProfileData, SkillData, SkillListItem } from "types";
import ActionTypes from "./const";

const formatSkillList = (data) => {
  const categoryMap = {};
  for(const item of data){
    if(!categoryMap[item.categoryId]){
      categoryMap[item.categoryId] = {...item.category, skills: []}
    }
    categoryMap[item.categoryId].skills.push(item);
  }
  const list = []
  for (const [key, value] of Object.entries(categoryMap)) {
    list.push(value);
  }
  return list;
}


export interface ProfileSearchState {
  list: ProfileData[],
  listLoading: boolean,
  role: 'master' | 'volunteer'
  currentTask?: ProfileData,
  total: number,
  page: number,
  filter: any,
  useLocationFilter: boolean,
  exactLocation: boolean
  sortType: string,
  sort: string,
  sortOrder?: string
}

const initialState: ProfileSearchState = {
  list: [],
  listLoading: false,
  total: 0,
  page: 1,
  filter: {},
  role: 'master',
  sortType: '',
  sort: 'id',
  sortOrder: 'DESC',
  useLocationFilter: false,
  exactLocation: false
}

export default function ProfileSearchReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case ActionTypes.PROFILE_SEARCH_SET_CURRENT_TASK:
      state.currentTask = action.payload;
      break
    case ActionTypes.FETCH_PROFILE_SEARCH:

      break
    case ActionTypes.PROFILE_SEARCH_SET_PAGE:
      state.page = action.payload
      break
    case ActionTypes.PROFILE_SEARCH_SET_FILTER:
      state.filter = action.payload;
      break
    case ActionTypes.PROFILE_SEARCH_SET_SORT:
      state.sortType = action.payload;
      switch (action.payload) {
        case 'newFirst':
          state.sort = 'id'
          state.sortOrder = 'DESC'

          break;
        case 'highPrice':
          state.sort = 'budget'
          state.sortOrder = 'DESC'

          break;
        case 'lowPrice':
          state.sort = 'budget'
          state.sortOrder = 'ASC'
          break;
      }
      break
    case ActionTypes.PROFILE_SEARCH_SET_USE_LOCATION_FILTER:
      console.log("PROFILE_SEARCH_SET_USE_LOCATION_FILTER", action.payload)
      state.useLocationFilter = action.payload.useFilter;
      state.exactLocation = action.payload.exactLocation;
      break
    case ActionTypes.FETCH_PROFILE_SEARCH_REQUEST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_PROFILE_SEARCH_REQUEST + ApiActionTypes.SUCCESS:
      state.listLoading = false;
      state.list = [...state.list, ...action.payload.data.map((profile) => ({...profile, skills: formatSkillList(profile.skills)}))]
      state.total = action.payload.total
      break
    case ActionTypes.FETCH_PROFILE_SEARCH_REQUEST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break
    case ActionTypes.RESET_PROFILE_SEARCH:
      state.listLoading = false;
      state.list = []
      state.total = 0
      state.page = 1
      break
    case ActionTypes.PROFILE_SEARCH_SET_ROLE:
      console.log("SetRole", action.payload)
        state.role = action.payload;
      break;
  }

  return state
}
