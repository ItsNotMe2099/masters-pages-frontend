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
interface Props {
  response: ITaskNegotiation,
  task: ITask
}

export default function TaskResponse({ response, task }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleDecline = (e) => {
    dispatch(confirmOpen({
      description: `Do you want to decline response from ${response.profile?.firstName} ${response.profile?.lastName}?`,
      onConfirm: () => {
        dispatch(taskNegotiationDeclineTaskResponse(response.taskId, response.id))
      }
    }));
  }
  const handleAccept = (e) => {
    dispatch(confirmOpen({
      description: `Do you want to accept response from ${response.profile?.firstName} ${response.profile?.lastName}?`,
      onConfirm: () => {
        dispatch(taskNegotiationAcceptTaskResponse(response.taskId, response.id))
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
    <div className={styles.time}>{format(new Date(response.createdAt), 'MM.dd.yyy hh:mm')}</div>
    <div className={styles.profile}>{response.profile?.firstName} {response.profile?.lastName}</div>
    <div className={styles.rating}></div>
    <div className={styles.message} onClick={handleShowOffer}><img src={'/img/icons/chat_small.svg'} />{response.message}</div>
    <div className={styles.priceDetails}>{response.budget ? `$ ${response.budget}` : `$ ${response.ratePerHour}/h`}</div>
    <div className={styles.priceDetails}></div>
    {response.state === 'declined' && <div className={styles.declined}>Declined</div>}
    {response.state !== 'declined' && <div className={styles.actions}>
      {![ 'accepted', 'declined'].includes(response.state) && <div className={styles.action} onClick={handleDecline}>Decline</div>}
      {response.state === 'accepted' && <div className={styles.action} onClick={handleMessages}>Messages</div>}
      {response.state !== 'accepted' && <div className={styles.action} onClick={handleAccept}>Accept</div>}
    </div>}
  </div>);
}
