import styles from './index.module.scss'

import {Category, IRootState, ProfileData, SkillData, SkillListItem} from 'types'
import Card from 'components/PublicProfile/components/Card'
import {formatSkillList} from 'utils/skills'
import Accordion from 'components/PublicProfile/components/view/CardCategories/components/Accordion'
import {getCategoryTranslation} from 'utils/translations'

import { useSelector, useDispatch } from 'react-redux'
import Tab from 'components/PublicProfile/components/Tab'
import {DropDownCategory} from 'components/PublicProfile/components/DropDownCategory'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
interface Props{
  profile: ProfileData,
  isEdit: boolean,
  category,
  subCategory,
  categories: SkillData[]
  onCategoryChange: (category, subCategory) => void
}
const CardCategorySelector = (props: Props) => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation()
  const formLoading = useSelector((state: IRootState) => state.profile.formLoading)
  const showForm = useSelector((state: IRootState) => state.profile.showForms).find(key => key === 'categories');
  const {profile} = props;
  const categories = props.categories

 console.log("Categories", categories);

  const handleChangeCategory = (category) => {

    const newCategory = categories.find(cat => cat.category.id === category.value);
    console.log("ChangeCategory", newCategory.skills[0],categories);
    props.onCategoryChange(newCategory, newCategory.skills[0]);
  }
  const handleChangeSubCategory = (subCategory) => {
    props.onCategoryChange(props.category, subCategory)
  }
  return (
    <div className={styles.root}>
      <div className={styles.category}>
      <DropDownCategory options={categories.map(category => ({value: category.category.id, label: `${getCategoryTranslation(category.mainCategory, i18n.language)?.name || ''}/${getCategoryTranslation(category.category, i18n.language).name}`}))} item={(item) => <div>{item?.label}</div>} onChange={handleChangeCategory} value={props.category?.category.id} />
      <div className={styles.separator}/>
      </div>
        {props.category?.skills.map(skill => skill.subCategory ? <Tab isActive={props.subCategory?.subCategory.id === skill.subCategory.id} title={getCategoryTranslation(skill.subCategory, i18n.language).name} onClick={() => handleChangeSubCategory(skill)}/> : null)}

      </div>
  )
}

export default CardCategorySelector
