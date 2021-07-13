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
import {useTranslation, withTranslation} from "react-i18next";
interface Props {
  chat: IChat
  onRequestClose?: () => void
}

export default function ChatTitle({chat}: Props) {
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
      description: `Are you sure that you want to cancel task?`,
      onConfirm: () => {
        dispatch(taskCancel(chat.taskId));
      }
    }));
  }
  const { t } = useTranslation('common');

  const isInProgress = chat.task &&  chat.task.status == ITaskStatus.InProgress && (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId);
  const isFinished =  chat.task &&  chat.task.status == ITaskStatus.Done && (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId);
  const isCanceled =  chat.task &&  chat.task.status == ITaskStatus.Canceled;
  return (
   <div className={styles.root}>

     <AvatarRound image={chat.profile?.avatar} name={chat.profile?.firstName}/>
     {<div className={styles.title}>{`${profile.firstName} ${profile.lastName} (${chat.task ? chat.task.title : ''})`}</div>}
     { chat.task && !isCanceled && !isFinished && profile.role === 'client' && <Button className={styles.action} onClick={handleCancel}>{t('confirmModal.buttonCancel')}</Button>}
     { chat.task && isInProgress && profile.role !== 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleMarkAsDone}>{t('chat.markAsDone')}</Button>}
     { chat.task && isInProgress && profile.role === 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleFinish}>{t('chat.finishTask')}</Button>}
     { chat.task && !isInProgress && !isFinished && lastNegotiation !== null && profile.role === 'client' && ((lastNegotiation.authorId === profile.id && lastNegotiation.state === ITaskNegotiationState.Accepted) || (lastNegotiation.authorId !== profile.id && ![ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(lastNegotiation.state)) || (lastNegotiation.authorId === profile.id && lastNegotiation.type === ITaskNegotiationType.TaskOffer && [ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(lastNegotiation.state))) && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHireMaster}>{t('chat.hireMaster')}</Button>}
     { chat.task && !isInProgress && !isFinished && chat.task.status == ITaskStatus.Published && <Button className={styles.action} onClick={handleEditConditions}>{t('chat.negotiateOffer')}</Button>}
     { chat.task && !isInProgress && !isFinished && lastNegotiation !== null && lastNegotiation.authorId == profile.id && !(lastNegotiation.state === ITaskNegotiationState.Declined || lastNegotiation.state === ITaskNegotiationState.Accepted) && <div className={styles.status}>Waiting for negotiation response</div>}
     { chat.task && isInProgress && <div className={`${styles.status} ${styles.statusGreen}`}>{t('chat.taskAccepted')} <MarkIcon color={'#27C60D'}/></div>}
     { chat.task && isFinished && <div className={`${styles.status} ${styles.statusGreen}`}>{t('chat.taskFinished')} <MarkIcon color={'#27C60D'}/></div>}
     { chat.task && isCanceled && <div className={`${styles.status}`}>{t('chat.taskCanceled')} <CloseIcon /></div>}

   </div>
  )
}
