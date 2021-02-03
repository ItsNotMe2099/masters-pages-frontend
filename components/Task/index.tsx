import { confirmOpen, taskOfferAcceptOpen, taskShareOpen } from "components/Modal/actions";
import { deleteSkill } from "components/Skill/actions";
import TaskActionButton from "components/Task/components/ActionButton";
import { acceptTaskOffer, taskOfferSetCurrentTask } from "components/TaskOffer/actions";
import { taskSearchSetCurrentTask } from "components/TaskSearch/actions";
import { deleteTaskUser, setPublishedTaskUser } from "components/TaskUser/actions";
import Avatar from "components/ui/Avatar";
import Button from 'components/ui/Button'
import { format } from "date-fns";
import { ITask } from "types";
import { getCategoryTranslation } from "utils/translations";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link";

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

  const renderActionButton = (title: string, icon: string) => {

  }
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
  const handleShare = () => {
    dispatch(taskSearchSetCurrentTask(task));
    dispatch(taskShareOpen());
  }
  const handleFavorite = () => {

  }

  const handleAccept = () => {
    dispatch(taskOfferSetCurrentTask(task));
    dispatch(taskOfferAcceptOpen());
  }

  const handleEdit = () => {
    if(onEdit){
      onEdit(task);
    }
  }
  return (
    <div className={`${styles.root} ${className} ${isActive && styles.isActive}`}>
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
            {(actionsType === 'client' ) && <div className={styles.taskTitle}>
            <div className={styles.title}>{task.title}</div>

            </div>}
            {(actionsType !== 'public' ) && <div className={styles.status}>
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
            {actionsType !== 'client' &&  <Link href={`/TaskPage/${task.id}`}><div className={styles.title}>
              {task.title}
            </div></Link>}

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
          <TaskActionButton title={'Save'} icon={'favorite'} onClick={handleFavorite}/>
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
          <div className={styles.title}>
            less then <span>${task.budget}</span>
          </div>
          </div>
          :
          task.ratePerHour && <div className={styles.priceWrapper}>
          <div className={styles.price}>
            Hourly:
          </div>
          <div className={styles.title}>
            <span>${task.ratePerHour}/h</span>
            <span>{task.maxWeekHours}h/week</span>
          </div>
          </div>
          }
          <div className={styles.btnContainer}>
            {actionsType === 'public' && <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>ACCEPT TASK</Button>}
            {(actionsType !== 'public' && task.status !== 'in_progress') && <Button bold smallFont transparent size='16px 0'>Messages</Button>}
            {(actionsType === 'master' && task.status === 'published') && <Button bold smallFont transparent size='16px 0' onClick={handleAccept}>Accept</Button>}
          </div>
      </div>
    </div>
  )
}
Task.defaultProps = {
  showProfile: true,
  actionsType: 'public'
}
