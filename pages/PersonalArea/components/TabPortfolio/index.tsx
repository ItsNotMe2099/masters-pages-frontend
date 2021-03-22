import { confirmOpen, modalClose, skillCategoryModalOpen, skillModalOpen } from "components/Modal/actions";
import { deleteSkill, deleteSkillCategory, fetchSkillList } from "components/Skill/actions";
import TaskShareModal from "components/TaskShareModal";
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import CategoryModal from "components/Portfolio/CategoryModal";
import Skill from "components/Portfolio/Skill";
import SkillCategoryHeader from "components/Portfolio/SkillCategoryHeader";
import SkillModal from "components/Portfolio/SkillModal";
import { useEffect, useState } from "react";
import * as React from "react";
import { IRootState, SkillData, SkillListItem } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from 'pages/PersonalArea/components/TabPortfolio/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  t?: (string) => string,
}
const TabPortfolio = (props: Props) => {
  const {t} = props;
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const list = useSelector((state: IRootState) => state.skill.list)
  const loading = useSelector((state: IRootState) => state.skill.listLoading)
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  useEffect(() => {
    if(!profile?.id){
      return
    }
    dispatch(fetchSkillList())
  }, [profile])
  useEffect(() => {
    console.log("List", list);
  }, [list])
  const handleAddSkill = (item: SkillListItem) => {
    setCurrentSkill(null);
    setCurrentCategory(item);
    console.log("HandleAddSkill", item)
    dispatch(skillModalOpen());
  }

  const handleRemoveSkill = (item: SkillData) => {
    dispatch(confirmOpen({
      description: `Do you want to delete «${getCategoryTranslation(item.subCategory).name}»?`,
      onConfirm: () => {
        dispatch(deleteSkill(item.id))
      }
    }));
  }
  const handleEditSkill = (item: SkillData) => {
    console.log("ListEdit", item, list,list.find(cat => cat.id === item.categoryId))
    setCurrentCategory(list.find(cat => cat.id === item.categoryId));
    setCurrentSkill(item);
    dispatch(skillModalOpen());
  }
  const handleRemoveCategory = (item: SkillListItem) => {
    console.log("handleRemoveCategory", item.id)
    dispatch(confirmOpen({
      description: `Do you want to delete «${getCategoryTranslation(item).name}»?`,

      onConfirm: () => {
        dispatch(deleteSkillCategory(item.id))
      }
    }));
  }
  const hasCategory = list.length > 0;
  const hasSubCategory = list.find(category => category.skills.length > 0) || false;
  const hasPhotos = list.find(category => category.skills.find(skill => skill.photos.length > 0))
  const hasDescription = list.find(category => category.skills.find(skill => skill.description))
  const hasPrice = list.find(category => category.skills.find(skill => skill.price || skill.ratePerHour))

  return (
    <div className={styles.root}>
      {loading && <Loader/>}
      {!loading && <div className={styles.header}>
        <div className={styles.fillState}>
      <div className={styles.fillStateTitle}>Fill up your profile to get the best results</div>
      <div className={styles.fillStateItems}>
        <div className={`${styles.fillStateItem} ${hasCategory && styles.fillStateItemActive}`}>{hasCategory ? <img src="/img/icons/check.svg" alt=""/> : <span>01.</span>} Add Category</div>
        <div className={`${styles.fillStateItem} ${hasSubCategory && styles.fillStateItemActive}`}>{hasSubCategory ? <img src="/img/icons/check.svg" alt=""/> : <span>02.</span>} Add Sub Category</div>
        <div className={`${styles.fillStateItem} ${hasPhotos && styles.fillStateItemActive}`}>{hasPhotos ? <img src="/img/icons/check.svg" alt=""/> : <span>02.</span>}Upload photos</div>
        <div className={`${styles.fillStateItem} ${hasDescription && styles.fillStateItemActive}`}>{hasDescription ? <img src="/img/icons/check.svg" alt=""/> : <span>02.</span>} Add description</div>
        <div className={`${styles.fillStateItem} ${hasPrice && styles.fillStateItemActive}`}>{hasPrice ? <img src="/img/icons/check.svg" alt=""/> : <span>02.</span>} Set a price</div>
      </div>
        </div>

        <div className={styles.buttons}><Button white={true} borderGrey={true} bold={true} size={'15px 50px'} onClick={() => dispatch(skillCategoryModalOpen())}><span>Add new category</span></Button></div>
      </div>}

      {!loading && <div className={styles.categories}>
        {list.map((category) =>
          (<div className={styles.category}>
            <SkillCategoryHeader item={category} onAdd={handleAddSkill} onRemove={handleRemoveCategory} allowEdit={true}/>
            <div className={styles.skillList}>
            {category.skills.map((skill) =>
              (
                <Skill item={skill} onEdit={handleEditSkill} onRemove={handleRemoveSkill} allowEdit={true}/>
              )
            )}
            </div>
          </div>))}
      </div>}

      <SkillModal isOpen={modalKey === 'skillForm'} category={currentCategory} skill={currentSkill} onClose={() => dispatch(modalClose())}/>
      <CategoryModal isOpen={modalKey === 'skillCategoryForm'} onClose={() => dispatch(modalClose())}/>
    </div>
  )
}

export default TabPortfolio
