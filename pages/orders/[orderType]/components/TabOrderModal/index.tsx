import { modalClose } from "components/Modal/actions";
import { resetTaskUserUpdateForm, updateTaskUser } from "components/TaskUser/actions";
import Modal from "components/ui/Modal";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";

import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import TabOrderForm from 'pages/orders/[orderType]/components/TabOrderModal/TabOrderForm'
interface Props {
  isOpen: boolean,
  task: ITask,
  onClose: () => void
}
const TabOrderModal = ({isOpen, task, onClose}: Props) => {
  const loading = useSelector((state: IRootState) => state.taskUser.formUpdateLoading)
  const dispatch = useDispatch();
  useEffect(() => {
    if(isOpen){
      dispatch(resetTaskUserUpdateForm())
    }
  }, [isOpen])
  const handleSubmit = (data) => {
    console.log("submit data", data)
    dispatch(updateTaskUser(task.id, data))

  }
  console.log("Task", task);
  return (
    <Modal size={'large'} isOpen={isOpen} className={styles.root} loading={loading} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={`/img/icons/pencil.svg`}/>
        </div>
        <div className={styles.title}>Edit Task</div>
      </div>
      <div className={styles.separator}></div>
      <TabOrderForm onSubmit={handleSubmit} initialValues={{...task}} onCancel={() => dispatch(modalClose())}/>
    </Modal>
  )
}

export default TabOrderModal
