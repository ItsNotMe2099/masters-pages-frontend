import { fetchChat } from "components/Chat/actions";
import Avatar from "components/ui/Avatar";
import AvatarRound from "components/ui/AvatarRound";
import Modal from "components/ui/Modal";
import { useRouter } from "next/router";
import { IChat, IRootState } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import formatDistance from 'date-fns/formatDistance'
import {useTranslation} from 'i18n'
interface Props {
  chat: IChat
  isActive?: boolean
  onRequestClose?: () => void
}

export default function ChatListItem({chat, isActive}: Props) {

  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const router = useRouter();
  const dispatch = useDispatch()
  const {t} = useTranslation('common');
  const handleClick = () => {
    let profileId;
    if(chat.taskId){
      if(currentProfile.role === 'client'){
        profileId = currentProfile.id !== chat.profileId ? chat.profileId : chat.participantId;
      }else{
        profileId = currentProfile.id === chat.profileId ? chat.profileId : chat.participantId;
      }
    }else{
      profileId = currentProfile.id !== chat.profileId ? chat.profileId : chat.participantId;
    }
    const url = chat.taskId ? `/Chat/task-dialog/${chat.taskId}/${profileId}` : `/Chat/dialog/${profileId}`;
   // router.replace(url, url, { shallow: true })
    dispatch(fetchChat(chat.id));
  }
  const profile = chat.participantId === currentProfile.id ? chat.profile : chat.participant;
  return (
   <div className={`${styles.root} ${isActive && styles.rootActive}`} onClick={handleClick}>
      <AvatarRound image={profile.photo} name={profile.firstName}/>
      <div className={styles.info}>
        <div className={styles.title}>{`${profile.firstName} ${profile.lastName} ${chat.task ? `(${chat.task.title})` : ''}`}</div>
        <div className={styles.time}>{formatDistance(new Date(), new Date(chat.lastMessageAt))}</div>
      </div>
     {chat.totalUnread > 0 && <div className={styles.notification}>{chat.totalUnread} {t('new')}</div>}
   </div>
  )
}
