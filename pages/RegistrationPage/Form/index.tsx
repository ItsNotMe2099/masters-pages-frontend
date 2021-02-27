import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Loader from "components/ui/Loader";
import { useEffect } from "react";
import { Field, reduxForm } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import InputPhone from 'components/ui/Inputs/InputPhone'
import InputLocation from 'components/ui/Inputs/InputLocation'
import {required, email, minL, passwordsMatch} from 'utils/validations'
import { useDispatch, useSelector } from 'react-redux'
import {withTranslation} from "next-i18next";
import Router from "next/router";
import cookie from "js-cookie";
import {useTranslation} from "react-i18next";
let RegistrationForm = props => {
  const { t } = useTranslation('common');
  const { handleSubmit } = props
  console.log(props)
  const error = useSelector((state: IRootState) => state.registrationComplete.formError)
  const isLoading = useSelector((state: IRootState) => state.registrationComplete.loading)

  const handleLogout = () => {
      cookie.remove("token");
      Router.push('/');
      return;

  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="firstName"
        component={Input}
        label={t('auth.registrationPage.fieldFirstName')}
        validate={required}
        labelType={'cross'}
      />
      <Field
        name="lastName"
        component={Input}
        label={t('auth.registrationPage.fieldLastName')}
        validate={required}
        labelType={'cross'}
      />
      <Field
        name="email"
        component={Input}
        label={t('auth.registrationPage.fieldEmail')}
        validate={[required, email]}
        labelType={'cross'}
      />
      <Field
        name="phone"
        component={InputPhone}
        label={t('auth.registrationPage.fieldPhone')}
        validate={required}
        labelType={'cross'}
        disabled={true}
      />
      <Field
        name="geonameid"
        component={InputLocation}
        isRegistration={true}
        label={t('auth.registrationPage.fieldLocation')}
        labelType={'cross'}
        validate={required}
      />
      <div className={styles.pwChange}>
        <Field
          name="password"
          component={InputPassword}
          label={t('auth.registrationPage.fieldPassword')}
          validate={[required, minL]}
          labelType={'cross'}
        />
        <Field
          name="passwordConfirm"
          component={InputPassword}
          label={t('auth.registrationPage.fieldPasswordConfirm')}
          validate={[required, passwordsMatch, minL]}
          labelType={'cross'}
        />
      </div>
      <FormError error={error}/>
      <div className={styles.btnContainer}>
        <Button green size="16px 0">{t('auth.registrationPage.buttonCompleteRegistration')}</Button>
      </div>
      <div className={styles.btnContainer}>
        <div onClick={handleLogout} className={styles.logout}>{t('auth.registrationPage.logout')}</div>
      </div>
      {isLoading && <div className={styles.formLoader}><Loader /></div>}
    </form>

  )
}

RegistrationForm  = reduxForm ({
  form: 'registrationForm ',

}) (RegistrationForm )



export default RegistrationForm
