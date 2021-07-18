import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import Rating from 'components/ui/Inputs/Rating';
import TextArea from 'components/ui/Inputs/TextArea';
import FileInput from 'components/ui/Inputs/FilesUploadInput';
import {useTranslation, withTranslation} from "i18n";

let FinishingTaskByMasterForm = props => {
  const { handleSubmit, onCancel } = props
  const error = useSelector((state: IRootState) => state.authSignIn.formError)
  const { t } = useTranslation('common');

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.text}>{t('feedBack.finishingTaskByMasterForm.timeliness')}</div>
        <Field
          name="timelinessAndСompletenessOfPayment"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>{t('feedBack.finishingTaskByMasterForm.presence')}</div>
        <Field
          name="presenceOfNaggingAndUnfoundedRemarks"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>{t('feedBack.finishingTaskByMasterForm.respect')}</div>
        <Field
          name="respectAndCourtesy"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
        <div className={styles.text}>{t('feedBack.finishingTaskByMasterForm.accordance')}</div>
        <Field
          name="accordanceBetweenDescriptionAndRealWork"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
        <div className={styles.text}>{t('feedBack.finishingTaskByMasterForm.adequacy')}</div>
        <Field
          name="adequacyOfRequirements"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text}>{t('feedBack.finishingTaskByMasterForm.recommend')}</div>
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
          label="Photos"
          multiple={true}
          title="Estimate"
          min="1"
          max="30"
          altView
      />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button type="button" transparent bold smallFont size="10px 32px" borderC4 onClick={onCancel}>{t('feedBack.finishingTaskByMasterForm.cancel')}</Button>
        <Button red bold smallFont size="10px 45px">{t('feedBack.finishingTaskByMasterForm.send')}</Button>
      </div>
    </form>
  )
}

FinishingTaskByMasterForm = reduxForm ({
  form: 'finishingTaskByMaster',
}) (FinishingTaskByMasterForm)

export default FinishingTaskByMasterForm
