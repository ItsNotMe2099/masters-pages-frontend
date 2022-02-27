import Button from 'components/ui/Button'
import {Form, FormikProvider, useFormik} from 'formik'
import styles from './index.module.scss'
import Validator from 'utils/validator'
import Input from 'components/ui/Formik/Input'
import {useTranslation} from 'next-i18next'
import InputPassword from 'components/ui/Formik/InputPassword'
import {CheckBox} from 'components/ui/Formik/CheckBox'
import Link from 'next/link'
import CountryField from 'components/fields/CountryField'
import CityField from 'components/fields/CityField'
import PhoneField from 'components/fields/PhoneField'
import {IUser, UserRegType} from 'data/intefaces/IUser'
import * as React from 'react'
import {registrationPhoneSetCallback} from 'components/Auth/RegistrationPhone/actions'
import {registrationPhoneOpen} from 'components/Modal/actions'

import { useDispatch } from 'react-redux'
import {registrationCompleteSubmit} from 'components/Auth/RegistrationPage/actions'

interface Props {
  user: IUser
  onSubmit?: () => void
}

export default function CorporateAccountForm({user}: Props) {

  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const isSocialAuth = user.regType !== UserRegType.Site
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    jobTitle: '',
    email: user.email,
    phone: user.phone,
    password: '',
    organization: {
      name: '',
      zipcode: '',
      address: '',
      office: '',
      phone: '',
      site: '',
    },
    country: '',
    city: '',
    terms: false
  }

  const handleSubmit = async (data) => {
    console.log('Submit', data)
    dispatch(registrationCompleteSubmit(data))
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
            <Input name={'firstName'}  validate={Validator.required} labelType='cross' label={t('masterForm.firstName')} size='normal'/>
            <Input name={'lastName'}  validate={Validator.required} labelType='cross' label={t('masterForm.lastName')} size='normal'/>
            <Input name={'jobTitle'}  validate={Validator.required} labelType='cross' label={t('corporateAccount.jobTitle')} size='normal'/>
            <Input name={'email'}  validate={Validator.required} labelType='cross' label={t('corporateAccount.email')} size='normal' disabled={!!user.email}/>
            <PhoneField name={'phone'} labelType='cross' label={t('corporateAccount.phoneNumber')} disabled    onClick={handlePhoneClick}/>
            {!isSocialAuth && <InputPassword name={'password'} labelType='cross' label={t('auth.registrationPage.fieldPassword')} validate={Validator.required}/>}
            {!isSocialAuth && <InputPassword name={'passwordConfirm'} labelType='cross' label={t('auth.registrationPage.fieldPasswordConfirm')} validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}/>}
          </div>
          <div className={styles.organization}>
            <div className={styles.title}>
              {t('corporateAccount.organization')}
            </div>
            <Input name={'organization.name'}  validate={Validator.required} labelType='cross' label={t('corporateAccount.organizationName')} size='normal'/>
            <CountryField name={'country'}
                          validate={Validator.required} labelType='cross' label={t('masterForm.country')} size='normal'/>
            <CityField name={'geonameid'} countryCode={values.country}
                          validate={Validator.required} labelType='cross' label={t('corporateAccount.city')} size='normal'/>
            <Input name={'organization.zipcode'}  validate={Validator.required} labelType='cross' label={t('corporateAccount.postalCode')} size='normal'/>
            <Input name={'organization.address'}  validate={Validator.required} labelType='cross' label={t('corporateAccount.streetAndNumber')} size='normal'/>
            <Input name={'organization.office'}  validate={Validator.required} labelType='cross' label={t('corporateAccount.office')} size='normal'/>
            <PhoneField name={'organization.phone'} labelType='cross' label={t('corporateAccount.phoneNumber')}/>
            <Input name={'organization.site'} validate={Validator.required} labelType='cross' label={t('corporateAccount.site')} size='normal'/>
          </div>
        </div>
        <div className={styles.checkbox}>
          <CheckBox name={'terms'}/>
          <div className={styles.terms}>
            I agree with <Link href=''><a>Terms & Conditions</a></Link>
          </div>
        </div>
        <div className={styles.btn}>
          <Button green size='16px 72px'>{t('corporateAccount.submit')}</Button>
        </div>
      </Form>

    </FormikProvider>
  )
}
