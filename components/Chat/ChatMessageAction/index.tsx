import { fetchChat } from "components/Chat/actions";
import { confirmOpen, taskEditConditionsOpen, taskHireMasterOpen } from "components/Modal/actions";
import { deleteSkill } from "components/Skill/actions";
import CloseIcon from "components/svg/CloseIcon";
import MarkIcon from "components/svg/MarkIcon";
import {
  taskNegotiationDeclineConditions,
  taskNegotiationDeclineConditionsRequest, taskNegotiationSetCurrentMessage,
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import Avatar from "components/ui/Avatar";
import AvatarRound from "components/ui/AvatarRound";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import { format } from "date-fns";
import { IChat, IChatMessage, ITask, ITaskNegotiationState } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

interface Props {
  message: string
  onConfirm: () => void
  onReject: () => void
  showReject?: boolean
  showConfirm?: boolean
}

export default function ChatMessageAction({ message, onConfirm, onReject, showReject, showConfirm }: Props) {

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  }
  const handleReject = () => {
    if (onReject) {
      onReject();
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.message}>{message}</div>

      {showReject && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleReject}>Reject</Button>}
      {showConfirm &&
      <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleConfirm}>Confirm</Button>}

    </div>
  )
}
