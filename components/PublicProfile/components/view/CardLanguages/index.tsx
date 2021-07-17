import styles from './index.module.scss'

import {IProfilePreferWorkIn, IRootState, ProfileData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import {hideProfileForm, showProfileForm, updateProfileByForm} from 'components/Profile/actions'
import {changeArrayOrder} from 'utils/array'

import { useSelector, useDispatch } from 'react-redux'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import LanguageForm from 'components/PublicProfile/components/view/CardLanguages/components/Form'

interface Props{
  profile: ProfileData,
  isEdit: boolean

}
const CardLanguages = (props: Props) => {
  const dispatch = useDispatch();
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'language');
  const { profile, isEdit } = props;

  const handleEditClick = () => {
    dispatch(showProfileForm( 'language'));
  }
  const handleSubmit = (data) => {
    dispatch(updateProfileByForm(profile.id, {languages: [...profile.languages ? profile.languages : [], data.language]}, 'language'));
  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'language'));
  }
  const handleMoveUp = (model: IProfilePreferWorkIn, index: number) => {
    const newArray = changeArrayOrder(profile.languages, index, index - 1);
    dispatch(updateProfileByForm(profile.id, {languages: newArray}, 'language'));
  }

  const handleMoveDown = (model: IProfilePreferWorkIn, index: number) => {
    const newArray = changeArrayOrder(profile.languages, index, index + 1);
    dispatch(updateProfileByForm(profile.id, {languages: newArray}, 'language'));
  }
  const handleDelete = (model: IProfilePreferWorkIn, index: number) => {
    const newArray = [...profile.languages];
    newArray.splice(index, 1)
    dispatch(updateProfileByForm(profile.id, {languages: newArray}, 'language'));
  }

  return (
    <Card isHidden={!isEdit && profile.languages?.length === 0} className={styles.root} isLoading={showForm && formLoading} title={'Languages'} toolbar={isEdit ? [<FormActionButton type={'create'} title={'Add'} onClick={handleEditClick}/>] : []}>
      {profile.languages.map((item, index) => <LanguageListItem isEdit={isEdit} index={index} model={item} onMoveUp={(index > 0  && profile.preferToWorkIn.length > 1) ? handleMoveUp : null} onMoveDown={(index == 0  && profile.preferToWorkIn.length > 1) ? handleMoveDown : null} onDelete={handleDelete} />)}
      {showForm && <LanguageForm onSubmit={handleSubmit} onCancel={handleCancel}/>}
    </Card>
  )
}

export default CardLanguages
