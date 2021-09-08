import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import {
  taskNegotiationCreateTaskResponse, taskNegotiationEditConditions,
  taskNegotiationEditConditionsRequest
} from "components/TaskNegotiation/actions";
import TaskEditConditionsForm from "components/TaskNegotiation/TaskEditConditionsModal/TaskEditConditionsForm";

import Modal from "components/ui/Modal";
import { format } from "date-fns";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, Trans} from "i18n";
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskEditConditionsModal = ({isOpen, onClose}: Props) => {
  const loading = useSelector((state: IRootState) => state.taskOffer.editConditionsLoading)
  const taskNegotiation = useSelector((state: IRootState) => state.taskOffer.currentTaskNegotiation)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const dispatch = useDispatch();
  const {t} = useTranslation('common')
  useEffect(() => {

  }, [isOpen])
  const handleSubmit = (data) => {
      dispatch(taskNegotiationEditConditions(taskNegotiation.id, data))
  }
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/dollar.svg`}/>
        </div>
        <div className={styles.title}>{t('taskNegotiation.negotiateOffer')}</div>
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
      <TaskEditConditionsForm taskNegotiation={taskNegotiation} onSubmit={handleSubmit} initialValues={{ priceType: taskNegotiation?.priceType, budget: taskNegotiation?.budget, ratePerHour: taskNegotiation?.ratePerHour, deadline: taskNegotiation.deadline ? format(new Date(taskNegotiation.deadline), 'MM/dd/yyy') : null}}  onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default TaskEditConditionsModal
