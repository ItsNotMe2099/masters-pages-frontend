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
import {useTranslation} from "react-i18next";
import NotificationsForm from 'pages/PersonalArea/settings/components/NotificationsForm'

export const TabPhoneForm = (props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const [newPhone, setNewPhone] = useState();

  const handlePhoneChange = () => {
    dispatch(registrationPhoneSetCallback((phone) => setNewPhone(phone)));
  }

    return (
      <form className={styles.root} onSubmit={props.handleSubmit}>
        <div className={styles.row}>
          <div className={styles.label}>{t('personalArea.tabSettings.fieldPhone')}:</div>
          <div className={styles.field}>
            {newPhone || profile.phone}
            <div className={styles.change} onClick={handlePhoneChange}>{t('personalArea.tabSettings.change')}</div>
          </div>
        </div>

      </form>
    )

}

