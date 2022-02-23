import Button from 'components/ui/Button'
import { Form, Formik } from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import Validator from 'utils/validator'
import Input from 'components/ui/Formik/Input'
import { useTranslation } from 'i18n'
import InputPhone from 'components/ui/Formik/InputPhone'
import InputPassword from 'components/ui/Formik/InputPassword'


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
    phoneNumber: '',
    password: '',
    organizationName: '',
    country: '',
    city: '',
    province: '',
    postalCode: '',
    street: '',
    office: '',
    organizationPhone: '',
    site: '',
    terms: false
  }

  const handleSubmit = async () => {
   
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({setFieldValue, values}) => (
      <Form className={styles.form}>
        <div className={styles.representative}>
          <div className={styles.title}>
            {t('corporateAccount.representative')}
          </div>
          <Input name={'firstName'} className={styles.input} validate={Validator.required} labelType='cross' label={t('masterForm.firstName')} size='normal'/>
          <Input name={'lastName'} className={styles.input} validate={Validator.required} labelType='cross' label={t('masterForm.lastName')} size='normal'/>
          <Input name={'jobTitle'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.jobTitle')} size='normal'/>
          <Input name={'email'} className={styles.input} validate={Validator.required} labelType='cross' label={t('corporateAccount.email')} size='normal'/>
          <InputPhone name={'phoneNumber'}/>
          <InputPassword name={'password'} labelType='cross' label={t('auth.registrationPage.fieldPassword')} validate={Validator.required}/>
          <InputPassword name={'passwordConfirm'} labelType='cross' label={t('auth.registrationPage.fieldPasswordConfirm')} validate={Validator.combine([Validator.required, Validator.passwordsMustMatch(values)])}/>
        </div>
        <div className={styles.organization}>
          <div className={styles.title}>
            {t('corporateAccount.organization')}
          </div>
         
        </div>
      </Form>
      )}
    </Formik>
  )
}
