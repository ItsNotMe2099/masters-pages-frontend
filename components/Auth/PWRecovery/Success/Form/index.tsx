import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import styles from './index.module.scss'
import InputPassword from 'components/ui/InputPassword'
import {required, passwordsMatch, minL} from 'utils/validations'

let PWRecoveryNewPW = (props) => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="new_password"
          component={InputPassword}
          inputLabel='New password'
          validate={[required, minL]}
        />
        <Field
          name="password_confirm"
          component={InputPassword}
          inputLabel='Password confirm'
          validate={[required, passwordsMatch, minL]}
        />
      <div className={styles.btnContainer}> 
        <Button green setNewPWBtn>SET A NEW PASSWORD</Button>
      </div>
    </form>
  )
}

PWRecoveryNewPW = reduxForm ({
  form: 'pwRecoveryNewPw',
}) (PWRecoveryNewPW)

export default PWRecoveryNewPW
