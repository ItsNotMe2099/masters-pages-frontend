import {
  confirmOpen,
  feedbackByMasterOpen,
  finishTaskAsClientOpen,
  taskEditConditionsOpen,
  taskHireMasterOpen,
  taskMarkAsDoneOpen,
  taskOfferAcceptOpen,
  taskShareOpen
} from 'components/Modal/actions'

import StarRatings from 'react-star-ratings'
import BookmarkSvg from 'components/svg/Bookmark'
import TaskActionButton from 'components/Task/components/ActionButton'
import {
  taskNegotiationAcceptTaskOffer,
  taskNegotiationDeclineTaskOffer,
  taskNegotiationFetchLastConditions,
  taskNegotiationSetCurrentNegotiation,
  taskNegotiationSetCurrentTask
} from 'components/TaskNegotiation/actions'
import {taskSearchSetCurrentTask} from 'components/TaskSearch/actions'
import {
  deleteTaskUser,
  fetchTaskUserResponseRequest,
  setPublishedTaskUser,
  taskCancel
} from 'components/TaskUser/actions'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import {format} from 'date-fns'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {default as React, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {ITask, ITaskNegotiation, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus} from 'types'
import {getCategoryTranslation} from 'utils/translations'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {getCurrencySymbol} from 'data/currency'
import {saveTaskRequest} from 'components/SavedTasks/actions'
import {useAppContext} from 'context/state'
import Routes from "pages/routes";
import ChatSvg from 'components/svg/ChatSvg'
import classNames from 'classnames'
import NegotiationRepository from 'data/repositories/NegotiationRepository'
import TaskActions from "components/TaskNew/components/TaskCardActions";
import {TaskWrapper, useTaskContext} from "context/task_state";

enum TaskAction {
  ReadMore = 'readMore',
  Edit = 'edit',
  Delete = 'delete',
  Publish = 'publish',
  UnPublish = 'unPublish',
  Cancel = 'cancel',
  MarkAsCompleted = 'markAsCompleted',
  Share = 'share',
  Save = 'save',
  FeedbackToClient = 'feedbackToClient',

  HireMaster = 'hireMaster'
}

interface Props {
  task: ITask,
  negotiation: ITaskNegotiation
  actionsType: 'public' | 'client' | 'master'
  className?: string,
  isActive?: boolean,
  index?: number,
  onClick?: (task: ITask) => void,
  onEdit?: (task: ITask) => void,
  onDelete?: (task: ITask) => void,
  onPublish?: (task: ITask) => void,
  onUnPublish?: (task: ITask) => void,
  onStatusChange?: () => void
}

const TaskInner = ({
                actionsType,
                task,
                negotiation,
                className,
                isActive,
                onEdit,
                onDelete,
                onPublish,
                onUnPublish,
                index,
                onStatusChange
              }: Props) => {
  const {t, i18n} = useTranslation('common')
  const dispatch = useDispatch()
  const [sortType, setSortType] = useState('newFirst')
  const appContext = useAppContext();
  const profile = appContext.profile

  console.log('TaskUpdate', task.id, task)
  const router = useRouter()

  const handlePublish = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmPublish')} «${task.title}»?`,
      onConfirm: () => {
        dispatch(setPublishedTaskUser(task.id, true))
      }
    }))
  }
  const handleUnPublish = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmUnPublish')} «${task.title}»?`,
      onConfirm: () => {
        dispatch(setPublishedTaskUser(task.id, false))
      }
    }))
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDelete')} «${task.title}»?`,
      onConfirm: () => {
        dispatch(deleteTaskUser(task.id))
        onStatusChange()
      }
    }))
  }

  const handleTaskComplete = () => {
    if (profile.role === 'client') {
      dispatch(taskNegotiationSetCurrentTask(task))
      dispatch(finishTaskAsClientOpen())
    } else {
      dispatch(taskNegotiationSetCurrentTask(task))
      dispatch(taskMarkAsDoneOpen())
    }
  }


  const handleCancel = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmCancel')}?`,
      onConfirm: () => {
        dispatch(taskCancel(task.id))
        onStatusChange()
      }
    }))
  }

  const handleCancelNegotitation = () => {
    dispatch(confirmOpen({
      description: t('chat.cancelTask'),
      onConfirm: () => {
        dispatch(taskCancel(task.id))
        onStatusChange()
      }
    }))
  }

  const [taskStatus, setTaskStatus] = useState<ITaskStatus>(task.status)

  useEffect(() => {
    const newStatus = task.status
    setTaskStatus(newStatus)
  }, [task.status])

  const handleReadMore = () => {

  }

  const handleShare = () => {
    if (profile) {
      dispatch(taskSearchSetCurrentTask(task))
      dispatch(taskShareOpen())
    } else {
      router.push('registration/user')
    }
  }
  const handleFavorite = () => {
    if (profile) {
      dispatch(saveTaskRequest(task.id))
    } else {
      router.push('registration/user')
    }
  }


  const handleFeedbackByMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(feedbackByMasterOpen())
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task)
    }
  }

  /*const handleEditMasterTask = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskNegotiationSetCurrentNegotiation(task.negotiations[0]))
    dispatch(taskEditConditionsOpen())
  }*/

  const getSortData = (sortType) => {
    switch (sortType) {
      case 'newFirst':
        return {sort: 'createdAt', sortOrder: 'DESC'}
      case 'oldFirst':
        return {sort: 'createdAt', sortOrder: 'ASC'}
    }
  }
  const handleMessages = () => {
    if (actionsType === 'master') {

      router.push(`/Chat/task-dialog/${task.id}/${profile.id}`)
    } else if (actionsType === 'client') {
      router.push(`/Chat/task-dialog/${task.id}/${task.masterId}`)
    } else if (actionsType === 'public') {
      const response = task.lastNegotiation
      router.push(`/Chat/task-dialog/${response.taskId}/${response.profileId}`)
    }

  }

  const actions = []

  if (actionsType === 'public') {
    actions.push('share')
    actions.push('save')

  } else {
    if(task.status === ITaskStatus.Draft){

    }else if(task.status === ITaskStatus.Published){

    }else if(task.status === ITaskStatus.PrivatelyPublished){

    }

  }
  const getStatusText = () => {
    switch (task.status) {
      case ITaskStatus.Draft:
        return t('task.status.draft')
      case ITaskStatus.Published:
        return t('task.status.published')
      case ITaskStatus.PrivatelyPublished:
        return t('task.status.private')
      case ITaskStatus.InProgress:
        return t('task.status.inProgress')
      case ITaskStatus.Done:
        return t('task.status.done')
      case ITaskStatus.Canceled:
        return t('task.status.canceled')
    }
  }
  const getStatusClassName = () => {
    switch (task.status) {
      case ITaskStatus.Draft:
        return ''
      case ITaskStatus.Published:
        return ''
      case ITaskStatus.PrivatelyPublished:
        return ''
      case ITaskStatus.InProgress:
        return styles.statusGreen
      case ITaskStatus.Done:
        return styles.statusGreen
      case ITaskStatus.Canceled:
        return styles.statusRed
    }
  }


  const renderActionButton = (action) => {
    switch (action) {
      case TaskAction.ReadMore:
        return <TaskActionButton title={t('task.readMore')} icon={'down'} onClick={handleReadMore}/>
      case TaskAction.Edit:
        return <TaskActionButton title={t('task.edit')} icon={'arrow-right'} onClick={handleEdit}/>
      case TaskAction.Delete:
        return <TaskActionButton title={t('task.delete')} icon={'delete'} onClick={handleDelete}/>
      case TaskAction.Publish:
        return <TaskActionButton title={t('task.publish')} icon={'publish'} onClick={handlePublish}/>
      case TaskAction.UnPublish:
        return <TaskActionButton title={t('task.unPublish')} icon={'unpublish'} onClick={handleUnPublish}/>
      case TaskAction.Cancel:
        return <TaskActionButton title={t('task.cancel')} icon={'delete'} onClick={handleCancel}/>
      case TaskAction.MarkAsCompleted:
        return <TaskActionButton title={t('task.markAsCompleted')} icon={'mark'} onClick={handleTaskComplete}/>
      case TaskAction.Share:
        return <TaskActionButton title={t('task.share')} icon={'share'} onClick={handleShare}/>
      case TaskAction.Save:
        return <TaskActionButton title={t(task.isSavedByCurrentProfile ? 'task.saved' : 'task.save')}
                                 icon={<BookmarkSvg isSaved={task.isSavedByCurrentProfile}/>} onClick={handleFavorite}/>
      case TaskAction.FeedbackToClient:
        return <TaskActionButton title={t('task.postFeedback')} icon={'mark'} onClick={handleFeedbackByMaster}/>
    }
  }

  const renderCategory = (task) => {
    return <div className={styles.category}>
      <div>{getCategoryTranslation(task.mainCategory, i18n.language)?.name}/{getCategoryTranslation(task.category, i18n.language)?.name}/{getCategoryTranslation(task.subCategory, i18n.language)?.name}</div>
    </div>
  }

  const handleSortChange = (sort) => {
    setSortType(sort.value)
    dispatch(fetchTaskUserResponseRequest(task.id, {
      page: 1,
      limit: task.responses?.total <= task.responses?.data?.length ? 1000 : 1, ...getSortData(sort.value)
    }))
  }
  const canEdit = actionsType === 'client'
  const taskLink = `/task/${task.id}`
  const taskContext = useTaskContext();
  const taskProfile = actionsType === 'master' && task.profileId === profile.id && taskContext.negotiation ? taskContext.negotiation.profile : task.profile
  console.log('TaskProfile', taskProfile, profile)

  const profileLink = `${Routes.profile(taskProfile)}`

  const hasOfferActions = (((actionsType === 'master' && task.profileId !== profile.id && task.negotiations && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.SentToMaster) || (actionsType === 'client' && task.negotiations && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.SentToClient)))
  const isInProgress = taskStatus == ITaskStatus.InProgress
  const isFinished = taskStatus == ITaskStatus.Done
  const isCanceled = taskStatus == ITaskStatus.Canceled
  //const showEdit = ['privately_published', 'published'].includes(task.status)


  const handleHireMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskHireMasterOpen())
  }

  return (
    <div
      className={`${styles.root} ${className} ${task.responses?.data.find(item => !item.isRead) && styles.isActive}`}>

      <div className={styles.wrapper}>
        {actionsType === 'public' && <div className={styles.profile}>
          <Avatar href={profileLink} image={task.profile?.photo}/>
          <div className={styles.mobileWrapper}>
            <div className={styles.name__mobile}>
              <Link href={profileLink}>
                <a
                  className={styles.nameText}>{`${taskProfile?.firstName}${taskProfile?.lastName ? ` ${taskProfile?.lastName}` : ''}`}</a></Link>
              <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
            </div>
            <div className={styles.icons}>
              <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
              <div>{taskProfile?.tasksCount || 0}</div>
              <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
              <div>{taskProfile?.feedbacksCount || 0}</div>
            </div>
            <div className={styles.stars}>
              <StarRatings
                rating={taskProfile?.rating || 0}
                starRatedColor="#F2B705"
                starEmptyColor={'#616161'}
                numberOfStars={5}
                name='rating'
                svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
                svgIconViewBox={'0 0 16 14'}
                starDimension={'16px'}
                starSpacing={'1px'}

              />
              <div className={styles.comments}>({taskProfile?.rating || 0})</div>
            </div>
          </div>
        </div>}
        <div className={styles.main}>
          <div className={styles.mainInfo}>
            <div className={styles.top}>
              {['public', 'master'].includes(actionsType) && <div className={styles.name}>
                <Link href={profileLink}>
                  <a
                    className={styles.nameText}>{`${taskProfile?.firstName}${taskProfile?.lastName ? ` ${taskProfile?.lastName}` : ''}`}</a></Link>
                <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
              </div>}
              {(actionsType === 'client') && <div className={styles.taskTitle}>
                <Link href={taskLink}><a className={styles.title}>{task.title}</a></Link>
              </div>}
              <div className={styles.mobile}>{actionsType !== 'client' &&
                <Link href={taskLink}><a className={styles.title}>
                  {task.title}
                </a></Link>}</div>
              {(actionsType !== 'public') && <div className={`${styles.status} ${getStatusClassName()}`}>
                {getStatusText()}
              </div>}
              <div className={styles.time}>
                <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
                <div
                  className={styles.desc}>{task.createdAt ? format(new Date(task.createdAt), 'MM.dd.yyy HH:mm') : ''}</div>
              </div>
            </div>
            <div>
              {actionsType === 'client' && renderCategory(task)}
              <div className={styles.timeMobile}>
                <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
                <div
                  className={styles.desc}>{task.createdAt ? format(new Date(task.createdAt), 'MM.dd.yyy HH:mm') : ''}</div>
              </div>
              <div className={styles.desktop}>{actionsType !== 'client' && <Link href={taskLink}>
                <div className={styles.title}>
                  {task.title}
                </div>
              </Link>}</div>
              {['public', 'master'].includes(actionsType) && renderCategory(task)}
              <div className={styles.desc}>
                {task.description}
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              {actions.map((action, index) => {
                return [renderActionButton(action), ...(index !== actions.length - 1 ? [<div
                  className={styles.separatorLine}/>] : [])]
              })}
            </div>
            {router.asPath === `/orders/${ITaskStatus.Negotiation}` &&
              <div className={styles.chat} onClick={handleMessages}>
                <ChatSvg/>
                <div className={styles.text}>Chat</div>
              </div>}
          </div>
        </div>
        <div className={`${styles.payment} ${actionsType !== 'public' && styles.paymentLarge}`}>


          <div className={styles.priceWrapper}>
            <div className={styles.price}>
              {t('task.price')} :
            </div>
            <div className={styles.priceDetailsValue}>
              {task.priceType === 'fixed' ? `${getCurrencySymbol(task.currency)} ${task.budget || '0'}` :
                `${getCurrencySymbol(task.currency)} ${task.ratePerHour}/${t('priceRateSuffix')}`}
            </div>
          </div>

          {task.priceType !== 'fixed' && task.estimate && <div className={styles.priceWrapper}>
            <div className={styles.price}>
              {t('estimate')} :
            </div>
            <div className={styles.priceDetailsValue}>
              {task.estimate} {t('daysSuffix')}
            </div>
          </div>}

          {task.deadline && <div className={styles.priceDetailsItem}>
            <div className={styles.priceDetailsLabel}>
              {t('task.deadline')} :
            </div>
            <div className={styles.priceDetailsValue}>
              <span>{format(new Date(task.deadline), 'MM.dd.yyy')}</span>
            </div>
          </div>}
          <div
            className={classNames(styles.btnContainer, {[styles.altContainer]: router.asPath === `/orders/${ITaskStatus.Negotiation}`})}>
            <TaskActions type={actionsType}/>
         </div>
        </div>

      </div>


    </div>
  )
}
const Task = (props: Props) => {
  return <TaskWrapper negotiation={props.negotiation} task={props.task}>
    <TaskInner {...props}/>
  </TaskWrapper>
}

export default Task
