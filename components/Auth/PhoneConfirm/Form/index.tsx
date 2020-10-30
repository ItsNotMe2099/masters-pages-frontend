import Button from 'components/ui/Button'
import OtpCodeInput from "components/ui/OtpCodeInput";
import { Field, reduxForm } from 'redux-form'
import InputPhone from 'components/ui/InputPhone'
import styles from './index.module.scss'
import Checkbox from 'components/ui/Checkbox'
import Link from 'next/link'

let PhoneConfirmForm = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="code"
        component={OtpCodeInput}
        length={4}
      />
      <div className={styles.btnContainer}>
        <Button green size="18px 0">CONFIRM</Button>
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
