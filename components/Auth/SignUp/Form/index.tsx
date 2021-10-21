import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import { Field, reduxForm } from 'redux-form'
import InputPhone from 'components/ui/Inputs/InputPhone'
import { IRootState } from "types";
import styles from './index.module.scss'
import Checkbox from 'components/ui/Inputs/Checkbox'
import Link from 'next/link'
import {phone, required} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import * as React from "react";
import {useTranslation, withTranslation} from "i18n";
import SignIn from "../../SignIn/Form";
import MainSectionButton from 'pages/NewMain/components/Button';

let SignUp = props => {
  const { t } = useTranslation('common');
  const { handleSubmit, onClick } = props
  const error = useSelector((state: IRootState) => state.authSignUp.formError)
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="phone"
        component={InputPhone}
        label={t('auth.signUp.fieldPhone')}
        validate={[required, phone]}
      />
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <MainSectionButton onClick={handleSubmit} size={'small'}>{t('auth.signUp.title')}</MainSectionButton>
      </div>
      <div className={styles.terms}>
          <Field
            name="terms"
            component={Checkbox}
            validate={required}
            label={<div>{t('agreeWith')} <Link href="/Terms"><a onClick={onClick}>{t('termsAndConditions')}</a></Link></div>}
          />
      </div>
    </form>
  )
}

SignUp = reduxForm({
  form: 'signUp',
})(SignUp)

export default SignUp
