import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import SkillForm from "components/Portfolio/SkillForm";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, SkillData, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from 'components/Portfolio/SkillModal/index.module.scss'
import {useTranslation, Trans} from 'react-i18next'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean,
  category?: SkillListItem,
  skill?: SkillData,
  onClose: () => void
}
const SkillModal = ({isOpen, category, skill, onClose}: Props) => {
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.skill.formLoading)
  const dispatch = useDispatch();
  const {t} = useTranslation('common');
  useEffect(() => {
    if(isOpen){
      dispatch(resetSkillForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    console.log("submit data", data)
    if(skill?.id){
      dispatch(updateSkill(skill.id, data))
    }else {
      dispatch(createSkill(data))
    }
  }
  console.log("")
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/${ skill ? 'pencil' : 'plus'}.svg`}/>
        </div>
        <div className={styles.title}>{skill ? t('portfolio.editCategory') : t('portfolio.addCategory')}</div>
      </div>
      <div className={styles.separator}></div>
      <SkillForm onSubmit={handleSubmit} initialValues={{priceType: 'fixed', categoryId: category?.id, ...skill}} skills={category?.skills} onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default SkillModal