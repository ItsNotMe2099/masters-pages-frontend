import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import { Field, reduxForm } from 'redux-form'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import Rating from 'components/ui/Inputs/Rating'
import TextArea from 'components/ui/Inputs/TextArea'
import FileInput from 'components/ui/Inputs/FilesUploadInput'
import { useTranslation } from 'next-i18next'

let FinishingTaskByClientForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.taskOffer.formError)
  const { t } = useTranslation('common')

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.text}><span>{t('feedBack.finishingTaskByClientForm.workQuality')}</span></div>
        <Field
          name="quality"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__polite}>{t('feedBack.finishingTaskByClientForm.politness')}</div>
        <Field
          name="politness"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__deadline}>{t('feedBack.finishingTaskByClientForm.deadlines')}</div>
        <Field
          name="deadlines"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__expences}>{t('feedBack.finishingTaskByClientForm.extraExpenses')}</div>
        <Field
          name="expenses"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__reccomend}>{t('feedBack.finishingTaskByMasterForm.recommend')}</div>
        <Field
          name="reccomend"
          component={Rating}
        />
      </div>
      <div className={styles.textArea}>
      <Field
        name="description"
        label={t('feedBack.finishingTaskByMasterForm.leaveFeedback')}
        component={TextArea}
      />
      </div>
      <div className={styles.upload}>
      <Field
          name="photos"
          component={FileInput}
          label={t('photos')}
          multiple={true}
          title="Estimate"
          min="1"
          max="30"
          altView
      />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button type="button" transparent bold smallFont size="10px 32px" borderC4 onClick={props.onClose}>{t('feedBack.finishingTaskByClientForm.notDone')}</Button>
        <Button red bold smallFont size="10px 45px" >{t('feedBack.finishingTaskByClientForm.jobIsDone')}</Button>
      </div>
    </form>
  )
}

FinishingTaskByClientForm = reduxForm ({
  form: 'finishingTaskByClient',
}) (FinishingTaskByClientForm)

export default FinishingTaskByClientForm
