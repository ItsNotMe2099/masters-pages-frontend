import {IEvent, IEventExpense, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IEventList{
  start: string,
  end: string,
  page?: number
  limit?: number
}
export const resetEventForm = () => action(ActionTypes.RESET_EVENT_FORM)


export const updateEventExpenses = (type, data: IEventExpense[]) => action(ActionTypes.UPDATE_EVENT_EXPENSES, {type, data})

export const createEvent = (data: IEvent, formKey?: string) => action(ActionTypes.CREATE_EVENT, { data, formKey})
export const createEventRequest = (data: IEvent) => action(ActionTypes.CREATE_EVENT_REQUEST, {
  api: {
    url: `/api/event`,
    method: 'POST',
    data: {...data},
  }
})
export const submitEvent = (event: IEvent, data: IEvent, formKey?: string) => action(ActionTypes.SUBMIT_EVENT, { event, data, formKey})

export const updateEvent = (event: IEvent, data: IEvent, formKey?: string) => action(ActionTypes.UPDATE_EVENT, { event, data, formKey})
export const updateEventRequest = (id: number, data: IEvent) => action(ActionTypes.UPDATE_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const updateEventCancel = (event: IEvent) => action(ActionTypes.UPDATE_EVENT_CANCEL, { event })

export const fetchEventList = (data: IEventList) => action(ActionTypes.FETCH_EVENT_LIST_REQUEST, {
  api: {
    url: `/api/event?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchEventCalendarList = (data: IEventList) => action(ActionTypes.FETCH_EVENT_CALENDAR_LIST_REQUEST, {
  api: {
    url: `/api/event?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchEventSidebar = (data: IEventList) => action(ActionTypes.FETCH_EVENT_SIDEBAR_LIST_REQUEST, {
  api: {
    url: `/api/event?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchEvent = (id: number) => action(ActionTypes.FETCH_EVENT_ONE_REQUEST, {
  api: {
    url: `/api/event/${id}`,
    method: 'GET',
  }
})
export const deleteEvent = (id: number) => action(ActionTypes.DELETE_EVENT, { id})
export const deleteEventRequest = (id: number) => action(ActionTypes.DELETE_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}`,
    method: 'DELETE'
  }
})
export const setSubmitEvent = (submitEvent: string) => action(ActionTypes.SET_SUBMIT_EVENT, { submitEvent})

export const sendEventRequest = (id: number) => action(ActionTypes.SEND_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/send`,
    method: 'GET'
  }
})

export const draftEventRequest = (id: number) => action(ActionTypes.DRAFT_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/draft`,
    method: 'GET'
  }
})

export const confirmEventRequest = (id: number) => action(ActionTypes.CONFIRM_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/confirm`,
    method: 'GET'
  }
})

export const editEventRequest = (id: number) => action(ActionTypes.EDIT_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/edit`,
    method: 'GET'
  }
})

export const approveEventRequest = (id: number) => action(ActionTypes.APPROVE_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/approve`,
    method: 'GET'
  }
})

export const rejectEventRequest = (id: number) => action(ActionTypes.REJECT_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/reject`,
    method: 'GET'
  }
})


export const declineEventRequest = (id: number) => action(ActionTypes.DECLINE_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/decline`,
    method: 'GET'
  }
})

export const completeEventRequest = (id: number) => action(ActionTypes.COMPLETE_EVENT_REQUEST, {
  api: {
    url: `/api/event/${id}/complete`,
    method: 'GET'
  }
})


export const resetEventList = () => action(ActionTypes.RESET_EVENT_LIST)
export const currentEventSetEditMode = () => action(ActionTypes.CURRENT_EVENT_SET_EDIT_MODE)
export const setCurrentEventNext = () => action(ActionTypes.SET_CURRENT_EVENT_NEXT)
export const setCurrentEventPrevious = () => action(ActionTypes.SET_CURRENT_EVENT_PREVIOUS)
