import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import { Field, reduxForm } from 'redux-form'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import Rating from 'components/ui/Inputs/Rating'
import TextArea from 'components/ui/Inputs/TextArea'
import { useTranslation } from 'next-i18next'

let FeedbackForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profileFeedback.formError)
  const { t } = useTranslation('common')

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.text}><span>{t('feedBack.feedbackForm.usability')}</span></div>
        <Field
          name="usability"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__polite}>{t('feedBack.feedbackForm.searchSpeed')}</div>
        <Field
          name="speed"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__deadline}>{t('feedBack.feedbackForm.willUseAgain')}</div>
        <Field
          name="again"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__expences}>{t('feedBack.feedbackForm.willRecommend')}</div>
        <Field
          name="recommend"
          component={Rating}
        />
      </div>
      <div className={styles.textArea}>
      <Field
        name="feedback"
        label={t('feedBack.feedbackForm.leaveFeedback')}
        component={TextArea}
      />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button type="button" transparent bold smallFont size="10px 32px" borderC4>{t('feedBack.finishingTaskByMasterForm.cancel')}</Button>
        <Button red bold smallFont size="10px 85px">{t('feedBack.feedbackForm.done')}</Button>
      </div>
    </form>
  )
}

FeedbackForm = reduxForm ({
  form: 'feedback',
}) (FeedbackForm)

export default FeedbackForm
