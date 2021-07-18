import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {IRootState, ProfileData, ProfileWorkExperience, SkillData} from 'types'
import Card from 'components/PublicProfile/components/Card'
import CardWorkExperienceListItem
  from 'components/PublicProfile/components/view/CardWorkExperience/components/CardWorkExperienceListItem'
import WorkExperienceForm
  from 'components/PublicProfile/components/view/CardWorkExperience/components/WorkExperienceForm'
import {default as React, useEffect, useState} from 'react'
import {
  createProfileWorkExperience, deleteProfileWorkExperience,
  fetchProfileWorkExperienceList,
  updateProfileWorkExperience
} from 'components/ProfileWorkExpirience/actions'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {hideProfileForm, showProfileForm} from 'components/Profile/actions'
import {updateSkillByForm} from 'components/Skill/actions'
import SalesPitchForm from 'components/PublicProfile/components/view/CardSalesPitch/Form'
import CardAdd from 'components/PublicProfile/components/CardAdd'
import {confirmOpen} from 'components/Modal/actions'
import {taskNegotiationDeclineConditions} from 'components/TaskNegotiation/actions'
import {useTranslation} from 'react-i18next'

interface Props{
  profile: ProfileData,
  isEdit: boolean,
  skill: SkillData
}
const CardWorkExperience = (props: Props) => {
  const { profile, skill, isEdit } = props;
  const dispatch = useDispatch();
  const {i18n, t} = useTranslation('common')

  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'workExperience');
  const list = useSelector((state: IRootState) => state.profileWorkExperience.list);
  const listLoading = useSelector((state: IRootState) => state.profileWorkExperience.listLoading);
  const formLoading = useSelector((state: IRootState) => state.profileWorkExperience.formLoading);
  const [currentEditModel, setCurrentEditModel] = useState(null);
  useEffect(() => {
    if(!skill){
      return;
    }
    dispatch(fetchProfileWorkExperienceList({
      profileId: profile.id,
      categoryId: skill.categoryId,
      subCategoryId: skill.subCategoryId
    }));
  }, [skill]);

  const handleCreateClick = () => {
    setCurrentEditModel(null);
    dispatch(showProfileForm( 'workExperience'));

  }
  const handleSubmit = (data) => {
    console.log("HandleSubmit", data);
    if(!currentEditModel) {
      dispatch(createProfileWorkExperience({
        profileId: profile.id,
        categoryId: skill.categoryId,
        subCategoryId: skill.subCategoryId, ...data
      }, 'workExperience'));
    }else{
      dispatch(updateProfileWorkExperience(currentEditModel.id, {...data
      }, 'workExperience'));
    }
  }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'workExperience'));
  }
  const handleEdit = (model: ProfileWorkExperience) => {
    setCurrentEditModel(model);
    dispatch(showProfileForm( 'workExperience'));
  }
  const handleDelete = (model: ProfileWorkExperience) => {
    dispatch(confirmOpen({
      description: t('post.areYouSureToDelete', { model }),
      onConfirm: () => {
        dispatch(deleteProfileWorkExperience(model.id));
      }
    }));

  }
  return (
    <Card isHidden={!isEdit && !listLoading && list.length === 0} isLoading={formLoading} className={styles.root} title={t('cardWorkExperience.qualification')}
          toolbar={isEdit ? [<FormActionButton type={'create'} title={t('add')} onClick={handleCreateClick}/>] : []}>
      {!showForm && list.map(item => <CardWorkExperienceListItem isEdit={isEdit} model={item} onEdit={handleEdit} onDelete={handleDelete}/>)}
      {(!showForm && isEdit && list.length === 0 && !listLoading) && <CardAdd title={t('cardWorkExperience.addWorkExperience')} icon={'add_work_experience'}  onClick={handleCreateClick} /> }

      {showForm && <WorkExperienceForm onSubmit={handleSubmit} onCancel={handleCancel} initialValues={currentEditModel}/>}

    </Card>
  )
}

export default CardWorkExperience
