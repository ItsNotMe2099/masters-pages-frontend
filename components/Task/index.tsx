import {
  confirmOpen, feedbackByMasterOpen,
  finishTaskAsClientOpen,
  signUpOpen,
  taskMarkAsDoneOpen,
  taskOfferAcceptOpen,
  taskShareOpen
} from 'components/Modal/actions'

import StarRatings from 'react-star-ratings'
import BookmarkSvg from 'components/svg/Bookmark'
import TaskActionButton from 'components/Task/components/ActionButton'
import TaskResponse from 'components/Task/components/TaskResponse'
import {
  taskNegotiationAcceptTaskOffer,
  taskNegotiationDeclineTaskOffer,
  taskNegotiationSetCurrentTask
} from 'components/TaskNegotiation/actions'
import { taskSearchSetCurrentTask } from 'components/TaskSearch/actions'
import {
  deleteTaskUser,
  fetchTaskUserResponseRequest,
  setPublishedTaskUser,
  taskCancel
} from 'components/TaskUser/actions'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import { DropDown } from 'components/ui/DropDown'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { default as React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState, ITask, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus } from 'types'
import { getCategoryTranslation } from 'utils/translations'
import styles from './index.module.scss'
import { useTranslation } from 'next-i18next'
import {getCurrencySymbol} from 'data/currency'
import {saveTaskRequest} from 'components/SavedTasks/actions'
import {useAppContext} from 'context/state'
import Routes from "pages/routes";

interface Props {
  task: ITask,
  actionsType: 'public' | 'client' | 'master'
  className?: string,
  isActive?: boolean,
  index?: number,
  onClick?: (task: ITask) => void,
  onEdit?: (task: ITask) => void,
  onDelete?: (task: ITask) => void,
  onPublish?: (task: ITask) => void,
  onUnPublish?: (task: ITask) => void,
}

const Task = ({ actionsType, task, className, isActive, onEdit, onDelete, onPublish, onUnPublish, index }: Props) => {
  const { t, i18n } = useTranslation('common')
  const dispatch = useDispatch()
  const [sortType, setSortType] = useState('newFirst')
  const appContext = useAppContext();
  const profile = appContext.profile

  console.log('TaskUpdate', task.id, task)
  const router = useRouter()
  useEffect(() => {
    if(actionsType === 'client') {
      dispatch(fetchTaskUserResponseRequest(task.id, { limit: 1, ...getSortData(sortType) }))
    }
  }, [])

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
      }
    }))
  }
  const handleReadMore = () => {

  }
  const handleLoadMore = () => {
    dispatch(fetchTaskUserResponseRequest(task.id, { page: 1, limit: 1000, ...getSortData(sortType) }))
  }
  const handleShare = () => {
    if(profile){
    dispatch(taskSearchSetCurrentTask(task))
    dispatch(taskShareOpen())
    }
    else{
      router.push('registration/user')
    }
  }
  const handleFavorite = () => {
    if(profile){
      dispatch(saveTaskRequest(task.id))
    }
    else{
      router.push('registration/user')
    }
  }

  const handleAcceptAsMasterToClient = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskOfferAcceptOpen())
  }
  const handleAccept = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmAccept')}?`,
      onConfirm: () => {
        dispatch(taskNegotiationAcceptTaskOffer(task.negotiations[0]))
      }
    }))
  }

  const handleDecline = () => {
    dispatch(confirmOpen({
      description: `${t('task.confirmDecline')}?`,
      onConfirm: () => {
        dispatch(taskNegotiationDeclineTaskOffer(task.negotiations[0]))
      }
    }))
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
  const getSortData = (sortType) => {
    switch (sortType) {
      case 'newFirst':
        return { sort: 'createdAt', sortOrder: 'DESC' }
      case 'oldFirst':
        return { sort: 'createdAt', sortOrder: 'ASC' }
    }
  }
  const handleMessages = () => {
    if (actionsType === 'master') {

      router.push(`/Chat/task-dialog/${task.id}/${profile.id}`)
    } else if (actionsType === 'client') {
      router.push(`/Chat/task-dialog/${task.id}/${task.masterId}`)
    }else if (actionsType === 'public') {
      const response = task.lastNegotiation
      router.push(`/Chat/task-dialog/${response.taskId}/${response.profileId}`)
    }

  }
  const actions = []

  if (actionsType === 'client') {
    if ([ITaskStatus.Negotiation, ITaskStatus.Draft, ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && profile.id === task.profileId) {
      actions.push('edit')
    }
    if (['draft'].includes(task.status)) {
      actions.push('delete')
      actions.push('publish')
    }

    if ([ITaskStatus.Published, ITaskStatus.PrivatelyPublished, ITaskStatus.Negotiation].includes(task.status) && profile.id === task.profileId) {
      if(task.status !== ITaskStatus.PrivatelyPublished) {
        actions.push('unPublish')
      }
      actions.push('cancel')
    }
    if (['in_progress'].includes(task.status)) {
      actions.push('cancel')
      actions.push('markAsCompleted')
    }

  } else if (actionsType === 'master') {
    if (['in_progress'].includes(task.status)) {
      actions.push('markAsCompleted')
    }
    if (['done'].includes(task.status) && !task.feedbacks.find(f => f.target === 'client')) {
      actions.push('feedbackToClient')
    }
    if ([ITaskStatus.Negotiation, ITaskStatus.Draft, ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && profile.id === task.profileId) {
      actions.push('edit')
    }
    if ([ITaskStatus.Published, ITaskStatus.PrivatelyPublished, ITaskStatus.Negotiation].includes(task.status) && profile.id === task.profileId) {
      if(task.status !== ITaskStatus.PrivatelyPublished) {
        actions.push('unPublish')
      }
      actions.push('cancel')
    }
  } else if (actionsType === 'public') {
    actions.push('share')
    actions.push('save')
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
      case 'readMore':
        return <TaskActionButton title={t('task.readMore')} icon={'down'} onClick={handleReadMore}/>
      case 'edit':
        return <TaskActionButton title={t('task.edit')} icon={'arrow-right'} onClick={handleEdit}/>
      case 'delete':
        return <TaskActionButton title={t('task.delete')} icon={'delete'} onClick={handleDelete}/>
      case 'publish':
        return <TaskActionButton title={t('task.publish')} icon={'publish'} onClick={handlePublish}/>
      case 'unPublish':
        return <TaskActionButton title={t('task.unPublish')} icon={'unpublish'} onClick={handleUnPublish}/>
      case 'cancel':
        return <TaskActionButton title={t('task.cancel')} icon={'delete'} onClick={handleCancel}/>
      case 'markAsCompleted':
        return <TaskActionButton title={t('task.markAsCompleted')} icon={'mark'} onClick={handleTaskComplete}/>
      case 'share':
        return <TaskActionButton title={t('task.share')} icon={'share'} onClick={handleShare}/>
      case 'save':
        return <TaskActionButton title={t(task.isSavedByCurrentProfile ? 'task.saved' : 'task.save')} icon={<BookmarkSvg isSaved={task.isSavedByCurrentProfile}/>} onClick={handleFavorite}/>
      case 'feedbackToClient':
        return <TaskActionButton title={t('task.postFeedback')} icon={'mark'}  onClick={handleFeedbackByMaster}/>
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
  const taskProfile = actionsType === 'master' && task.profileId === profile.id && task.negotiations.length > 0 ? task.negotiations[0].profile : task.profile
  console.log('TaskProfile', taskProfile, profile)

  const profileLink = `${Routes.profile(taskProfile)}`
  const hasOfferActions = (((actionsType === 'master' && task.profileId !== profile.id) || (actionsType === 'client' && task.profileId !== profile.id)) && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.SentToMaster)

  return (
    <div className={`${styles.root} ${className} ${task.responses?.data.find(item => !item.isRead) && styles.isActive}`}>

      <div className={styles.wrapper}>
        {actionsType === 'public' && <div className={styles.profile}>
          <Avatar href={profileLink} image={task.profile?.photo}/>
          <div className={styles.mobileWrapper}>
            <div className={styles.name__mobile}>
              <Link href={profileLink}>
              <a
                className={styles.nameText}>{`${taskProfile.firstName}${taskProfile.lastName ? ` ${taskProfile.lastName}` : ''}`}</a></Link>
              <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
            </div>
            <div className={styles.icons}>
              <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
              <div>{taskProfile.tasksCount || 0}</div>
              <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
              <div>{taskProfile.feedbacksCount || 0}</div>
            </div>
            <div className={styles.stars}>
              <StarRatings
                rating={taskProfile.rating || 0}
                starRatedColor="#F2B705"
                starEmptyColor={'#616161'}
                numberOfStars={5}
                name='rating'
                svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
                svgIconViewBox={'0 0 16 14'}
                starDimension={'16px'}
                starSpacing={'1px'}

              />
              <div className={styles.comments}>({taskProfile.rating || 0})</div>
            </div>
          </div>
        </div>}
        <div className={styles.main}>
          <div className={styles.mainInfo}>
            <div className={styles.top}>
              {['public', 'master'].includes(actionsType) && <div className={styles.name}>
                <Link href={profileLink}>
                <a
                  className={styles.nameText}>{`${taskProfile.firstName}${taskProfile.lastName ? ` ${taskProfile.lastName}` : ''}`}</a></Link>
                <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
              </div>}
              {(actionsType === 'client') && <div className={styles.taskTitle}>
                <Link href={taskLink}><a className={styles.title}>{task.title}</a></Link>
              </div>}
              <div className={styles.mobile}>{actionsType !== 'client' && <Link href={taskLink}><a className={styles.title}>
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
              <div className={styles.desktop}>{actionsType !== 'client' && <Link href={taskLink}><div className={styles.title}>
                {task.title}
              </div></Link>}</div>
              {['public', 'master'].includes(actionsType) && renderCategory(task)}
              <div className={styles.desc}>
                {task.description}
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            {actions.map((action, index) => {
              return [renderActionButton(action), ...(index !== actions.length - 1 ? [<div
                className={styles.separatorLine}/>] : [])]
            })}
          </div>
        </div>
        <div className={`${styles.payment} ${actionsType !== 'public' && styles.paymentLarge}`}>


          <div className={styles.priceWrapper}>
            <div className={styles.price}>
              {t('task.price')} :
            </div>
            <div className={styles.priceDetailsValue}>
              {task.priceType === 'fixed' ? `${getCurrencySymbol(task.currency)} ${task.budget || '0'}`:
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
          <div className={styles.btnContainer}>
            {(actionsType === 'public' && profile && profile.role !== 'client' && !task.lastNegotiation) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleAcceptAsMasterToClient}>    {t('task.acceptTask')} </Button>}
            {((actionsType !== 'public' && ![ITaskStatus.Draft].includes(task.status) && ((actionsType === 'master' && task.negotiations?.length > 0 && [ITaskNegotiationState.Accepted].includes(task.negotiations[0].state)) || (actionsType === 'client' && [ITaskStatus.InProgress, ITaskStatus.Done, ITaskStatus.Canceled].includes(task.status)) || (actionsType === 'master' &&  task.masterId === profile.id && [ITaskStatus.InProgress, ITaskStatus.Done, ITaskStatus.Canceled].includes(task.status))))) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleMessages}> {t('task.messages')} </Button>}
            {hasOfferActions &&
            <Button bold smallFont transparent size='16px 0' onClick={handleDecline}> {t('task.decline')} </Button>}
            {hasOfferActions &&
            <Button bold smallFont transparent size='16px 0' onClick={handleAccept}> {t('task.accept')} </Button>}
            {(actionsType === 'master' && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.Declined) &&
            <div className={styles.actionStatus}> {t('task.youDeclined')} </div>}
            {(actionsType === 'public' && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.lastNegotiation && task.lastNegotiation.state === ITaskNegotiationState.Accepted) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleMessages}> {t('task.messages')} </Button>}
          </div>
        </div>

      </div>

      {task.responses?.total > 0 && <div className={styles.responses}>
        <div className={styles.responsesTop}>
          <div className={styles.responsesTitle}>{t('task.masterList')} ({task.responses?.total})</div>
          {task.responses?.total > 0 && <div className={styles.tasksSort}>
            <span>{t('sort.title')}</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              { value: 'newFirst', label: t('sort.newFirst') },
              { value: 'oldFirst', label: t('sort.oldFirst') }
            ]} item={(item) => <div>{item?.label}</div>}
            />
          </div>}
        </div>
        <div className={styles.responsesList}>
          {(task.responses?.data ? task.responses?.data : []).map(response => <TaskResponse response={response}
                                                                                            task={task}/>)}
        </div>
        <div className={styles.loadMoreArea}>
          {task.responses?.total > task.responses?.data?.length &&
          <div className={styles.loadMore} onClick={handleLoadMore}>{t('loadMore')}</div>}
        </div>
      </div>}
    </div>
  )
}
Task.defaultProps = {
  showProfile: true,
  actionsType: 'public'
}

export default Task
