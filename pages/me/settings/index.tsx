import {changePasswordOpen, confirmModalClose, confirmOpen, modalClose} from 'components/Modal/actions'
import Button from 'components/ui/Button'
import * as React from 'react'
import {useEffect, useState} from 'react'
import styles from './index.module.scss'

import {useDispatch, useSelector} from 'react-redux'
import {fetchProfileSettingsRequest, updateProfileSettingsRequest} from 'components/ProfileSettings/actions'
import {IProfileSettings, IRootState} from 'types'
import Loader from 'components/ui/Loader'
import RegistrationPhone from 'components/Auth/RegistrationPhone'
import RegistrationPhoneConfirm from 'components/Auth/RegistrationPhoneConfirm'
import {useTranslation} from 'next-i18next'
import {getAuthServerSide} from 'utils/auth'
import Layout from 'components/layout/Layout'
import TabPersonalForm from '../../../components/for_pages/Settings/TabPersonalForm'
import TabEmailForm from 'components/for_pages/Settings/TabEmailForm'
import TabPhoneForm from 'components/for_pages/Settings/TabPhoneForm'
import TabNotificationsForm from 'components/for_pages/Settings/TabNotificationsForm'
import Modals from 'components/layout/Modals'
import TabLanguageForm from 'components/for_pages/Settings/TabLanguageForm'
import {useAppContext} from 'context/state'
import ProfileRepository from 'data/repositories/ProfileRepostory'
import {useRouter} from 'next/router'
import {ProfileRole} from 'data/intefaces/IProfile'
import {logout} from 'components/Auth/actions'
import {SnackbarType} from "types/enums";
import {useAuthContext} from "context/auth_state";

interface Props {
  t?: (string) => string,
  user?: any
}
const TabSettings= (props: Props) => {
  const {t} = useTranslation('common')
  const dispatch = useDispatch()

  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)
  const appContext = useAppContext();
  const profile = appContext.profile
  //const loading = useSelector((state: IRootState) => state.profileSettings.loading)
  const [settings, setSettings] = useState<IProfileSettings | null>(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sendingInfo, setSendingInfo] = useState(false)
  const [sendingLang, setSendingLang] = useState(false)
  const [sendingSettings, setSendingSettings] = useState(false)

  const authContext = useAuthContext();
  useEffect(() => {
   ProfileRepository.getSettings().then(i => {setSettings(i); setLoading(false)});
  }, [])
  const handleSubmit = async (data) => {
    setSendingInfo(true);
    try {
      await ProfileRepository.updateProfile(profile.id, data);
      appContext.showSnackbar('Saved', SnackbarType.success)
      appContext.updateProfile(profile.role)
    }catch (e) {
      appContext.showSnackbar(e, SnackbarType.error)
    }
    setSendingInfo(false);
  }
  const handleSubmitNotificationSettings = async (data) => {
    setSendingSettings(true);
    try {
      await ProfileRepository.updateSettings(data);
     const settings = await ProfileRepository.getSettings()
      setSettings(settings);
      appContext.showSnackbar('Saved', SnackbarType.success)
    }catch (e) {
      appContext.showSnackbar(e, SnackbarType.error)
    }
    setSendingSettings(false);
  }
  const handleSubmitLangSettings = async (data) => {
    setSendingLang(true);
    try {
      await ProfileRepository.updateSettings(data);
      const settings = await ProfileRepository.getSettings()
      setSettings(settings);
      appContext.showSnackbar('Saved', SnackbarType.success)
    }catch (e) {
      appContext.showSnackbar(e, SnackbarType.error)
    }
    setSendingLang(false);
  }

  const handleConfirm = async () => {
    const deleted = await ProfileRepository.delete(profile.role)
    !deleted ? setLoading(true) : setLoading(false)
    dispatch(confirmModalClose())
    if(profile.role === ProfileRole.Client){
      router.push('/registration')
    }
    else if(profile.role === ProfileRole.Master){
      router.push('/MasterProfile')
    }
    else if(profile.role === ProfileRole.Volunteer){
      router.push('/VolunteerProfile')
    }
    else{
      authContext.logOut();
    }
  }

  const confirmData = () => {
    return  {description: t('personalArea.tabSettings.deleteMyAccountConfirm'), onConfirm: () => {handleConfirm()}, onCancel: () => {dispatch(confirmModalClose())}}
  }

  const handleRemoveAccount = () => {
    dispatch(confirmOpen(confirmData()))
  }

  return (
    <Layout>
    <div className={styles.root}>
      {loading && <Loader/>}
      {!loading && <div className={styles.form}>
        <div className={styles.title}>1. {t('personalInformation')}</div>
      <div className={styles.fieldset}>
       <TabPersonalForm onSubmit={handleSubmit} sending={sendingInfo} initialValues={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          birthday: profile.birthday,
          zipcode: profile.zipcode,
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
        <TabEmailForm profile={profile} />
          </div>
        <div className={styles.title}>4. {t('notifications')}</div>
            <div className={styles.fieldset}>
        <TabNotificationsForm  sending={sendingSettings} onSubmit={handleSubmitNotificationSettings} initialValues={settings ?? {}}/>
            </div>
        <div className={styles.title}>5. {t('defaultLanguage')}</div>
              <div className={styles.fieldset}>
                <TabLanguageForm sending={sendingLang} initialValues={settings ?? {}} onSubmit={handleSubmitLangSettings}/>
              </div>
        <div className={styles.title}>6. {t('changePassword')}</div>
                  <div className={styles.fieldset}>
        <Button white={true} borderGrey={true} bold={true} size={'12px 23px'} onClick={() => dispatch(changePasswordOpen())} >{t('personalArea.tabProfile.buttonChangePassword')}</Button>
                  </div>
        <div className={styles.title}>7. {t('deleteAccount')}</div>
                    <div className={styles.fieldset}>
        <Button className={styles.button} black={true}  size={'12px 30px'}  type={'button'} onClick={handleRemoveAccount}>{t('personalArea.tabSettings.deleteMyAccount')}</Button>
                    </div>
      </div>}
      <div className={styles.contacts}>
        {t('footer.contacts')}:
        <div className={styles.email}>
          <a href='mailto:admin@masterspages.com'>admin@masterspages.com</a>
        </div>
      </div>



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

export const getServerSideProps = getAuthServerSide({redirect: true})
