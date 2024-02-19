import { DateRange } from 'react-date-range'
import styles from './index.module.scss'
import { addHours, addMinutes, compareAsc, format, isSameDay, set } from 'date-fns'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'
import { useEffect, useRef } from 'react'
import TimePicker from 'components/ui/Inputs/TimePicker'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick' // theme css file
import moment from 'moment'
import { range } from 'utils/array'
import * as React from 'react'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'
import { useTranslation } from 'next-i18next'
import * as dLocales from 'date-fns/locale'
import CalendarInputSvg from 'components/svg/CalendarInputSvg'
import ClockInputSvg from 'components/svg/ClockInputSvg'
import DatePicker from "react-datepicker"

interface Props {
  input: any,
  showIcon?: boolean
  disabled?: boolean,
  showTime?: boolean,
  className?: string,
  inputClassName?: string,
  meta?: {
    error: any,
    touched: boolean,
  },
}

export default function DateTimeRangeNew(props: Props) {
  const { disabled, inputClassName } = props
  const { value, onChange } = props.input
  const { t, i18n } = useTranslation()
  const dateRangeRef = useRef(null)
  const startDateRef = useRef(null)
  const [isDateRangeOpen, setDateRangeOpen] = useDetectOutsideClick(dateRangeRef, false)
  //const [isStartDatePickerOpen, setStartDatePickerOpen] = useDetectOutsideClick(startDateRef, false)
  useEffect(() => {
    if (!value) {
      onChange({
        start: new Date(),
        end: addHours(new Date(), 1)
      })
    }
  }, [])
  const handleChange = (v) => {
    const startDate = v.selection.startDate
    const endDate = v.selection.endDate
    console.log('HandleChange', v.selection.startDate.getDate(), v.selection.startDate.getFullYear(), v.selection.startDate.getMonth())
    const newValue = {
      ...value,
      start: set(value.start, { date: startDate.getDate(), month: startDate.getMonth(), year: startDate.getFullYear() }),
      end: set(value.end, { date: endDate.getDate(), month: endDate.getMonth(), year: endDate.getFullYear() })
    }

    onChange(newValue)
  }

  const getDateRange = () => {
    if (!value) {
      return
    }

    if (!value.start || !value.end) {
      return
    }
    const startDate = format(value.start, 'dd.MM.yyyy')
    const endDate = format(value.end, 'dd.MM.yyyy')

    if (isSameDay(value.start, value.end)) {
      return `${startDate}`
    }
    return `${startDate} - ${endDate}`
  }

  const getStartDate = () => {
    if (!value) {
      return
    }

    if (!value.start || !value.end) {
      return
    }
    const startDate = format(value.start, 'dd MMM yyyy')

    if (isSameDay(value.start, value.end)) {
      return `${startDate}`
    }
    return `${startDate}`
  }

  const getEndDate = () => {
    if (!value) {
      return
    }

    if (!value.start || !value.end) {
      return
    }
    const endDate = format(value.end, 'dd MMM yyyy')

    if (isSameDay(value.start, value.end)) {
      return `${endDate}`
    }
    return `${endDate}`
  }

  const handleStartTime = (time) => {
    const newValue = { ...value, start: set(value.start, { hours: time.hour(), minutes: time.minute() }) }
    if (compareAsc(newValue.start, newValue.end) === 1) {
      newValue.end = addMinutes(newValue.start, 5)
    }
    onChange(newValue)
  }

  const handleEndTime = (time) => {
    const newValue = { ...value, end: set(value.end, { hours: time.hour(), minutes: time.minute() }) }
    console.log('NewValue1', newValue, value)
    onChange(newValue)
  }

  return (
    <div className={`${props.className} ${styles.root}`} ref={dateRangeRef}>
      <div className={styles.inputWrapper}>
        <div className={`${inputClassName} ${styles.input}`}>
          <div className={styles.start}>
            <div className={styles.text}>Start time</div>
            <div className={styles.date}>
              {props.showIcon && <CalendarInputSvg color={'#000'} onClick={() => setDateRangeOpen(true)} />}
              <div className={styles.inputStartDate} onClick={() => setDateRangeOpen(true)}>{getStartDate()}</div>
            </div>
            {props.showTime &&
              <div className={styles.time}>
                <ClockInputSvg color={'#000'} />
                <TimePicker className={styles.picker} input={{
                  value: value.start ? moment(value.start) : null,
                  onChange: handleStartTime
                }} />
              </div>}
          </div>
          <div className={styles.end}>
            <div className={styles.text}>End time</div>
            <div className={styles.date}>
              {props.showIcon && <CalendarInputSvg color={'#000'} onClick={() => setDateRangeOpen(true)} />}
              <div className={styles.inputStartDate} onClick={() => setDateRangeOpen(true)}>{getEndDate()}</div>
            </div>
            {props.showTime &&
              <div className={styles.time}>
                <ClockInputSvg color={'#000'} />
                <TimePicker className={styles.picker} input={{
                  value: value.end ? moment(value.end) : null,
                  onChange: handleEndTime
                }}
                  disabledHours={() => {
                    if (!isSameDay(value.start, value.end)) {
                      return []
                    }

                    const hour = moment(value.start).hour()
                    if (hour === 0) {
                      return []
                    }
                    return range(hour)

                  }}
                  disabledMinutes={() => {
                    if (moment(value.start).hour() < moment(value.end).hour()) {
                      return []
                    }
                    if (!isSameDay(value.start, value.end)) {
                      return []
                    }
                    const min = moment(value.start).minute()
                    if (min === 0) {
                      return []
                    }
                    return range(min)

                  }} />
              </div>}
          </div>
        </div>
      </div>
      <div className={`${styles.dateRange} ${isDateRangeOpen && styles.dateRangeOpen}`}>
        <DateRange
          locale={i18n.language === 'ru' ? dLocales.ru : dLocales.enGB}
          onChange={handleChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          disabled={disabled}
          months={2}
          ranges={value ? [{ startDate: value.start, endDate: value.end, key: 'selection' }] : [{
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
          }]}
          direction="vertical"
        />
      </div>
      <ErrorInput meta={props.meta} />
    </div>
  )
}
DateTimeRangeNew.defaultProps = {
  showIcon: true,
  showTime: true
}
