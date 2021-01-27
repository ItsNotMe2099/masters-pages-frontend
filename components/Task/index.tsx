import { confirmOpen, taskOfferAcceptOpen, taskShareOpen } from "components/Modal/actions";
import { deleteSkill } from "components/Skill/actions";
import BookmarkSvg from "components/svg/Bookmark";
import TaskActionButton from "components/Task/components/ActionButton";
import TaskResponse from "components/Task/components/TaskResponse";
import { taskNegotiationSetCurrentTask } from "components/TaskNegotiation/actions";
import { taskSearchSetCurrentTask } from "components/TaskSearch/actions";
import { deleteTaskUser, fetchTaskUserResponseRequest, setPublishedTaskUser } from "components/TaskUser/actions";
import Avatar from "components/ui/Avatar";
import Button from 'components/ui/Button'
import { DropDown } from "components/ui/DropDown";
import { format } from "date-fns";
import { default as React, useEffect, useState } from "react";
import { ITask, ITaskNegotiation } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  task: ITask,
  actionsType: 'public' | 'client' | 'master'
  className?: string,
  isActive?: boolean,
  onClick?: (task: ITask) => void,
  onEdit?: (task: ITask) => void,
  onDelete?: (task: ITask) => void,
  onPublish?: (task: ITask) => void,
  onUnPublish?: (task: ITask) => void,
}

export default function Task({ actionsType, task, className, isActive, onEdit, onDelete, onPublish, onUnPublish}: Props) {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('newFirst');

  useEffect(() => {
    dispatch(fetchTaskUserResponseRequest(task.id, {limit: 1, ...getSortData(sortType)}));
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
    dispatch(confirmOpen({
      description: `Do you want to mark task «${task.title}» as complete ?`,
      onConfirm: () => {
        dispatch(deleteTaskUser(task.id))
      }
    }));
  }

  const handlePause = () => {

  }
  const handleReadMore = () => {

  }
  const handleLoadMore = () => {
    dispatch(fetchTaskUserResponseRequest(task.id, {page: 1, limit: 1000, ...getSortData(sortType)}));
  }
  const handleShare = () => {
    dispatch(taskSearchSetCurrentTask(task));
    dispatch(taskShareOpen());
  }
  const handleFavorite = () => {

  }

  const handleAccept = () => {
    dispatch(taskNegotiationSetCurrentTask(task));
    dispatch(taskOfferAcceptOpen());
  }

  const handleEdit = () => {
    if(onEdit){
      onEdit(task);
    }
  }
  const getSortData = (sortType) => {
    switch (sortType) {
      case 'newFirst':
        return {sort: 'createdAt', sortOrder: 'DESC'}
      case 'oldFirst':
        return {sort: 'createdAt', sortOrder: 'ASC'}
    }
  }
  const handleSortChange = (sort) => {
    console.log("SortType", sort);
    setSortType(sort.value);
    dispatch(fetchTaskUserResponseRequest(task.id, {page: 1, limit: task.responses?.total <= task.responses?.data?.length ? 1000 : 1, ...getSortData(sort.value)}));
  }
  return (
    <div className={`${styles.root} ${className} ${isActive && styles.isActive}`}>
      <div className={styles.wrapper}>
      {actionsType === 'public' && <div className={styles.profile}>
        <Avatar image={task.profile?.avatar}/>
        <div className={styles.mobileWrapper}>
          <div className={styles.name__mobile}>
              <div className={styles.nameText}>{`${task.profile.firstName}${task.profile.lastName ? ` ${task.profile.lastName}` : ''}`}</div>
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
            {(actionsType === 'master' || actionsType === 'public' ) && <div className={styles.name}>
              <div className={styles.nameText}>{`${task.profile.firstName}${task.profile.lastName ? ` ${task.profile.lastName}` : ''}`}</div>
              <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
            </div>}
            {(actionsType === 'client') && <div className={styles.taskTitle}>
              <div className={styles.title}>{task.title}</div>
            </div>}
            {(actionsType !== 'public') && <div className={styles.status}>
              {task.status}
            </div>}
            <div className={styles.time}>
              <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
              <div className={styles.desc}>{task.createdAt ? format(new Date(task.createdAt), 'MM.dd.yyy hh:mm') : ''}</div>
            </div>
          </div>
          <div>
            {actionsType === 'client' &&  <div className={styles.category}>
              {getCategoryTranslation(task.category)?.name}
              <img src={'/img/icons/arrow2.svg'}/>
              {getCategoryTranslation(task.subCategory)?.name}
            </div>}
            {actionsType !== 'client' &&  <div className={styles.title}>
              {task.title}
            </div>}

            <div className={styles.desc}>
              {task.description}
            </div>
          </div>
        </div>
        {actionsType === 'public' && <div className={styles.bottom}>
          <TaskActionButton title={'Read more'} icon={'down'} onClick={handleReadMore}/>
          <div className={styles.separatorLine}/>
          <TaskActionButton title={'Share'} icon={'share'} onClick={handleShare}/>
          <div className={styles.separatorLine}/>
          <TaskActionButton title={'Save'} icon={<BookmarkSvg/> } onClick={handleFavorite}/>
        </div>}
        {actionsType === 'client' && <div className={styles.bottom}>
          <TaskActionButton title={'Read more'} icon={'down'} onClick={handleReadMore}/>
          {(task.status === 'draft' || task.status === 'published' || task.status === 'negotiation') &&<div className={styles.separatorLine}></div>}

          {(task.status === 'draft' || task.status === 'published' || task.status === 'negotiation') && <TaskActionButton title={'Edit'} icon={'arrow-right'} onClick={handleEdit}/>}

          {task.status === 'draft' && <div className={styles.separatorLine}/>}
          {task.status === 'draft' && <TaskActionButton title={'Delete'} icon={'delete'} onClick={handleDelete}/>}

          {(task.status === 'draft') &&  <div className={styles.separatorLine}/>}
          {(task.status === 'draft') &&  <TaskActionButton title={'Publish'} icon={'publish'} onClick={handlePublish}/>}

          {(task.status === 'published' || task.status === 'negotiation') && <div className={styles.separatorLine}/>}
          {(task.status === 'published' || task.status === 'negotiation') && <TaskActionButton title={'Unpublish'} icon={'unpublish'} onClick={handleUnPublish}/>}

          {task.status === 'in_progress' && <div className={styles.separatorLine}/>}
          {task.status === 'in_progress' && <TaskActionButton title={'Pause task'} icon={'delete'} onClick={handlePause}/>}

          {task.status === 'in_progress' && <div className={styles.separatorLine}/>}
          {task.status === 'in_progress' && <TaskActionButton title={'Mark as completed'} icon={'mark'} onClick={handleTaskComplete}/>}
        </div>}
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
            <span>{ format(new Date(task.deadline), 'MM.dd.yyy')}</span>
          </div>
        </div>}
        </div>
          <div className={styles.btnContainer}>
            {(actionsType === 'public' && !task.profileHasNegotiations) && <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>ACCEPT TASK</Button>}
            { ((actionsType !== 'public' && task.status !== 'in_progress') || task.profileHasNegotiations) && <Button bold smallFont transparent size='16px 0'>Messages</Button>}
            {(actionsType === 'master' && task.status === 'published' && !task.profileHasNegotiations)  && <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>Accept</Button>}
          </div>
      </div>

      {task.responses?.total > 0 && <div className={styles.responses}>
        <div className={styles.responsesTop}>
        <div className={styles.responsesTitle}>Masters list ({task.responses?.total})</div>
        {task.responses?.total > 0 && <div className={styles.tasksSort}>
          <span>Sort by:</span>
          <DropDown onChange={handleSortChange} value={sortType} options={[
            {value: 'newFirst',  label: 'New First'},
            {value: 'oldFirst', label: 'Old First'}
            ]} item={(item) => <div>{item?.label}</div>}
          />
        </div>}
        </div>
        <div className={styles.responsesList}>
         {(task.responses?.data ? task.responses?.data : []).map(response => <TaskResponse response={response}/>)}
        </div>
        <div className={styles.loadMoreArea}>
          {task.responses?.total > task.responses?.data?.length && <div className={styles.loadMore} onClick={handleLoadMore}>Load more</div>}
        </div>
      </div>}
    </div>
  )
}
Task.defaultProps = {
  showProfile: true,
  actionsType: 'public'
}
