import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import { minL, passwordsMatch, required } from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";

let ChangePasswordForm = props => {
  const { t } = useTranslation('common');
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.changePassword.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="oldPassword"
        component={InputPassword}
        label={t('auth.changePassword.fieldOldPassword')}
        validate={required}
        labelType={'cross'}
      />
      <Field
        name="newPassword"
        component={InputPassword}
        label={t('auth.changePassword.fieldNewPassword')}
        validate={[required, minL]}
        labelType={'cross'}
      />
      <Field
        name="passwordConfirm"
        component={InputPassword}
        label={t('auth.changePassword.fieldNewPasswordConfirm')}
        validate={[required, passwordsMatch, minL]}
        labelType={'cross'}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('auth.changePassword.buttonChangePassword')}</Button>
      </div>
    </form>
  )
}

ChangePasswordForm = reduxForm ({
  form: 'changePassword',
}) (ChangePasswordForm)

export default ChangePasswordForm
