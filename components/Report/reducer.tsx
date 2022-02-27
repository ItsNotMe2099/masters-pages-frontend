import ApiActionTypes from 'constants/api'
import { IReportFilter} from 'types'
import ActionTypes from './const'
export interface ReportState {
  list: any[],
  total: number,
  filter: IReportFilter,
  listLoading: boolean,
  filterLoading: boolean,
}

const initialState: ReportState = {
  list: [],
  total: 0,
  filter: null,
  listLoading: false,
  filterLoading: false
}

export default function ReportReducer(state = {...initialState}, action) {
  switch(action.type) {

    case ActionTypes.FETCH_REPORT:
      state.listLoading = true
      break
    case ActionTypes.FETCH_REPORT + ApiActionTypes.SUCCESS:
      state.list = action.payload.data
      state.total = action.payload.total
      state.listLoading = false
      break
    case ActionTypes.FETCH_REPORT + ApiActionTypes.FAIL:
      state.listLoading = false
      break
    case ActionTypes.FETCH_REPORT_FILTERS:
      state.filterLoading = true
      break
    case ActionTypes.FETCH_REPORT_FILTERS + ApiActionTypes.SUCCESS:
      state.filter = action.payload
      state.listLoading = false
      break
    case ActionTypes.FETCH_REPORT_FILTERS + ApiActionTypes.FAIL:
      state.filterLoading = false
      break

    case ActionTypes.RESET_REPORT:
      state.listLoading = false
      state.filterLoading = false
      state.list = []
      state.filter = null
      break
  }

  return state
}
