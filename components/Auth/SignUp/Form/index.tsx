import Button from 'components/ui/Button'
import { Field, reduxForm } from 'redux-form'
import InputPhone from 'components/ui/InputPhone'
import styles from './index.module.scss'
import Checkbox from 'components/ui/Checkbox'
import Link from 'next/link'
import {required} from 'utils/validations'

let SignUp = props => {
  const { handleSubmit } = props
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="phone"
        component={InputPhone}
        label="(ХХХ) XXX-XX-XX"
        validate={required}
      />
      <div className={styles.btnContainer}> 
        <Button green largeFont size="16px 0">REGISTRATION</Button>
      </div>
      <div className={styles.terms}>
      <Field
        name="terms"
        component={Checkbox}
      ><span>I am agree with <Link href="/">terms and conditions</Link></span></Field>
      </div>
    </form>
  )
}

SignUp = reduxForm ({
  form: 'signUp',
}) (SignUp)

export default SignUp
