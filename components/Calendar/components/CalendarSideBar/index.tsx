import styles from './index.module.scss'

import CalendarSideBarCalendar from 'components/Calendar/components/CalendarSideBar/CalendarSideBarCalendar'
import CalendarSideBarEvents from 'components/Calendar/components/CalendarSideBar/CalendarSideBarEvents'
import Plus from 'components/svg/Plus'
import {IEvent} from 'types'

interface Props {
  currentDate: Date,
  onChange: (date) => void,
  events: IEvent[]
}

export default function CalendarSideBar(props: Props) {
  const {currentDate, onChange, events} = props;
  return (
    <div className={`${styles.root}`}>
      <div className={styles.toolbar}>
        <div className={styles.create}><Plus/></div>
      </div>
     <CalendarSideBarCalendar value={currentDate} onChange={onChange}/>
     <div className={styles.events}>
      <CalendarSideBarEvents type={'today'} events={events}/>
      <CalendarSideBarEvents type={'tomorrow'} events={events}/>
     </div>
    </div>
  )
}
CalendarSideBar.defaultProps = {}
