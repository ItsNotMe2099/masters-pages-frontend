import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import {required, phone} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";
import InputPhone from "../../../ui/Inputs/InputPhone";

let SignIn = props => {
  const { t } = useTranslation('common');
  const { handleSubmit} = props
  const error = useSelector((state: IRootState) => state.authSignIn.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="phone"
        component={InputPhone}
        label={t('auth.signIn.fieldLogin')}
        validate={[required, phone]}
        labelType={'cross'}
      />
      <Field
        name="password"
        component={InputPassword}
        label={t('auth.signIn.fieldPassword')}
        validate={required}
        labelType={'cross'}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('auth.signIn.buttonLogin')}</Button>
      </div>
    </form>
  )
}

SignIn = reduxForm ({
  form: 'signIn',
}) (SignIn)

export default SignIn
