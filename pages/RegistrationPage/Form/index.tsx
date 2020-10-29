import Button from 'components/ui/Button'
import { SelectInput } from "components/ui/SelectInput";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Input'
import InputPassword from 'components/ui/InputPassword'
import styles from './index.module.scss'
import InputPhone from 'components/ui/InputPhone'
import InputLocation from 'components/ui/InputLocation'
import {required, email, minL, passwordsMatch} from 'utils/validations'

let RegistrationForm = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="firstName"
        component={Input}
        inputLabel="First Name*"
        validate={required}
      />
      <Field
        name="lastName"
        component={Input}
        inputLabel="Last Name*"
        validate={required}
      />
      <Field
        name="email"
        component={Input}
        inputLabel="Email*"
        validate={[required, email]}
      />
      <Field
        name="phone"
        component={InputPhone}
        label="(ХХХ) XXX-XX-XX"
        inputLabel="Phone*"
        validate={required}
      />
      <Field
        name="location"
        component={InputLocation}
        options={[{value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'},
          {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'},
          {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'},
          {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'},
          {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}, {value: '11', label: 'wewewe'}]}
        validate={required}
      />
      <div className={styles.pwChange}>
        <Field
          name="password"
          component={InputPassword}
          inputLabel="Password"
          validate={[required, minL]}
        />
        <Field
          name="password-confirm"
          component={InputPassword}
          inputLabel="Password again"
          validate={[required, passwordsMatch, minL]}
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
