import { confirmOpen, modalClose, skillCategoryModalOpen, skillModalOpen } from "components/Modal/actions";
import Skill from "components/Portfolio/Skill";
import SkillCategoryHeader from "components/Portfolio/SkillCategoryHeader";
import { deleteSkill, deleteSkillCategory, fetchSkillList } from "components/Skill/actions";
import Button from "components/ui/Button";

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

  useEffect(() => {
    dispatch(fetchProfileById(profile.id))
  }, [])
  useEffect(() => {
    console.log("List", list);
  }, [list])
  const handleAddSkill = (item: SkillListItem) => {

  }

  const handleRemoveSkill = (item: SkillData) => {

  }
  const handleEditSkill = (item: SkillData) => {

  }
  const handleRemoveCategory = (item: SkillListItem) => {

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
