import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import { taskNegotiationCreateTaskResponse } from "components/TaskNegotiation/actions";
import TaskOfferAcceptForm from "components/TaskNegotiation/TaskOfferAcceptModal/TaskOfferAcceptForm";

import Modal from "components/ui/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, Trans} from "react-i18next";
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskOfferAcceptModal = ({isOpen, onClose}: Props) => {
  const loading = useSelector((state: IRootState) => state.taskOffer.taskResponseLoading)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)

  console.log("Tassss", task)
  const dispatch = useDispatch();
  const {t} = useTranslation('common')
  useEffect(() => {
    if(isOpen){
      dispatch(resetSkillForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    console.log("submit data", data)

      dispatch(taskNegotiationCreateTaskResponse(task.id, data))
  }
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/dollar.svg`}/>
        </div>
        <div className={styles.title}>{t('taskNegotiation.acceptAndOffer')}</div>
      </div>

      <div className={styles.task}>
        <div className={styles.taskHeader}>
        <div className={styles.taskTitle}>{task?.title}</div>
        <div className={styles.taskExpires}>
          <div className={styles.taskExpiresLabel}>{t('taskNegotiation.expireIn')}</div>
          <div className={styles.taskExpiresValue}>23:46:23</div>
        </div>
        </div>
        <div className={styles.taskDescription}>{task?.description}</div>
      </div>
      <TaskOfferAcceptForm task={task} onSubmit={handleSubmit} initialValues={{offerAcceptType: 'agree', offerPriceType: task?.priceType, budget: task?.budgetMax, ratePerHour: task?.ratePerHour, deadline: task?.deadline ? format(new Date(task?.deadline), 'MM/dd/yyyy') : null}}  onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default TaskOfferAcceptModal
