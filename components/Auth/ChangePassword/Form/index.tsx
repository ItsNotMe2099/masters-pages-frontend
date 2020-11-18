import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import { minL, passwordsMatch, required } from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'

let ChangePasswordForm = props => {
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.changePassword.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="oldPassword"
        component={InputPassword}
        label="Old password"
        validate={required}
        labelType={'cross'}
      />
      <Field
        name="newPassword"
        component={InputPassword}
        label="New Password"
        validate={[required, minL]}
        labelType={'cross'}
      />
      <Field
        name="passwordConfirm"
        component={InputPassword}
        label="New Password"
        validate={[required, passwordsMatch, minL]}
        labelType={'cross'}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">Change password</Button>
      </div>
    </form>
  )
}

ChangePasswordForm = reduxForm ({
  form: 'changePassword',
}) (ChangePasswordForm)

export default ChangePasswordForm
