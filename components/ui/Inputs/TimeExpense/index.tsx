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
  disabled?: boolean
  currency: string
}

export default function TimeExpense(props: Props) {
  const {disabled, currency} = props;
  const { value = {rate: 0, total: 0}, onChange } = props.input;
  const inputRateRef = useRef(null);
  const inputDurationRef = useRef(null);
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

  const handleChangeRate = (e) => {
    const val = e.currentTarget.value;
    onChange({...value, rate: val})
  }
  const handleChangeTotal = (e) => {
    const val = e.currentTarget.value;
    onChange({...value, total: val})
  }
  const formatValueString = (val) => {
    if(typeof val === 'number'){
      return val.toString()
    }
    return val || '';
  }
  const handleInputRateWrapperClick = () => {
    inputRateRef.current.focus();
  }

  const handleInputDurationWrapperClick = () => {
    inputDurationRef.current.focus();
  }
  return (
    <div className={`${styles.root} ${disabled && styles.rootDisabled}`}>
        <div className={styles.inputWrapper} onClick={handleInputRateWrapperClick}>
          <div className={styles.inputClick}></div>
          <span className={styles.inputText}>{currency}</span>
        <input disabled={disabled} ref={inputRateRef} className={styles.input} style={{width:  `${(formatValueString(value.rate).length + 1) * 6}px` }} onChange={handleChangeRate} value={value.rate}/>
          <span className={styles.inputText}>/hr</span>
        </div>
      <div className={styles.separator}/>
      <div className={styles.inputWrapper} onClick={handleInputDurationWrapperClick}>

          <span className={styles.inputText}></span>
          <input disabled={disabled} ref={inputDurationRef} className={styles.input} style={{width:  `${(formatValueString(value.total).length + 1) * 6}px` }} onChange={handleChangeTotal} value={value.total}/>
          <span className={styles.inputText}>hr</span>
      </div>
    </div>
  );
}
TimeExpense.defaultProps = {
  showIcon: true
}
