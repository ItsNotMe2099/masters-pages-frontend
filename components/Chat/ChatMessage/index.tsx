import ChatMessageAction from "components/Chat/ChatMessageAction";
import ChatMessageTaskDetails from "components/Chat/ChatMessageTaskDetails";
import ChatMessageText from "components/Chat/ChatMessageText";
import {confirmOpen, finishTaskAsClientOpen} from "components/Modal/actions";
import {
  taskNegotiationDeclineConditions,
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import {format} from "date-fns";
import {
  IChat,
  IChatMessage,
  IChatMessageType,
  IEventLogRecordType,
  IRootState,
  ITaskNegotiationState,
  ITaskNegotiationType
} from "types";
import styles from './index.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import React, {ReactElement} from 'react'
import {useTranslation, withTranslation} from "i18n";


interface Props {
  message: IChatMessage
  chat: IChat,
  size: 'small' | 'normal'
}

export default function ChatMessage({ message, chat, size }: Props) {
  const dispatch =  useDispatch();
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const lastCondition = useSelector((state: IRootState) => state.taskOffer.lastCondition)

  const handleTaskMarkAsDoneConfirm = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task));
    dispatch(taskNegotiationSetCurrentNegotiation(lastCondition));
    dispatch(finishTaskAsClientOpen());
  }

  const handleTaskMarkAsDoneReject = () => {
    dispatch(confirmOpen({
      description: t('chat.areYouSure'),
      onConfirm: () => {
        dispatch(taskNegotiationDeclineConditions(message.taskNegotiation.id, message.id));
      }
    }));
  }
  const { t } = useTranslation('common');
  const renderMessage = (component, hasTime = false) => {
    return (<div className={`${styles.root} ${message.profileId === profile.id ? styles.rootAuthor : ''}`}>
      <div className={styles.message}>{component}</div>
      <div className={styles.time}> {hasTime && format(new Date(message.createdAt), 'MM.dd.yyy hh:mm')}</div>
    </div>);
  }
  const renderMessages = (): ReactElement[] => {
    switch (message.type) {
      case IChatMessageType.EventLogRecord:
          let text = '';
          let profileText = message.profileId === profile.id ? `You` : `${profile.firstName} ${profile.lastName}`
          switch (message.eventLogRecordType){
            case IEventLogRecordType.Created:
              text = t('chat.message.createdEvent', { profileText })
              break;
            case IEventLogRecordType.StatusChanged:
              text = t('chat.message.changedStatus', { profileText, message })
              break;
            case IEventLogRecordType.DetailesChanged:
              text = t('chat.message.changedEvent', { profileText })
              break;
            case IEventLogRecordType.CommentAdded:
              text = t('chat.message.commentAdded', { profileText })
              break;
            case IEventLogRecordType.FileUploaded:
              text = t('chat.message.attachedFile', { profileText })
              break;
            case IEventLogRecordType.FeedbackAdded:
              text = t('chat.message.addedFeedback', { profileText })
              break;

          }
        return [<ChatMessageText size={size} message={text} files={message.files} isRight={message.profileId === profile.id}/>]

      case IChatMessageType.Text:
        return [<ChatMessageText size={size} message={message.message} files={message.files} isRight={message.profileId === profile.id}/>]
      case IChatMessageType.File:
        return [<ChatMessageText size={size} message={message.message} files={message.files} isRight={message.profileId === profile.id}/>]
      case IChatMessageType.TaskNegotiation:
        const outDatedText = lastCondition && message.taskNegotiation.id != lastCondition.id ? t('chat.message.taskOutdated', { message, lastCondition }) : null
        if (message.taskNegotiation.type === ITaskNegotiationType.ResponseToTask && message.taskNegotiation.state === ITaskNegotiationState.Accepted) {
          const showReject = ['privately_published', 'published'].includes(chat.task.status );
          const showHire =  ['privately_published', 'published'].includes(chat.task.status );
          const showEdit =  ['privately_published', 'published'].includes(chat.task.status );

          if (message.profileId === profile.id) {
            return [<ChatMessageTaskDetails message={message} task={chat.task} showReject={showReject} showEdit={showEdit}
                                            showHire={showHire} outDatedText={outDatedText}/>,
              <ChatMessageText message={t('chat.message.negotiationStarted')} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else {
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showEdit={showEdit}/>,
              <ChatMessageText message={t('chat.message.negotiationStarted')} suffixText={t('chat.message.systemMessage')} large={true}/>]
          }
        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskOffer) {
          const showHire = false;
          const showEdit = ['privately_published', 'published'].includes(chat.task.status );
          const showReject = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && message.taskNegotiation.authorId != profile.id;
          const showAccept = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && profile.role !== 'client' && message.taskNegotiation.authorId != profile.id;
          const statusText = message.taskNegotiation.state === ITaskNegotiationState.Accepted ? t('chat.message.accepted') : t('chat.message.rejected');

          const youTextStatus = t('chat.message.textStatus', {statusText})
          const youTextNew = t('chat.message.sendTaskOffer')
          const fromTextNew = profile.role === 'client' ? t('chat.message.sendOffer') : t('chat.message.receiveOffer')
          const fromTextStatus = message.taskNegotiation.authorId === profile.id && profile.role === 'client' ? t('chat.message.master', {statusText}) : t('chat.message.clientOffer', {statusText})
          if (message.taskNegotiation.authorId !== profile.id && message.profileId === profile.id) {
            // You change status of task offer
            console.log("message.taskNegotiation", message.taskNegotiation, message.profileId, profile.id);

            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextStatus} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId !== profile.id && message.profileId !== profile.id) {
            // Somebody sent you task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextNew} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId === profile.id) {
            // You sent new task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextNew} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId !== profile.id) {
            // Somebody change status ok task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextStatus} suffixText={t('chat.message.systemMessage')} large={true}/>]
          }

        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskNegotiation) {

          const showEdit = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined)
          const showReject = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && message.taskNegotiation.authorId != profile.id;
          const showHire = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && profile.role === 'client' && message.taskNegotiation.authorId != profile.id;
          const showAccept = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && profile.role !== 'client' && message.taskNegotiation.authorId != profile.id;
          const statusText = message.taskNegotiation.state === ITaskNegotiationState.Accepted ? t('chat.message.accepted') : t('chat.message.rejected');
          const youTextStatus = t('chat.message.youStatusText', {statusText})
          const youTextNew = t('chat.message.youSend')
          const fromTextNew = profile.role === 'client' ? t('chat.message.negotiationFromMaster') : t('chat.message.negotiationFromClient')
          const fromTextStatus = profile.role === 'client' ? t('chat.message.masterNegotiation', {statusText}) : t('chat.message.clientNegotiation', {statusText})
          if (message.taskNegotiation.authorId !== profile.id && message.profileId === profile.id) {
            // You change status of task neogotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextStatus} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId !== profile.id && message.profileId !== profile.id) {
            // Somebody sent you task negotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextNew} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId === profile.id) {
            // You sent new task negotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextNew} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId !== profile.id) {
            // Somebody change status ok task negotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextStatus} suffixText={t('chat.message.systemMessage')} large={true}/>]
          }

        } else if (message.taskNegotiation.type === ITaskNegotiationType.MasterAssigned) {
          return [
            <ChatMessageText message={profile.role === 'client' ? t('chat.message.masterAssigned') : t('chat.message.youAssigned')} suffixText={t('chat.message.systemMessage')} large={true}/>]
        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskCompleted) {
          return [
            <ChatMessageText message={'Task completed'} suffixText={t('chat.message.systemMessage')} large={true}/>]
        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskCanceled) {
          return [
            <ChatMessageText message={'Task canceled'} suffixText={t('chat.message.systemMessage')} large={true}/>]
        }else if (message.taskNegotiation.type === ITaskNegotiationType.MarkAsDone) {
          const statusText = message.taskNegotiation.state === ITaskNegotiationState.Accepted ? t('chat.message.accepted') : t('chat.message.rejected');

          const youTextStatus = t('chat.message.markJobAsDone', {statusText})
          const youTextNew = t('chat.message.markedJobAsDone')
          const fromTextNew = profile.role === 'client' ? t('chat.message.masterMarkedTask') : t('chat.message.clientMarkedTask')
          const fromTextStatus = profile.role === 'client' ? t('chat.message.masterRequestMark', {statusText}) : t('chat.message.clientRequestMark', {statusText})

          if (message.taskNegotiation.authorId !== profile.id && message.profileId === profile.id) {
            // You change status of task neogotiation
            return [<ChatMessageText message={youTextStatus} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId !== profile.id && message.profileId !== profile.id) {
            // Somebody sent you task negotiation
            return [...(chat.task.status === 'in_progress' && !(['accepted', 'declined'].includes(message.taskNegotiation.state)) ? [<ChatMessageAction message={t('chat.message.masterMarkTask')} showReject={true} showConfirm={true} onReject={handleTaskMarkAsDoneReject} onConfirm={handleTaskMarkAsDoneConfirm}/>] : []),
              <ChatMessageText message={fromTextNew} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId === profile.id) {
            // You sent new task negotiation
            return [<ChatMessageText message={youTextNew} suffixText={t('chat.message.systemMessage')} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId !== profile.id) {
            // Somebody change status ok task negotiation
            return [<ChatMessageText message={fromTextStatus} suffixText={t('chat.message.systemMessage')} large={true}/>]
          }

        }

        break;
    }
    return [];
  }
  const messages = renderMessages();
  return (
    <>
      {messages.map((item, index) => renderMessage(React.cloneElement(item), index === messages.length - 1))}
    </>
  )
}
ChatMessage.defaultProps = {
  size: 'normal'
}
