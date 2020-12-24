import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import {required} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import Rating from 'components/ui/Inputs/Rating';
import TextArea from 'components/ui/Inputs/TextArea';
import FileInput from 'components/ui/Inputs/S3FileUpload';

let FinishingTaskForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.authSignIn.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.text}><span>Work quality :</span></div>
        <Field
          name="quality"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__polite}>Politness :</div>
        <Field
          name="politness"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__deadline}>Deadlines :</div>
        <Field
          name="deadlines"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__expences}>Extra expenses :</div>
        <Field
          name="expenses"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__reccomend}>Reccomend :</div>
        <Field
          name="reccomend"
          component={Rating}
        />
      </div>
      <div className={styles.textArea}>
      <Field
        name="feedback"
        label="Leave a feedback here (optional)"
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
        <Button transparent bold smallFont size="10px 28px" borderC4>NOT DONE</Button>
        <Button red bold smallFont size="10px 37px">JOB IS DONE</Button>
      </div>
    </form>
  )
}

FinishingTaskForm = reduxForm ({
  form: 'finishingTask',
}) (FinishingTaskForm)

export default FinishingTaskForm
