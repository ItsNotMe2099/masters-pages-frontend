import TextField from 'components/fields/TextField'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import { useFormikContext } from 'formik'
import Validator from 'utils/validator'
import { useEffect } from 'react'
import { getCurrencySymbol } from 'data/currency'

interface Props {
  currency: string
}

export default function PriceSelectForm(props: Props) {

  const { t } = useTranslation('common')

  const { setFieldValue } = useFormikContext()

  useEffect(() => {
    setFieldValue('ratePerHour', getCurrencySymbol(props.currency))
    setFieldValue('budget', getCurrencySymbol(props.currency))
  }, [props.currency])

  return (
    <div className={styles.root}>
      <div className={styles.hourlySection}>
        <div className={styles.title}>{t('createTask.priceSelect.hourlyTaskTitle')}</div>
        <div className={styles.fields}>
          <div className={styles.inputHour}>
            <TextField
              name='ratePerHour'
              label={t('createTask.priceSelect.fieldRatePerHour')}
              isNumbersOnly
            />
          </div>
          <div className={styles.inputHour}>
            <TextField
              name='estimate'
              label={t('createTask.priceSelect.fieldEstimate')}
              placeholder={t('createTask.priceSelect.maxDays')}
              type={'number'}
              min="1"
              max="30"
              validate={Validator.numberOnly}
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
            <TextField
              name='budget'
              label={t('createTask.priceSelect.fieldBudget')}
              isNumbersOnly
            />
          </div>
          <div className={styles.inputFixed}>

          </div>
        </div>
      </div>
    </div>
  )
}
