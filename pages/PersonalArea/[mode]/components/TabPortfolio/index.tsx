import { confirmOpen, modalClose, skillCategoryModalOpen, skillModalOpen } from "components/Modal/actions";
import { deleteSkill, deleteSkillCategory, fetchSkillList } from "components/Skill/actions";
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import CategoryModal from "pages/PersonalArea/[mode]/components/TabPortfolio/components/CategoryModal";
import Skill from "pages/PersonalArea/[mode]/components/TabPortfolio/components/Skill";
import SkillCategoryHeader from "pages/PersonalArea/[mode]/components/TabPortfolio/components/SkillCategoryHeader";
import SkillModal from "pages/PersonalArea/[mode]/components/TabPortfolio/components/SkillModal";
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
    dispatch(fetchSkillList(profile.id))
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
        dispatch(deleteSkill(profile.id, item.id))
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
        dispatch(deleteSkillCategory(profile.id, item.id))
      }
    }));
  }
  return (
    <div className={styles.root}>
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
        <div className={styles.buttons}><Button white={true} borderGrey={true} bold={true} size={'12px 115px'} onClick={() => dispatch(skillCategoryModalOpen())}>Add Skill</Button></div>
      </div>}

      <SkillModal isOpen={modalKey === 'skillForm'} category={currentCategory} skill={currentSkill} onClose={() => dispatch(modalClose())}/>
      <CategoryModal isOpen={modalKey === 'skillCategoryForm'} onClose={() => dispatch(modalClose())}/>
    </div>
  )
}

export default TabPortfolio
