import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import OtpCodeInput from "components/ui/Inputs/OtpCodeInput";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

let PhoneConfirmForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.phoneConfirmReducer.formError)
  console.log("ErrorPhoneConfirm", error)
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="code"
        component={OtpCodeInput}
        length={4}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont  size="16px 0">CONFIRM</Button>
      </div>
      <div className={styles.resendSms}>
        Dont receive sms? <a href={''}>Sent again</a>.
      </div>
    </form>
  )
}

PhoneConfirmForm = reduxForm ({
  form: 'phoneConfirm',
}) (PhoneConfirmForm)

export default PhoneConfirmForm
