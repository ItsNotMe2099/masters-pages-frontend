import { getAuthServerSide } from 'utils/auth'
import styles from './index.module.scss'

import * as dates from 'date-arithmetic'
import { EventStatus, IEvent, IRootState } from 'types'

import { Calendar, Views, momentLocalizer, CalendarProps, View, HeaderProps, ToolbarProps, SlotInfo, DayPropGetter } from 'react-big-calendar'

import 'moment/locale/ru'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useSelector, useDispatch } from 'react-redux'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { default as React, useEffect, useMemo, useRef, useState } from 'react'
import CalendarEvent from 'components/Calendar/components/CalendarEvent'
import { add, addDays, endOfWeek, format, isSameDay, isWeekend, startOfWeek } from 'date-fns'
import CalendarMonthCell from 'components/Calendar/components/CalendarMonthCell'
import CalendarMonthHeaderCell from 'components/Calendar/components/CalendarMonthHeaderCell'
import CalendarToolbar from 'components/Calendar/components/CalendarToolbar'
import { ru } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import CalendarEventMonth from 'components/Calendar/components/CalendarEventMonth'
import Layout from 'components/layout/Layout'
import { confirmModalClose, createEventOpen, editEventOpen, modalClose } from 'components/Modal/actions'
import ModalConfirm from 'components/Modal/ModalConfirm'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import { EventCalendarWrapper, useEventCalendarContext } from "context/event_calendar";
import ProjectCalendarSideBar from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectCalendarSideBar";
import ProjectEditEventModal from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectEditEventModal";
import ProjectNewEventModal from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectNewEventModal";
import { IProject } from "data/intefaces/IProject";
import {
  getYearStart,

  getYearEnd,


  getMonthStart,
  getMonthEnd,
} from '@wojtekmaj/date-utils'
import EventRepository from 'data/repositories/EventRepository'
import AgendaView from './AgendaView'
import classNames from 'classnames'
import ProjectHiddenEventsModal from './ProjectHiddenEventsModal'
const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

interface Props {
  project: IProject
}

const TabProjectCalendarInner = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const appContext = useAppContext();
  const calendarContext = useEventCalendarContext()
  const currentProfile = appContext.profile
  const modalKey = calendarContext.modalKey
  const confirmModalKey = useSelector((state: IRootState) => state.modal.confirmModalKey)
  const firstOfWeek = localizer.startOfWeek()
  const startWeek = dates.startOf(new Date(), 'week', firstOfWeek)
  const endWeek = dates.endOf(new Date, 'week', firstOfWeek)
  const currentEvent = calendarContext.currentEvent
  const toolbar = useRef(null)
  const currentViewRef = useRef(null)
  const events = calendarContext.events
  const [newEventRange, setNewEventRange] = useState(null)

  const [currentEditEventRange, setCurrentEditEventRange] = useState(null)
  const currentView = calendarContext.currentView
  const [currentDate, setCurrentDate] = useState(new Date())
  const [draggedEvent, setDraggedEvent] = useState(null)
  const intervalRef = useRef(null)
  const { t, i18n } = useTranslation('common')

  const [list, setList] = useState<IEvent[]>([])



  useEffect(() => {
    currentViewRef.current = currentView
  })

  const handleDragStart = event => {
    setDraggedEvent(event)
  }


  const onDropFromOutside = ({ start, end, allDay }) => {

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    }
    setDraggedEvent(null)
    moveEvent({ event, start, end })
  }

  const moveEvent = ({ event, start, end, isAllDay }: any) => {
    if ([EventStatus.Approved, EventStatus.Deleted].includes(event.status)) {
      return
    }
    setCurrentEditEventRange({ start, end })
    if (![EventStatus.Draft, EventStatus.Confirmed].includes(event.status)) {
      calendarContext.setIsEditMode(true)
    }
    calendarContext.setCurrentEvent(event)
    calendarContext.showModal('eventEditModal')
  }

  const resizeEvent = ({ event, start, end }) => {
    if ([EventStatus.Approved, EventStatus.Deleted].includes(event.status)) {
      return
    }
    if (![EventStatus.Draft, EventStatus.Confirmed].includes(event.status)) {
      calendarContext.setIsEditMode(true)
    }
    setCurrentEditEventRange({ start, end })
  }

  const newEvent = (_event) => {
    setNewEventRange({
      start: _event.start,
      end: _event.end
    })
    calendarContext.showModal('eventCreateModal')
  }

  const [showHiddenEventsModal, setShowHiddenEventsModal] = useState<boolean>(false)
  const [hiddenEvents, setHiddenEvents] = useState<IEvent[]>([])

  const handleClickEvent = (event: IEvent) => {
    if (event._isStub) {
      //TODO Show modal
      setShowHiddenEventsModal(true)
      setHiddenEvents(event._allEvents)
    } else {
      if (showHiddenEventsModal) {
        setShowHiddenEventsModal(false)
      }
      calendarContext.setCurrentEvent(event)
      calendarContext.showModal('eventEditModal')
      setCurrentEditEventRange(null)
    }

  }
  const getDayColor = (date) => {
    if (isSameDay(date, new Date())) {
      return { className: styles.currentDay }
    }
    if (isWeekend(date)) {
      return { className: styles.weekendDay }
    }
  }
  const getToolBar = (_toolbar) => {
    toolbar.current = _toolbar
    return <div />
  }
  const handleChangeView = (view) => {
    if (toolbar.current) {
      toolbar.current.onView(view)
    }
  }
  const handleToolbarNavigate = (action) => {
    if (toolbar.current) {
      toolbar.current.onNavigate(action)
      console.log('ACTION', action)
    }
  }
  const handleRangeChange = (dates: Date[] | { start: Date; end: Date }, view?: View) => {

    if (!Array.isArray(dates) && dates.start && dates.end && currentViewRef.current !== Views.DAY) {
      console.log("StartRange11", dates);
      calendarContext.setRange(dates.start, dates.end)
    } else if (Array.isArray(dates)) {
      calendarContext.setRange(dates[0], dates[dates.length - 1])
    }
    if (view) {
      currentViewRef.current = view
      calendarContext.setCurrentView(view)
    }
    console.log('CLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl')
    console.log('handleRangeChange dates', dates)
  }
  const handleViewChange = (view) => {
    calendarContext.setCurrentView(view)
    currentViewRef.current = view
  }
  const handleNavigate = (date) => {
    if (currentViewRef.current === Views.DAY) {
      calendarContext.setCurrentDate(date)
      calendarContext.setRange(date, date)
    }
  }
  const handleSideBarDateChange = (date) => {

    calendarContext.setCurrentDate(date)

    switch (currentViewRef.current) {
      case 'year':
        calendarContext.setRange(getYearStart(date), getYearEnd(date))
        break;
      case 'month':
        calendarContext.setRange(getMonthStart(date), getMonthEnd(date))
        break;
      case 'week':
        calendarContext.setRange(startOfWeek(date), endOfWeek(date))
        break;
      case 'day':
        calendarContext.setRange(date, date)
        break;
      default:

    }

  }

  const toolbarLabel = useMemo(() => {
    if (calendarContext.rangeStartDate && calendarContext.rangeEndDate && !isSameDay(calendarContext.rangeStartDate, calendarContext.rangeEndDate)) {
      if (currentView === Views.MONTH) {
        const centerDate = add(calendarContext.rangeStartDate, { days: 15 })
        console.log('centerDate', centerDate)
        if (centerDate)
          return `${format(centerDate, 'MMMM yyyy', { locale: i18n.language === 'ru' ? ru : undefined })}`
      } else {
        return `${format(calendarContext.rangeStartDate, 'MMMM dd', { locale: i18n.language === 'ru' ? ru : undefined })} - ${format(calendarContext.rangeEndDate, 'MMMM dd', { locale: i18n.language === 'ru' ? ru : undefined })}`

      }

    } else if (isSameDay(calendarContext.rangeStartDate, calendarContext.rangeEndDate)) {
      return `${format(calendarContext.rangeStartDate, 'MMMM dd EEEE', { locale: i18n.language === 'ru' && ru })}`
    }
  }, [calendarContext.rangeStartDate, calendarContext.rangeEndDate, calendarContext.currentView])
  const handleCreate = () => {
    setNewEventRange(null)
    calendarContext.showModal('eventCreateModal')
  }

  const listEvents = async () => {
    await EventRepository.list(props.project.id).then(data => {
      if (data) {
        setList(data.data)
      }
    })
  }

  useEffect(() => {

    listEvents()
  }, [currentView])

  const filteredEvents = useMemo<IEvent[]>(() => {

    console.log('CURRENTVIEW2323', currentView)
    if (currentView === 'week') {

      const newEvents: IEvent[] = [];
      const eventsMap: { [key: string]: IEvent[] } = {}
      events.sort((a, b) => a.actualStart.getTime() - b.actualStart.getTime()).forEach((event) => {
        const day = format(event.actualStart, 'dd.MM.yyyy')
        if (!eventsMap[day]) {
          eventsMap[day] = [];
        }
        eventsMap[day].push(event)
      })
      for (const key of Object.keys(eventsMap)) {
        newEvents.push(eventsMap[key][0]);
        if (eventsMap[key].length > 2) {
          newEvents.push({ ...eventsMap[key][1], _isStub: true, _count: eventsMap[key].length - 1, _allEvents: eventsMap[key] })
        } else if (eventsMap[key].length > 1) {
          newEvents.push(eventsMap[key][1]);

        }
      }

      console.log("newEvents", eventsMap, newEvents)
      return newEvents
    } else {
      return events;
    }
  }, [currentView, events])
  return (
    <div className={styles.root}>
      <ProjectCalendarSideBar onClickEvent={handleClickEvent} currentDate={currentDate} onChange={handleSideBarDateChange} onCreate={handleCreate} />
      <div className={classNames(styles.rightSide, { [styles.alt]: toolbar.current?.view === 'agenda' })}>
        <div className={styles.toolbar}>

          <CalendarToolbar label={toolbarLabel} onChangeView={handleChangeView}
            onNavigate={handleToolbarNavigate} currentView={currentView} /></div>
        <DnDCalendar
          selectable
          localizer={localizer}
          culture={i18n.language}
          events={currentView === 'week' ? filteredEvents : events}
          onEventDrop={moveEvent}
          resizable
          onEventResize={resizeEvent}
          onSelectSlot={newEvent}
          onRangeChange={handleRangeChange}
          onSelectEvent={handleClickEvent}
          onView={handleViewChange}
          defaultView={currentView}
          defaultDate={new Date()}
          dragFromOutsideItem={draggedEvent}
          onNavigate={handleNavigate}
          popup={true}
          startAccessor="actualStart"
          endAccessor="actualEnd"
          messages={{ noEventsInRange: t('event.noEvents') }}
          dayLayoutAlgorithm={'no-overlap'}
          components={{
            event: CalendarEvent,
            toolbar: getToolBar,
            week: {
              header: (props) => (<CalendarMonthHeaderCell {...props} />)
            },
            month: {
              event: CalendarEventMonth,
              dateHeader: (props) => (
                <CalendarMonthCell {...props} />
              )
            }
          }}
          onDropFromOutside={onDropFromOutside}
          handleDragStart={handleDragStart}
          dayPropGetter={getDayColor}
        />
        {toolbar.current?.view === 'agenda' && <AgendaView events={list} />}
      </div>
      {confirmModalKey === 'confirm' && <ModalConfirm isOpen={true} onRequestClose={() => dispatch(confirmModalClose())} />}

      {modalKey === 'eventCreateModal' &&
        <ProjectNewEventModal projectId={props.project.id} range={newEventRange} isOpen={true} onClose={() => calendarContext.hideModal()} />}
      {(['confirm', 'eventEditModal', 'eventExpensePlannedModal', 'eventExpenseActualModal'].includes(modalKey) && (currentEvent)) &&
        <ProjectNewEventModal projectId={props.project.id} event={calendarContext.currentEvent} range={currentEditEventRange} isOpen={true} onClose={() => {

          calendarContext.hideModal()
        }} />}
      {showHiddenEventsModal &&
        <ProjectHiddenEventsModal
          onEventClick={handleClickEvent}
          events={hiddenEvents}
          isOpen={true} onClose={() => {

            setShowHiddenEventsModal(false)
          }} />
      }
    </div>
  )
}



export default function TabProjectCalendar(props: Props) {

  return (<EventCalendarWrapper projectId={props.project.id}>
    <TabProjectCalendarInner project={props.project} />
  </EventCalendarWrapper>)
}

const range = (start, end, unit = 'day') => {
  let current = start,
    days = []

  while (dates.lte(current, end, unit)) {
    days.push(current)
    current = dates.add(current, 1, unit)
  }

  return days
}
