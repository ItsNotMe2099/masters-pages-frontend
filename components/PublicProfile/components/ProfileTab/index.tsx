import styles from './index.module.scss'
import {IProfileTab, IRootState} from 'types'
import {useEffect, useState} from 'react'
import FormActionIconButton from 'components/PublicProfile/components/FormActionIconButton'
import Loader from 'components/ui/Loader'
import { useSelector, useDispatch } from 'react-redux'
import {createProfileTab} from 'components/ProfileTab/actions'
import {showProfileForm} from 'components/Profile/actions'
import {useTranslation} from 'i18n'
interface Props{
  isAll?: boolean
  isNew?: boolean
  isEdit?: boolean
  isActive?: boolean
  type: string,
  onClick?: () => void
  onSubmit?: (value) => void,
  profileTab?: IProfileTab
}
const ProfileTab = (props: Props) => {
  const dispatch = useDispatch();
  const formNewKey = `profileTab_${props.type}New`;
  const formEditKey = `profileTab_${props.type}${props.profileTab?.id}`;
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key =>  props.isNew ? key === formNewKey : key === formEditKey);
  const {t} = useTranslation('common');

  const [value, setValue] = useState(props.profileTab?.title || '');
  useEffect(() => {
    if(props.isNew && !showForm){
      setValue('');
    }
  }, [showForm])
  const handleEditClick = (e) => {
    e.stopPropagation();
    dispatch(showProfileForm( formEditKey));
  }
  const handleInputClick = (e) => {
    e.stopPropagation();
  }
  const handleDeleteClick = () => {

  }
  const handleNewClick = () => {
    dispatch(showProfileForm( formNewKey));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("UpdateTabValue", value);
    props.onSubmit(value);
  }
  const handleInputChange = (e) => {
    setValue(e.currentTarget.value);
  }
  return (
    <div className={`${styles.root} ${props.isEdit && styles.rootEdit}  ${showForm && styles.rootForm} ${(props.isActive && !showForm) && styles.rootActive} ${props.isNew && styles.rootNew}`} onClick={props.isNew ? handleNewClick : props.onClick}>
      {showForm && !props.isAll ? <form onSubmit={handleSubmit}><input className={styles.input} value={value} onClick={handleInputClick} onChange={handleInputChange}/></form> : props.isNew ? t('addNew') : (props.isAll ? t('all') : props.profileTab.title || '')}
      {(props.isEdit && !props.isNew && !showForm) && <div className={styles.editBtn}><FormActionIconButton type={'edit'} onClick={handleEditClick}/></div>}
      {(showForm) && <div className={styles.deleteBtn}><FormActionIconButton type={'delete'} onClick={handleDeleteClick}/></div>}
    </div>
  );
}

export default ProfileTab
