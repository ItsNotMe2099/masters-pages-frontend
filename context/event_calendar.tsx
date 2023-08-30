import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {useAppContext} from './state'
import {Views, View} from 'react-big-calendar'
import {endOfWeek, startOfWeek, addDays, format, subDays} from 'date-fns'
import {IPagination} from 'types/types'
import {useRouter} from 'next/router'
import {IEvent, IRootState} from "types";
import EventRepository from "data/repositories/EventRepository";
import {IEventListRequest, IEventNearestListRequest} from "data/intefaces/IEventListRequest";
import {getEventColor} from "utils/event";
export const formatEvent = (event) => {

  return {
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
    actualStart: new Date(event.actualStart || event.start),
    actualEnd: new Date(event.actualEnd || event.end),
    unreadTextMessagesCount: parseInt(event.unreadTextMessagesCount, 10),
    unreadMediaMessagesCount: parseInt(event.unreadMediaMessagesCount, 10),
  }
}
const getEventDots = (events) => {
  const map = {}
  for(const event of events) {
    const key = format(event.start, 'yyyyMMdd')
    if (!map[key]) {
      map[key] = []
    }

    map[key].push({id: event.id, color: getEventColor(event, {isOtherSide: true})})
  }

  return map
}
interface IState {
  sideBarLoading: boolean
  calendarLoading: boolean
  modalKey: string | null,
  showModal: (value: string) => void
  hideModal: () => void
  events: IEvent[]
  sidebarEvents: IEvent[]
  datesDisabled: string[],
  currentView: View
  rangeStartDate: Date
  rangeEndDate: Date
  currentDate: Date
  isEditMode: boolean
  setRange: (start: Date, end: Date) => void,
  setCurrentView: (view: View) => void
  setCurrentDate: (date: Date) => void
  mapCalendarColorStatus: {[key: string]: {id: number, color: string}[]}
  currentEvent: IEvent | null
  setCurrentEvent: (event: IEvent | null) => void
  setCurrentEventNext: () => void
  setCurrentEventPrev: () => void
  setIsEditMode: (value: boolean) => void,
}

const defaultValue: IState = {
  sideBarLoading: false,
  calendarLoading: false,
  events: [],
  sidebarEvents: [],
  datesDisabled: [],
  currentView: Views.WEEK,
  rangeStartDate: startOfWeek(new Date(), {weekStartsOn: 1}),
  rangeEndDate: endOfWeek(new Date(), {weekStartsOn: 1}),
  currentDate: new Date(),
  modalKey: null,
  isEditMode: false,
  showModal: (value: string) => null,
    hideModal: () => null,
  setRange: (start: Date, end: Date) => {
  },
  setCurrentView: (view: View) => {
  },
  setCurrentDate: (date: Date) => {
  },
  mapCalendarColorStatus: {},
  currentEvent: null,
  setCurrentEvent: (event: IEvent | null) => null,
  setCurrentEventNext: ()  => null,
  setCurrentEventPrev: () => null,
  setIsEditMode: (value: boolean) => null,
}
const EventCalendarContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  projectId: number
}

export function EventCalendarWrapper(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [events, setEvents] = useState<IEvent[]>([])
  const [sidebarEvents, setSidebarEvents] = useState<IEvent[]>([])
  const [currentEvent, setCurrentEvent] = useState<IEvent | null>(null)
  const [currentView, setCurrentView] = useState<View>(Views.WEEK)
  const [rangeStartDate, setRangeStartDate] = useState<Date>(startOfWeek(new Date(), {weekStartsOn: 1}))
  const [rangeEndDate, setRangeEndDate] = useState<Date>(endOfWeek(new Date(), {weekStartsOn: 1}))
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [sideBarLoading, setSideBarLoading] = useState<boolean>(false)
  const [calendarLoading, setCalendarLoading] = useState<boolean>(false)
  const [datesDisabled, setDatesDisabled] = useState<string[]>([])
  const [modalKey, setModalKey] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  useEffect(() => {
    const subscriptionUpdate = appContext.eventUpdateState$.subscribe((event) => {
      setEvents(i => i.map(i => i.id == event.id ? ({...i, ...event}) : i))
    })
    const subscriptionCreate = appContext.eventCreateState$.subscribe((event) => {
      setEvents((events) => {
        if(!events.find(i => i.id === event.id)){
          return [...events, event].sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime())
        }
        return  events
      })
    })
    return () => {
      subscriptionUpdate.unsubscribe()
      subscriptionCreate.unsubscribe()
    }
  }, [events])

  useEffect(() => {
    const subscriptionUpdate = appContext.eventUpdateState$.subscribe((event) => {
      setSidebarEvents(i => i.map(i => i.id == event.id ? ({...i, ...event}) : i))
    })
    const subscriptionCreate = appContext.eventCreateState$.subscribe((event) => {
      setSidebarEvents((events) => {
        if(!events.find(i => i.id === event.id)){
          return [...events, event].sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime())
        }
        return  events
      })
    })
    return () => {
      subscriptionUpdate.unsubscribe()
      subscriptionCreate.unsubscribe()
    }
  }, [sidebarEvents])

  const fetchEvents = async (data: IEventListRequest): Promise<IPagination<IEvent>> => {
    return EventRepository.fetch({...data, projectId: props.projectId})
  }
  const fetch = async (start: Date, end: Date) => {
    setCalendarLoading(true)
    const res = await fetchEvents({
     // sort: 'startTime,ASC',
      start: format(subDays(start, 6), 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(addDays(end, 6), 'yyyy-MM-dd 23:59:59 XXX'),
    })

    setEvents(res.data.map(i => formatEvent(i)))
  }
  const fetchListEvents = async (data: IEventNearestListRequest): Promise<IPagination<IEvent>> => {
      return EventRepository.fetchNearest({...data, projectId: props.projectId})

  }
  const fetchNearest = async () => {
    const res = await fetchListEvents({
     // sort: 'startTime,ASC',
      start: format(new Date(), 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(addDays(new Date(), 1), 'yyyy-MM-dd 23:59:59 XXX'),
      limit: 30,
      page: 1
    })
    setSidebarEvents(res?.data?.map(i => formatEvent(i)))
  }

  const setCurrentEventNext = () => {
    const list = events.sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime())
    const currentItemIndex = parseInt(Object.keys(list).find(k=> list[k].id === currentEvent.id), 10)
    const nextEvent = list[currentItemIndex + 1]
    if (nextEvent) {
      setCurrentEvent(nextEvent)
    }
  }

  const setCurrentEventPrev = () => {
    const list = events.sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime())
    const currentItemIndex = parseInt(Object.keys(list).find(k=> list[k].id === currentEvent.id), 10)
    const nextEvent = list[currentItemIndex - 1]
    if (nextEvent) {
      setCurrentEvent(nextEvent)
    }
  }
  useEffect(() => {
    fetch(rangeStartDate, rangeEndDate)
    fetchNearest()
  }, [props.projectId])
  const mapCalendarColorStatus = useMemo(() => getEventDots(events), [events])

  const value: IState = {
    ...defaultValue,
    sideBarLoading,
    calendarLoading,
    events,
    sidebarEvents,
    datesDisabled,
    currentView,
    rangeStartDate,
    rangeEndDate,
    currentDate,
    mapCalendarColorStatus,
    currentEvent,
    modalKey,
    isEditMode,
    setIsEditMode,
    setCurrentEvent,
    setCurrentEventNext,
    setCurrentEventPrev,
    setRange: (start: Date, end: Date) => {
      fetch(start, end)
    },
    setCurrentView: (view: View) => {
      setCurrentView(view)
    },
    setCurrentDate: (date: Date) => {
      setCurrentDate(date)
    },
    showModal: (value) => {
      setModalKey(value)
    },
    hideModal: () => {
      setModalKey(null)
    }
  }

  return (
    <EventCalendarContext.Provider value={value}>
      {props.children}
    </EventCalendarContext.Provider>
  )
}

export function useEventCalendarContext() {
  return useContext(EventCalendarContext)
}
