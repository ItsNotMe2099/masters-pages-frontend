import styles from './index.module.scss'
import Calendar from 'react-calendar'
import CalendarSideBarCalendarCell
  from 'components/Calendar/components/CalendarSideBar/CalendarSideBarCalendar/CalendarSideBarCalendarCell'
import CalendarArrowLeft from 'components/svg/CalendarArrowLeft'
import CalendarArrowRight from 'components/svg/CalendarArrowRight'
import { useEffect, useState } from 'react'
import {

  getMonthStart,
} from '@wojtekmaj/date-utils'
import {
  formatMonthYear,
  formatYear, getBegin,
  getBeginNext,
  getBeginPrevious, getCenturyLabel, getDecadeLabel
} from 'utils/dateFormatters'
import { useTranslation } from 'next-i18next'
import ProjectCalendarSideBarCalendarCell
  from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectCalendarSideBar/ProjectCalendarSideBarCalendar/ProjectCalendarSideBarCalendarCell";
import { useResize } from 'components/hooks/useResize'
import Plus from 'components/svg/Plus'
import Bell from 'components/svg/Bell'
import DateRangeSvg from 'components/svg/DateRangeSvg'
import Search from 'components/svg/Search'
import { useAppContext } from 'context/state'


interface Props {
  onChange: (value) => void,
  value: Date,
  onCreate?: () => void
}
const views = ['decade', 'year', 'month']

export default function ProjectCalendarSideBarCalendar(props: Props) {
  const { value, onChange, onCreate } = props
  const [activeStartDate, setActiveStartDate] = useState(getMonthStart(new Date()))
  const [view, setView] = useState('month')
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    const beginOfMonth = new Date(value.getFullYear(), value.getMonth(), 1)

    setActiveStartDate(beginOfMonth)
  }, [value])

  const handlePrevClick = () => {
    setActiveStartDate(getBeginPrevious(view, activeStartDate))
  }
  const handleNextClick = () => {
    setActiveStartDate(getBeginNext(view, activeStartDate))
  }
  const handleViewChange = ({ view, activeStartDate, value }) => {
    setView(view)
    setActiveStartDate(activeStartDate)
  }
  const handleDrillUp = () => {
    if (views.indexOf(view) === 0) {
      return
    }
    const nextView = views[views.indexOf(view) - 1]
    const nextActiveStartDate = getBegin(nextView, activeStartDate)
    setView(nextView)
    setActiveStartDate(nextActiveStartDate)
  }

  const { isLPhoneWidth } = useResize()

  const renderLabel = (date) => {
    switch (view) {
      case 'century':
        return getCenturyLabel(i18n.language, formatYear, date)
      case 'decade':
        return getDecadeLabel(i18n.language, formatYear, date)
      case 'year':
        return formatYear(i18n.language, date)
      case 'month':
        const parts = formatMonthYear(i18n.language, date).split(' ')
        return (<>{isLPhoneWidth ? parts[0].slice(0, 3) : parts[0]} <span className={styles.year}>{parts[1]}</span></>)
      default:
        throw new Error(`Invalid view: ${view}.`)
    }
  }

  const handleBellClick = () => {

  }

  const [calendarModal, setCalendarModal] = useState<boolean>(false)

  const appContext = useAppContext()

  const handleMobileCalendar = () => {
    setCalendarModal(true)
    appContext.showOverlay()
  }

  useEffect(() => {
    if (!appContext.isOverlayShown) {
      setCalendarModal(false)
    }
  }, [appContext.isOverlayShown])

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        {isLPhoneWidth && <div className={styles.arrows}>
          <div className={styles.arrow} onClick={handlePrevClick}><CalendarArrowLeft /></div>
        </div>}
        <div className={styles.label} onClick={handleDrillUp}>{renderLabel(activeStartDate)}</div>
        <div className={styles.arrows}>
          {!isLPhoneWidth && <div className={styles.arrow} onClick={handlePrevClick}><CalendarArrowLeft /></div>}
          <div className={styles.arrow} onClick={handleNextClick}><CalendarArrowRight /></div>
        </div>
        {isLPhoneWidth &&
          <div className={styles.right}>
            <Search className={styles.search} />
            <DateRangeSvg onClick={handleMobileCalendar} />
            <Bell className={styles.bell} onClick={handleBellClick} />
            <div className={styles.create} onClick={onCreate}><Plus /></div>
          </div>}
      </div>
      <div className={styles.modal}>
        {calendarModal &&
          <>
            <div className={styles.label} onClick={handleDrillUp}>{renderLabel(activeStartDate)}</div>
            <Calendar
              className={styles.modalCalendar}
              onChange={onChange}
              value={value}
              locale={i18n.language}
              activeStartDate={activeStartDate}
              defaultActiveStartDate={activeStartDate}
              showNavigation={false}
              onViewChange={handleViewChange}
              view={view as any}
              tileContent={({ activeStartDate, date, view }) => view === 'month' ? (
                <ProjectCalendarSideBarCalendarCell date={date} />) : null}
            />
          </>
        }</div>
      {
        !isLPhoneWidth && <Calendar
          className={styles.calendar}
          onChange={onChange}
          value={value}
          locale={i18n.language}
          activeStartDate={activeStartDate}
          defaultActiveStartDate={activeStartDate}
          showNavigation={false}
          onViewChange={handleViewChange}
          view={view as any}
          tileContent={({ activeStartDate, date, view }) => view === 'month' ? (
            <ProjectCalendarSideBarCalendarCell date={date} />) : null}
        />
      }
    </div >
  )
}

