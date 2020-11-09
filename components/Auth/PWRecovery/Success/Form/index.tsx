import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import InputPassword from 'components/ui/Inputs/InputPassword'
import {required, passwordsMatch, minL} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
let PWRecoveryNewPW = (props) => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.PWRecovery.formError)
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="password"
          component={InputPassword}
          inputLabel='New password'
          validate={[required, minL]}
        />
        <Field
          name="passwordConfirm"
          component={InputPassword}
          inputLabel='Password confirm'
          validate={[required, passwordsMatch, minL]}
        />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">SET A NEW PASSWORD</Button>
      </div>
    </form>
  )
}

PWRecoveryNewPW = reduxForm ({
  form: 'pwRecoveryNewPw',
}) (PWRecoveryNewPW)

export default PWRecoveryNewPW
