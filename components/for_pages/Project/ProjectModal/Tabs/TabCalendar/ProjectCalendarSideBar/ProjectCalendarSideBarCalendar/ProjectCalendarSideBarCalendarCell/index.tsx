import styles from './index.module.scss'
import { IRootState} from 'types'

import { useSelector } from 'react-redux'
import {format} from 'date-fns'
import {useEventCalendarContext} from "context/event_calendar";
interface Props {
  date: Date
}
const Dot = ({color}: {color?: string}) => {
  const getClassName = () => {
    switch (color){
      case 'grey':
        return styles.dot__grey
      case 'green':
        return styles.dot__green
      case 'red':
        return styles.dot__red
      case 'blue':
        return styles.dot__blue
      case 'orange':
        return styles.dot__orange
      case 'yellow':
        return styles.dot__yellow
    }
  }
  return    <div className={`${styles.dot} ${getClassName()}`}/>
}
export default function ProjectCalendarSideBarCalendarCell({date}: Props) {
  const calendarContext = useEventCalendarContext()
  const mapCalendarColorStatus = calendarContext.mapCalendarColorStatus
  const events = mapCalendarColorStatus[format(date, 'yyyyMMdd')] || []
  return (
    <div className={styles.root}>
      {events.map(item => <Dot color={item.color}/>)}
    </div>
  )
}
