import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Input'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'
import {required} from 'utils/validations'

let SignIn = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="phone"
        component={Input}
        inputLabel="Phone number or email"
        validate={required}
      />
      <div className={styles.fakeMargin}></div>
      <Field
        name="password"
        component={InputPassword}
        inputLabel="Password"
        validate={required}
      />
      <div className={styles.btnContainer}>
        <Button green largeInputSign>LOG IN</Button>
      </div>
    </form>
  )
}

SignIn = reduxForm ({
  form: 'signIn',
}) (SignIn)

export default SignIn
