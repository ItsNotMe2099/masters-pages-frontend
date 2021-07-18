import {changePasswordOpen, confirmOpen, modalClose} from "components/Modal/actions";
import { deleteSkillCategory } from "components/Skill/actions";
import Button from "components/ui/Button";
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
import {getAuthServerSide} from 'utils/auth'
import Layout from 'components/layout/Layout'
import TabSettingsForm from 'pages/me/settings/components/TabSettingsForm'
import TabPersonalForm from './components/TabPersonalForm'
import TabEmailForm from 'pages/me/settings/components/TabEmailForm'
import TabPhoneForm from 'pages/me/settings/components/TabPhoneForm'
import TabNotificationsForm from 'pages/me/settings/components/TabNotificationsForm'
import Modals from 'components/layout/Modals'
import TabLanguageForm from 'pages/me/settings/components/TabLanguageForm'
interface Props {
  t?: (string) => string,
  user?: any
}
const TabSettings= (props: Props) => {
  const {t} = useTranslation('common');
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
    <Layout>
    <div className={styles.root}>
      {loading && <Loader/>}
      {!loading && <div className={styles.form}>
        <div className={styles.title}>1. {t('personalInformation')}</div>
      <div className={styles.fieldset}>
       <TabPersonalForm onSubmit={handleSubmit} initialValues={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          birthday: profile.birthday,
          postcode: profile.postcode,
          address1: profile.address1,
          address2: profile.address2,
          geonameid: profile.geonameid,
          countryCode: profile.geoname?.country}}/>
      </div>
        <div className={styles.title}>2. {t('phone')}</div>
        <div className={styles.fieldset}>
        <TabPhoneForm profile={profile}/>
        </div>
        <div className={styles.title}>3. {t('email')}</div>
          <div className={styles.fieldset}>
        <TabEmailForm profile={profile}/>
          </div>
        <div className={styles.title}>4. {t('notifications')}</div>
            <div className={styles.fieldset}>
        <TabNotificationsForm onSubmit={handleSubmit} initialValues={settings}/>
            </div>
        <div className={styles.title}>5. {t('defaultLanguage')}</div>
              <div className={styles.fieldset}>
                <TabLanguageForm/>
              </div>
        <div className={styles.title}>6. {t('defaultTimezone')}</div>
                <div className={styles.fieldset}></div>
        <div className={styles.title}>7. {t('changePassword')}</div>
                  <div className={styles.fieldset}>
        <Button white={true} borderGrey={true} bold={true} size={'12px 23px'} onClick={() => dispatch(changePasswordOpen())} >{t('personalArea.tabProfile.buttonChangePassword')}</Button>
                  </div>
        <div className={styles.title}>8. {t('deleteProfiles')}</div>
        <div className={styles.title}>9. {t('deleteAccount')}</div>
                    <div className={styles.fieldset}>
        <Button className={styles.button} black={true}  size={'12px 30px'}  type={'button'} onClick={handleRemoveAccount}>{t('personalArea.tabSettings.deleteMyAccount')}</Button>
                    </div>
      </div>}



      {modalKey === 'registrationPhone' && <RegistrationPhone
        isOpen={true}
        userPhoneChange={true}
        userHasPassword={props.user?.regType === 'site'}
        onRequestClose={() =>{
          dispatch(modalClose())
        }}/>}
      {modalKey === 'registrationPhoneConfirm' && <RegistrationPhoneConfirm
        isOpen={true}
        onRequestClose={() =>{
          dispatch(modalClose())
        }}/>}
    </div>
      <Modals/>
    </Layout>
  )
}

export default TabSettings

export const getServerSideProps = getAuthServerSide({redirect: true});