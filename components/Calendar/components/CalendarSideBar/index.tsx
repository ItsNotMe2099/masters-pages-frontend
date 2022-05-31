import styles from './index.module.scss'

import CalendarSideBarCalendar from 'components/Calendar/components/CalendarSideBar/CalendarSideBarCalendar'
import CalendarSideBarEvents from 'components/Calendar/components/CalendarSideBar/CalendarSideBarEvents'
import Plus from 'components/svg/Plus'
import { IRootState} from 'types'

import { useSelector, useDispatch } from 'react-redux'
import {format, isSameDay} from 'date-fns'

interface Props {
  currentDate: Date,
  onChange: (date) => void,
  onCreate: () => void,
  onClickEvent: (event) => void
}


export default function CalendarSideBar(props: Props) {
  const dispatch = useDispatch()
  const eventsSidebar = useSelector((state: IRootState) => state.event.listSideBar)
  const {currentDate, onChange, onCreate, onClickEvent} = props
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }
  return (
    <div className={`${styles.root}`}>
      <div className={styles.toolbar}>
        <div className={styles.timezone}>{format(new Date(), 'zzzz')}</div>
        <div className={styles.create} onClick={onCreate}><Plus/></div>
      </div>
     <CalendarSideBarCalendar value={currentDate} onChange={onChange}/>
     <div className={styles.events}>
      <CalendarSideBarEvents onClickEvent={onClickEvent} type={'today'} events={eventsSidebar.filter(item => isSameDay(new Date(), item.actualStart))}/>
      <CalendarSideBarEvents onClickEvent={onClickEvent}  type={'tomorrow'} events={eventsSidebar.filter(item => isSameDay(getTomorrowDate(), item.actualStart))}/>
     </div>
    </div>
  )
}
CalendarSideBar.defaultProps = {}
