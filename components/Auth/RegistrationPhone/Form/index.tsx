import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import { Field, reduxForm } from 'redux-form'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from 'types'
import styles from './index.module.scss'
import {required} from 'utils/validations'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import InputPhone from '../../../ui/Inputs/InputPhone'

let SignIn = props => {
  const { t } = useTranslation('common')
  const { handleSubmit} = props
  const error = useSelector((state: IRootState) => state.registrationPhone.formError)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {(props.userHasPassword && props.userPhoneChange) && <Field
        name="password"
        component={InputPassword}
        label={t('auth.registrationPhone.fieldPassword')}
        validate={required}
        labelType={'cross'}
      />}
      <Field
        name={props.userPhoneChange ? 'newPhone' : 'phone'}
        component={InputPhone}
        label={t('auth.registrationPhone.fieldPhone')}
        validate={required}
        labelType={'cross'}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('auth.registrationPhone.buttonConfirm')}</Button>
      </div>
    </form>
  )
}

SignIn = reduxForm ({
  form: 'signIn',
}) (SignIn)

export default SignIn
