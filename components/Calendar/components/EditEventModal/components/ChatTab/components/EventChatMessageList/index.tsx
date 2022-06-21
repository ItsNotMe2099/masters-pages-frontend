import { chatLogin, chatLogout, fetchChatMessages, updateChatMessagesState } from 'components/Chat/actions'
import ChatMessage from 'components/Chat/ChatMessage'
import ChatNewMessage from 'components/Chat/ChatNewMessage'
import Loader from 'components/ui/Loader'
import { default as React, useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IEvent, IRootState} from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {emptyEventUnread} from 'components/Events/actions'
import {IChat} from 'data/intefaces/IChat'

/*
  task chat
  user chage
  /chat/user/1
  chat/task/1
 */
interface Props {
  chat: IChat
  onRequestClose?: () => void,
  hasNewMessage?: boolean,
  event?: IEvent
}

export default function EventChatMessageList({chat, event, hasNewMessage}: Props) {
  const dispatch = useDispatch()

  const messages = useSelector((state: IRootState) => state.chat.messages)
  const total = useSelector((state: IRootState) => state.chat.totalMessages)
  const messagesLoading = useSelector((state: IRootState) => state.chat.chatLoading)
  const lastMessageId = useSelector((state: IRootState) => state.chat.lastMessageId)
  const scrollableTarget = useRef(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timeout = setInterval(() => {
      const ids = []
      if (messages.length > 50) {
        for (const message of messages) {
          if (!message?.profileStates || message?.profileStates.length === 0){
            continue
          }
          if (message?.profileStates[0]?.read) {
            break
          }
          ids.push(message.id)
        }
      } else {
        for (const message of messages) {
          if (!message?.profileStates || message?.profileStates.length === 0){
            continue
          }
          if (message?.profileStates[0]?.read) {
            continue
          }
          ids.push(message.id)
        }
      }
      if (ids.length > 0) {
        dispatch(updateChatMessagesState({ ids, read: true }))
        if(event) {
          dispatch(emptyEventUnread(event))
        }
      }
    }, 4000)

    return () => clearInterval(timeout)
  }, [messages])

  useEffect(() => {
    dispatch(chatLogin({ chatId: chat?.id }))
    return () => {
      dispatch(chatLogout({ chatId: chat?.id }))
    }
  }, [chat])

  const handleSubmit = () => {

  }
  const handleScrollNext = () => {
    dispatch(fetchChatMessages({
      chatId: chat?.id,
      lastCreatedAt: messages.length > 0 ? messages[messages.length - 1].createdAt : null,
    }))
  }
  useEffect(() => {
    if (lastMessageId && scrollableTarget?.current) {
      scrollableTarget.current.scroll({ top: scrollableTarget?.current.scrollHeight, behavior: 'smooth' })
    }
  }, [lastMessageId])

  if (total === 0 && messagesLoading) {
    return <Loader/>
  }

  return (<div className={styles.root}>
      <div className={styles.messages} ref={scrollableTarget} id="chat-messages">
        {(messagesLoading && total === 0) && <Loader/>}
        {messages.length > 0 && <InfiniteScroll
          style={{ display: 'flex', flexDirection: 'column-reverse', paddingBottom: '5px' }}
          dataLength={messages.length} //This is important field to render the next data
          next={handleScrollNext}
          inverse={true}
          scrollableTarget={'chat-messages'}
          hasMore={total > messages.length}
          loader={<Loader/>}>
          {messages.map(message => <ChatMessage size={'small'} key={message.id} message={message} chat={chat}/>)}
        </InfiniteScroll>}


      </div>
    { ( hasNewMessage && (!messagesLoading || total > 0)) && <div className={styles.newMessage}>
        <ChatNewMessage/>
      </div>}
    </div>
  )
}
EventChatMessageList.defaultProps = {
  hasNewMessage: true
}

