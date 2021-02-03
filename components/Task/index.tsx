import {
  confirmOpen,
  finishTaskAsClientOpen,
  taskMarkAsDoneOpen,
  taskOfferAcceptOpen,
  taskShareOpen
} from "components/Modal/actions";
import BookmarkSvg from "components/svg/Bookmark";
import TaskActionButton from "components/Task/components/ActionButton";
import TaskResponse from "components/Task/components/TaskResponse";
import {
  taskNegotiationAcceptTaskOffer,
  taskNegotiationDeclineTaskOffer,
  taskNegotiationSetCurrentTask
} from "components/TaskNegotiation/actions";
import { taskSearchSetCurrentTask } from "components/TaskSearch/actions";
import {
  deleteTaskUser,
  fetchTaskUserResponseRequest,
  setPublishedTaskUser,
  taskCancel
} from "components/TaskUser/actions";
import Avatar from "components/ui/Avatar";
import Button from 'components/ui/Button'
import { DropDown } from "components/ui/DropDown";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { default as React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState, ITask, ITaskNegotiationState, ITaskNegotiationType, ITaskStatus } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'

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

export default function Task({ actionsType, task, className, isActive, onEdit, onDelete, onPublish, onUnPublish, index }: Props) {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('newFirst');
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)

  const router = useRouter();
  useEffect(() => {
    if(actionsType === 'client') {
      dispatch(fetchTaskUserResponseRequest(task.id, { limit: 1, ...getSortData(sortType) }));
    }
  }, [])

  const handlePublish = () => {
    dispatch(confirmOpen({
      description: `Do you want to publish task «${task.title}»?`,
      onConfirm: () => {
        dispatch(setPublishedTaskUser(task.id, true))
      }
    }));
  }
  const handleUnPublish = () => {
    dispatch(confirmOpen({
      description: `Do you want to unpublish task «${task.title}»?`,
      onConfirm: () => {
        dispatch(setPublishedTaskUser(task.id, false))
      }
    }));
  }
  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `Do you want to publish task «${task.title}»?`,
      onConfirm: () => {
        dispatch(deleteTaskUser(task.id))
      }
    }));
  }

  const handleTaskComplete = () => {
    if (profile.role === 'client') {
      dispatch(taskNegotiationSetCurrentTask(task));
      dispatch(finishTaskAsClientOpen());
    } else {
      dispatch(taskNegotiationSetCurrentTask(task));
      dispatch(taskMarkAsDoneOpen());
    }
  }


  const handleCancel = () => {
    dispatch(confirmOpen({
      description: `Are you sure that you want to cancel task?`,
      onConfirm: () => {
        dispatch(taskCancel(task.id));
      }
    }));
  }
  const handleReadMore = () => {

  }
  const handleLoadMore = () => {
    dispatch(fetchTaskUserResponseRequest(task.id, { page: 1, limit: 1000, ...getSortData(sortType) }));
  }
  const handleShare = () => {
    dispatch(taskSearchSetCurrentTask(task));
    dispatch(taskShareOpen());
  }
  const handleFavorite = () => {

  }

  const handleAcceptAsMasterToClient = () => {
    dispatch(taskNegotiationSetCurrentTask(task));
    dispatch(taskOfferAcceptOpen());
  }
  const handleAccept = () => {
    dispatch(confirmOpen({
      description: `Are you sure that you want to accept an offer?`,
      onConfirm: () => {
        dispatch(taskNegotiationAcceptTaskOffer(task.negotiations[0]));
      }
    }));
  }

  const handleDecline = () => {
    dispatch(confirmOpen({
      description: `Are you sure that you want to reject an offer?`,
      onConfirm: () => {
        dispatch(taskNegotiationDeclineTaskOffer(task.negotiations[0]));
      }
    }));
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
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

      router.push(`/Chat/task-dialog/${task.id}/${profile.id}`);
    } else if (actionsType === 'client') {
      router.push(`/Chat/task-dialog/${task.id}/${task.masterId}`);
    }else if (actionsType === 'public') {
      const response = task.lastNegotiation;
      router.push(`/Chat/task-dialog/${response.taskId}/${response.profileId}`);
    }

  }
  const actions = ['readMore'];

  if (actionsType === 'client') {
    if ([ITaskStatus.Negotiation, ITaskStatus.Draft, ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status)) {
      actions.push('edit')
    }
    if (['draft'].includes(task.status)) {
      actions.push('delete')
      actions.push('publish')
    }

    if ([ITaskStatus.Published, ITaskStatus.PrivatelyPublished, ITaskStatus.Negotiation].includes(task.status)) {
      if(task.status !== ITaskStatus.PrivatelyPublished) {
        actions.push('unPublish')
      }
      actions.push('cancel')
    }
    if (['in_progress'].includes(task.status)) {
      actions.push('cancel')
      actions.push('markAsCompleted');
    }
  } else if (actionsType === 'master') {
    if (['in_progress'].includes(task.status)) {
      actions.push('markAsCompleted');
    }
  } else if (actionsType === 'public') {
    actions.push('share');
    actions.push('save');
  }
  const getStatusText = () => {
    switch (task.status) {
      case ITaskStatus.Draft:
        return 'Draft';
      case ITaskStatus.Published:
        return 'Published';
      case ITaskStatus.PrivatelyPublished:
        return 'Private';
      case ITaskStatus.InProgress:
        return 'In progress';
      case ITaskStatus.Done:
        return 'Done';
      case ITaskStatus.Canceled:
        return 'Canceled'
    }
  }
  const getStatusClassName = () => {
    switch (task.status) {
      case ITaskStatus.Draft:
        return '';
      case ITaskStatus.Published:
        return '';
      case ITaskStatus.PrivatelyPublished:
        return '';
      case ITaskStatus.InProgress:
        return styles.statusGreen;
      case ITaskStatus.Done:
        return styles.statusGreen;
      case ITaskStatus.Canceled:
        return styles.statusRed;
    }
  }


  const renderActionButton = (action) => {
    switch (action) {
      case 'readMore':
        return <TaskActionButton title={'Read more'} icon={'down'} onClick={handleReadMore}/>;
      case 'edit':
        return <TaskActionButton title={'Edit'} icon={'arrow-right'} onClick={handleEdit}/>;
      case 'delete':
        return <TaskActionButton title={'Delete'} icon={'delete'} onClick={handleDelete}/>;
      case 'publish':
        return <TaskActionButton title={'Publish'} icon={'publish'} onClick={handlePublish}/>;
      case 'unPublish':
        return <TaskActionButton title={'Unpublish'} icon={'unpublish'} onClick={handleUnPublish}/>;
      case 'cancel':
        return <TaskActionButton title={'Cancel task'} icon={'delete'} onClick={handleCancel}/>;
      case 'markAsCompleted':
        return <TaskActionButton title={'Mark as completed'} icon={'mark'} onClick={handleTaskComplete}/>;
      case 'share':
        return <TaskActionButton title={'Share'} icon={'share'} onClick={handleShare}/>;
      case 'save':
        return <TaskActionButton title={'Save'} icon={<BookmarkSvg/>} onClick={handleFavorite}/>;
    }
  }

  const renderCategory = () => {
    return <div className={styles.category}>
      <div> {getCategoryTranslation(task.category)?.name}</div>
      <img src={'/img/icons/arrow2.svg'}/>
      <div>{getCategoryTranslation(task.subCategory)?.name}</div>
    </div>
  }

  const handleSortChange = (sort) => {
    console.log("SortType", sort);
    setSortType(sort.value);
    dispatch(fetchTaskUserResponseRequest(task.id, {
      page: 1,
      limit: task.responses?.total <= task.responses?.data?.length ? 1000 : 1, ...getSortData(sort.value)
    }));
  }
  const canEdit = actionsType === 'client';
  return (
    <div className={`${styles.root} ${className} ${isActive && styles.isActive}`}>
      <div className={styles.wrapper}>
        {actionsType === 'public' && <div className={styles.profile}>
          <Avatar image={task.profile?.avatar}/>
          <div className={styles.mobileWrapper}>
            <div className={styles.name__mobile}>
              <div
                className={styles.nameText}>{`${task.profile.firstName}${task.profile.lastName ? ` ${task.profile.lastName}` : ''}`}</div>
              <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
            </div>
            <div className={styles.icons}>
              <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
              <div>0</div>
              <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
              <div>0</div>
            </div>
            <div className={styles.stars}>
              <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
              <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
              <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
              <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
              <img src="/img/SearchTaskPage/icons/halfStar.svg" alt=''/>
              <div className={styles.comments}>(0)</div>
            </div>
          </div>
        </div>}
        <div className={styles.main}>
          <div className={styles.mainInfo}>
            <div className={styles.top}>
              {['public', 'master'].includes(actionsType) && <div className={styles.name}>
                <div
                  className={styles.nameText}>{`${task.profile.firstName}${task.profile.lastName ? ` ${task.profile.lastName}` : ''}`}</div>
                <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
              </div>}
              {(actionsType === 'client') && <div className={styles.taskTitle}>
                <div className={styles.title}>{task.title}</div>
              </div>}
              {(actionsType !== 'public') && <div className={`${styles.status} ${getStatusClassName()}`}>
                {getStatusText()}
              </div>}
              <div className={styles.time}>
                <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
                <div
                  className={styles.desc}>{task.createdAt ? format(new Date(task.createdAt), 'MM.dd.yyy hh:mm') : ''}</div>
              </div>
            </div>
            <div>
              {actionsType === 'client' && renderCategory()}
              {actionsType !== 'client' && <Link href={`/TaskPage/${task.id}`}><div className={styles.title}>
                {task.title}
              </div></Link>}
              {['public', 'master'].includes(actionsType) && renderCategory()}
              <div className={styles.desc}>
                {task.description}
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            {actions.map((action, index) => {
              return [renderActionButton(action), ...(index !== actions.length - 1 ? [<div
                className={styles.separatorLine}/>] : [])];
            })}
          </div>
        </div>
        <div className={`${styles.payment} ${actionsType !== 'public' && styles.paymentLarge}`}>

          <div className={styles.titleLeft}>
            Payment method:
          </div>
          <div className={styles.methodWrapper}>
            <div className={styles.method}>
              <img src="/img/SearchTaskPage/icons/bank.svg" alt=''/>
              <div className={styles.desc}>Bank account</div>
            </div>
            <div className={styles.method}>
              <img src="/img/SearchTaskPage/icons/cash.svg" alt=''/>
              <div className={styles.desc}>Cash</div>
            </div>
            <div className={styles.methodSafe}>
              <img className={styles.last} src="/img/SearchTaskPage/icons/safe.svg" alt=''/>
              <div className={styles.desc}>Safe deal</div>
            </div>

          </div>
          {task.budget ?
            <div className={styles.priceWrapper}>
              <div className={styles.price}>
                Fixed price:
              </div>
              <div className={styles.priceDetailsValue}>
                less then <span>${task.budget}</span>
              </div>
            </div>
            :


            task.ratePerHour && <div className={styles.priceWrapper}>
              <div className={styles.price}>
                Hourly:
              </div>
              <div className={styles.priceDetailsValue}>
                <span>${task.ratePerHour}/h</span>
              </div>
            </div>
          }
          {task.deadline && <div className={styles.priceDetailsItem}>
            <div className={styles.priceDetailsLabel}>
              Deadline:
            </div>
            <div className={styles.priceDetailsValue}>
              <span>{format(new Date(task.deadline), 'MM.dd.yyy')}</span>
            </div>
          </div>}
          <div className={styles.btnContainer}>
            {(actionsType === 'public' && profile.role !== 'client' && !task.lastNegotiation) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleAcceptAsMasterToClient}>ACCEPT TASK</Button>}
            {((actionsType !== 'public' && ![ITaskStatus.Draft].includes(task.status) && ((actionsType === 'master' && task.negotiations?.length > 0 && [ITaskNegotiationState.Accepted].includes(task.negotiations[0].state)) || (actionsType === 'client' && [ITaskStatus.InProgress, ITaskStatus.Done, ITaskStatus.Canceled].includes(task.status)) || (actionsType === 'master' &&  task.masterId === profile.id && [ITaskStatus.InProgress, ITaskStatus.Done, ITaskStatus.Canceled].includes(task.status))))) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleMessages}>Messages</Button>}
            {(actionsType === 'master' && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.SentToMaster) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleDecline}>Decline</Button>}
            {(actionsType === 'master' && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.SentToMaster) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>Accept</Button>}
            {(actionsType === 'master' && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.negotiations.length > 0 && task.negotiations[0].type === ITaskNegotiationType.TaskOffer && task.negotiations[0].state === ITaskNegotiationState.Declined) &&
            <div className={styles.actionStatus}>You declined</div>}
            {(actionsType === 'public' && [ITaskStatus.Published, ITaskStatus.PrivatelyPublished].includes(task.status) && task.lastNegotiation && task.lastNegotiation.state === ITaskNegotiationState.Accepted) &&
            <Button bold smallFont transparent size='16px 0' onClick={handleMessages}>Messages</Button>}
          </div>
        </div>

      </div>

      {task.responses?.total > 0 && <div className={styles.responses}>
        <div className={styles.responsesTop}>
          <div className={styles.responsesTitle}>Masters list ({task.responses?.total})</div>
          {task.responses?.total > 0 && <div className={styles.tasksSort}>
            <span>Sort by:</span>
            <DropDown onChange={handleSortChange} value={sortType} options={[
              { value: 'newFirst', label: 'New First' },
              { value: 'oldFirst', label: 'Old First' }
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
          <div className={styles.loadMore} onClick={handleLoadMore}>Load more</div>}
        </div>
      </div>}
    </div>
  )
}
Task.defaultProps = {
  showProfile: true,
  actionsType: 'public'
}
