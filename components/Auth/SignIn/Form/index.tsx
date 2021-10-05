import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import {required, phone} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "i18n";
import InputPhone from "../../../ui/Inputs/InputPhone";
import MainSectionButton from 'pages/NewMain/components/Button';

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
      <MainSectionButton onClick={handleSubmit} size={'small'}>{t('auth.signIn.title')}</MainSectionButton>
      </div>
    </form>
  )
}

SignIn = reduxForm ({
  form: 'signIn',
}) (SignIn)

export default SignIn
