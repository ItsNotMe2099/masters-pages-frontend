import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import DateTime from 'components/ui/Inputs/DateTime'
import {differenceInHours, format} from 'date-fns'
import {useTranslation} from 'i18n'

interface Props {
  price?: {total: number, rate: number}
  actualPrice?: {total: number, rate: number}
  start?: Date
  end?: Date,
  actualStart?: Date,
  actualEnd?: Date
  change?: (key, value) => void,
  isPlannedDisabled?: boolean,
  isCompletedDisabled?: boolean
}
let EventInputsForm = (props: Props) => {
  const {change, price, actualPrice, end, start, actualEnd, actualStart, isPlannedDisabled, isCompletedDisabled} = props;
  const {t} = useTranslation('common');
  const handleCurrentStartChange = (value) => {

    const newPrice = {
      ...price,
      total: differenceInHours(end, value)
    }
    change('price', newPrice);

    if(isCompletedDisabled){
      change('actualStart', value);
      change('actualPrice', newPrice);
    }
  }
  const handleCurrentEndChange = (value) => {
    const newPrice =  {
      ...price,
      total: differenceInHours(value, start)
    }

    change('price', newPrice);
    if(isCompletedDisabled){
      change('actualEnd', value);
      change('actualPrice', newPrice);
    }
  }

  const handleActualStartChange = (value) => {
    change('actualPrice', {
      ...actualPrice,
      total: differenceInHours(actualEnd, value)
    });
  }
  const handleActualEndChange = (value) => {
    change('actualPrice', {
      ...actualPrice,
      total: differenceInHours(value, actualStart)
    });
  }
  return (
    <>
      <div className={styles.title}>{t('event.eventInputs')} <div className={styles.separator}/>
        <div className={styles.timezone}>{format(new Date(), 'zzzz')}</div>
      </div>
     <div className={styles.root}>
       <div className={styles.labels}>
         <div className={styles.label}>{`${t('start')}:`}</div>
         <div className={styles.verticalSpacer}/>
         <div className={styles.label}>{`${t('end')}:`}</div>
       </div>
       <div className={styles.planned}>
         <div className={styles.header}>{t('task.page.planned')}</div>
         <div className={styles.labelMobile}>{`${t('start')}:`}</div>
         <Field
           name="start"
           component={DateTime}
           label={t('start')}
           showIcon={false}
           disabled={isPlannedDisabled}
           onChange={handleCurrentStartChange}
           validate={required}
           modal
         />
         <div className={styles.verticalSpacer}/>
         <div className={styles.labelMobile}>{`${t('end')}:`}</div>
         <Field
           name="end"
           component={DateTime}
           showIcon={false}
           disabled={isPlannedDisabled}
           onChange={handleCurrentEndChange}
           label={t('end')}
           validate={required}
           modal
         />

       </div>
       <div className={styles.spacer}/>
       <div className={styles.completed}>
         <div className={styles.header}>{t('task.page.completed')}</div>
         <div className={styles.labelMobile}>{`${t('start')}:`}</div>
         <Field
           name="actualStart"
           component={DateTime}
           showIcon={false}
           disabled={isCompletedDisabled}
           onChange={handleActualStartChange}
           label={t('start')}
           validate={required}
           modal
         />
         <div className={styles.verticalSpacer}/>
         <div className={styles.labelMobile}>{`${t('end')}:`}</div>
         <Field
           name="actualEnd"
           component={DateTime}
           showIcon={false}
           disabled={isCompletedDisabled}
           onChange={handleActualEndChange}
           label={t('end')}
           validate={required}
           modal
         />

       </div>
    </div>
    </>
  )
}

export default EventInputsForm
