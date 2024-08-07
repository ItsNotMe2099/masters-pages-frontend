import { useState } from 'react'
import * as React from 'react'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { IRootState, ITask, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus } from 'types'
import { getAuthServerSide } from 'utils/auth'
import Loader from 'components/ui/Loader'
import Layout from 'components/layout/Layout'
import { getCategoryTranslation } from 'utils/translations'
import { format } from 'date-fns'
import ReportDateSelector from 'components/Report/ReportDateSelector'
import { fetchEvent, fetchEventList } from 'components/Events/actions'
import InfiniteScroll from 'react-infinite-scroll-component'
import CalendarEvent from 'components/Calendar/components/CalendarEvent'
import NewEventModal from 'components/Calendar/components/NewEventModal'
import { confirmOpen, editEventOpen, finishTaskAsClientOpen, modalClose, taskEditConditionsOpen, taskHireMasterOpen, taskMarkAsDoneOpen } from 'components/Modal/actions'
import EditEventModal from 'components/Calendar/components/EditEventModal'
import Modals from 'components/layout/Modals'
import TaskReview from 'components/for_pages/Task/TaskReview'
import { fetchOneTaskUserRequest, fetchTaskStatsById, taskCancel } from 'components/TaskUser/actions'
import { getEventPlannedAllowed } from 'utils/event'
import Button from 'components/ui/Button'
import { createProfileRecommendation } from 'components/ProfileRecommendations/actions'
import { useTranslation } from 'next-i18next'
import MarkIcon from 'components/svg/MarkIcon'
import FileList from 'components/ui/FileList'
import { useAppContext } from 'context/state'
import NegotiationRepository from 'data/repositories/NegotiationRepository'
import TaskRepository from 'data/repositories/TaskRepository'
import { taskNegotiationFetchLastConditions, taskNegotiationSetCurrentNegotiation, taskNegotiationSetCurrentTask } from 'components/TaskNegotiation/actions'
import ChatSvg from 'components/svg/ChatSvg'

const TaskPage = (props) => {
  const router = useRouter()
  const { t, i18n } = useTranslation('common')
  //const { task } = router.query
  const dispatch = useDispatch()
  const appContext = useAppContext();
  const currentProfile = appContext.profile
  const events = useSelector((state: IRootState) => state.event.list)
  const eventsLoading = useSelector((state: IRootState) => state.event.listLoading)
  const eventsTotal = useSelector((state: IRootState) => state.event.total)
  const currentEvent = useSelector((state: IRootState) => state.event.currentEvent)
  const currentLoading = useSelector((state: IRootState) => state.event.currentLoading)

  const profile = appContext.profile

  //const task = useSelector((state: IRootState) => state.taskUser.current)
  const [task, setTask] = useState<ITask | null>(null)
  const stats = useSelector((state: IRootState) => state.taskUser.stats)
  const loading = useSelector((state: IRootState) => state.taskUser.currentLoading)
  const modelKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [dateRange, setDateRange] = useState(null)
  const [page, setPage] = useState(1)
  const [loadIsRecommended, setIsRecommended] = useState(false)
  const lastNegotiation = useSelector((state: IRootState) => state.taskOffer.lastCondition)
  const isInProgress = task?.status === ITaskStatus.InProgress
  const isFinished = task?.status === ITaskStatus.Done
  const isCanceled = task?.status === ITaskStatus.Canceled

  const fetchTask = async () => {
    await TaskRepository.fetchOneTaskUserRequest(+router.query.task).then(i => {
      if (i) {
        setTask(i)
      }
    })
  }
  React.useEffect(() => {
    //dispatch(fetchOneTaskUserRequest(parseInt(router.query.task as string, 10)))
    dispatch(taskNegotiationFetchLastConditions(parseInt(router.query.task as string), profile.id))
    fetchTask()
    dispatch(fetchTaskStatsById(router.query.task))
    NegotiationRepository.fetchTaskLastConditions(parseInt(router.query.task as string))
  }, [])


  const handleDateRangeChange = (value) => {
    setDateRange(value)
    setPage(1)
    dispatch(fetchEventList({
      ...(value ?
        {
          start: format(value.start, 'yyyy-MM-dd 00:00:00 XXX'),
          end: format(value.end, 'yyyy-MM-dd 23:59:59 XXX')
        } : {
          start: '2000-01-01 00:00:00 +03:00',
          end: '2100-01-01 00:00:00 +03:00'
        }),
      limit: 1000,
      page: 1,
      taskId: parseInt(router.query.task as string, 10)
    }
    ))
  }
  const handleScrollNext = () => {
    setPage(page + 1)
    dispatch(fetchEventList({
      ...(dateRange ?
        {
          start: format(dateRange.start, 'yyyy-MM-dd 00:00:00 XXX'),
          end: format(dateRange.end, 'yyyy-MM-dd 23:59:59 XXX')
        } : {
          start: '2000-01-01 00:00:00 +03:00',
          end: '2100-01-01 00:00:00 +03:00'
        }),
      limit: 1000,
      page: page + 1,
      taskId: parseInt(router.query.task as string, 10)
    }
    ))
  }

  const handleEventClick = (event) => {
    dispatch(fetchEvent(event.id))
    dispatch(editEventOpen())
  }
  const handleRecommend = () => {
    setIsRecommended(true)
    dispatch(createProfileRecommendation(currentProfile.role === 'client' ? task.masterId : task.profileId))

  }

  const isMarkVisible = () => {
    return [ITaskStatus.Done].includes(task.status)
  }
  const isRecommendVisible = () => {
    return [task.profileId, task.masterId].includes(currentProfile.id)
  }
  const isRecommended = loadIsRecommended || (currentProfile.role === 'client' ? task?.master?.isRecommendedByCurrentProfile : task?.profile?.isRecommendedByCurrentProfile)

  const getStatusColor = () => {
    switch (task.status) {

      case ITaskStatus.Canceled:
      case ITaskStatus.Paused:
        return styles.status__red
      case ITaskStatus.Draft:
        return styles.status__grey
      case ITaskStatus.Negotiation:
      case ITaskStatus.Published:
      case ITaskStatus.PrivatelyPublished:
        return styles.status__blue
      case ITaskStatus.InProgress:
        return styles.status__orange
      case ITaskStatus.Done:
        return styles.status__green

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

  const handleHireMaster = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskHireMasterOpen())
  }

  const handleCancelNegotitation = () => {
    dispatch(confirmOpen({
      description: t('chat.cancelTask'),
      onConfirm: () => {
        dispatch(taskCancel(task.id))
      }
    }))
  }

  const handleMarkAsDone = () => {

    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskMarkAsDoneOpen())
  }
  const handleFinish = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation))
    dispatch(finishTaskAsClientOpen())
  }

  const handleEditConditions = () => {
    dispatch(taskNegotiationSetCurrentTask(task))
    dispatch(taskNegotiationSetCurrentNegotiation(lastNegotiation))
    dispatch(taskEditConditionsOpen())

  }

  const role = appContext.role

  const handleMessages = () => {
    if (role === 'master') {
      router.push(`/Chat/task-dialog/${task.id}/${profile.id}`)
    } else if (role === 'client') {
      router.push(`/Chat/task-dialog/${task.id}/${task.masterId}`)
    }
  }


  return (
    <Layout>
      {task && <div className={styles.columns}>
        <div className={styles.leftSide}>
          <div className={styles.header}>
            <div className={styles.title}>
              <div className={styles.value}>{task.title}</div>
              <div className={styles.label}>#{task.id}</div>
            </div>
            <div className={`${styles.headerValue} ${styles.deadline}`}>
              <div className={styles.value}>{format(new Date(task.deadline), 'dd.MM.yyyy')}</div>
              <div className={styles.label}>{t('deadline')}</div>
            </div>
            <div className={styles.separator} />
            <div className={`${styles.headerValue} ${styles.price}`}>
              <div className={styles.value}>{task.priceType === 'fixed' ? task.budget : task.ratePerHour}</div>
              <div
                className={styles.label}>{(task.priceType === 'fixed' ? t('budget') : t('perHour'))}</div>
            </div>
          </div>


          {task.description && <div className={styles.content}>{task.description}</div>}
          {stats && <div className={styles.stats}>
            <div className={styles.statsTitle}>{t('statistic')}</div>
            <div className={styles.tableWrapper}>
              <div className={styles.statsTable}>
                <div className={styles.statsHeader}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}></div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{t('task.page.planned')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{t('task.page.completed')}</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}>{t('task.page.time')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.plannedTime}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.completedTime}</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}>{t('task.page.charges')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.plannedCharges}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.completedCharges}</div>
                </div>
                <div className={styles.statsRow}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}>{t('task.page.expenses')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.plannedExpenses}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.completedExpenses}</div>
                </div>
                <div className={styles.statsSeparator}>
                  <div className={`${styles.statsCell} ${styles.statsEmpty}`} />
                  <div className={`${styles.statsCell} ${styles.statsEmpty}`} />
                  <div className={`${styles.statsCell} ${styles.statsEmpty}`} />
                </div>
                <div className={styles.statsRow}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}>{t('event.events')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>
                    {stats.eventsCompleted}
                  </div>
                  <div className={`${styles.statsCell} ${styles.statsEmpty}`} />
                </div>
                <div className={styles.statsRow}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}>{t('task.page.planned')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.eventsPlanned}</div>
                  <div className={`${styles.statsCell} ${styles.statsEmpty}`} />
                </div>
                <div className={styles.statsRow}>
                  <div className={`${styles.statsCell} ${styles.statsLabel}`}>{t('reviews')}</div>
                  <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.reviews}</div>
                  <div className={`${styles.statsCell} ${styles.statsEmpty}`} />
                </div>
              </div>
            </div>
          </div>}

          <TaskReview task={task} />
        </div>
        <div className={styles.rightSide}>
          <div className={`${styles.status} ${getStatusColor()}`}>
            <div className={styles.type}>Status</div>
            {isMarkVisible() && <MarkIcon className={styles.icon} color={'#ffffff'} />}
            <div className={styles.statusText}>{getStatusText()}</div>
          </div>
          <div className={styles.separator} />
          <div className={styles.actions}>
            {isRecommended && isRecommendVisible() ? <div className={styles.youRecommended}>{t('youRecommended')}</div> :
              <Button className={styles.action} size={'12px 40px'} onClick={handleRecommend}>{t('recommend')}</Button>}
            {task && !isInProgress && !isFinished && lastNegotiation !== null && profile.role === 'client' &&
              (
                (lastNegotiation.authorId === profile.id && lastNegotiation.state === ITaskNegotiationState.Accepted)
                || (lastNegotiation.authorId !== profile.id && ![ITaskNegotiationState.Accepted, ITaskNegotiationState.Declined].includes(lastNegotiation.state))
                || (lastNegotiation.type === ITaskNegotiationType.TaskOffer && [ITaskNegotiationState.Accepted].includes(lastNegotiation.state))
              )
              && <Button className={`${styles.action} ${styles.actionRed}`} onClick={handleHireMaster}>{t('chat.hireMaster')}</Button>}
            {task && !isCanceled && !isFinished && profile.role === 'client' && <Button className={styles.action} onClick={handleCancelNegotitation}>{t('confirmModal.buttonCancel')}</Button>}
            {task && isInProgress && profile.role !== 'client' && <Button className={`${styles.action} ${styles.actionGreen}`} onClick={handleMarkAsDone}>{t('chat.markAsDone')}</Button>}
            {task && isInProgress && profile.role === 'client' && <Button className={`${styles.action} ${styles.actionGreen}`} onClick={handleFinish}>{t('chat.finishTask')}</Button>}
            {task && !isInProgress && !isFinished && task.status == ITaskStatus.Published && <Button className={styles.action} onClick={handleEditConditions}>{t('chat.negotiateOffer')}</Button>}
          </div>
          <div className={styles.separator} />
          <Button className={styles.chat} size={'12px 40px'} onClick={handleMessages}><ChatSvg />Chat</Button>
          <div className={styles.separator} />
          <div className={styles.category}>
            <div className={styles.field}>
              <div className={styles.label}>{t('category')}</div>
              <div className={styles.value}>{getCategoryTranslation(task.category, i18n.language)?.name}</div>
            </div>

            <div className={styles.field}>
              <div className={styles.label}>{t('subCategory')}</div>
              <div className={styles.value}>{getCategoryTranslation(task.subCategory, i18n.language)?.name}</div>
            </div>

          </div>
          {task.photos.length > 0 && <>
            <div className={styles.separator} />
            <FileList files={task.photos} />
          </>}
        </div>
      </div>}
      <div className={styles.eventsWrapper}>
        <ReportDateSelector showAll={true} input={{ value: dateRange, onChange: handleDateRangeChange }} />
        {(eventsLoading && eventsTotal === 0) && <Loader />}
        {eventsTotal > 0 && <InfiniteScroll
          dataLength={events.length} //This is important field to render the next data
          next={handleScrollNext}
          style={{ overflow: 'inherit' }}
          className={styles.events}
          hasMore={eventsTotal > events.length}
          loader={eventsLoading ? <Loader /> : null}>
          {events.map((item, index) => <div className={styles.event}>
            <CalendarEvent onClick={() => handleEventClick(item)} event={item} />
            <div
              className={styles.eventDate}>{format(getEventPlannedAllowed(item) ? item.start : item.actualStart, 'dd/MM/yyyy')}</div>
          </div>)}
        </InfiniteScroll>}
      </div>
      {modelKey === 'eventCreateModal' &&
        <NewEventModal isOpen={true} onClose={() => dispatch(modalClose())} />}
      {(['confirm', 'eventEditModal', 'eventExpensePlannedModal', 'eventExpenseActualModal'].includes(modelKey) && (currentEvent || currentLoading)) &&
        <EditEventModal isOpen={true} onClose={() => dispatch(modalClose())} />}
      <Modals />
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({ redirect: true })
export default TaskPage
