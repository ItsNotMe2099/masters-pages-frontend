import { modalClose } from "components/Modal/actions";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean,
}
const TaskShareModal = ({isOpen}: Props) => {
  const dispatch = useDispatch();
  const task = useSelector((state: IRootState) => state.taskSearch.currentTask)

  const getHost = () => {
    if (process.browser) {
      return `${document?.location?.protocol}://${document?.location?.origin}/task/${task?.id}`
    }
  }
  return (
    <Modal isOpen={isOpen}  onRequestClose={() => dispatch(modalClose())}>
      <div>Copy this link: {getHost()}</div>
      <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={() => dispatch(modalClose())}>Cancel</Button>
      </div>
    </Modal>
  )
}

export default TaskShareModal
