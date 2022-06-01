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
  onRequestClose?: () => void
  onClick?: () => void
}

export default function ChatTitle({chat, onClick}: Props) {
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

  const isInProgress = chat.task &&  chat.task.status == ITaskStatus.InProgress && (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId)
  const isFinished =  chat.task &&  chat.task.status == ITaskStatus.Done && (chat.task.masterId === chat.profileId || chat.task.masterId === chat.participantId)
  const isCanceled =  chat.task &&  chat.task.status == ITaskStatus.Canceled
  const isProjectGroup = chat.isGroup && chat.projectId
  const [isOpen, setIsOpen] = useState(false)
  const profileLink = `/id${profile?.id}`
  return (
   <div className={styles.root}>
     <div className={styles.controls}>
      <CloseIcon onClick={onClick}/>
    </div>
     <div className={styles.left}>
       {isProjectGroup ? <img src='/img/icons/chat_group.svg'/> : <Link href={profileLink}><a><AvatarRound image={chat.profile?.avatar} name={chat.profile?.firstName}/></a></Link>}
       <div className={styles.title}>{isProjectGroup ? chat.name : <Link href={profileLink}><a>{`${profile.firstName} ${profile.lastName} ${chat.task ? `(${chat.task.title})` : ''}`}</a></Link>}
       </div>
     </div>
     <div className={styles.more} onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
       {isOpen ? t('taskSearch.filter.less') : t('taskSearch.filter.more')}
      </div>
     <div className={cx(styles.btns, {[styles.none]: !isOpen})}>
     { chat.task && !isCanceled && !isFinished && profile.role === 'client' && <Button className={styles.action} onClick={handleCancel}>{t('confirmModal.buttonCancel')}</Button>}
     { chat.task && isInProgress && profile.role !== 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleMarkAsDone}>{t('chat.markAsDone')}</Button>}
     { chat.task && isInProgress && profile.role === 'client' && <Button className={`${styles.action} ${styles.actionGreen}`}  onClick={handleFinish}>{t('chat.finishTask')}</Button>}
     { chat.task && !isInProgress && !isFinished && lastNegotiation !== null && profile.role === 'client' &&
     (
         (lastNegotiation.authorId === profile.id && lastNegotiation.state === ITaskNegotiationState.Accepted)
       || (lastNegotiation.authorId !== profile.id && ![ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(lastNegotiation.state))
       || ( lastNegotiation.type === ITaskNegotiationType.TaskOffer && [ITaskNegotiationState.Accepted].includes(lastNegotiation.state))
     )
     && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHireMaster}>{t('chat.hireMaster')}</Button>}
     { chat.task && !isInProgress && !isFinished && chat.task.status == ITaskStatus.Published && <Button className={styles.action} onClick={handleEditConditions}>{t('chat.negotiateOffer')}</Button>}
     { chat.task && !isInProgress && !isFinished && lastNegotiation !== null && lastNegotiation.authorId == profile.id && !(lastNegotiation.state === ITaskNegotiationState.Declined || lastNegotiation.state === ITaskNegotiationState.Accepted) && <div className={styles.status}>{t('chat.title')}</div>}
     { chat.task && isInProgress && <div className={`${styles.status} ${styles.statusGreen}`}>{t('chat.taskAccepted')} <MarkIcon color={'#27C60D'}/></div>}
     { chat.task && isFinished && <div className={`${styles.status} ${styles.statusGreen}`}>{t('chat.taskFinished')} <MarkIcon color={'#27C60D'}/></div>}
     { chat.task && isCanceled && <div className={`${styles.status}`}>{t('chat.taskCanceled')} <CloseIcon /></div>}
     </div>

   </div>
  )
}
