import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from 'types'
import styles from 'components/for_pages/Settings/TabEmailForm/index.module.scss'
import {profileEmailChangeOpen} from 'components/Modal/actions'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'

const TabEmailForm = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile

  const handleEmailChange = () => {
    dispatch(profileEmailChangeOpen())
  }

  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      <div className={styles.row}>
        <div className={styles.label}>{t('personalArea.tabSettings.fieldEmail')}:</div>
        <div className={styles.field}>
          {profile.email} <div className={styles.change} onClick={handleEmailChange}>{t('personalArea.tabSettings.change')}</div>
        </div>
      </div>

    </form>
  )
}

export default TabEmailForm
