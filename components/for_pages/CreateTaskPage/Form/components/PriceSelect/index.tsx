import Input from 'components/ui/Inputs/Input'
import { Field } from 'redux-form'

import styles from 'components/for_pages/CreateTaskPage/Form/components/PriceSelect/index.module.scss'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import {getCurrencySymbol} from 'data/currency'
import {parserPrice} from 'utils/formatters'

const PriceSelectForm = props => {
  const {t} = useTranslation()
  const { handleSubmit } = props
  const handleHourFieldChange = () => {
    props.change('budget', null)
  }
  const handleFixedFieldChange = () => {
    props.change('ratePerHour', null)
    props.change('estimate', null)
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
              label={t('createTask.priceSelect.fieldRatePerHour')}
              size={'small'}
              labelType={'static'}

              format={(value) => `${getCurrencySymbol(props.currency)}   ${value || ''}`}
              parse={parserPrice}
              onChange={handleHourFieldChange}
            />
          </div>
          <div className={styles.inputHour}>
            <Field
              name="estimate"
              component={Input}
              placeholder={t('createTask.priceSelect.maxDays')}
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
              format={(value) => `${getCurrencySymbol(props.currency)}   ${value || ''}`}
              parse={parserPrice}
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
