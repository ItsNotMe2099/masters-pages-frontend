import Button from 'components/ui/Button'
import FormError from "components/ui/Form/FormError";
import Loader from "components/ui/Loader";
import { useEffect } from "react";
import * as React from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Input from 'components/ui/Inputs/Input'
import InputPassword from 'components/ui/Inputs/InputPassword'
import { IRootState } from "types";
import styles from './index.module.scss'
import InputPhone from 'components/ui/Inputs/InputPhone'
import InputLocation from 'components/ui/Inputs/InputLocation'
import {required, email, passwordsMatch, passwordMinLength} from 'utils/validations'
import { useDispatch, useSelector, connect } from 'react-redux'
import {useTranslation} from "i18n";
import {registrationPhoneOpen} from "components/Modal/actions";
import {registrationPhoneSetCallback} from "components/Auth/RegistrationPhone/actions";
import {logout} from "components/Auth/actions";
import TaskEditConditionsForm from 'components/TaskNegotiation/TaskEditConditionsModal/TaskEditConditionsForm'
import InputCountry from 'components/ui/Inputs/InputCountry'
let RegistrationForm = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { handleSubmit } = props
  const error = useSelector((state: IRootState) => state.registrationComplete.formError)
  const isLoading = useSelector((state: IRootState) => state.registrationComplete.loading)
  console.log("initialValues", props.initialValues);
  const handleLogout = () => {
    dispatch(logout());
  }
  const handlePhoneClick = () => {
    dispatch(registrationPhoneSetCallback((phone) => {
     // props.change('phone', phone);
    }));
    dispatch(registrationPhoneOpen());
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
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
        disabled={!!props.initialValues?.email}
      />
      <Field
        name="phone"
        component={InputPhone}
        onClick={(!props.phone && !props.initialValues?.phone) ? handlePhoneClick : null}
        label={t('auth.registrationPage.fieldPhone')}
        validate={required}
        labelType={'cross'}
        disabled={true}
      />
      <Field
        name="countryCode"
        component={InputCountry}
        label={t('auth.registrationPage.fieldCountry')}
        onChange={() =>  {
          console.log("SetGeonameIdNull")
          props.change('geonameid', null)}}
        labelType={'cross'}
        validate={required}
      />
      <Field
        name="geonameid"
        component={InputLocation}
        isRegistration={true}
        countryCode={props.countryCode}
        label={t('auth.registrationPage.fieldLocation')}
        labelType={'cross'}
        validate={required}
      />
      {!props.isSocialAuth && <div className={styles.pwChange}>
        <Field
          name="password"
          component={InputPassword}
          label={t('auth.registrationPage.fieldPassword')}
          validate={[required, passwordMinLength]}
          labelType={'cross'}
        />
        <Field
          name="passwordConfirm"
          component={InputPassword}
          label={t('auth.registrationPage.fieldPasswordConfirm')}
          validate={[required, passwordsMatch, passwordMinLength]}
          labelType={'cross'}
        />
      </div>}
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



RegistrationForm  = reduxForm({
  form: 'registrationForm',

}) (RegistrationForm )
const selector = formValueSelector('registrationForm') // <-- same as form name
RegistrationForm = connect(state => {
  const phone = selector(state, 'phone')
  const countryCode = selector(state, 'countryCode')
  return {
    phone,
    countryCode
  }
})(RegistrationForm)

export default RegistrationForm
