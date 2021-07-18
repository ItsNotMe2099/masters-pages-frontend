import styles from './index.module.scss'
import {IEvent} from 'types'
import CalendarSideBarEvent from 'components/Calendar/components/CalendarSideBarEvent'
import {add, format, isSameDay} from 'date-fns'
import {useTranslation} from 'i18n'


interface Props {
  type: 'today' | 'tomorrow',
  events: IEvent[],
  onClickEvent: (event) => void
}

export default function CalendarSideBarEvents(props: Props) {
  const { type, events, onClickEvent } = props;
  const {t} = useTranslation('common');

  const tomorrowDate = add(new Date(), {
    days: 1,

  });
  const list = type === 'today' ? events.filter(event => isSameDay(event.actualStart, new Date())) : events.filter(event => isSameDay(event.actualStart, tomorrowDate))
  const getTitle = (type) => {
    switch (type){
      case 'today':
        return t('today')
      case 'tomorrow':
        return t('tomorrow')
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
      {list.map(item => <CalendarSideBarEvent event={item} onClick={onClickEvent}/>)}
      </div>
      </div>
  )
}

CalendarSideBarEvents.defaultProps = {

}
