import Button from 'components/ui/Button'
import { Form, Formik } from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import Validator from 'utils/validator'
import Input from 'components/ui/Formik/Input'
import { useTranslation } from 'i18n'
import InputPhone from 'components/ui/Formik/InputPhone'
import InputPassword from 'components/ui/Formik/InputPassword'
import { CheckBox } from 'components/ui/Formik/CheckBox'
import Link from 'next/link'


interface Props {
  onSubmit?: () => void
}

export default function CorporateAccountForm(props: Props) {

  const { t } = useTranslation('common')

  const initialValues = {
    firstName: '', 
    lastName: '',
    jobTitle: '',
    email: '',
    phoneNumber: null,
    password: '',
    organizationName: '',
    country: '',
    city: '',
    province: '',
    postalCode: '',
    street: '',
    office: '',
    organizationPhone: null,
    site: '',
    terms: false
  }

  const handleSubmit = async () => {
    
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({setFieldValue, values}) => (
      <Form className={styles.form}>
        <div className={styles.container}>
          <div className={styles.representative}>
            <div className={styles.title}>
              {t('corporateAccount.representative')}
            </div>
            <Input name={'firstName'} className={styles.input} validate={Validator.required} labelType='cross' label={t('masterForm.firstName')} size='normal'/>
            <Input name={'lastName'} className={styles.input} validate={Validator.required} labelType='cross' label={t('masterForm.lastName')} size='normal'/>
            <Input name={'jobTitle'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.jobTitle')} size='normal'/>
            <Input name={'email'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.email')} size='normal'/>
            <InputPhone name={'phoneNumber'} labelType='cross' label={t('corporateAccount.phoneNumber')}/>
            <InputPassword name={'password'} labelType='cross' label={t('auth.registrationPage.fieldPassword')} validate={Validator.required}/>
            <InputPassword name={'passwordConfirm'} labelType='cross' label={t('auth.registrationPage.fieldPasswordConfirm')} validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}/>
          </div>
          <div className={styles.organization}>
            <div className={styles.title}>
              {t('corporateAccount.organization')}
            </div>
            <Input name={'organizationName'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.organizationName')} size='normal'/>
            <Input name={'country'} className={styles.input} validate={Validator.required} labelType='cross' label={t('masterForm.country')} size='normal'/>
            <Input name={'city'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.city')} size='normal'/>
            <Input name={'postalCode'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.postalCode')} size='normal'/>
            <Input name={'street'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.streetAndNumber')} size='normal'/>
            <Input name={'office'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.office')} size='normal'/>
            <InputPhone name={'organizationPhone'} labelType='cross' label={t('corporateAccount.phoneNumber')}/>
            <Input name={'site'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.site')} size='normal'/>
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
      )}
    </Formik>
  )
}
