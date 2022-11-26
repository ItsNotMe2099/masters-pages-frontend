import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { IRootState } from 'types'
import styles from './index.module.scss'
import InputPhone from 'components/ui/Inputs/InputPhone'
import OtpCodeInput from 'components/ui/Inputs/OtpCodeInput'
import { phone, required } from 'utils/validations'
import {connect, useSelector} from 'react-redux'
import { useTranslation } from 'next-i18next'
import {RadioList} from "components/ui/Inputs/RadioList";
import Input from "components/ui/Inputs/Input";
import * as React from "react";
import SignIn from "components/Auth/SignIn/Form";
interface Props {
  handleSubmit?
  onSubmit
  firstStep?: boolean
  mode?: string
  initialValues?: any
}

let PWRecovery = (props: Props) => {
  const { t } = useTranslation('common')
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
        <>
          <Field
            name="mode"
            component={RadioList}
            grid={2}
            size={'small'}
            labelType="placeholder"
            label={'Mode'}
            options={[
              {label: 'Individual', value: 'phone'},
              {label: 'Corporate', value: 'email'}
            ]}
          />
          {props.mode === 'email' && <Field
            name="login"
            component={Input}
            label={'Email'}
            validate={[required]}
            labelType={'cross'}
          />}
          {props.mode === 'phone' && <Field
            name="login"
            component={InputPhone}
            label={t('auth.passwordRecovery.fieldPhone')}
            validate={[required, phone]}
          />}
        </>}
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
const selector = formValueSelector('pwRecovery')
PWRecovery = connect(state =>
  {
    const mode = selector(state, 'mode')

    return {mode}
  }
)(PWRecovery)
export default PWRecovery
