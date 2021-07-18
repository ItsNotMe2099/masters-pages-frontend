import Logo from "components/Logo";
import { modalClose } from "components/Modal/actions";
import { taskNegotiationFinish } from "components/TaskNegotiation/actions";
import Modal from "components/ui/Modal";
import { IRootState } from "types";
import styles from './index.module.scss'
import FinishingTaskByClientForm from "./Form";

import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, withTranslation} from "i18n";
interface Props {
  isOpen: boolean
}

export default function FinishingTaskByClientModal(props: Props) {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.taskOffer.currentTask)
  const formLoading = useSelector((state: IRootState) => state.taskOffer.formLoading)
  const handleSubmit = (data) => {
    console.log("HandleSubmit", data);
    dispatch(taskNegotiationFinish(task.id, {...data, taskId: task.id}));
  }
  const handleClose = () => {
    dispatch(modalClose());
  }
  const { t } = useTranslation('common');


  return (
    <Modal{...props} loading={formLoading} className={styles.root} size="medium" closeClassName={styles.close}

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
