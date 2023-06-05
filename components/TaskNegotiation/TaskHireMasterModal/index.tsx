import {
  taskNegotiationFetchLastConditions,
  taskNegotiationHireMaster, taskNegotiationReset, taskNegotiationSetCurrentTask
} from 'components/TaskNegotiation/actions'

import Button from 'components/ui/Button'

import Modal from 'components/ui/Modal'
import { format } from 'date-fns'
import {useEffect, useState} from 'react'
import * as React from 'react'
import { IRootState, ITaskNegotiation } from 'types'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { getCurrencySymbol } from 'data/currency'
import { useTranslation } from 'next-i18next'
import { useAppContext } from 'context/state'
import NegotiationRepository from 'data/repositories/NegotiationRepository'
import {TaskWrapper, useTaskContext} from "context/task_state";
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskHireMasterModalInner = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const taskContext = useTaskContext();
  const taskNegotiation = taskContext.negotiation
  const task = taskContext.task
  const appContext = useAppContext();
  const currentProfile = appContext.profile

  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  useEffect(() => {
    return () => {
      dispatch(taskNegotiationReset())
    }
  }, [])


  const handleSubmit = async () => {
      setLoading(true);
      await taskContext.hireMasterRequest();
      setLoading(false);
   }
  return (
    <Modal isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img src={'/img/icons/dollar.svg'} />
        </div>
        <div className={styles.title}>{t('taskNegotiation.hiringAMaster')}</div>
      </div>

      <>
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

        <div className={styles.taskPriceDetails}>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{taskNegotiation.priceType === 'fixed' ? `${t('fixedPrice')}:` : `${t('perHour')}:`}</div>
            <div className={styles.taskPriceDetailsItemValue}>$ {taskNegotiation.priceType === 'fixed' ? `${getCurrencySymbol(task.currency)} ${taskNegotiation.budget}` : `${getCurrencySymbol(task.currency)} ${taskNegotiation.ratePerHour}/${t('priceRateSuffix')}`}</div>
          </div>
          <div className={styles.taskPriceDetailsItem}>
            <div className={styles.taskPriceDetailsItemLabel}>{`${t('deadline')}:`}</div>
            <div className={styles.taskPriceDetailsItemValue}>{taskNegotiation.deadline ? format(new Date(task.deadline), 'MM.dd.yyy') : 'N/A'} </div>
          </div>
        </div>

        <div className={styles.containerButtons}>
          <div className={styles.buttons}>
            <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={onClose}>{t('cancel')}</Button>
            <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true} size={'12px 40px'} type={'submit'} onClick={handleSubmit}>{t('taskNegotiation.hireMaster')}</Button>
          </div>
        </div>
      </>

    </Modal>
  )
}


const TaskHireMasterModal = (props: Props) => {
  const taskNegotiation = useSelector((state: IRootState) => state.taskOffer.currentTaskNegotiation)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  return (<TaskWrapper negotiation={taskNegotiation} task={task}>
    <TaskHireMasterModalInner {...props}/>
  </TaskWrapper>)
}
export default TaskHireMasterModal
