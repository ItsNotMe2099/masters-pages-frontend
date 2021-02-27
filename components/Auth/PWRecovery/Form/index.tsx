import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import { IRootState } from "types";
import styles from './index.module.scss'
import InputPhone from 'components/ui/Inputs/InputPhone'
import OtpCodeInput from 'components/ui/Inputs/OtpCodeInput'
import { phone, required } from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation, withTranslation} from "react-i18next";
interface Props {
  handleSubmit?
  onSubmit
  firstStep?: boolean
}

let PWRecovery = (props: Props) => {
  const { t } = useTranslation('common');
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.PWRecovery.formError)
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {!props.firstStep ?
        <Field
          name="code"
          component={OtpCodeInput}
          length={4}
          validate={required}
        />
        :
        <Field
          name="phone"
          component={InputPhone}
          label={t('auth.passwordRecovery.fieldPhone')}
          validate={phone}
        />}
        <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green largeFont size="16px 0">{t('auth.passwordRecovery.buttonReset')}</Button>
      </div>
    </form>
  )
}

PWRecovery = reduxForm ({
  form: 'pwRecovery',
}) (PWRecovery)

export default PWRecovery
