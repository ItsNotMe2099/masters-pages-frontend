import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Loader from "components/ui/Loader";
import { useEffect } from "react";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import InputPhone from 'components/ui/Inputs/InputPhone'
import InputLocation from 'components/ui/Inputs/InputLocation'
import {required, email, minL, passwordsMatch} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
let RegistrationForm = props => {
  const { handleSubmit } = props
  console.log(props)
  const error = useSelector((state: IRootState) => state.registrationComplete.formError)
  const isLoading = useSelector((state: IRootState) => state.registrationComplete.loading)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="firstName"
        component={Input}
        label="First Name*"
        validate={required}
        labelType={'cross'}
      />
      <Field
        name="lastName"
        component={Input}
        label="Last Name*"
        validate={required}
        labelType={'cross'}
      />
      <Field
        name="email"
        component={Input}
        label="Email*"
        validate={[required, email]}
        labelType={'cross'}
      />
      <Field
        name="phone"
        component={InputPhone}
        label="Phone*"
        validate={required}
        labelType={'cross'}
        disabled={true}
      />
      <Field
        name="geonameid"
        component={InputLocation}
        isRegistration={true}
        label="Location*"
        labelType={'cross'}
        validate={required}
      />
      <div className={styles.pwChange}>
        <Field
          name="password"
          component={InputPassword}
          label="Password"
          validate={[required, minL]}
          labelType={'cross'}
        />
        <Field
          name="passwordConfirm"
          component={InputPassword}
          label="Password again"
          validate={[required, passwordsMatch, minL]}
          labelType={'cross'}
        />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green size="16px 0">COMPLETE REGISTRATION</Button>
      </div>
      {isLoading && <div className={styles.formLoader}><Loader /></div>}
    </form>
  )
}

RegistrationForm  = reduxForm ({
  form: 'registrationForm ',

}) (RegistrationForm )



export default RegistrationForm
