import {
  finishTaskAsClientOpen,
  taskEditConditionsOpen,
  taskHireMasterOpen,
  taskMarkAsDoneOpen
} from "components/Modal/actions";
import MarkIcon from "components/svg/MarkIcon";
import {
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import AvatarRound from "components/ui/AvatarRound";
import Button from "components/ui/Button";
import { IChat, IRootState, ITaskNegotiationState, ITaskStatus } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
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
  const isInProgress =  (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId);
  return (
   <div className={styles.root}>

     <AvatarRound image={chat.profile?.avatar} name={chat.profile?.firstName}/>
     <div className={styles.title}>{chat.task ? chat.task.title : `${chat.profile?.firstName} ${chat.profile?.lastName}`}</div>
     {isInProgress && profile.role !== 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleMarkAsDone}>Mark as done</Button>}
     {isInProgress && profile.role === 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleFinish}>Finish Task</Button>}
     {(profile.role === 'client' && lastNegotiation !== null && lastNegotiation.authorId != profile.id && !(lastNegotiation.state === ITaskNegotiationState.Declined || lastNegotiation.state === ITaskNegotiationState.Accepted) )  &&<Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHireMaster}>Hire master</Button>}
     {chat.task.status == ITaskStatus.Published && <Button className={styles.action} onClick={handleEditConditions}>Negotiate offer</Button>}
     {lastNegotiation !== null && lastNegotiation.authorId == profile.id && !(lastNegotiation.state === ITaskNegotiationState.Declined || lastNegotiation.state === ITaskNegotiationState.Accepted) && <div className={styles.status}>Waiting for negotiation response</div>}
     {isInProgress && <div className={`${styles.status} ${styles.statusGreen}`}>Tack accepted <MarkIcon color={'#27C60D'}/></div>}

   </div>
  )
}
