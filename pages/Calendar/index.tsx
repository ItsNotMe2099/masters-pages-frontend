import {getAuthServerSide} from "utils/auth";
import styles from 'pages/PublicProfile/[id]/index.module.scss'
import Modals from 'components/layout/Modals'
import {wrapper} from 'store'
import request from 'utils/request'
import {IRootState, ProfileData} from 'types'
import Header from 'components/layout/Header'
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {useSelector, useDispatch} from 'react-redux'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {useState} from 'react'
import {SampleEvents}  from 'data/events'

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

interface Props {
  profile: ProfileData
}

const CalendarPage = (props) => {
  const dispatch = useDispatch();
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const now = new Date();
  const [events, setEvents] = useState(SampleEvents);
  const [draggedEvent, setDraggedEvent] = useState(null);

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

  return (
    <div className={styles.root}>
      <Header {...props}/>
      <DnDCalendar
        timeslots={8}
        step={15}
        defaultDate={new Date()}
        defaultView="month"
        localizer={localizer}
        selectable
        events={events}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onDragStart={console.log}
        popup={true}

        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
      />
      <Modals/>
    </div>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});

export default CalendarPage
