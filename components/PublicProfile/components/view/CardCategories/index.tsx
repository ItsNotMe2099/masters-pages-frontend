import styles from './index.module.scss'

import {IRootState, SkillData, SkillListItem} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {formatSkillList} from 'utils/skills'
import Accordion from 'components/PublicProfile/components/view/CardCategories/components/Accordion'
import {getCategoryTranslation} from 'utils/translations'

import { useSelector, useDispatch } from 'react-redux'
import Tab from 'components/PublicProfile/components/Tab'
import {hideProfileForm, showProfileForm} from 'components/Profile/actions'
import CardCategoryForm from 'components/PublicProfile/components/view/CardCategories/components/Form'
import FormActionButton from 'components/PublicProfile/components/FormActionButton'
import {createSkillCategory, deleteSkill, deleteSkillCategory, fetchSkillList} from 'components/Skill/actions'
import FormActionIconButton from 'components/PublicProfile/components/FormActionIconButton'
import {confirmOpen} from 'components/Modal/actions'
import { useTranslation } from 'next-i18next'
import {IProfile} from 'data/intefaces/IProfile'

interface Props{
  profile: IProfile,
  isEdit: boolean,
  subCategory,
  onCategoryChange: (categoryId, subCategoryId) => void
  onProfileUpdate?: () => void
}
const CardCategories = (props: Props) => {
  const {i18n, t} = useTranslation('common')
  const dispatch = useDispatch()
  const formLoading = useSelector((state: IRootState) => state.skill.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'categories')
  const {profile, isEdit, onCategoryChange, subCategory} = props
  const skillsCurrentProfile = useSelector((state: IRootState) => state.skill.list)
  const skills = props.isEdit ? skillsCurrentProfile : formatSkillList(profile.skills)

  const handleEditClick = () => {
    dispatch(showProfileForm( 'categories'))
  }
  const handleSubmit = async (data) => {
    dispatch(createSkillCategory(data))
    props.onProfileUpdate && props.onProfileUpdate()
    await dispatch(fetchSkillList())
    dispatch(hideProfileForm( 'categories'))
   }
  const handleCancel = () => {
    dispatch(hideProfileForm( 'categories'))
  }

  const handleRemoveCategory = (item: SkillListItem) => {
    dispatch(confirmOpen({
      description: `${t('doYouWantToDelete')} «${getCategoryTranslation(item, i18n.language).name}»?`,

      onConfirm: () => {
        dispatch(deleteSkillCategory(item.id))
      }
    }))
  }
  const handleRemoveSkill = (item: SkillData) => {
    dispatch(confirmOpen({
      description: `${t('doYouWantToDelete')} «${getCategoryTranslation(item.subCategory).name}»?`,
      onConfirm: () => {
        dispatch(deleteSkill(item.id))
      }
    }))
  }
  const handleSkillClick = (item: SkillData) => {
    onCategoryChange(item.categoryId, item.subCategoryId)
  }
  return (
    <Card isHidden={!isEdit && skills.length === 0} className={styles.root} isLoading={showForm && formLoading} title={t('worksInCategories')} toolbar={isEdit ? [<FormActionButton type={'create'} title={t('add')} onClick={handleEditClick}/>] : []}>
      {skills.map((category) => <Accordion title={<><div className={styles.accordionTitle}>{getCategoryTranslation(category.mainCategory, i18n.language)?.name}/{getCategoryTranslation(category.category, i18n.language)?.name}</div> </>} >
        {category.skills.map(skill => skill.subCategory ? <Tab isActive={subCategory?.subCategory.id === skill.subCategory.id} onClick={() => onCategoryChange(category, skill)}><div className={styles.tabTitle}>{getCategoryTranslation(skill.subCategory, i18n.language)?.name}</div> {isEdit && <FormActionIconButton type={'delete'} onClick={() => handleRemoveSkill(skill)}/>}</Tab> : null)}
      </Accordion>)}
      {showForm && <CardCategoryForm onSubmit={handleSubmit} onCancel={handleCancel}/>}
    </Card>
  )
}

export default CardCategories
