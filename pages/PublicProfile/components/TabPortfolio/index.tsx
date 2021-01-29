import { confirmOpen, modalClose, skillCategoryModalOpen, skillModalOpen } from "components/Modal/actions";
import { deleteSkill, deleteSkillCategory, fetchSkillList } from "components/Skill/actions";
import TaskShareModal from "components/TaskShareModal";
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
import { fetchProfileById } from "components/PublicProfile/actions";
interface Props {

}
const TabPortfolio = (props: Props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.publicProfile.profile)
  const list = useSelector((state: IRootState) => state.publicProfile.skills)

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  useEffect(() => {
    dispatch(fetchProfileById(profile.id))
  }, [])
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
        <div className={styles.fill}>Fill up your profile to get the<br/> best results</div>
        <div className={styles.add}>
          <div className={styles.addItem}><span><span>01.</span> Add Category</span></div>
          <div className={styles.addItem}><span><span>02.</span> Add Sub Category</span></div>
          <div className={styles.addItem}><span>03. Upload photos</span></div>
          <div className={styles.addItem}><span>04. Add description</span></div>
          <div className={styles.addItem}><span>05. Set a price</span></div>
        </div>
        <div className={styles.buttons}><Button white={true} borderGrey={true} bold={true} size={'15px 50px'} onClick={() => dispatch(skillCategoryModalOpen())}><span>Add new category</span></Button></div>
      { <div className={styles.split}><div className={styles.categories}>
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
    </div>
  )
}

export default TabPortfolio
