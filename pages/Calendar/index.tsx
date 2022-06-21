import {getAuthServerSide} from 'utils/auth'
import styles from './index.module.scss'

import * as dates from 'date-arithmetic'
import {EventStatus, IRootState} from 'types'

import {Calendar, Views, momentLocalizer} from 'react-big-calendar'
import 'moment/locale/ru'
import moment from 'moment'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {useSelector, useDispatch} from 'react-redux'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {default as React, useEffect, useRef, useState} from 'react'
import CalendarEvent from 'components/Calendar/components/CalendarEvent'
import {add, addDays, format, isSameDay, isWeekend} from 'date-fns'
import CalendarMonthCell from 'components/Calendar/components/CalendarMonthCell'
import CalendarMonthHeaderCell from 'components/Calendar/components/CalendarMonthHeaderCell'
import CalendarToolbar from 'components/Calendar/components/CalendarToolbar'
import CalendarSideBar from 'components/Calendar/components/CalendarSideBar'
import { ru } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import {

  getMonthStart,
  getMonthEnd,
} from '@wojtekmaj/date-utils'
import CalendarEventMonth from 'components/Calendar/components/CalendarEventMonth'
import Layout from 'components/layout/Layout'
import NewEventModal from 'components/Calendar/components/NewEventModal'
import { confirmModalClose, createEventOpen, editEventOpen, modalClose} from 'components/Modal/actions'
import {
  currentEventSetEditMode, fetchEvent,
  fetchEventCalendarList,
  fetchEventList,
  fetchEventSidebar
} from 'components/Events/actions'
import EditEventModal from 'components/Calendar/components/EditEventModal'
import ModalConfirm from 'components/Modal/ModalConfirm'
import {useRouter} from 'next/router'
import {useInterval} from 'components/hooks/useInterval'
import {IProfile} from 'data/intefaces/IProfile'
import {useAppContext} from 'context/state'

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

interface Props {
  profile: IProfile
}

const CalendarPage = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const modelKey = useSelector((state: IRootState) => state.modal.modalKey)
  const confirmModalKey = useSelector((state: IRootState) => state.modal.confirmModalKey)
  const firstOfWeek = localizer.startOfWeek()
  const startWeek = dates.startOf(new Date(), 'week', firstOfWeek)
  const endWeek = dates.endOf(new Date, 'week', firstOfWeek)
  const currentEvent = useSelector((state: IRootState) => state.event.currentEvent)
  const currentLoading = useSelector((state: IRootState) => state.event.currentLoading)
  const toolbar = useRef(null)
  const currentViewRef = useRef(null)
  const events = useSelector((state: IRootState) => state.event.list)
  const [newEventRange, setNewEventRange] = useState(null)

  const [currentEditEventRange, setCurrentEditEventRange] = useState(null)
  const [currentView, setCurrentView] = useState(Views.WEEK)
  const [rangeStartDate, setRangeStartDate] = useState(startWeek)
  const [rangeEndDate, setRangeEndDate] = useState(endWeek)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [draggedEvent, setDraggedEvent] = useState(null)
  const intervalRef = useRef(null)
  const {t, i18n} = useTranslation('common')

  useEffect(() => {
    if( router.query.eventId){
      dispatch(fetchEvent(parseInt(router.query.eventId as string, 10) ))
      dispatch(editEventOpen())
    }
  },  [router.query.eventId])
  useInterval(() => {
    dispatch(fetchEventList({
      start: format(rangeStartDate, 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(rangeEndDate, 'yyyy-MM-dd 23:59:59 XXX'),
      limit: 1000
    }))
  }, 10000)

  useEffect(() => {
    currentViewRef.current = currentView
  })

  const fetch = () => {
    dispatch(fetchEventList({
      start: format(rangeStartDate, 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(rangeEndDate, 'yyyy-MM-dd 23:59:59 XXX'),
      limit: 1000
    }))
  }
  useEffect(() => {
    fetch()
  }, [rangeStartDate, rangeEndDate])

  useEffect(() => {
    dispatch(fetchEventCalendarList({
      start: format(addDays(getMonthStart(currentDate), -7), 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(addDays(getMonthEnd(currentDate), 7), 'yyyy-MM-dd 23:59:59 XXX')
    }))


  }, [currentDate])
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    dispatch(fetchEventSidebar({
      start: format(new Date(), 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(tomorrow, 'yyyy-MM-dd 23:59:59 XXX')
    }))
  }, [])
  const handleDragStart = event => {
    setDraggedEvent(event)
  }


  const onDropFromOutside = ({start, end, allDay}) => {

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    }
    setDraggedEvent(null)
    moveEvent({event, start, end})
  }

  const moveEvent = ({event, start, end, isAllDay}: any) => {
    if([EventStatus.Approved, EventStatus.Deleted].includes(event.status)) {
      return
    }
    dispatch(fetchEvent(event.id))
    if(![EventStatus.Draft, EventStatus.Confirmed].includes(event.status)) {
      dispatch(currentEventSetEditMode())
    }
    setCurrentEditEventRange({start, end})
    dispatch(editEventOpen())
  }

  const resizeEvent = ({event, start, end}) => {
    if([EventStatus.Approved, EventStatus.Deleted].includes(event.status)) {
      return
    }
    if(![EventStatus.Draft, EventStatus.Confirmed].includes(event.status)) {
      dispatch(currentEventSetEditMode())
    }
    setCurrentEditEventRange({start, end})
    router.push(`/Calendar?eventId=${event.id}`, null, {shallow: true})
  }

  const newEvent = (_event) => {
    setNewEventRange({
      start: _event.start,
      end: _event.end
    })
    dispatch(createEventOpen())
  }
  const handleClickEvent = (event) => {
    router.push(`/Calendar?eventId=${event.id}`, null, {shallow: true})
    setCurrentEditEventRange(null)

  }
  const getDayColor = (date) => {
    if (isSameDay(date, new Date())) {
      return {className: styles.currentDay}
    }
    if (isWeekend(date)) {
      return {className: styles.weekendDay}
    }
  }
  const getToolBar = (_toolbar) => {
    toolbar.current = _toolbar
    return <div/>
  }
  const handleChangeView = (view) => {
    if (toolbar.current) {
      toolbar.current.onView(view)
    }
  }
  const handleToolbarNavigate = (action) => {
    if (toolbar.current) {
      toolbar.current.onNavigate(action)
    }
  }
  const handleRangeChange = (dates, view) => {

    if (dates.start && dates.end && currentViewRef.current !== Views.DAY) {
      setRangeStartDate(dates.start)
      setRangeEndDate(dates.end)
    } else if (Array.isArray(dates)) {
      setRangeStartDate(dates[0])
      setRangeEndDate(dates[dates.length - 1])

    }
    if (view) {
      currentViewRef.current = view
      setCurrentView(view)
    }
  }
  const handleViewChange = (view) => {
    setCurrentView(view)
    currentViewRef.current = view
  }
  const handleNavigate = (date) => {
    if (currentViewRef.current === Views.DAY) {
      setCurrentDate(date)
      setRangeStartDate(date)
      setRangeEndDate(date)
    }
  }
  const handleSideBarDateChange = (date) => {
    setCurrentDate(date)
    toolbar.current.onView(Views.DAY)
    toolbar.current.onNavigate('DATE', date)
    setRangeStartDate(date)
    setRangeEndDate(date)
  }

  const getToolbarLabel = () => {
    if (rangeStartDate && rangeEndDate && !isSameDay(rangeStartDate, rangeEndDate)) {
      if (currentView === Views.MONTH) {
        const centerDate = add(rangeStartDate, {days: 15})
        if (centerDate)
          return `${format(centerDate, 'MMMM yyyy', {locale: i18n.language === 'ru' && ru})}`
      } else {
        return `${format(rangeStartDate, 'MMMM dd', {locale: i18n.language === 'ru' && ru})} - ${format(rangeEndDate, 'MMMM dd', {locale: i18n.language === 'ru' && ru})}`
      }

    } else if (isSameDay(rangeStartDate, rangeEndDate)) {
      return `${format(rangeStartDate, 'MMMM dd EEEE', {locale: i18n.language === 'ru' && ru})}`
    }
  }
  const handleCreate = () => {
    setNewEventRange(null)
    dispatch(createEventOpen())
  }

return (
  <Layout>
    <div className={styles.root}>
      <CalendarSideBar onClickEvent={handleClickEvent} currentDate={currentDate} onChange={handleSideBarDateChange} onCreate={handleCreate}/>
      <div className={styles.rightSide}>
        <div className={styles.toolbar}>

          <CalendarToolbar label={getToolbarLabel()} onChangeView={handleChangeView}
                           onNavigate={handleToolbarNavigate} currentView={currentView}/></div>
        <DnDCalendar
          selectable
          localizer={localizer}
          culture={i18n.language}
          events={events}
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
          messages={{noEventsInRange: t('event.noEvents')}}
          components={{
            event: CalendarEvent,
            toolbar: getToolBar,
            week: {
              header: (props) => (<CalendarMonthHeaderCell {...props} />)
            },
            month: {
              event: CalendarEventMonth,
              dateHeader: (props) => (
                <CalendarMonthCell {...props}/>
              )
            }
          }}
          onDropFromOutside={onDropFromOutside}
          handleDragStart={handleDragStart}
          dayPropGetter={getDayColor}
        />
      </div>
      {confirmModalKey === 'confirm' && <ModalConfirm isOpen={true} onRequestClose={() => dispatch(confirmModalClose())}/>}

      {modelKey === 'eventCreateModal' &&
      <NewEventModal range={newEventRange} isOpen={true} onClose={() => dispatch(modalClose())}/>}
      {(['confirm','eventEditModal', 'eventExpensePlannedModal', 'eventExpenseActualModal'].includes(modelKey) && (currentEvent || currentLoading)) &&
      <EditEventModal range={currentEditEventRange} isOpen={true} onClose={() => {
        router.push('/Calendar', null, {shallow: true})

        dispatch(modalClose())}}/>}
        </div>
  </Layout>
)
}
export const getServerSideProps = getAuthServerSide({redirect: true})

export default CalendarPage

const range = (start, end, unit = 'day') => {
  let current = start,
    days = []

  while (dates.lte(current, end, unit)) {
    days.push(current)
    current = dates.add(current, 1, unit)
  }

  return days
}
