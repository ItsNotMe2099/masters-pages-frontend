import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import SelectInput from 'components/ui/Inputs/SelectInput'
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import { required } from 'utils/validations'
import styles from 'components/for_pages/Settings/TabLanguageForm/index.module.scss'
import { Field, reduxForm } from 'redux-form'
import {profileEmailChangeOpen, registrationPhoneOpen} from 'components/Modal/actions'
import {useState} from 'react'
import {registrationPhoneSetCallback} from 'components/Auth/RegistrationPhone/actions'
import { useTranslation } from 'next-i18next'

let TabLanguageForm = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector((state: IRootState) => state.profileSettings.formError)
  const loading = useSelector((state: IRootState) => state.profileSettings.formLoading)
  const [newPhone, setNewPhone] = useState()
  const handleEmailChange = () => {
    dispatch(profileEmailChangeOpen())
  }
  const handlePhoneChange = () => {
    dispatch(registrationPhoneSetCallback((phone) => setNewPhone(phone)))
    dispatch(registrationPhoneOpen())
  }
  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>

      <div className={styles.rows}>

        <div className={styles.row}>
          <div className={styles.label}>{t('personalArea.tabSettings.fieldLanguage')}:</div>
          <div className={styles.field}>
            <Field
              name={'language'}
              component={SelectInput}
              label={t('personalArea.tabSettings.fieldLanguage')}
              validate={required}
              options={[{label: 'EN', value: 'en'}, {label: 'RU', value: 'ru'}, {label: 'FR', value: 'fr'}]}
            />
          </div>
        </div>


      </div>

       <FormError error={error}/>
      <Button className={styles.button} disabled={props.sending} grey={true} bold={true} size={'12px 70px'}  type={'submit'}>{t('personalArea.tabSettings.buttonSave')}</Button>


    </form>
  )
}


TabLanguageForm  = reduxForm({
  form: 'TabLanguageForm',

}) (TabLanguageForm )


export default TabLanguageForm
