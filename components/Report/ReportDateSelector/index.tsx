import * as React from "react";
import { getMonthStart, getMonthEnd } from '@wojtekmaj/date-utils';
import styles from './index.module.scss'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import {useEffect, useState} from 'react'
import {addDays, addHours} from 'date-fns'
import {getBegin, getBeginNext, getBeginPrevious, getEnd, getEndNext, getEndPrevious} from 'utils/dateFormatters'
import CalendarArrowLeft from 'components/svg/CalendarArrowLeft'
import CalendarArrowRight from 'components/svg/CalendarArrowRight'
import {useTranslation} from 'react-i18next'

const RangeSelector = ({onChange, isActive, label, id}) => {
    console.log("RangeSelector", isActive);
  return     <div className={`${isActive && styles.selectorActive} ${styles.selector}`} onClick={() => onChange(id)}>{label}</div>

}
interface Props {
  input: {value: any, onChange: (val) => void}
  value?: any,
  showAll?: boolean,
  showToday?: boolean
}
let ReportDateSelector = (props: Props) => {
  const { showAll, showToday} = props;
  const {value, onChange} = props.input;
  const [range, setRange ]= useState('day')
  const {i18n, t} = useTranslation('common')

  useEffect(() => {

  }, [value])
  const ranges = [
    ...(showAll ? [{key: 'all', label: t('all')}] : []),
    {key: 'day', label: t('today')},
    {key: 'week', label: t('week')},
    {key: 'month', label: t('month')},
    {key: 'year', label: t('year')},
  ];
  const handleDateChange = (val) => {
    console.log("HandleChange", val)
    onChange(val);
  }
  const handleRangeChange = (range) => {
    console.log("Range", range);
    if(range === 'all'){
      setRange('all');
      onChange(null);
      return;
    }
    const newValue = {
      start: getBegin(range, new Date()),
      end: getEnd(range, new Date()),
    };
    setRange(range);
    onChange(newValue);
  }
  const handleNavigatePrevious = () => {
    const newValue = {
      start: getBeginPrevious(range, value.start),
      end: getEndPrevious(range,  value.start),
    };
    setRange(range);
    onChange(newValue);
  }
  const handleNavigateNext = () => {
    const newValue = {
      start: getBeginNext(range, value.start),
      end: getEndNext(range,  value.start),
    };
    setRange(range);
    onChange(newValue);
  }
  return (
     <div className={styles.root} >
       <div className={styles.selectors}>
         {ranges.map(item => <RangeSelector isActive={item.key === range} label={item.label} id={item.key} onChange={handleRangeChange}/>)}
       </div>
       {range !== 'all' && <><div className={`${styles.arrow} ${styles.arrow__left}`} onClick={handleNavigatePrevious}><CalendarArrowLeft/></div>
       <DateTimeRange inputClassName={styles.inputClassName} className={styles.dateRange} input={{value, onChange: handleDateChange}} showTime={false}/>
       <div className={`${styles.arrow} ${styles.arrow__right}`} onClick={handleNavigateNext}><CalendarArrowRight/></div>
</>}
     </div>
  )
}
RangeSelector.defaultProps = {
  showToday: true
}
export default ReportDateSelector
