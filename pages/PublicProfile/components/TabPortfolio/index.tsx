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
