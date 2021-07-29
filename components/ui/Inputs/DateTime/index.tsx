import { Calendar } from 'react-date-range';
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

interface Props {
  input: any,
  showIcon?: boolean
  disabled?: boolean
}

export default function DateTime(props: Props) {
  const { disabled } = props;
  const { value, onChange } = props.input;

  const dateRangeRef = useRef(null);
  const [isDateRangeOpen, setDateRangeOpen] = useDetectOutsideClick(dateRangeRef, false);
  useEffect(() => {
    if(!value){
    //  onChange(new Date());
    }
  }, [])
  const handleChange = (v) => {
    onChange(v);
  }
  const getDateRange = () => {
    if(!value){
      return;
    }

    return format(typeof value === 'string' ? new Date(value) : value, 'dd.MM.yyyy')
  }

  const handleTime = (time) => {
    onChange(set(typeof value === 'string' ? new Date(value) : value, {hours: time.hour(), minutes: time.minute()}))
  }
  return (
    <div className={`${styles.root} ${disabled && styles.rootDisabled}`} ref={dateRangeRef}>
      <div className={styles.inputWrapper}>
        <div className={styles.input}>
          {props.showIcon && <CalendarIcon className={styles.calendarIcon}/>}
        <div className={styles.inputDate} onClick={() =>  !disabled ? setDateRangeOpen(true) : null}>{getDateRange()}</div>
        <div className={styles.separator}/>
        <div className={styles.timeRange}>
          <TimePicker
            disabled={disabled}
            input={{
            value: value ? moment(value) : null,
            onChange: handleTime
          }}/>
        </div>
        </div>
        <div className={styles.spacer}></div>
      </div>
      <div className={`${styles.dateRange} ${isDateRangeOpen && styles.dateRangeOpen}`}>
      <Calendar
        onChange={handleChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        showDateDisplay={false}
        date={value && typeof value === 'string' ? new Date(value) : value}
        direction="horizontal"
      />
      </div>
    </div>
  );
}
DateTime.defaultProps = {
  showIcon: true
}
