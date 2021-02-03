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
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {

}
const TabPortfolio = (props: Props) => {
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
  return (
    <div className={styles.root}>
        <div className={styles.fill}>Fill up your profile to get the<br/> best results</div>
        <div className={styles.add}>
          <div className={list.length ? styles.check : styles.addItem}><span>{list.length ? <img src="/img/icons/check.svg" alt=""/> : <span>01.</span>} Add Category</span></div>
          <div className={list.length ? styles.check : styles.addItem}><span>{list.length ? <img src="/img/icons/check.svg" alt=""/> : <span>02.</span>} Add Sub Category</span></div>
          <div className={styles.addItem}><span>03. Upload photos</span></div>
          <div className={styles.addItem}><span>04. Add description</span></div>
          <div className={styles.addItem}><span>05. Set a price</span></div>
        </div>
        <div className={styles.buttons}><Button white={true} borderGrey={true} bold={true} size={'15px 50px'} onClick={() => dispatch(skillCategoryModalOpen())}><span>Add new category</span></Button></div>
        {loading && <Loader/>}
      {!loading && <div className={styles.split}><div className={styles.categories}>
        {list.map((category) =>
          (<div className={styles.category}>
            <SkillCategoryHeader item={category} onAdd={handleAddSkill} onRemove={handleRemoveCategory}/>
            <div className={styles.skillList}>
            {category.skills.map((skill) =>
              (
                <Skill item={skill} onEdit={handleEditSkill} onRemove={handleRemoveSkill}/>
              )
            )}
            </div>
          </div>))}
      </div>
      </div>}

      <SkillModal isOpen={modalKey === 'skillForm'} category={currentCategory} skill={currentSkill} onClose={() => dispatch(modalClose())}/>
      <CategoryModal isOpen={modalKey === 'skillCategoryForm'} onClose={() => dispatch(modalClose())}/>
    </div>
  )
}

export default TabPortfolio
