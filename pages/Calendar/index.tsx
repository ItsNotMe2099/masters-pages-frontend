import {getAuthServerSide} from "utils/auth";
import styles from './index.module.scss'
import Modals from 'components/layout/Modals'
import {wrapper} from 'store'
import request from 'utils/request'
import * as dates from 'date-arithmetic'
import {IRootState, ProfileData} from 'types'
import Header from 'components/layout/Header'
import {Calendar, Views, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {useSelector, useDispatch} from 'react-redux'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {useEffect, useRef, useState} from 'react'
import {SampleEvents}  from 'data/events'
import CalendarEvent from 'components/Calendar/components/CalendarEvent'
import {add, format, isSameDay, isWeekend} from 'date-fns'
import CalendarMonthCell from 'components/Calendar/components/CalendarMonthCell'
import CalendarMonthHeaderCell from 'components/Calendar/components/CalendarMonthHeaderCell'
import CalendarToolbar from 'components/Calendar/components/CalendarToolbar'
import CalendarSideBar from 'components/Calendar/components/CalendarSideBar'
import {
  getYear,
  getMonth as getMonthIndex,

  getCenturyStart,
  getPreviousCenturyStart,
  getNextCenturyStart,
  getCenturyEnd,
  getPreviousCenturyEnd,
  getCenturyRange,

  getDecadeStart,
  getPreviousDecadeStart,
  getNextDecadeStart,
  getDecadeEnd,
  getPreviousDecadeEnd,
  getDecadeRange,

  getYearStart,
  getPreviousYearStart,
  getNextYearStart,
  getYearEnd,
  getPreviousYearEnd,
  getYearRange,

  getMonthStart,
  getPreviousMonthStart,
  getNextMonthStart,
  getMonthEnd,
  getPreviousMonthEnd,
  getMonthRange,

  getDayStart,
  getDayEnd,
  getDayRange,
} from '@wojtekmaj/date-utils';
import CalendarEventMonth from 'components/Calendar/components/CalendarEventMonth'
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface Props {
  profile: ProfileData
}

const CalendarPage = (props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const now = new Date();

  let firstOfWeek = localizer.startOfWeek()
  let startWeek = dates.startOf(new Date(), 'week', firstOfWeek)
  let endWeek = dates.endOf(new Date, 'week', firstOfWeek)

  const toolbar = useRef(null);
  const currentViewRef = useRef(null);
  const [events, setEvents] = useState(SampleEvents);
  const [currentView, setCurrentView] = useState(Views.WEEK);
  const [rangeStartDate, setRangeStartDate] = useState(startWeek);
  const [rangeEndDate, setRangeEndDate] = useState(endWeek);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedEvent, setDraggedEvent] = useState(null);

  useEffect(() => {
    currentViewRef.current = currentView;
  })
 const handleDragStart = event => {
   setDraggedEvent(event);
  }



  const onDropFromOutside = ({ start, end, allDay }) => {

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    }
    setDraggedEvent(null);
    moveEvent({ event, start, end })
  }

  const moveEvent = ({ event, start, end, isAllDay }: any) => {

    let allDay = event.allDay

    if (!event.allDay && isAllDay) {
      allDay = true
    } else if (event.allDay && !isAllDay) {
      allDay = false
    }


setEvents((events) =>  events.map(existingEvent => {
  return existingEvent.id == event.id
    ? { ...existingEvent, start, end, allDay }
    : existingEvent
}));

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  const resizeEvent = ({ event, start, end }) => {
    setEvents((events) =>  events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    }));

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  const newEvent = (_event) => {
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    // let hour = {
    //   id: newId,
    //   title: 'New Event',
    //   allDay: event.slots.length == 1,
    //   start: event.start,
    //   end: event.end,
    // }
    // this.setState({
    //   events: this.state.events.concat([hour]),
    // })
  }
  const getDayColor = (date) => {
   if(isSameDay(date, new Date())){
     return {className: styles.currentDay}
   }
   if(isWeekend(date)){
     return {className: styles.weekendDay}
   }
  }
  const getToolBar = (_toolbar) => {
    toolbar.current = _toolbar;
  return <div/>
  }
  const handleChangeView = (view) => {
    if(toolbar.current){
      toolbar.current.onView(view);
    }
  }
  const handleToolbarNavigate = (action) => {
    if(toolbar.current){
      console.log(" toolbar.current",  toolbar.current)
      toolbar.current.onNavigate(action);
    }
  }
  const handleRangeChange = (dates, view) => {
    console.log("handleRangeChange", dates, view);
    if(dates.start && dates.end && currentViewRef.current !== Views.DAY){
      setRangeStartDate(dates.start);
      setRangeEndDate(dates.end);
    }else if(Array.isArray(dates)) {
      setRangeStartDate(dates[0]);
      setRangeEndDate(dates[dates.length - 1]);

    }
    if(view) {
      currentViewRef.current = view;
        setCurrentView(view);
    }
 }
  const handleViewChange = (view) => {
    console.log("handleViewChange", view);
    setCurrentView(view);
    currentViewRef.current = view;
  }
  const handleNavigate = (date) => {
   if( currentViewRef.current  === Views.DAY){
     setCurrentDate(date)
     setRangeStartDate(date);
     setRangeEndDate(date);
   }
    console.log("handleNavigate", date, currentView, Views.DAY);
  }
  const handleSideBarDateChange = (date) => {
    setCurrentDate(date);
    toolbar.current.onView(Views.DAY);
    toolbar.current.onNavigate('DATE', date);
    setRangeStartDate(date);
    setRangeEndDate(date);
  }

  const getToolbarLabel = () => {
   if(rangeStartDate && rangeEndDate && !isSameDay(rangeStartDate, rangeEndDate)){
     if(currentView === Views.MONTH){
       const centerDate = add(rangeStartDate, {days: 15});
       if(centerDate)
       return `${format(centerDate, 'MMMM yyyy')}`
     }else{
       return `${format(rangeStartDate, 'MMMM dd')} - ${format(rangeEndDate, 'MMMM dd')}`
     }

   }else if(isSameDay(rangeStartDate, rangeEndDate)){
     return `${format(rangeStartDate, 'MMMM dd EEEE')}`
   }
  }
  return (
    <div className={styles.root}>
      <Header {...props}/>
      <CalendarSideBar currentDate={currentDate} onChange={handleSideBarDateChange} events={events}/>
      <div className={styles.rightSide}>
      <div className={styles.toolbar}>

        <CalendarToolbar label={getToolbarLabel()} onChangeView={handleChangeView} onNavigate={handleToolbarNavigate} currentView={currentView}/></div>
      <DnDCalendar
        selectable
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onRangeChange={handleRangeChange}
        onView={handleViewChange}
        onDragStart={console.log}
        defaultView={currentView}
        defaultDate={new Date()}
        dragFromOutsideItem={draggedEvent}
        onNavigate={handleNavigate}
        popup={true}
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
      <Modals/>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});

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
