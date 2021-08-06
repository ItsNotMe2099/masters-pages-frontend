import styles from './index.module.scss'
import Calendar from 'react-calendar';
import CalendarSideBarCalendarCell
  from 'components/Calendar/components/CalendarSideBar/CalendarSideBarCalendar/CalendarSideBarCalendarCell'
import CalendarArrowLeft from 'components/svg/CalendarArrowLeft'
import CalendarArrowRight from 'components/svg/CalendarArrowRight'
import {useEffect, useState} from 'react'
import { getUserLocale } from 'get-user-locale';
import {

  getMonthStart,
} from '@wojtekmaj/date-utils';
import {
  formatMonthYear,
  formatYear, getBegin,
  getBeginNext,
  getBeginPrevious, getCenturyLabel, getDecadeLabel
} from 'utils/dateFormatters'


interface Props {
  onChange: (value) => void,
  value: Date,
}
const views = ['decade', 'year', 'month'];

export default function CalendarSideBarCalendar(props: Props) {
  const {value, onChange} = props;
  const [activeStartDate, setActiveStartDate] = useState(getMonthStart(new Date()));
  const [view, setView] = useState('month');
  const locale = getUserLocale();

  useEffect(() => {
    const beginOfMonth = new Date(value.getFullYear(), value.getMonth(), 1);

    setActiveStartDate(beginOfMonth);
  }, [value])

  const handlePrevClick = () => {
    setActiveStartDate(getBeginPrevious(view, activeStartDate))
  }
  const handleNextClick = () => {
    setActiveStartDate(getBeginNext(view, activeStartDate))
  }
  const handleViewChange = ({view, activeStartDate, value}) => {
    setView(view)
    setActiveStartDate(activeStartDate);
  }
  const handleDrillUp = () => {
    if(views.indexOf(view) === 0){
      return;
    }
    const nextView = views[views.indexOf(view) - 1];
    const nextActiveStartDate = getBegin(nextView, activeStartDate);
    setView(nextView);
    setActiveStartDate(nextActiveStartDate);
  }

  const renderLabel = (date) => {
      switch (view) {
        case 'century':
          return getCenturyLabel(locale, formatYear, date);
        case 'decade':
          return getDecadeLabel(locale, formatYear, date);
        case 'year':
          return formatYear(locale, date);
        case 'month':
          const parts = formatMonthYear(locale, date).split(' ');
          return (<>{parts[0]} <span className={styles.year}>{parts[1]}</span></>)
        default:
          throw new Error(`Invalid view: ${view}.`);
      }
    }
    return (
      <div className={styles.root}>
        <div className={styles.toolbar}>
          <div className={styles.label} onClick={handleDrillUp}>{renderLabel(activeStartDate)}</div>
          <div className={styles.arrows}>
            <div className={styles.arrow} onClick={handlePrevClick}><CalendarArrowLeft/></div>
            <div className={styles.arrow} onClick={handleNextClick}><CalendarArrowRight/></div>
          </div>
        </div>
        <Calendar
          className={styles.calendar}
          onChange={onChange}
          value={value}
          activeStartDate={activeStartDate}
          defaultActiveStartDate={activeStartDate}
          showNavigation={false}
          onViewChange={handleViewChange}
          view={view as any}
          tileContent={({activeStartDate, date, view}) => view === 'month' ? (
            <CalendarSideBarCalendarCell date={date}/>) : null}
        />
      </div>
    )
  }

  CalendarSideBarCalendar.defaultProps = {
  }

