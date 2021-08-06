import { fetchChat } from "components/Chat/actions";
import { confirmOpen, taskEditConditionsOpen, taskHireMasterOpen } from "components/Modal/actions";
import { deleteSkill } from "components/Skill/actions";
import CloseIcon from "components/svg/CloseIcon";
import MarkIcon from "components/svg/MarkIcon";
import {
  taskNegotiationAcceptConditions,
  taskNegotiationAcceptConditionsRequest, taskNegotiationAcceptTaskOffer,
  taskNegotiationDeclineConditions,
  taskNegotiationDeclineConditionsRequest, taskNegotiationDeclineTaskOffer, taskNegotiationSetCurrentMessage,
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import Avatar from "components/ui/Avatar";
import AvatarRound from "components/ui/AvatarRound";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import { format } from "date-fns";
import { IChat, IChatMessage, ITask, ITaskNegotiationState, ITaskNegotiationType } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {getCurrencySymbol} from 'data/currency'
import {useTranslation, withTranslation} from "i18n";



interface Props {
  message: IChatMessage,
  task: ITask,
  outDatedText?: string
  showHire?: boolean
  showEdit?: boolean
  showReject?: boolean
  showFinish?: boolean
  showAccept?: boolean
}

export default function ChatMessageTaskDetails({ message, task, showHire, showEdit, showReject, showFinish, showAccept, outDatedText }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const handleReject = () => {
    if(message.taskNegotiation.type === ITaskNegotiationType.TaskOffer){
      dispatch(confirmOpen({
        description: t('task.confirmDecline'),
        onConfirm: () => {
          dispatch(taskNegotiationDeclineTaskOffer(message.taskNegotiation));
        }
      }));
    }else{
      dispatch(confirmOpen({
        description: t('chat.rejectConditions'),
        onConfirm: () => {
          dispatch(taskNegotiationDeclineConditions(message.taskNegotiation.id, message.id));
        }
      }));
    }

  }

  const handleAccept = () => {
    if(message.taskNegotiation.type === ITaskNegotiationType.TaskOffer) {
      dispatch(confirmOpen({
        description: t('chat.acceptOffer'),
        onConfirm: () => {
          dispatch(taskNegotiationAcceptTaskOffer(message.taskNegotiation));
        }
      }));
    }else{
      dispatch(confirmOpen({
        description: t('chat.acceptConditions'),
        onConfirm: () => {
          dispatch(taskNegotiationAcceptConditions(message.taskNegotiation.id, message.id));
        }
      }));
    }
  }

  const handleEdit = () => {
    dispatch(taskNegotiationSetCurrentTask(task));
    dispatch(taskNegotiationSetCurrentMessage(message));
    dispatch(taskNegotiationSetCurrentNegotiation(message.taskNegotiation));
    dispatch(taskEditConditionsOpen());
  }
  const handleHire = () => {
    dispatch(taskNegotiationSetCurrentTask(task));
    dispatch(taskNegotiationSetCurrentMessage(message));
    dispatch(taskNegotiationSetCurrentNegotiation(message.taskNegotiation));
    dispatch(taskHireMasterOpen());
  }
  const getStatus = () => {
    switch (message.taskNegotiation.state) {
      case ITaskNegotiationState.Accepted:
        return 'accepted'
      case ITaskNegotiationState.Declined:
        return 'declined'
      case ITaskNegotiationState.SentToMaster:
      case ITaskNegotiationState.SentToClient:
      default:
        return null;
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.icon}><img src={'/img/icons/money.svg'}/></div>
        <div className={styles.title}>{task.title}</div>
      </div>
      <div className={styles.description}>
        {task.description}
      </div>
      <div className={styles.details}>
        <div className={styles.detailsItem}>
          <div
            className={styles.detailsLabel}>{message.taskNegotiation.priceType === 'fixed' ? t('task.fixedPrice') : t('perHour')}</div>
          <div
            className={styles.detailsValue}>${message.taskNegotiation.priceType === 'fixed' ? `${getCurrencySymbol(task.currency)} ${message.taskNegotiation.budget}` : `${getCurrencySymbol(task.currency)} ${message.taskNegotiation.ratePerHour}/${t('priceRateSuffix')}`}</div>
        </div>
        <div className={styles.detailsItem}>
          <div className={styles.detailsLabel}>{`${t('deadline')}:`}</div>
          <div
            className={styles.detailsValue}>{message.taskNegotiation.deadline ? format(new Date(message.taskNegotiation.deadline), 'MM/dd/yyyy') : '-'}</div>
        </div>
      </div>
      <div className={styles.bottom}>
        {outDatedText && <div className={styles.outdated}>{outDatedText}</div>}
        {!outDatedText && <div className={styles.actions}>
          {showReject && <Button className={`${styles.action}`} onClick={handleReject}>{t('reject')}</Button>}
          {showEdit && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleEdit}>{t('edit')}</Button>}
          {showHire &&
          <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHire}>{t('chat.hireMaster')}</Button>}
          {showAccept &&
          <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleAccept}>{t('task.accept')}</Button>}
          {showFinish &&
          <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHire}>{t('chat.finishTask')}</Button>}
        </div>}
        {getStatus() === 'accepted' &&
        <div className={`${styles.status} ${styles.statusGreen}`}>{t('accepted')} <MarkIcon color={'#27C60D'}/></div>}
        {getStatus() === 'declined' && <div className={styles.status}>{t('declined')} <CloseIcon color={'#000000'}/></div>}
      </div>

    </div>
  )
}
