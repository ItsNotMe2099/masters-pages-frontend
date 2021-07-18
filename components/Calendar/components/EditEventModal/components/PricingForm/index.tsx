import Input from "components/ui/Inputs/Input";
import * as React from "react";
import { required } from "utils/validations";
import styles from './index.module.scss'
import { Field, reduxForm,formValueSelector } from 'redux-form'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import TimeExpense from 'components/ui/Inputs/TimeExpense'
import Expenses from 'components/Calendar/components/EditEventModal/components/Expenses'
import {IEvent} from 'types'
import {useState} from 'react'
import {parserNumber, parserPrice} from 'utils/formatters'
import {getCurrencySymbol} from 'data/currency'
import {useTranslation} from 'i18n'

interface Props {
  event?: IEvent,
  change?: (key, value) => void,
  priceType?: string,
  onAddExpense: (type) => void
  onEditExpense: (type, key, data) => void,
  isPlannedDisabled?: boolean,
  isCompletedDisabled?: boolean
}
let PricingForm = (props: Props) => {
  const {priceType, change, isPlannedDisabled, isCompletedDisabled, event} = props;

  const parseTimeExpense = (val) => {
    return {
      rate: parserPrice(val.rate),
      total: parserNumber(val.total)
    }
  }
  const handleChangedPricePlanned = (value) => {
    if(isCompletedDisabled) {
      change('actualPrice', parseTimeExpense(value));
    }
  }
  const handleChangedBudgetPlanned = (value) => {
    if(isCompletedDisabled) {
      change('actualBudget', parserPrice(value));
    }
  }
  const {t} = useTranslation('common');
  return (
     <div className={styles.root}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${priceType === 'rate' && styles.tab__active}`}>{t('hourly')}</div>
        <div className={`${styles.tab} ${priceType === 'fixed' && styles.tab__active}`}>{t('fixed')}</div>
      </div>
       <div className={styles.columns}>
       <div className={styles.planned}>
         <div className={styles.header}>{t('task.page.planned')}</div>
         {priceType === 'rate' && <Field
           name="price"
           component={TimeExpense}
           showIcon={false}
           currency={getCurrencySymbol(event.task?.currency)}
           label={t('start')}
           onChange={handleChangedPricePlanned}
           parse={parseTimeExpense}
           disabled={isPlannedDisabled}
           validate={required}
         />}
         {priceType === 'fixed' && <Field
           name="budget"
           component={Input}
           size={'small'}
           label=""
           onChange={handleChangedBudgetPlanned}
           disabled={isPlannedDisabled}
           parse={parserPrice}
           validate={required}
         />}
         <Expenses {...props} isDisabled={isPlannedDisabled} type={'planned'} event={props.event}/>
       </div>
         <div className={styles.spacer}></div>
       <div className={styles.completed}>
         <div className={styles.header}>{t('task.page.completed')}</div>
         {priceType === 'rate' &&<Field
           name="actualPrice"
           component={TimeExpense}
           showIcon={false}
           currency={getCurrencySymbol(event.task?.currency)}
           label={t('start')}
           disabled={isCompletedDisabled}
           parse={parseTimeExpense}
           validate={required}
         />}
         {priceType === 'fixed' && <Field
           name="actualBudget"
           component={Input}
           size={'small'}
           label=""
           disabled={isCompletedDisabled}
           parse={parserPrice}
           validate={required}
         />}
         <Expenses {...props} isDisabled={isCompletedDisabled} type={'actual'} event={props.event}/>
       </div>
       </div>
    </div>
  )
}

export default PricingForm
