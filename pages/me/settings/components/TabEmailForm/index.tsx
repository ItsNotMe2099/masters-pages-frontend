import Button from "components/ui/Button";
import FormError from "components/ui/Form/FormError";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import { Field, reduxForm } from 'redux-form'
import {profileEmailChangeOpen, registrationPhoneOpen} from "components/Modal/actions";
import {useState} from "react";
import {registrationPhoneSetCallback} from "components/Auth/RegistrationPhone/actions";
import {useTranslation} from "i18n";
import NotificationsForm from 'pages/me/settings/components/NotificationsForm'

const TabEmailForm = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const handleEmailChange = () => {
    dispatch(profileEmailChangeOpen());
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

export default TabEmailForm;
