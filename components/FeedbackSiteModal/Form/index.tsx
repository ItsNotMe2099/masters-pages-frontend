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

let FeedbackForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.profileFeedback.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.section}>
        <div className={styles.text}><span>Usability :</span></div>
        <Field
          name="usability"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__polite}>Master search speed :</div>
        <Field
          name="speed"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__deadline}>Will you use MS again :</div>
        <Field
          name="again"
          component={Rating}
        />
      </div>
      <div className={styles.section}>
      <div className={styles.text__expences}>Will you recommend us :</div>
        <Field
          name="recommend"
          component={Rating}
        />
      </div>
      <div className={styles.textArea}>
      <Field
        name="feedback"
        label="Leave a feedback here"
        component={TextArea}
      />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button type="button" transparent bold smallFont size="10px 32px" borderC4>CANCEL</Button>
        <Button red bold smallFont size="10px 85px">DONE</Button>
      </div>
    </form>
  )
}

FeedbackForm = reduxForm ({
  form: 'feedback',
}) (FeedbackForm)

export default FeedbackForm
