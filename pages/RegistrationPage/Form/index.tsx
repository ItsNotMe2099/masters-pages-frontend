import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Input'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'
import InputPhone from 'components/ui/InputPhone'
import InputLocation from 'components/ui/InputLocation'

let RegistrationForm = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="firstName"
        component={Input}
        inputLabel="First Name*"
      />
      <Field
        name="lastName"
        component={Input}
        inputLabel="Last Name*"
      />
      <Field
        name="email"
        component={Input}
        inputLabel="Email*"
      />
      <Field
        name="phone"
        component={InputPhone}
        label="(ХХХ) XXX-XX-XX"
      />
      <Field
        name="location"
        component={InputLocation}
      />
      <div className={styles.pwChange}>
        <Field
          name="password"
          component={InputPassword}
          inputLabel="Password"
        />
        <Field
          name="password-confirm"
          component={InputPassword}
          inputLabel="Password again"
        />
      </div>
      <div className={styles.btnContainer}> 
        <Button registrationBtn>COMPLETE REGISTRATION</Button>
      </div>
    </form>
  )
}

RegistrationForm  = reduxForm ({
  form: 'registrationForm ',
}) (RegistrationForm )

export default RegistrationForm 
