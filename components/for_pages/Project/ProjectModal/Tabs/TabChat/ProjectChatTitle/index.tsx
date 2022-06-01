import {
  confirmOpen,
  finishTaskAsClientOpen,
  taskEditConditionsOpen,
  taskHireMasterOpen,
  taskMarkAsDoneOpen
} from 'components/Modal/actions'
import CloseIcon from 'components/svg/CloseIcon'
import MarkIcon from 'components/svg/MarkIcon'
import {
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from 'components/TaskNegotiation/actions'
import { taskCancel } from 'components/TaskUser/actions'
import AvatarRound from 'components/ui/AvatarRound'
import Button from 'components/ui/Button'
import { IRootState, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus } from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import cx from 'classnames'
import {useAppContext} from 'context/state'
import {IChat} from 'data/intefaces/IChat'
import Link from 'next/link'
interface Props {
  chat: IChat
}

export default function ProjectChatTitle({chat}: Props) {
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const profile = appContext.profile
  const lastNegotiation = useSelector((state: IRootState) => state.taskOffer.lastCondition)
  const handleHireMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task))
    dispatch(taskHireMasterOpen())

  }
  const handleEditConditions = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task))
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation))
    dispatch(taskEditConditionsOpen())

  }
  const handleMarkAsDone = () => {

    dispatch(taskNegotiationSetCurrentTask(chat.task))
    dispatch(taskMarkAsDoneOpen())
  }
  const handleFinish = () => {
    dispatch(taskNegotiationSetCurrentTask(chat.task))
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation))
    dispatch(finishTaskAsClientOpen())
  }
  const handleCancel = () => {
    dispatch(confirmOpen({
      description: t('chat.cancelTask'),
      onConfirm: () => {
        dispatch(taskCancel(chat.taskId))
      }
    }))
  }
  const { t } = useTranslation('common')


  const isProjectGroup = chat.isGroup && chat.projectId
  const [isOpen, setIsOpen] = useState(false)
  const profileLink = `/id${profile?.id}`
  return (
   <div className={styles.root}>
     <div className={styles.left}>
       {isProjectGroup ? <img src='/img/icons/chat_group.svg'/> : <Link href={profileLink}><a><AvatarRound image={chat.profile?.avatar} name={chat.profile?.firstName}/></a></Link>}
       <div className={styles.title}>{isProjectGroup ? chat.name : <Link href={profileLink}><a>{`${profile.firstName} ${profile.lastName} ${chat.task ? `(${chat.task.title})` : ''}`}</a></Link>}
       </div>
     </div>

   </div>
  )
}
