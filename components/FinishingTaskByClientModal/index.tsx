import Logo from "components/Logo";
import { modalClose } from "components/Modal/actions";
import { taskNegotiationFinish } from "components/TaskNegotiation/actions";
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import FinishingTaskByClientForm from "./Form";

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean
}

export default function FinishingTaskByClientModal(props: Props) {
  const dispatch = useDispatch();
  const taskNegotiation = useSelector((state: IRootState) => state.taskOffer.lastCondition)
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const formLoading = useSelector((state: IRootState) => state.taskOffer.formLoading)
  const handleSubmit = (data) => {
    console.log("HandleSubmit", data);
    dispatch(taskNegotiationFinish(taskNegotiation.taskId, {...data, taskId: taskNegotiation.taskId}));
  }
  const handleClose = () => {
    dispatch(modalClose());
  }


  return (
    <Modal{...props} loading={formLoading} className={styles.root} size="medium" closeClassName={styles.close}

    onRequestClose={handleClose}
    >

        <div className={styles.innards}>
          {/*<div className={styles.money}>
            You own: <span> &nbsp;$ {props.money}</span>
          </div>*/}
          <div className={styles.rate}>Please rate {task.master.firstName} work!</div>
          <div className={styles.form}><FinishingTaskByClientForm onSubmit={handleSubmit}/></div>
        </div>
    </Modal>
  )
}
