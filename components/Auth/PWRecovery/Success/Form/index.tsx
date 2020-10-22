import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import styles from './index.module.scss'
import InputPassword from 'components/ui/InputPassword'

let PWRecoveryNewPW = (props) => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="new_password"
          component={InputPassword}
          inputLabel='New password'
        />
        <Field
          name="password_confirm"
          component={InputPassword}
          inputLabel='Password confirm'
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
