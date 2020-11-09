import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import InputPhone from 'components/ui/Inputs/InputPhone'
import { IRootState } from "types";
import styles from './index.module.scss'
import Checkbox from 'components/ui/Inputs/Checkbox'
import Link from 'next/link'
import { required } from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'

let SignUp = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.authSignUp.formError)
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="phone"
        component={InputPhone}
        label="Phone number"
        validate={required}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">REGISTRATION</Button>
      </div>
      <div className={styles.terms}>
        <Field
          name="terms"
          component={Checkbox}
          validate={required}
        >
          <span>I am agree with <Link href="/">terms and conditions</Link>
          </span>
        </Field>
      </div>
    </form>
  )
}

SignUp = reduxForm({
  form: 'signUp',
})(SignUp)

export default SignUp
