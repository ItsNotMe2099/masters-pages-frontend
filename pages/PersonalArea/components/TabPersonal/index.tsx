import { changePasswordOpen, loaderOpen, modalClose } from "components/Modal/actions";
import {updateProfile, updateProfileAvatar} from "components/Profile/actions";
import AvatarInput from "components/ui/AvatarInput";
import Button from "components/ui/Button";
import AvatarForm from "pages/PersonalArea/components/TabPersonal/components/AvatarForm";
import TabPersonalForm from "pages/PersonalArea/components/TabPersonal/components/TabPersonalForm";
import { useCallback, useEffect } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import styles from 'pages/PersonalArea/components/TabPersonal/index.module.scss'
import {useTranslation, withTranslation} from "react-i18next";
interface Props {
}
const TabPersonal = (props: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)

  console.log("Tab Profile", props)
  useEffect(() => {
    if(formLoading){
      dispatch(loaderOpen());
    }else{
      dispatch(modalClose());
    }
  }, [formLoading])
  const handleSubmit = (data) => {
    dispatch(updateProfile(profile.id, data));
  };
  useEffect(() => {
    console.log("Profile photo", profile.photo)

  }, [profile])
  const handleSubmitAvatar =(data) => {
    console.log("Handle Submit Avatar", data)
    dispatch(updateProfileAvatar(profile.id, {photo: data.photo}));
  }

  const handleDeleteAvatar = () => {
    console.log("Handle delete Avatar")
    dispatch(updateProfile(profile.id, {photo: null}));
  }
  return (
    <div className={styles.root}>
      <div className={styles.formTip}>*required field</div>
      <div className={styles.top}>
        <div className={styles.avatarForm}>
          {profile?.id && <AvatarForm onSubmit={handleSubmitAvatar} handleDelete={handleDeleteAvatar} initialValues={{photo: profile.photo}}/>}
        </div>
        <div className={styles.wrapper}><Button white={true} borderGrey={true} bold={true} size={'12px 23px'} onClick={() => dispatch(changePasswordOpen())} >{t('personalArea.tabProfile.buttonChangePassword')}</Button></div>
      </div>
      <div className={styles.separator}/>
      <div className={styles.form}>
        {profile?.id && <TabPersonalForm onSubmit={handleSubmit} initialValues={{
          firstName: profile.firstName,
          lastName: profile.lastName,
          birthday: profile.birthday,
          postcode: profile.postcode,
          address1: profile.address1,
          address2: profile.address2,
          geonameid: profile.geonameid,
          countryCode: profile.geoname?.country}}/>}
      </div>
    </div>
  )
}

export default TabPersonal
