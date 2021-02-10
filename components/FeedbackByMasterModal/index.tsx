import { taskNegotiationFetchLastConditions } from "components/TaskNegotiation/actions";
import Modal from "components/ui/Modal";
import { useEffect } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
import FinishingTaskByMasterForm from "./Form";

import { useSelector, useDispatch } from 'react-redux'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
}

export default function FeedbackByMasterModal(props: Props) {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const loadingLastConditions = useSelector((state: IRootState) => state.taskOffer.lastConditionLoading)
  const  lastConditions = useSelector((state: IRootState) => state.taskOffer.lastCondition)

  const formLoading = useSelector((state: IRootState) => state.taskOffer.formLoading)

  useEffect(() => {
    dispatch(taskNegotiationFetchLastConditions(task.id));
  }, [])
  const handleSubmit = () => {

  }

  return (
    <Modal{...props} loading={loadingLastConditions || formLoading} className={styles.root} size="medium" closeClassName={styles.close}
    >

        <div className={styles.innards}>
          <div className={styles.rate}>Please rate {task.profile.firstName} !</div>
          <div className={styles.money}>
            You own: <span> &nbsp;$ {lastConditions.budget}</span>
          </div>

          <div className={styles.form}>
            <FinishingTaskByMasterForm onSubmit={handleSubmit}/>
          </div>
        </div>
    </Modal>
  )
}
