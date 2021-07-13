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
import {useTranslation, withTranslation} from "react-i18next";

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
              text = `${profileText} changed status to ${message.eventLogRecordData.newStatus}`;
              break;
            case IEventLogRecordType.DetailesChanged:
              text = `${profileText} changed event details`;
              break;
            case IEventLogRecordType.CommentAdded:
              text = `${profileText} comment added`;
              break;
            case IEventLogRecordType.FileUploaded:
              text = `${profileText} attached file`;
              break;
            case IEventLogRecordType.FeedbackAdded:
              text = `${profileText} added feedback`;
              break;

          }
        return [<ChatMessageText size={size} message={text} files={message.files} isRight={message.profileId === profile.id}/>]

      case IChatMessageType.Text:
        return [<ChatMessageText size={size} message={message.message} files={message.files} isRight={message.profileId === profile.id}/>]
      case IChatMessageType.File:
        return [<ChatMessageText size={size} message={message.message} files={message.files} isRight={message.profileId === profile.id}/>]
      case IChatMessageType.TaskNegotiation:
        const outDatedText = lastCondition && message.taskNegotiation.id != lastCondition.id ? `Task outdated ${message.taskNegotiation.id} ${lastCondition.id}` : null
        if (message.taskNegotiation.type === ITaskNegotiationType.ResponseToTask && message.taskNegotiation.state === ITaskNegotiationState.Accepted) {
          if (message.profileId === profile.id) {
            return [<ChatMessageTaskDetails message={message} task={chat.task} showReject={true} showEdit={true}
                                            showHire={true} outDatedText={outDatedText}/>,
              <ChatMessageText message={'Negotiation started'} suffixText={'System message'} large={true}/>]
          } else {
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showEdit={true}/>,
              <ChatMessageText message={'Negotiation started'} suffixText={'System message'} large={true}/>]
          }
        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskOffer) {
          const showHire = false;
          const showEdit = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined)
          const showReject = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && message.taskNegotiation.authorId != profile.id;
          const showAccept = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && profile.role !== 'client' && message.taskNegotiation.authorId != profile.id;
          const statusText = message.taskNegotiation.state === ITaskNegotiationState.Accepted ? 'accepted' : 'rejected';

          const youTextStatus = `You ${statusText} an offer`;
          const youTextNew = `You send task offer`;
          const fromTextNew = profile.role === 'client' ? 'You send an offer' : 'You receive an offer'
          const fromTextStatus = `Master ${statusText} your offer`;

          if (message.taskNegotiation.authorId !== profile.id && message.profileId === profile.id) {
            // You change status of task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextStatus} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId !== profile.id && message.profileId !== profile.id) {
            // Somebody sent you task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextNew} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId === profile.id) {
            // You sent new task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextNew} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId !== profile.id) {
            // Somebody change status ok task offer
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextStatus} suffixText={'System message'} large={true}/>]
          }

        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskNegotiation) {

          const showEdit = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined)
          const showReject = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && message.taskNegotiation.authorId != profile.id;
          const showHire = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && profile.role === 'client' && message.taskNegotiation.authorId != profile.id;
          const showAccept = !(message.taskNegotiation.state === ITaskNegotiationState.Accepted || message.taskNegotiation.state === ITaskNegotiationState.Declined) && profile.role !== 'client' && message.taskNegotiation.authorId != profile.id;
          const statusText = message.taskNegotiation.state === ITaskNegotiationState.Accepted ? 'accepted' : 'rejected';
          const youTextStatus = `You ${statusText}`;
          const youTextNew = `You send you task negotiation`;
          const fromTextNew = profile.role === 'client' ? 'New task negotation from master' : 'New task negotation from client'
          const fromTextStatus = profile.role === 'client' ? `Master ${statusText} your negotiation` : `Client ${statusText} your negotiation`

          console.log("showAccept", message.taskNegotiation.id, showAccept, message.taskNegotiation)
          if (message.taskNegotiation.authorId !== profile.id && message.profileId === profile.id) {
            // You change status of task neogotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextStatus} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId !== profile.id && message.profileId !== profile.id) {
            // Somebody sent you task negotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextNew} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId === profile.id) {
            // You sent new task negotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={youTextNew} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId !== profile.id) {
            // Somebody change status ok task negotiation
            return [<ChatMessageTaskDetails message={message} task={chat.task} outDatedText={outDatedText}
                                            showHire={showHire} showEdit={showEdit} showReject={showReject} showAccept={showAccept}/>,
              <ChatMessageText message={fromTextStatus} suffixText={'System message'} large={true}/>]
          }

        } else if (message.taskNegotiation.type === ITaskNegotiationType.MasterAssigned) {
          return [
            <ChatMessageText message={profile.role === 'client' ? 'Master assigned to this task' : 'You assigned to this task'} suffixText={'System message'} large={true}/>]
        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskCompleted) {
          return [
            <ChatMessageText message={'Task completed'} suffixText={'System message'} large={true}/>]
        } else if (message.taskNegotiation.type === ITaskNegotiationType.TaskCanceled) {
          return [
            <ChatMessageText message={'Task canceled'} suffixText={'System message'} large={true}/>]
        }else if (message.taskNegotiation.type === ITaskNegotiationType.MarkAsDone) {
          const statusText = message.taskNegotiation.state === ITaskNegotiationState.Accepted ? 'accepted' : 'rejected';

          const youTextStatus = `You ${statusText} mark job as done`;
          const youTextNew = `You marked job as done`;
          const fromTextNew = profile.role === 'client' ? 'Master marked task as completed' : 'Client marked task as completed'
          const fromTextStatus = profile.role === 'client' ? `Master ${statusText} your request to mark as done` : `Client ${statusText} your request to mark as done`

          if (message.taskNegotiation.authorId !== profile.id && message.profileId === profile.id) {
            // You change status of task neogotiation
            return [<ChatMessageText message={youTextStatus} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId !== profile.id && message.profileId !== profile.id) {
            // Somebody sent you task negotiation
            console.log("lastCondition.id !== message.taskNegotiation.id", lastCondition?.id, message.taskNegotiation.id)
            return [...(chat.task.status === 'in_progress' && !(['accepted', 'declined'].includes(message.taskNegotiation.state)) ? [<ChatMessageAction message={'Master mark task as completed'} showReject={true} showConfirm={true} onReject={handleTaskMarkAsDoneReject} onConfirm={handleTaskMarkAsDoneConfirm}/>] : []),
              <ChatMessageText message={fromTextNew} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId === profile.id) {
            // You sent new task negotiation
            return [<ChatMessageText message={youTextNew} suffixText={'System message'} large={true}/>]
          } else if (message.taskNegotiation.authorId === profile.id && message.profileId !== profile.id) {
            // Somebody change status ok task negotiation
            return [<ChatMessageText message={fromTextStatus} suffixText={'System message'} large={true}/>]
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
