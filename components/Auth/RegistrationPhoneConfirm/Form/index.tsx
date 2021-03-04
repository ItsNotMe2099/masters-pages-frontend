import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import OtpCodeInput from "components/ui/Inputs/OtpCodeInput";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";

let RegistrationPhoneConfirmForm = props => {
  const { t } = useTranslation('common');
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.registrationPhone.formConfirmError)

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
      <div className={styles.resendSms}>
        {t('auth.phoneConfirm.dontReceiveSms')} <a href={''}>{t('auth.phoneConfirm.sendAgain')}</a>.
      </div>
    </form>
  )
}

RegistrationPhoneConfirmForm = reduxForm ({
  form: 'phoneConfirm',
}) (RegistrationPhoneConfirmForm)

export default RegistrationPhoneConfirmForm
