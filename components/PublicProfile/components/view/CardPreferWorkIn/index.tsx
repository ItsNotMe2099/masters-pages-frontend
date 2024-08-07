import styles from './index.module.scss'

import {IProfilePreferWorkIn, IRootState} from 'types'
import Card from 'components/PublicProfile/components/Card'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import { useSelector, useDispatch } from 'react-redux'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {hideProfileForm, showProfileForm, updateProfileByForm} from 'components/Profile/actions'
import PreferWorkInForm from 'components/PublicProfile/components/view/CardPreferWorkIn/components/Form'
import {changeArrayOrder} from 'utils/array'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'
import ProfileRepository from 'data/repositories/ProfileRepostory'
interface Props{
  profile: IProfile,
  isEdit: boolean
  onProfileUpdate?: () => void
}
const CardPreferWorkIn = (props: Props) => {
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'preferWorkIn')
  const { profile, isEdit } = props
  const {t} = useTranslation('common')

  const handleEditClick = () => {
    dispatch(showProfileForm( 'preferWorkIn'))
  }
  const handleSubmit = async (data) => {
    //dispatch(updateProfileByForm(profile.id, {preferToWorkIn: [...profile.preferToWorkIn ? profile.preferToWorkIn : [], {...(data.type === 'offline' ? data : {}), type: data.type || 'offline'}]}, 'preferWorkIn'))
    await ProfileRepository.updateProfile(profile.id, {preferToWorkIn: [...profile.preferToWorkIn ? profile.preferToWorkIn : [], {...(data.type === 'offline' ? data : {}), type: data.type || 'offline'}]})
    props.onProfileUpdate && props.onProfileUpdate()
    dispatch(hideProfileForm( 'preferWorkIn'))
  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'preferWorkIn'))
  }
  const handleMoveUp = async (model: IProfilePreferWorkIn, index: number) => {
    const newArray = changeArrayOrder(profile.preferToWorkIn, index, index - 1)
     //dispatch(updateProfileByForm(profile.id, {preferToWorkIn: newArray}, 'preferWorkIn'))
     await ProfileRepository.updateProfile(profile.id, {preferToWorkIn: newArray})
     props.onProfileUpdate && props.onProfileUpdate()
  }

  const handleMoveDown = async (model: IProfilePreferWorkIn, index: number) => {
    const newArray = changeArrayOrder(profile.preferToWorkIn, index, index + 1)
    //dispatch(updateProfileByForm(profile.id, {preferToWorkIn: newArray}, 'preferWorkIn'))
    await ProfileRepository.updateProfile(profile.id, {preferToWorkIn: newArray})
    props.onProfileUpdate && props.onProfileUpdate()
  }
  const handleDelete = async (model: IProfilePreferWorkIn, index: number) => {
    const newArray = [...profile.preferToWorkIn]
    newArray.splice(index, 1)
    //dispatch(updateProfileByForm(profile.id, {preferToWorkIn: newArray}, 'preferWorkIn'))
    await ProfileRepository.updateProfile(profile.id, {preferToWorkIn: newArray})
    props.onProfileUpdate && props.onProfileUpdate()
  }
  return (
    <Card isHidden={!isEdit && profile.preferToWorkIn.length === 0} className={styles.root} isLoading={showForm && formLoading} title={t('cardPreferToWorkIn.prefer')} toolbar={isEdit ? [<FormActionButton type={'create'} title={t('add')} onClick={handleEditClick}/>] : []}>
      {profile.preferToWorkIn.map((item, index) => <WorkInListItem isEdit={isEdit} index={index} model={item} onMoveUp={(index > 0  && profile.preferToWorkIn.length > 1) ? handleMoveUp : null} onMoveDown={(index == 0  && profile.preferToWorkIn.length > 1) ? handleMoveDown : null} onDelete={handleDelete}/>)}
      {(showForm) && <PreferWorkInForm onSubmit={handleSubmit} onCancel={handleCancel}/>}

    </Card>
  )
}

export default CardPreferWorkIn
