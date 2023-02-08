import TextField from 'components/fields/TextField'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import { useFormikContext } from 'formik'
import Validator from 'utils/validator'

interface Props {

}

export default function PriceSelectForm(props: Props) {

  const { t } = useTranslation('common')

  const { setFieldValue } = useFormikContext()

  return (
    <div className={styles.root}>
      <div className={styles.hourlySection}>
        <div className={styles.title}>{t('createTask.priceSelect.hourlyTaskTitle')}</div>
        <div className={styles.fields}>
          <div className={styles.inputHour}>
            <TextField
              name='ratePerHour'
              label={t('createTask.priceSelect.fieldRatePerHour')}
              validate={Validator.numberOnly}
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
              placeholder="1 - 5 000"
              label={t('createTask.priceSelect.fieldBudget')}
              validate={Validator.numberOnly}
            />
          </div>
          <div className={styles.inputFixed}>

          </div>
        </div>
      </div>
    </div>
  )
}
