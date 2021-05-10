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

interface Props {
  input: any,
  showIcon: boolean
  disabled: boolean
}

export default function DateTimeRange(props: Props) {
  const {disabled} = props;
  const { value, onChange } = props.input;

  const dateRangeRef = useRef(null);
  const [isDateRangeOpen, setDateRangeOpen] = useDetectOutsideClick(dateRangeRef, false);
  useEffect(() => {
    if(!value){
      console
      onChange({
        start: new Date(),
        end: addHours(new Date(), 1)
      });
    }
  }, [])
  const handleChange = (v) => {
    console.log("HandleChange", v);
    onChange({start: v.selection.startDate, end: v.selection.endDate});
  }
  const getDateRange = () => {
    if(!value){
      return;
    }
    console.log("GValue", value);

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
    console.log("StartTime", time.format('HH:mm'));
    const newValue = {...value, start: set(value.start, {hours: time.hour(), minutes: time.minute()})}
    if(compareAsc(newValue.start, newValue.end) === 1){
        newValue.end = addMinutes(newValue.start, 5);
    }
    onChange(newValue)
  }

  const handleEndTime = (time) => {
    const newValue = {...value, end: set(value.start, {hours: time.hour(), minutes: time.minute()})}
    onChange(newValue)
  }
  console.log("isDateRangeOpen", isDateRangeOpen);
  console.log("CalendarValue", value);
  return (
    <div className={styles.root} ref={dateRangeRef}>
      <div className={styles.inputWrapper}>
        <div className={styles.input}>
          {props.showIcon && <CalendarIcon className={styles.calendarIcon}/>}
        <div className={styles.inputDate} onClick={() => setDateRangeOpen(true)}>{getDateRange()}</div>
        <div className={styles.separator}/>
        <div className={styles.timeRange}>
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
        </div>
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
    </div>
  );
}
DateTimeRange.defaultProps = {
  showIcon: true
}
