import Button from 'components/ui/Button'
import {Form, FormikProvider, useFormik} from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import TextField from 'components/fields/TextField'
import {useTranslation, Trans} from 'next-i18next'
import PasswordField from 'components/fields/PasswordField'
import CheckBoxField from 'components/fields/CheckBoxField'
import Link from 'next/link'
import CountryField from 'components/fields/CountryField'
import CityField from 'components/fields/CityField'
import PhoneField from 'components/fields/PhoneField'
import {IUser, UserRegType} from 'data/intefaces/IUser'
import * as React from 'react'
import {useState} from 'react'
import {registrationPhoneSetCallback} from 'components/Auth/RegistrationPhone/actions'
import {registrationPhoneOpen, registrationSuccessOpen} from 'components/Modal/actions'

import {useDispatch} from 'react-redux'
import AuthRepository from 'data/repositories/AuthRepository'
import FormError from 'components/ui/Form/FormError'
import {useAppContext} from 'context/state'
import {reachGoal} from 'utils/ymetrika'
import {ProfileRole} from 'data/intefaces/IProfile'
import {LabelStyleType} from 'types/types'
import VisibleXs from 'components/ui/VisibleXS'
import Welcome from '../Welcome'

interface Props {
  user: IUser
  onSubmit?: () => void
}

export default function CorporateAccountForm({user}: Props) {

  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const isSocialAuth = user.regType !== UserRegType.Site
  const [isLoading, setIsLoading ] = useState(false);
  const [error, setError] = useState(null);
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    jobTitle: '',
    email: user.email,
    phone: user.phone,
    password: '',
    passwordConfirm: '',
    organization: {
      name: '',
      zipcode: '',
      address: '',
      office: '',
      phone: '',
      site: '',
    },
    country: '',
    geonameid: '',
    terms: false
  }

  const handleSubmit = async (data) => {
    console.log('Submit', data)
    setError(null)
    setIsLoading(true);
    try {
      const res = await AuthRepository.completeRegistration(data);
      reachGoal('auth:signup:completed')
      await appContext.updateUser();
      await appContext.updateRole(ProfileRole.Corporate);
      dispatch(registrationSuccessOpen())

    }catch (e){
      setError(e);
    }
    setIsLoading(false);

  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
  const {values, setFieldValue} = formik

  const handlePhoneClick = () => {
    if(user.phone || values.phone){
      return
    }
    console.log('HandlePhoneClick')
    dispatch(registrationPhoneSetCallback((phone) => {
      setFieldValue('phone', phone)
    }))
    dispatch(registrationPhoneOpen())
  }
  return (
    <FormikProvider value={formik}>
      <Form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.representative}>
            <div className={styles.title}>
              {t('corporateAccount.representative')}
            </div>
            <TextField name={'firstName'}  validate={Validator.required}  labelType={LabelStyleType.Cross} label={t('masterForm.firstName')} size='normal'/>
            <TextField name={'lastName'}  validate={Validator.required}  labelType={LabelStyleType.Cross} label={t('masterForm.lastName')} size='normal'/>
            <TextField name={'jobTitle'}  validate={Validator.required}  labelType={LabelStyleType.Cross} label={t('corporateAccount.jobTitle')} size='normal'/>
            <TextField name={'email'}  validate={Validator.required}  labelType={LabelStyleType.Cross} label={t('corporateAccount.email')} size='normal' disabled={!!user.email}/>
            <PhoneField name={'phone'} labelType='cross' label={t('corporateAccount.phoneNumber')} disabled  validate={Validator.combine([Validator.required, Validator.phone])}   onClick={handlePhoneClick}/>
            {!isSocialAuth && <PasswordField name={'password'} labelType={LabelStyleType.Cross} label={t('auth.registrationPage.fieldPassword')} validate={Validator.required}/>}
            {!isSocialAuth && <PasswordField name={'passwordConfirm'}  labelType={LabelStyleType.Cross} label={t('auth.registrationPage.fieldPasswordConfirm')} validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}/>}
          </div>
          <div className={styles.organization}>
            <div className={styles.title}>
              {t('corporateAccount.organization')}
            </div>
            <TextField name={'organization.name'}  validate={Validator.required} labelType={LabelStyleType.Cross} label={t('corporateAccount.organizationName')} size='normal'/>
            <CountryField name={'country'}
                          validate={Validator.required} labelType={LabelStyleType.Cross} label={t('masterForm.country')} size='normal'/>
            <CityField name={'geonameid'} countryCode={values.country}
                          validate={Validator.required} labelType={LabelStyleType.Cross} label={t('corporateAccount.city')} size='normal'/>
            <TextField name={'organization.zipcode'}  validate={Validator.required} labelType={LabelStyleType.Cross} label={t('corporateAccount.postalCode')} size='normal'/>
            <TextField name={'organization.address'}  validate={Validator.required} labelType={LabelStyleType.Cross} label={t('corporateAccount.streetAndNumber')} size='normal'/>
            <TextField name={'organization.office'}  validate={Validator.required} labelType={LabelStyleType.Cross} label={t('corporateAccount.office')} size='normal'/>
            <PhoneField name={'organization.phone'} validate={Validator.combine([Validator.required, Validator.phone])}  labelType={LabelStyleType.Cross} label={t('corporateAccount.phoneNumber')}/>
            <TextField name={'organization.site'} validate={Validator.required}  labelType={LabelStyleType.Cross} label={t('corporateAccount.site')} size='normal'/>
          </div>
        </div>
        <VisibleXs>
          <Welcome/>
        </VisibleXs>
        <div className={styles.checkbox}>
          <CheckBoxField name={'terms'} validate={Validator.required} label={<div className={styles.terms}>
          <Trans i18nKey="corporateAccount.agree">I agree with <a href='/Terms'>Terms & Conditions</a></Trans>
          </div>}/>

        </div>
        <FormError error={error}/>
        <div className={styles.btn}>
          <Button green disabled={isLoading} size='16px 72px'>{t('corporateAccount.submit')}</Button>
        </div>
      </Form>

    </FormikProvider>
  )
}
