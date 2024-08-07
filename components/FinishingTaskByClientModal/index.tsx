import { modalClose } from 'components/Modal/actions'
import { taskNegotiationFinish } from 'components/TaskNegotiation/actions'
import Modal from 'components/ui/Modal'
import { IRootState } from 'types'
import styles from './index.module.scss'
import FinishingTaskByClientForm from './Form'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {TaskWrapper, useTaskContext} from "context/task_state";
import {useState} from "react";

interface Props {
  isOpen: boolean
}
const FinishingTaskByClientModalInner = (props: Props) => {
  const dispatch = useDispatch()
  const taskContext = useTaskContext()
  const task = taskContext.task
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    await taskContext.markAsDone(data);
    setLoading(false);
    dispatch(modalClose());
  }
  const handleClose = () => {
    dispatch(modalClose())
  }
  const { t } = useTranslation('common')


  return (
    <Modal{...props} loading={loading} className={styles.root} size="medium" closeClassName={styles.close}

          onRequestClose={handleClose}
    >

      <div className={styles.innards}>
        {/*<div className={styles.money}>
            You own: <span> &nbsp;$ {props.money}</span>
          </div>*/}
        <div className={styles.rate}>{t('feedBack.pleaseRate')} {task.master.firstName} {t('feedBack.work')}</div>
        <div className={styles.form}><FinishingTaskByClientForm onSubmit={handleSubmit} onClose={handleClose}/></div>
      </div>
    </Modal>
  )
}
export default function FinishingTaskByClientModal(props: Props) {
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const negotiation = useSelector((state: IRootState) => state.taskOffer.currentTaskNegotiation)
  return <TaskWrapper negotiation={negotiation} task={task}>
    <FinishingTaskByClientModalInner {...props}/>
  </TaskWrapper>
}
