import {changeRole, fetchProfile} from "components/Profile/actions";
import Tabs from "components/ui/Tabs";
import {useEffect, useState} from "react";
import * as React from "react";
import {Router, useRouter} from "next/router";
import styles from './index.module.scss'
import {TabSelect} from "components/TabSelect";
import {useSelector, useDispatch} from 'react-redux'
import {IRootState} from "types";
import {getAuthServerSide} from "utils/auth";
import Loader from "components/ui/Loader";
import Layout from 'components/layout/Layout'
import {getCategoryTranslation} from 'utils/translations'
import {format} from 'date-fns'
import ReportDateSelector from 'components/Report/ReportDateSelector'
import {fetchEvent, fetchEventList} from 'components/Events/actions'
import InfiniteScroll from 'react-infinite-scroll-component'
import CalendarEvent from 'components/Calendar/components/CalendarEvent'
import NewEventModal from 'components/Calendar/components/NewEventModal'
import {editEventOpen, modalClose} from 'components/Modal/actions'
import EditEventModal from 'components/Calendar/components/EditEventModal'
import Modals from 'components/layout/Modals'
import TaskReview from 'pages/TaskPage/components/TaskReview'
import {fetchOneTaskUserRequest, fetchTaskStatsById} from 'components/TaskUser/actions'
import {getEventPlannedAllowed} from 'utils/event'

const TaskPage = (props) => {
  const router = useRouter()
  //const { task } = router.query
  const dispatch = useDispatch()
  const events = useSelector((state: IRootState) => state.event.list)
  const eventsLoading = useSelector((state: IRootState) => state.event.listLoading)
  const eventsTotal = useSelector((state: IRootState) => state.event.total)
  const currentEvent = useSelector((state: IRootState) => state.event.currentEvent)
  const currentLoading = useSelector((state: IRootState) => state.event.currentLoading)

  const task = useSelector((state: IRootState) => state.taskUser.current)
  const stats = useSelector((state: IRootState) => state.taskUser.stats)
  const loading = useSelector((state: IRootState) => state.taskUser.currentLoading)
  const modelKey = useSelector((state: IRootState) => state.modal.modalKey)
  const [dateRange, setDateRange] = useState(null);
  const [page, setPage] = useState(1);
  React.useEffect(() => {
    dispatch(fetchOneTaskUserRequest(parseInt(router.query.task as string, 10)))
    dispatch(fetchTaskStatsById(router.query.task))
    console.log("FETCH!!!!!!!!!")
  }, [])


  const handleDateRangeChange = (value) => {
    console.log("handleDateRangeChange", value);
    setDateRange(value);
    setPage(1);
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
    ));
  }
  const handleScrollNext = () => {
    setPage(page + 1);
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
    ));
  }

  const handleEventClick = (event) =>{
    dispatch(fetchEvent(event.id))
    dispatch(editEventOpen());
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
              <div className={styles.value}>{format(new Date(task.deadline), 'dd.mm.yyyy')}</div>
              <div className={styles.label}>Deadline</div>
            </div>
            <div className={styles.separator}/>
            <div className={`${styles.headerValue} ${styles.price}`}>
              <div className={styles.value}>{task.priceType === 'fixed' ? task.budget : task.rate}</div>
              <div
                className={styles.label}>{task.estimate || (task.priceType === 'fixed' ? 'Budget' : 'Rate per hour')}</div>
            </div>
          </div>


          {task.description && <div className={styles.content}>{task.description}</div>}
          {stats && <div className={styles.stats}>
            <div className={styles.statsTitle}>Statistic</div>
            <div className={styles.statsTable}>
            <div className={styles.statsHeader}>
              <div className={`${styles.statsCell} ${styles.statsLabel}`}></div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>Planned</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>Completed</div>
            </div>
            <div className={styles.statsRow}><div className={`${styles.statsCell} ${styles.statsLabel}`}>Time</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.plannedTime}</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.completedTime}</div>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsCell} ${styles.statsLabel}`}>Charges</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.plannedCharges}</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.completedCharges}</div>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsCell} ${styles.statsLabel}`}>Expenses</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.plannedExpenses}</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.completedExpenses}</div>
            </div>
            <div className={styles.statsSeparator}>
              <div className={`${styles.statsCell} ${styles.statsEmpty}`}/>
              <div className={`${styles.statsCell} ${styles.statsEmpty}`}/>
              <div className={`${styles.statsCell} ${styles.statsEmpty}`}/>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsCell} ${styles.statsLabel}`}>Events</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>
                {stats.eventsCompleted}
              </div>
              <div className={`${styles.statsCell} ${styles.statsEmpty}`}/>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsCell} ${styles.statsLabel}`}>Planned</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.eventsPlanned}</div>
              <div className={`${styles.statsCell} ${styles.statsEmpty}`}/>
            </div>
            <div className={styles.statsRow}>
              <div className={`${styles.statsCell} ${styles.statsLabel}`}>Reviews</div>
              <div className={`${styles.statsCell} ${styles.statsValue}`}>{stats.reviews}</div>
              <div className={`${styles.statsCell} ${styles.statsEmpty}`}/>
            </div>
            </div>
          </div>}

          <TaskReview task={task}/>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.category}>
            <div className={styles.field}>
              <div className={styles.label}>Category</div>
              <div className={styles.value}>{getCategoryTranslation(task.category)?.name}</div>
            </div>

            <div className={styles.field}>
              <div className={styles.label}>Subcategory</div>
              <div className={styles.value}>{getCategoryTranslation(task.subCategory)?.name}</div>
            </div>

          </div>
        </div>
      </div>}
      <div className={styles.eventsWrapper}>
      <ReportDateSelector showAll={true} input={{value: dateRange, onChange: handleDateRangeChange}}/>
      {(eventsLoading && eventsTotal === 0) && <Loader/>}
      {eventsTotal > 0 && <InfiniteScroll
        dataLength={events.length} //This is important field to render the next data
        next={handleScrollNext}
        style={{overflow: 'inherit'}}
        className={styles.events}
        hasMore={eventsTotal > events.length}
        loader={eventsLoading ? <Loader/> : null}>
        {events.map((item, index) => <div className={styles.event}>
          <CalendarEvent onClick={() => handleEventClick(item)} event={item}/>
          <div className={styles.eventDate}>{format(getEventPlannedAllowed(item) ? item.start : item.actualStart, 'dd/MM/yyyy')}</div>
        </div>)}
      </InfiniteScroll>}
      </div>
      {modelKey === 'eventCreateModal' &&
      <NewEventModal isOpen={true} onClose={() => dispatch(modalClose())}/>}
      {(['confirm','eventEditModal', 'eventExpensePlannedModal', 'eventExpenseActualModal'].includes(modelKey) && (currentEvent || currentLoading)) &&
      <EditEventModal isOpen={true} onClose={() => dispatch(modalClose())}/>}
      <Modals/>
    </Layout>
  )
}
export const getServerSideProps = getAuthServerSide({redirect: true});
export default TaskPage
