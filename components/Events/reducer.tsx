import ApiActionTypes from "constants/api";
import {IEvent, IEventExpense, IProfileTab, SkillData, SkillListItem} from "types";
import ActionTypes from "./const";
import {format} from 'date-fns'
import cookie from "js-cookie";
import {getEventBorderColor, getEventColor} from 'utils/event'
export interface EventsState {
  list: IEvent[],
  listCalendar: IEvent[],
  mapCalendarColorStatus: any
  listSideBar: IEvent[],
  currentEventExpenses: IEventExpense[],
  currentEventActualExpenses: IEventExpense[]
  total: number
  page: number
  currentEvent?: IEvent,
  isCurrentEventEditMode: boolean,
  currentProfileTab?: IProfileTab,
  formIsSuccess: boolean
  formError: string,
  listLoading: boolean,
  listCalendarLoading: boolean,
  listSidebarLoading: boolean,
  currentLoading: boolean
  formLoading: boolean,
  submitEvent: string

}

const initialState: EventsState = {
  list: [],
  listCalendar: [],
  listSideBar: [],
  mapCalendarColorStatus: {},
  currentEventExpenses: [],
  currentEventActualExpenses: [],
  isCurrentEventEditMode: false,
  total: 0,
  page: 1,
  formIsSuccess: false,
  formError: '',
  formLoading: false,
  listLoading: false,
  listCalendarLoading: false,
  listSidebarLoading: false,
  currentLoading: false,
  submitEvent: null
}

const formatEvent = (event) => {
  if(event.id === 16){
    console.log("EVENTFORMAT", event, {
      actualStart: new Date(event.actualStart || event.start),
      actualEnd: new Date(event.actualEnd || event.end),
    })
  }
  return {
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
    actualStart: new Date(event.actualStart || event.start),
    actualEnd: new Date(event.actualEnd || event.end),
  }
}
const getEventDots = (events) => {
  const map = {};
  for(const event of events) {
    const key = format(event.start, 'yyyyMMdd');
    if (!map[key]) {
      map[key] = []
    }

    map[key].push({id: event.id, color: getEventColor(event, {isOtherSide: true})});
  }

  return map;
}
export default function EventsReducer(state = {...initialState}, action) {
  console.log("NEWACTION RED", action.type)
  switch(action.type) {
    case ActionTypes.RESET_EVENT_FORM:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = false;
      state.currentEventExpenses = [];
      state.currentEventActualExpenses = [];
      state.submitEvent = null;
      state.isCurrentEventEditMode = false;
      break
    case ActionTypes.CURRENT_EVENT_SET_EDIT_MODE:
      state.isCurrentEventEditMode = true;
      break;
    case ActionTypes.SET_SUBMIT_EVENT:
      state.submitEvent = action.payload.submitEvent;
      break
    case ActionTypes.CREATE_EVENT_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.CREATE_EVENT_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.list = [...state.list, formatEvent(action.payload)]
      state.listSideBar = [...state.listSideBar, formatEvent(action.payload)]
      state.listCalendar = [...state.listCalendar, formatEvent(action.payload)]
      state.mapCalendarColorStatus = getEventDots(state.listCalendar);
      break
    case ActionTypes.CREATE_EVENT_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.UPDATE_EVENT:
      state.list = state.list.map(item => (item.id === action.payload.event.id ? {...item, ...action.payload.data} : item));
      state.listSideBar = state.listSideBar.map(item => (item.id === action.payload.event.id ? {...item, ...action.payload.data} : item));
      state.listCalendar = state.listCalendar.map(item => (item.id === action.payload.event.id ? {...item, ...action.payload.data} : item));
      state.mapCalendarColorStatus = getEventDots(state.listCalendar);
      break
    case ActionTypes.UPDATE_EVENT_CANCEL:
      state.list = state.list.map(item => (item.id === action.payload.event.id ? {...item, ...action.payload.event} : item));
      state.listSideBar = state.listSideBar.map(item => (item.id === action.payload.event.id ? {...item, ...action.payload.event} : item));
      state.listCalendar = state.listCalendar.map(item => (item.id === action.payload.event.id ? {...item, ...action.payload.event} : item));
      state.mapCalendarColorStatus = getEventDots(state.listCalendar);
      break
    case ActionTypes.UPDATE_EVENT_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.SEND_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.DRAFT_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.CONFIRM_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.APPROVE_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.REJECT_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.DECLINE_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.COMPLETE_EVENT_REQUEST + ApiActionTypes.SUCCESS:
    case ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      state.currentEvent = {...state.currentEvent, ...action.payload}
      state.listSideBar = !state.listSideBar.find(item => item.id === action.payload.id) ?  [... state.listSideBar, formatEvent(action.payload)] : state.listSideBar;
      state.list = state.list.map(item => item.id === action.payload.id ? (formatEvent({...item, ...action.payload})) : item);
      state.listSideBar = state.listSideBar.map(item => item.id === action.payload.id ? (formatEvent({...item, ...action.payload})) : item);
      state.listCalendar = state.listCalendar.map(item => item.id === action.payload.id ? (formatEvent({...item, ...action.payload})) : item);
      state.mapCalendarColorStatus = getEventDots(state.listCalendar);
      break
    case ActionTypes.UPDATE_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.SEND_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.DRAFT_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.CONFIRM_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.REJECT_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.APPROVE_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.DECLINE_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.COMPLETE_EVENT_REQUEST + ApiActionTypes.FAIL:
    case ActionTypes.EDIT_EVENT_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break
    case ActionTypes.DELETE_EVENT_REQUEST:
      state.formError = ''
      state.formIsSuccess = false;
      state.formLoading = true;
      break
    case ActionTypes.DELETE_EVENT_REQUEST + ApiActionTypes.SUCCESS:
      state.formError = ''
      state.formIsSuccess = true;
      state.formLoading = false;
      if(action.payload.isDeleted){
        state.list = state.list.filter(item => item.id !== action.payload.id);
        state.listSideBar = state.listSideBar.filter(item => item.id !== action.payload.id);
        state.listCalendar = state.listCalendar.filter(item => item.id !== action.payload.id);
      }else{
        state.currentEvent = {...state.currentEvent, ...action.payload}
        state.listSideBar = !state.listSideBar.find(item => item.id === action.payload.id) ?  [... state.listSideBar, formatEvent(action.payload)] : state.listSideBar;
        state.list = state.list.map(item => item.id === action.payload.id ? (formatEvent({...item, ...action.payload})) : item);
        state.listSideBar = state.listSideBar.map(item => item.id === action.payload.id ? (formatEvent({...item, ...action.payload})) : item);
        state.listCalendar = state.listCalendar.map(item => item.id === action.payload.id ? (formatEvent({...item, ...action.payload})) : item);
        state.mapCalendarColorStatus = getEventDots(state.listCalendar);
      }
      break
    case ActionTypes.DELETE_EVENT_REQUEST + ApiActionTypes.FAIL:
      state.formError = action.payload.error || action.payload.errors || 'Unknow error' || 'Unknown error'
      state.formIsSuccess = false;
      state.formLoading = false;
      break

    case ActionTypes.FETCH_EVENT_LIST_REQUEST:
      state.listLoading = true;
      break
    case ActionTypes.FETCH_EVENT_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.list = action.payload.data.map(item => formatEvent(item));
      state.total = action.payload.total
      state.listLoading = false;
      break
    case ActionTypes.FETCH_EVENT_LIST_REQUEST + ApiActionTypes.FAIL:
      state.listLoading = false;
      break

    case ActionTypes.FETCH_EVENT_CALENDAR_LIST_REQUEST:
      state.listCalendarLoading = true;
      break
    case ActionTypes.FETCH_EVENT_CALENDAR_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.listCalendar = action.payload.data.map(item => formatEvent(item));
      state.mapCalendarColorStatus = getEventDots(state.listCalendar);
      state.listCalendarLoading = false;
      break
    case ActionTypes.FETCH_EVENT_CALENDAR_LIST_REQUEST + ApiActionTypes.FAIL:
      state.listCalendarLoading = false;
      break

    case ActionTypes.FETCH_EVENT_SIDEBAR_LIST_REQUEST:
      state.listSidebarLoading = true;
      break
    case ActionTypes.FETCH_EVENT_SIDEBAR_LIST_REQUEST + ApiActionTypes.SUCCESS:
      state.listSideBar = action.payload.data.map(item => formatEvent(item));
      state.listSidebarLoading = false;
      break
    case ActionTypes.FETCH_EVENT_SIDEBAR_LIST_REQUEST + ApiActionTypes.FAIL:
      state.listSidebarLoading = false;
      break

    case ActionTypes.FETCH_EVENT_ONE_REQUEST:
      state.currentLoading = true;
      break
    case ActionTypes.FETCH_EVENT_ONE_REQUEST + ApiActionTypes.SUCCESS:
      state.currentEvent = action.payload
      state.currentLoading = false;
      break
    case ActionTypes.FETCH_EVENT_ONE_REQUEST + ApiActionTypes.FAIL:
      state.currentLoading = false;
      break

    case ActionTypes.RESET_EVENT_LIST:
      state.listLoading = false;
      state.total = 0;
      state.page = 1;
      state.list = [];
      break
    case ActionTypes.UPDATE_EVENT_EXPENSES:
      if(action.payload.type === 'actual'){
        state.currentEventActualExpenses = action.payload.data;
      }else{
        state.currentEventExpenses = action.payload.data;
      }
      break;

  }

  return state
}
