import { fetchChat } from 'components/Chat/actions'
import AvatarRound from 'components/ui/AvatarRound'
import { useRouter } from 'next/router'
import {  IRootState } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'

import formatDistance from 'date-fns/formatDistance'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import {IChat} from 'data/intefaces/IChat'
interface Props {
  chat: IChat
  isActive?: boolean
  onRequestClose?: () => void,
  onClick?: () => void
}

export default function ChatListItem({chat, isActive, onClick}: Props) {

  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const router = useRouter()
  const dispatch = useDispatch()
  const {t} = useTranslation('common')
  const handleClick = () => {
    if(onClick){
      return onClick()
    }
    let profileId
    if(chat.taskId){
      if(currentProfile.role === 'client'){
        profileId = currentProfile.id !== chat.profileId ? chat.profileId : chat.participantId
      }else{
        profileId = currentProfile.id === chat.profileId ? chat.profileId : chat.participantId
      }
    }else{
      profileId = currentProfile.id !== chat.profileId ? chat.profileId : chat.participantId
    }
    const url = chat.taskId ? `/Chat/task-dialog/${chat.taskId}/${profileId}` : `/Chat/dialog/${profileId}`
   // router.replace(url, url, { shallow: true })
    dispatch(fetchChat(chat.id))
  }
  const isProjectGroup = chat.isGroup && chat.projectId
  const profile = chat.participantId === currentProfile.id ? chat.profile : chat.participant
  return (
   <div className={`${styles.root} ${isActive && styles.rootActive}`} onClick={handleClick}>
     {isProjectGroup ? <img src='/img/icons/chat_group.svg'/> : <AvatarRound image={profile.photo} name={profile.firstName}/>}
      <div className={styles.info}>
        <div className={styles.title}>{isProjectGroup ? chat.name : `${profile.firstName} ${profile.lastName} ${chat.task ? `(${chat.task.title})` : ''}`}</div>
        {chat.lastMessageAt && <div className={styles.time}>{formatDistance(new Date(), new Date(chat.lastMessageAt))}</div>}
      </div>
     {chat.totalUnread > 0 && <div className={styles.notification}>{chat.totalUnread} {t('new')}</div>}
   </div>
  )
}
