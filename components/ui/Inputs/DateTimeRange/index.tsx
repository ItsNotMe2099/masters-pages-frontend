import { DateRange } from 'react-date-range';
import styles from './index.module.scss'
import {addDays, addHours, addMinutes, compareAsc, format, isSameDay, set} from 'date-fns'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import {useEffect, useRef, useState} from 'react'
import TimePicker from 'components/ui/Inputs/TimePicker'
import CalendarIcon from 'components/svg/CalendarIcon'
import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick' // theme css file
import moment from "moment";
import {range} from 'utils/array'
import * as React from 'react'
import ErrorInput from 'components/ui/Inputs/Input/components/ErrorInput'

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

export default function DateTimeRange(props: Props) {
  const {disabled, inputClassName} = props;
  const { value, onChange } = props.input;

  const dateRangeRef = useRef(null);
  const [isDateRangeOpen, setDateRangeOpen] = useDetectOutsideClick(dateRangeRef, false);
  useEffect(() => {
    if(!value){
      onChange({
        start: new Date(),
        end: addHours(new Date(), 1)
      });
    }
  }, [])
  const handleChange = (v) => {
    const startDate = v.selection.startDate;
    const endDate = v.selection.endDate;
    console.log("HandleChange", v.selection.startDate.getDate(), v.selection.startDate.getFullYear(), v.selection.startDate.getMonth());
    const newValue = {...value,
      start: set(value.start, {date: startDate.getDate(), month: startDate.getMonth(), year: startDate.getFullYear()}),
        end: set(value.end, {date: endDate.getDate(), month: endDate.getMonth(), year: endDate.getFullYear()})
      }

    onChange(newValue);
  }
  const getDateRange = () => {
    if(!value){
      return;
    }

    if(!value.start || !value.end){
      return;
    }
    const startDate = format(value.start, 'dd.MM.yyyy');
    const endDate = format(value.end, 'dd.MM.yyyy');

    if(isSameDay(value.start, value.end)){
      return `${startDate}`
    }
    return `${startDate} - ${endDate}`
  }
  const handleStartTime = (time) => {
    const newValue = {...value, start: set(value.start, {hours: time.hour(), minutes: time.minute()})}
    if(compareAsc(newValue.start, newValue.end) === 1){
        newValue.end = addMinutes(newValue.start, 5);
    }
    onChange(newValue)
  }

  const handleEndTime = (time) => {
    const newValue = {...value, end: set(value.end, {hours: time.hour(), minutes: time.minute()})}
    console.log("NewValue1", newValue, value);
    onChange(newValue)
  }
  return (
    <div className={`${props.className} ${styles.root}`} ref={dateRangeRef}>
      <div className={styles.inputWrapper}>
        <div className={`${inputClassName} ${styles.input}`}>
          {props.showIcon && <CalendarIcon className={styles.calendarIcon}/>}
        <div className={styles.inputDate} onClick={() => setDateRangeOpen(true)}>{getDateRange()}</div>
          {props.showTime && <div className={styles.separator}/>}
          {props.showTime && <div className={styles.timeRange}>
          <TimePicker input={{
            value: value.start ? moment(value.start) : null,
            onChange: handleStartTime
          }}/>
          <div className={styles.timeSeparator}>-</div>
          <TimePicker input={{
            value: value.end ? moment(value.end) : null,
            onChange: handleEndTime
          }}
                      disabledHours={() => {
                        const hour = moment(value.start).hour();
                        if(hour === 0){
                          return [];
                        }
                        return range(hour);

                      }}
                      disabledMinutes={() => {
                        if(moment(value.start).hour() < moment(value.end).hour()){
                          return [];
                        }
                        const min = moment(value.start).minute();
                        if(min === 0){
                          return [];
                        }
                        return range(min);

                      }}/>
        </div>}
        </div>
        <div className={styles.spacer}></div>
      </div>
      <div className={`${styles.dateRange} ${isDateRangeOpen && styles.dateRangeOpen}`}>
      <DateRange
        onChange={handleChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        showDateDisplay={false}
        disabled={disabled}
        months={2}
        ranges={value ? [{startDate: value.start, endDate: value.end, key: 'selection'}] : [{
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }]}
        direction="horizontal"
      />
      </div>
      <ErrorInput meta={props.meta} />
    </div>
  );
}
DateTimeRange.defaultProps = {
  showIcon: true,
  showTime: true
}
