import { modalClose } from "components/Modal/actions";
import { createSkill, fetchSkillList, resetSkillForm, updateSkill } from "components/Skill/actions";
import { acceptTaskOffer } from "components/TaskOffer/actions";
import TaskOfferAcceptForm from "components/TaskOffer/TaskOfferAcceptModal/TaskOfferAcceptForm";
import Button from "components/ui/Button";
import Loader from "components/ui/Loader";
import Modal from "components/ui/Modal";
import SkillForm from "pages/PersonalArea/[mode]/components/TabPortfolio/components/SkillForm";
import { useEffect } from "react";
import * as React from "react";
import { IRootState, ITask, SkillData, SkillListItem } from "types";
import { getMediaPath } from "utils/media";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
interface Props {
  isOpen: boolean,
}
const TaskShareModal = ({isOpen}: Props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: IRootState) => state.taskOffer.formLoading)
  const task = useSelector((state: IRootState) => state.taskSearch.currentTask)

  const getHost = () => {
    if (typeof document !==  'undefined') {
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
