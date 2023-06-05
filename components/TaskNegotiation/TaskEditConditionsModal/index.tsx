import { modalClose } from 'components/Modal/actions'
import { taskNegotiationEditConditions
} from 'components/TaskNegotiation/actions'
import TaskEditConditionsForm from 'components/TaskNegotiation/TaskEditConditionsModal/TaskEditConditionsForm'

import Modal from 'components/ui/Modal'
import { format } from 'date-fns'
import {useEffect, useState} from 'react'
import * as React from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {TaskWrapper, useTaskContext} from "context/task_state";
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskEditConditionsModalInner = ({isOpen, onClose}: Props) => {
  const taskContext = useTaskContext();
  const [loading, setLoading] = useState(false)
 const dispatch = useDispatch()
  const {t} = useTranslation('common')
  useEffect(() => {

  }, [isOpen])
  const handleSubmit = async (data) => {
    setLoading(true);
    await taskContext.editConditions(data);
    setLoading(false);
    dispatch(modalClose())
  }
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={'/img/icons/dollar.svg'}/>
        </div>
        <div className={styles.title}>{t('taskNegotiation.negotiateOffer')}</div>
      </div>

      <div className={styles.task}>
        <div className={styles.taskHeader}>
        <div className={styles.taskTitle}>{taskContext.task?.title}</div>
        <div className={styles.taskExpires}>
          <div className={styles.taskExpiresLabel}>{t('taskNegotiation.expireIn')}</div>
          <div className={styles.taskExpiresValue}>23:46:23</div>
        </div>
        </div>
        <div className={styles.taskDescription}>{taskContext.task?.description}</div>
      </div>
      <TaskEditConditionsForm taskNegotiation={taskContext.negotiation} onSubmit={handleSubmit} initialValues={{ priceType: taskContext.negotiation?.priceType, budget: taskContext.negotiation?.budget, ratePerHour: taskContext.negotiation?.ratePerHour, deadline: taskContext.negotiation.deadline ? format(new Date(taskContext.negotiation.deadline), 'MM/dd/yyy') : null}}  onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}


const TaskEditConditionsModal = (props: Props) => {
  const taskNegotiation = useSelector((state: IRootState) => state.taskOffer.currentTaskNegotiation)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)

  return (<TaskWrapper negotiation={taskNegotiation} task={task}>
    <TaskEditConditionsModalInner {...props}/>
  </TaskWrapper>)
}
export default TaskEditConditionsModal
