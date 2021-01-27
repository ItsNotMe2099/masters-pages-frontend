import { fetchChat } from "components/Chat/actions";
import Avatar from "components/ui/Avatar";
import AvatarRound from "components/ui/AvatarRound";
import Modal from "components/ui/Modal";
import { IChat } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import formatDistance from 'date-fns/formatDistance'

interface Props {
  chat: IChat
  isActive?: boolean
  onRequestClose?: () => void
}

export default function ChatListItem({chat, isActive}: Props) {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(fetchChat(chat.id));
  }
  return (
   <div className={`${styles.root} ${isActive && styles.rootActive}`} onClick={handleClick}>
      <AvatarRound image={chat.profile.avatar} name={chat.profile.firstName}/>
      <div className={styles.info}>
        <div className={styles.title}>{chat.task ? chat.task.title : `${chat.profile.firstName} ${chat.profile.lastName}`}</div>
        <div className={styles.time}>{formatDistance(new Date(), new Date(chat.lastMessageAt))}</div>
      </div>
     {chat.totalUnread > 0 && <div className={styles.notification}>{chat.totalUnread} new</div>}
   </div>
  )
}
