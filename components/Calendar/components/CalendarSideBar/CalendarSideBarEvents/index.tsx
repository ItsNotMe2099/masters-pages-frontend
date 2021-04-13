import styles from './index.module.scss'
import {IEvent} from 'types'
import CalendarSideBarEvent from 'components/Calendar/components/CalendarSideBarEvent'
import {add, format, isSameDay} from 'date-fns'

interface Props {
  type: 'today' | 'tomorrow',
  events: IEvent[]
}

export default function CalendarSideBarEvents(props: Props) {
  const { type, events } = props;

  const tomorrowDate = add(new Date(), {
    days: 1,

  });
  const list = type === 'today' ? events.filter(event => isSameDay(event.start, new Date())) : events.filter(event => isSameDay(event.start, tomorrowDate))
  const getTitle = (type) => {
    switch (type){
      case 'today':
        return 'Today'
      case 'tomorrow':
        return 'Tomorrow'
    }
  }
  const getDate = () => {
    switch (type){
      case 'today':
        return new Date();
      case 'tomorrow':
        return tomorrowDate
    }
  }
  const getTitleClass = () => {
    switch (type){
      case 'today':
        return styles.titleToday
      case 'tomorrow':
        return styles.titleTomorrow
    }
  }
  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.title} ${getTitleClass()}`}>{getTitle(type)} <span className={styles.date}>{format(getDate(), 'dd/MM/yyyy')}</span></div>
      <div className={styles.list}>
      {list.map(item => <CalendarSideBarEvent event={item}/>)}
      </div>
      </div>
  )
}

CalendarSideBarEvents.defaultProps = {

}
