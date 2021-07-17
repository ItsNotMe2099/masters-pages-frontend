import styles from './index.module.scss'
import Calendar from 'react-calendar';
import {IEvent, IRootState} from 'types'

import { useSelector, useDispatch } from 'react-redux'
import {format} from 'date-fns'
interface Props {
  date: Date
}
const Dot = ({color}: {color?: string}) => {
  const getClassName = () => {
    switch (color){
      case 'grey':
        return styles.dot__grey;
      case 'green':
        return styles.dot__green;
      case 'red':
        return styles.dot__red;
      case 'blue':
        return styles.dot__blue;
      case 'orange':
        return styles.dot__orange;
      case 'yellow':
        return styles.dot__yellow;
    }
  }
  return    <div className={`${styles.dot} ${getClassName()}`}/>
}
export default function CalendarSideBarCalendarCell({date}: Props) {
  const mapCalendarColorStatus = useSelector((state: IRootState) => state.event.mapCalendarColorStatus)
  const events = mapCalendarColorStatus[format(date, 'yyyyMMdd')] || []
  return (
    <div className={styles.root}>
      {events.map(item => <Dot color={item.color}/>)}
    </div>
  )
}
CalendarSideBarCalendarCell.defaultProps = {

}
