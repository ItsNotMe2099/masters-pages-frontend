import * as React from 'react'
import { useDispatch } from 'react-redux'
import styles from 'components/for_pages/Settings/TabPhoneForm/index.module.scss'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import { profilePhoneChangeOpen } from 'components/Modal/actions'

const TabPhoneForm = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile

  const handlePhoneChange = () => {
    dispatch(profilePhoneChangeOpen())
  }

    return (
      <form className={styles.root} onSubmit={props.handleSubmit}>
        <div className={styles.row}>
          <div className={styles.label}>{t('personalArea.tabSettings.fieldPhone')}:</div>
          <div className={styles.field}>
            {profile.phone}
            <div className={styles.change} onClick={handlePhoneChange}>{t('personalArea.tabSettings.change')}</div>
          </div>
        </div>
      </form>
    )

}
export default TabPhoneForm

