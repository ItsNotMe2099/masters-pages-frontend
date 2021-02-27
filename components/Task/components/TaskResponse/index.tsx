import { confirmOpen, taskShowOffer } from "components/Modal/actions";
import {
  taskNegotiationAcceptTaskResponse,
  taskNegotiationDeclineTaskResponse, taskNegotiationSetCurrentNegotiation, taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import { deleteTaskUser } from "components/TaskUser/actions";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
import { ITask, ITaskNegotiation } from "types";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import NotificationBadge from "../../../ui/NotificationBadge";
import {useTranslation} from "react-i18next";
interface Props {
  response: ITaskNegotiation,
  task: ITask,
}

const TaskResponse = ({ response, task }: Props) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();
  const handleDecline = (e) => {
    dispatch(confirmOpen({
      description: `${t('taskResponse.confirmDecline')} ${response.profile?.firstName} ${response.profile?.lastName}?`,
      onConfirm: () => {
        dispatch(taskNegotiationDeclineTaskResponse(response.taskId, response.id))
      }
    }));
  }
  const handleAccept = (e) => {
    dispatch(confirmOpen({
      description: `${t('taskResponse.confirmAccept')} ${response.profile?.firstName} ${response.profile?.lastName}?`,
      onConfirm: () => {
        dispatch(taskNegotiationAcceptTaskResponse(response))
      }
    }));
  }
  const handleMessages = (e) => {
    router.push(`/Chat/task-dialog/${response.taskId}/${response.profileId}`);
  }
  const handleShowOffer = (e) => {
    dispatch(taskNegotiationSetCurrentTask(task));
    dispatch(taskNegotiationSetCurrentNegotiation(response));
    dispatch(taskShowOffer());
  }
  return ( <div className={styles.root}>
    {!response.isRead && <NotificationBadge/> }
    <div className={styles.time}>{format(new Date(response.createdAt), 'MM.dd.yyy hh:mm')}</div>
    <div className={styles.profile}>{response.profile?.firstName} {response.profile?.lastName}</div>
    <div className={styles.rating}></div>
    <div className={styles.message} onClick={handleShowOffer}><img src={'/img/icons/chat_small.svg'} />{response.message}</div>
    <div className={styles.priceDetails}>{response.budget ? `$ ${response.budget}` : `$ ${response.ratePerHour}/h`}</div>
    <div className={styles.priceDetails}></div>
    {response.state === 'declined' && <div className={styles.declined}>{t('taskResponse.declined')}</div>}
    {response.state !== 'declined' && <div className={styles.actions}>
      {![ 'accepted', 'declined'].includes(response.state) && <div className={styles.action} onClick={handleDecline}>{t('taskResponse.decline')}</div>}
      {response.state === 'accepted' && <div className={styles.action} onClick={handleMessages}>{t('taskResponse.messages')}</div>}
      {response.state !== 'accepted' && <div className={styles.action} onClick={handleAccept}>{t('taskResponse.accept')}</div>}
    </div>}
  </div>);
}
export default TaskResponse
