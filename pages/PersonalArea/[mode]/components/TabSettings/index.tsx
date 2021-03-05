import {confirmOpen, modalClose} from "components/Modal/actions";
import { deleteSkillCategory } from "components/Skill/actions";
import Button from "components/ui/Button";
import TabSettingsForm from "pages/PersonalArea/[mode]/components/TabSettings/components/TabSettingsForm";
import * as React from "react";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from "react";
import {
  fetchProfileSettingsRequest,
  updateProfileSettingsRequest
} from "components/ProfileSettings/actions";
import {IRootState} from "types";
import Loader from "components/ui/Loader";
import {deleteProfile} from "components/Profile/actions";
import RegistrationPhone from "components/Auth/RegistrationPhone";
import RegistrationPhoneConfirm from "components/Auth/RegistrationPhoneConfirm";
import {useTranslation} from "react-i18next";
interface Props {
  t?: (string) => string,
}
const TabSettings= (props: Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.profileSettings.loading)
  const settings = useSelector((state: IRootState) => state.profileSettings.settings)
  useEffect(() => {
    dispatch(fetchProfileSettingsRequest());

  }, [])
  const handleSubmit = (data) => {
    console.log("Settings submit", data);
    dispatch(updateProfileSettingsRequest(data));
  }

  const handleRemoveAccount = () => {
    dispatch(confirmOpen({
      description: t('personalArea.tabSettings.deleteMyAccountConfirm'),
      onConfirm: () => {
        dispatch(deleteProfile(profile.role))
      }
    }));
  }
  return (
    <div className={styles.root}>
      <div className={styles.form}>
        {loading && <Loader/>}
        {!loading && <TabSettingsForm onSubmit={handleSubmit} initialValues={settings}/>}
      </div>
      <div className={styles.buttons}>
      <Button className={styles.button} black={true}  size={'12px 30px'}  type={'button'} onClick={handleRemoveAccount}>{t('personalArea.tabSettings.deleteMyAccount')}</Button>
      </div>
      {modalKey === 'registrationPhone' && <RegistrationPhone
        isOpen={true}
        userPhoneChange={true}
        onRequestClose={() =>{
          dispatch(modalClose())
        }}/>}
      {modalKey === 'registrationPhoneConfirm' && <RegistrationPhoneConfirm
        isOpen={true}
        onRequestClose={() =>{
          dispatch(modalClose())
        }}/>}
    </div>
  )
}

export default TabSettings
