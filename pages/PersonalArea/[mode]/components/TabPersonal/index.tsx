import { changePasswordOpen, loaderOpen, modalClose } from "components/Modal/actions";
import { updateProfile } from "components/Profile/actions";
import AvatarInput from "components/ui/AvatarInput";
import Button from "components/ui/Button";
import AvatarForm from "pages/PersonalArea/[mode]/components/TabPersonal/components/AvatarForm";
import TabPersonalForm from "pages/PersonalArea/[mode]/components/TabPersonal/components/TabPersonalForm";
import { useCallback, useEffect } from "react";
import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
interface Props {

}
const TabPersonal = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)

  useEffect(() => {
    if(formLoading){
      dispatch(loaderOpen());
    }else{
      dispatch(modalClose());
    }
  }, [formLoading])
  const handleSubmit = useCallback((data) => {
    dispatch(updateProfile( profile.id, data));
  }, [profile]);
  useEffect(() => {
    console.log("Profile photo", profile.photo)

  }, [profile])
  const handleSubmitAvatar = useCallback((data) => {
    console.log("Handle Submit Avatar", data)
    dispatch(updateProfile( profile.id, {photo: data.photo}));
  }, [profile]);

  const handleDeleteAvatar = useCallback(() => {
    console.log("Handle delete Avatar")
    dispatch(updateProfile( profile.id, {photo: null}));
  }, [profile]);
  return (
    <div className={styles.root}>
      <div className={styles.formTip}>*required field</div>
      <div className={styles.top}>
        <div className={styles.avatarForm}>
          {profile?.id && <AvatarForm onSubmit={handleSubmitAvatar} handleDelete={handleDeleteAvatar} initialValues={{photo: profile.photo}}/>}
        </div>
        <Button white={true} borderGrey={true} bold={true} size={'12px 23px'} onClick={() => dispatch(changePasswordOpen())} >Change Password</Button>
      </div>
      <div className={styles.separator}/>
      <div className={styles.form}>
        {profile?.id && <TabPersonalForm onSubmit={handleSubmit} initialValues={profile}/>}
      </div>
    </div>
  )
}

export default TabPersonal
