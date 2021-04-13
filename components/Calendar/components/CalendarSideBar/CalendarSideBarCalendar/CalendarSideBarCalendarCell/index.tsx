import styles from './index.module.scss'
import Calendar from 'react-calendar';
import {IEvent} from 'types'
interface Props {
  date: Date
}
const Dot = (props: {event?: IEvent}) => {
  const getClassName = () => {
    return styles.dot__red;
  }
  return    <div className={`${styles.dot} ${getClassName()}`}/>
}
export default function CalendarSideBarCalendarCell(props: Props) {

  return (
    <div className={styles.root}>
      <Dot/>
      <Dot/>
      <Dot/>
    </div>
  )
}
CalendarSideBarCalendarCell.defaultProps = {

}
