import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import { acceptTaskOffer } from "components/TaskOffer/actions";
import TaskOfferAcceptForm from "components/TaskOffer/TaskOfferAcceptModal/TaskOfferAcceptForm";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import SkillForm from "pages/PersonalArea/[mode]/components/TabPortfolio/components/SkillForm";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskOfferAcceptModal = ({isOpen, onClose}: Props) => {
  const loading = useSelector((state: IRootState) => state.taskOffer.formLoading)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)

  console.log("Tassss", task)
  const dispatch = useDispatch();
  useEffect(() => {
    if(isOpen){
      dispatch(resetSkillForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    console.log("submit data", data)

      dispatch(acceptTaskOffer(task.id, data))
  }
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/dollar.svg`}/>
        </div>
        <div className={styles.title}>Accept and offer</div>
      </div>

      <div className={styles.task}>
        <div className={styles.taskHeader}>
        <div className={styles.taskTitle}>{task?.title}</div>
        <div className={styles.taskExpires}>
          <div className={styles.taskExpiresLabel}>Expire in:</div>
          <div className={styles.taskExpiresValue}>23:46:23</div>
        </div>
        </div>
        <div className={styles.taskDescription}>{task?.description}</div>
      </div>
      <TaskOfferAcceptForm task={task} onSubmit={handleSubmit} initialValues={{offerAcceptType: 'agree', offerPriceType: 'fixed'}}  onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default TaskOfferAcceptModal
