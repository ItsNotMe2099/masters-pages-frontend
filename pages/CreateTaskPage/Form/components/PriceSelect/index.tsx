import Input from "components/ui/Inputs/Input";
import { Field, reduxForm,formValueSelector } from 'redux-form'

import styles from './index.module.scss'
import {useTranslation} from "react-i18next";
import * as React from 'react'

let PriceSelectForm = props => {
  const {t} = useTranslation();
  const { handleSubmit } = props
  const handleHourFieldChange = () => {
    props.change('budget', null);
  }
  const handleFixedFieldChange = () => {
    props.change('ratePerHour', null);
    props.change('estimate', null);
  }
  return (
    <div className={styles.root}>
      <div className={styles.hourlySection}>
        <div className={styles.title}>{t('createTask.priceSelect.hourlyTaskTitle')}</div>
        <div className={styles.fields}>
          <div className={styles.inputHour}>
            <Field
              name="ratePerHour"
              component={Input}
              placeholder="0.01 - 100"
              label={t('createTask.priceSelect.fieldRatePerHour')}
              size={'small'}
              labelType={'static'}
              min="0.01"
              max="100.00"
              step="0.01"
              parse={value => value ? parseFloat(value) : ''}
              onChange={handleHourFieldChange}
            />
          </div>
          <div className={styles.inputHour}>
            <Field
              name="estimate"
              component={Input}
              placeholder="max 30 days"
              label={t('createTask.priceSelect.fieldEstimate')}
              size={'small'}
              labelType={'static'}
              type={'number'}
              min="1"
              max="30"
              parse={value => value ? parseFloat(value) : ''}
              onChange={handleHourFieldChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.orSection}>
        <div className={styles.orWrapper}>
        <div className={styles.orText}>{t('createTask.priceSelect.or')}</div>
        <div className={styles.orBorder}></div>
        </div>
      </div>

      <div className={styles.fixedSection}>
        <div className={styles.title}>{t('createTask.priceSelect.fixedPriceTaskTitle')}</div>
        <div className={styles.fields}>
          <div className={styles.inputFixed}>
            <Field
              name="budget"
              component={Input}
              placeholder="1 - 5 000"
              label={t('createTask.priceSelect.fieldBudget')}
              size={'small'}
              labelType={'static'}
              min="1"
              max="5000"
              type={'number'}
              parse={value => value ? parseFloat(value) : ''}
              onChange={handleFixedFieldChange}
            />
          </div>
          <div  className={styles.inputFixed}>

          </div>
        </div>
      </div>
    </div>
  )
}
export default PriceSelectForm
