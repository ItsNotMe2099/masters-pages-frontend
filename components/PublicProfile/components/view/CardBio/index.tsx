import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {IRootState, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {useState} from 'react'
import CardBioForm from 'components/PublicProfile/components/view/CardBio/Form'
import {hideProfileForm, showProfileForm, updateProfile, updateProfileByForm} from 'components/Profile/actions'
import Loader from 'components/ui/Loader'
import {useTranslation} from 'i18n'

interface Props{
  profile: ProfileData,
  isEdit: boolean
}
const CardBio = (props: Props) => {
  const dispatch = useDispatch();
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'bio');
  const {profile,isEdit} = props;
  const {t} = useTranslation('common');
  const handleEditClick = () => {
    dispatch(showProfileForm( 'bio'));

  }
  const handleSubmit = (data) => {
    dispatch(updateProfileByForm(profile.id, {bio: {...data, visible: true}}, 'bio'));
  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'bio'));
  }

  return (
    <Card isHidden={!isEdit && !profile.bio?.bio} className={styles.root} isLoading={showForm && formLoading} title={t('personalArea.profile.bio')} toolbar={isEdit ? [<FormActionButton type={profile.bio?.bio ? 'edit' : 'create'} title={profile.bio?.bio ? t('edit') : t('add')} onClick={handleEditClick}/>] : []}>
      {!showForm ? <div className={styles.bioText}>{profile.bio?.bio}</div> : <CardBioForm onCancel={handleCancel} onSubmit={handleSubmit} initialValues={profile.bio || {}}/>}
      {showForm && formLoading && <div className={styles.loader}><Loader/></div>}
    </Card>
  )
}

export default CardBio
