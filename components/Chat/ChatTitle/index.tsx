import {
  confirmOpen,
  finishTaskAsClientOpen,
  taskEditConditionsOpen,
  taskHireMasterOpen,
  taskMarkAsDoneOpen
} from "components/Modal/actions";
import CloseIcon from "components/svg/CloseIcon";
import MarkIcon from "components/svg/MarkIcon";
import {
  taskNegotiationAcceptTaskOffer,
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import { taskCancel } from "components/TaskUser/actions";
import AvatarRound from "components/ui/AvatarRound";
import Button from "components/ui/Button";
import { IChat, IRootState, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {useTranslation, withTranslation} from "i18n";
import { useState } from "react";
import cx from 'classnames'
import ArrowDown from "components/svg/ArrowDown";

interface Props {
  chat: IChat
  onRequestClose?: () => void
  onClick?: () => void
}

export default function ChatTitle({chat, onClick}: Props) {
  const dispatch = useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const lastNegotiation = useSelector((state: IRootState) => state.taskOffer.lastCondition)
  const handleHireMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task));
    dispatch(taskHireMasterOpen());

  }
  const handleEditConditions = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task));
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation));
    dispatch(taskEditConditionsOpen());

  }
  const handleMarkAsDone = () => {

    dispatch(taskNegotiationSetCurrentTask(chat.task));
    dispatch(taskMarkAsDoneOpen());
  }
  const handleFinish = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task));
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation));
    dispatch(finishTaskAsClientOpen());
  }
  const handleCancel = () => {
    dispatch(confirmOpen({
      description: t('chat.cancelTask'),
      onConfirm: () => {
        dispatch(taskCancel(chat.taskId));
      }
    }));
  }
  const { t } = useTranslation('common');

  const isInProgress = chat.task &&  chat.task.status == ITaskStatus.InProgress && (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId);
  const isFinished =  chat.task &&  chat.task.status == ITaskStatus.Done && (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId);
  const isCanceled =  chat.task &&  chat.task.status == ITaskStatus.Canceled;

  const [isOpen, setIsOpen] = useState(false)

  return (
   <div className={cx(styles.root, {[styles.unset]: isOpen})}>
     <div className={styles.controls}>
      <div className={cx(styles.arrow, {[styles.open]: isOpen})} style={{cursor: 'pointer'}} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
        <ArrowDown/>
      </div>
      <CloseIcon onClick={onClick}/>
    </div>
     <div className={styles.left}>
     <AvatarRound image={chat.profile?.avatar} name={chat.profile?.firstName}/>
     {<div className={styles.title}>{`${profile.firstName} ${profile.lastName} (${chat.task ? chat.task.title : ''})`}</div>}
     </div>
     <div className={cx(styles.btns, {[styles.none]: !isOpen})}>
     { chat.task && !isCanceled && !isFinished && profile.role === 'client' && <Button className={styles.action} onClick={handleCancel}>{t('confirmModal.buttonCancel')}</Button>}
     { chat.task && isInProgress && profile.role !== 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleMarkAsDone}>{t('chat.markAsDone')}</Button>}
     { chat.task && isInProgress && profile.role === 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleFinish}>{t('chat.finishTask')}</Button>}
     { chat.task && !isInProgress && !isFinished && lastNegotiation !== null && profile.role === 'client' &&
     (
         (lastNegotiation.authorId === profile.id && lastNegotiation.state === ITaskNegotiationState.Accepted)
       || (lastNegotiation.authorId !== profile.id && ![ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(lastNegotiation.state))
       || ( lastNegotiation.type === ITaskNegotiationType.TaskOffer && [ITaskNegotiationState.Accepted].includes(lastNegotiation.state))
     )
     && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHireMaster}>{t('chat.hireMaster')}</Button>}
     { chat.task && !isInProgress && !isFinished && chat.task.status == ITaskStatus.Published && <Button className={styles.action} onClick={handleEditConditions}>{t('chat.negotiateOffer')}</Button>}
     { chat.task && !isInProgress && !isFinished && lastNegotiation !== null && lastNegotiation.authorId == profile.id && !(lastNegotiation.state === ITaskNegotiationState.Declined || lastNegotiation.state === ITaskNegotiationState.Accepted) && <div className={styles.status}>{t('chat.title')}</div>}
     { chat.task && isInProgress && <div className={`${styles.status} ${styles.statusGreen}`}>{t('chat.taskAccepted')} <MarkIcon color={'#27C60D'}/></div>}
     { chat.task && isFinished && <div className={`${styles.status} ${styles.statusGreen}`}>{t('chat.taskFinished')} <MarkIcon color={'#27C60D'}/></div>}
     { chat.task && isCanceled && <div className={`${styles.status}`}>{t('chat.taskCanceled')} <CloseIcon /></div>}
     </div>

   </div>
  )
}
