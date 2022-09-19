import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import styles from 'components/for_pages/Settings/TabPhoneForm/index.module.scss'
import {useState} from 'react'
import {registrationPhoneSetCallback} from 'components/Auth/RegistrationPhone/actions'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import {registrationPhoneOpen} from "components/Modal/actions";

const TabPhoneForm = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const user = appContext.user
  const [newPhone, setNewPhone] = useState()

  const handlePhoneChange = () => {
    dispatch(registrationPhoneSetCallback((phone) => {
      console.log("PhoneCallback", phone)
      setNewPhone(phone)
      appContext.updateTokenFromCookies()
    }))
    dispatch(registrationPhoneOpen());
  }

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <div className={styles.row}>
        <div className={styles.label}>{t('personalArea.tabSettings.fieldPhone')}:</div>
        <div className={styles.field}>
          {newPhone || user.phone}
          <div className={styles.change} onClick={handlePhoneChange}>{t('personalArea.tabSettings.change')}</div>
        </div>
      </div>

    </form>
  )

}
export default TabPhoneForm

