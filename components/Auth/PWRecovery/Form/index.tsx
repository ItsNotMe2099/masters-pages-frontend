import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import styles from './index.module.scss'
import InputPhone from 'components/ui/InputPhone'
import OtpCodeInput from 'components/ui/OtpCodeInput'
import {required} from 'utils/validations'

interface Props {
  handleSubmit?
  onSubmit
  firstStep?: boolean
}

let PWRecovery = (props: Props) => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!props.firstStep ?
        <Field
          name="code"
          component={OtpCodeInput}
          length={4}
        />
        :
        <Field
          name="phone"
          component={InputPhone}
          label='(ХХХ) XXX-XX-XX'
          validate={required}
        />}
      <div className={styles.btnContainer}> 
        <Button green resetPWBtn>RESET PASSWORD</Button>
      </div>
    </form>
  )
}

PWRecovery = reduxForm ({
  form: 'pwRecovery',
}) (PWRecovery)

export default PWRecovery
