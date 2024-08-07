import Button from 'components/ui/Button'
import FormError from 'components/ui/Form/FormError'
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import styles from 'components/for_pages/Settings/TabNotificationsForm/index.module.scss'
import { reduxForm } from 'redux-form'
import {profileEmailChangeOpen, registrationPhoneOpen} from 'components/Modal/actions'
import {useState} from 'react'
import {registrationPhoneSetCallback} from 'components/Auth/RegistrationPhone/actions'
import { useTranslation } from 'next-i18next'
import NotificationsForm from 'components/for_pages/Settings/NotificationsForm'

let TabNotificationsForm = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const error = useSelector((state: IRootState) => state.profileSettings.formError)
  const loading = props.settings;
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
      <NotificationsForm {...props}/>
       <FormError error={error}/>
      <Button className={styles.button} disabled={loading}  grey={true} bold={true} size={'12px 70px'}  type={'submit'}>{t('personalArea.tabSettings.buttonSave')}</Button>

    </form>
  )
}


TabNotificationsForm  = reduxForm({
  form: 'tabNotificationsForm',

}) (TabNotificationsForm )


export default TabNotificationsForm
