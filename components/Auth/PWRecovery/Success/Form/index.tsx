import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import InputPassword from 'components/ui/Inputs/InputPassword'
import {required, passwordsMatch, passwordMinLength} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";
let PWRecoveryNewPW = (props) => {
  const { t } = useTranslation('common');
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.PWRecovery.formError)
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          name="password"
          component={InputPassword}
          label={t('auth.passwordReset.fieldNewPassword')}
          validate={[required, passwordMinLength]}
        />
        <Field
          name="passwordConfirm"
          component={InputPassword}
          label={t('auth.passwordReset.fieldNewPasswordConfirm')}
          validate={[required, passwordsMatch, passwordMinLength]}
        />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('auth.passwordReset.buttonSetNewPassword')}</Button>
      </div>
    </form>
  )
}

PWRecoveryNewPW = reduxForm ({
  form: 'pwRecoveryNewPw',
}) (PWRecoveryNewPW)

export default PWRecoveryNewPW
