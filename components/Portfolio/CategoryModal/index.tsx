import { modalClose } from "components/Modal/actions";
import {
  createSkill,
  createSkillCategory,
  fetchSkillList,
  resetSkillForm,
  updateSkill
} from "components/Skill/actions";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import CategoryForm from "components/Portfolio/CategoryForm";
import SkillForm from "components/Portfolio/SkillForm";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, SkillData, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from 'components/Portfolio/CategoryModal/index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const CategoryModal = ({isOpen, onClose}: Props) => {
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.skill.formLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    if(isOpen){
      dispatch(resetSkillForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    console.log("submit data", data)
    dispatch(createSkillCategory(data))
  }
  console.log("")
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/plus.svg`}/>
        </div>
        <div className={styles.title}>Add Category</div>
      </div>
      <div className={styles.separator}></div>
      <CategoryForm onSubmit={handleSubmit} onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default CategoryModal
