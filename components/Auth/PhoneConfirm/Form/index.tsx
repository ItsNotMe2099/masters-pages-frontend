import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import OtpCodeInput from 'components/ui/Inputs/OtpCodeInput'
import { Field, reduxForm } from 'redux-form'
import { IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {useAuthContext} from 'context/auth_state'

let PhoneConfirmForm = props => {
  const { t } = useTranslation('common')
  const { handleSubmit } = props
  const authContext = useAuthContext();
  const error = authContext.error;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="code"
        component={OtpCodeInput}
        length={4}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont  size="16px 0">{t('auth.phoneConfirm.buttonConfirm')}</Button>
      </div>
      <div className={styles.resendSms} onClick={() => authContext.sendCodeAgain()}>
        {t('auth.phoneConfirm.dontReceiveSms')} <span>{t('auth.phoneConfirm.sendAgain')}</span>.
      </div>
    </form>
  )
}

PhoneConfirmForm = reduxForm ({
  form: 'phoneConfirm',
}) (PhoneConfirmForm)

export default PhoneConfirmForm
