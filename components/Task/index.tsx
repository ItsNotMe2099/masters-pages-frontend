import Avatar from "components/ui/Avatar";
import Button from 'components/ui/Button'
import { format } from "date-fns";
import { ITask } from "types";
import styles from './index.module.scss'

interface Props {
  task: ITask,
  className?: string
}

export default function Task({task, className}: Props) {
  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.profile}>
        <Avatar image={task.profile?.avatar}/>
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
      <div className={styles.main}>
        <div className={styles.mainInfo}>
          <div className={styles.top}>
            <div className={styles.name}>
              <div>{`${task.profile.firstName}${task.profile.lastName ? ` ${task.profile.lastName}` : ''}`}</div>
                <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
            </div>
            <div className={styles.time}>
              <img src="/img/SearchTaskPage/icons/clock.svg" alt=''/>
              <div className={styles.desc}>{task.createdAt ? format(new Date(task.createdAt), 'MM.dd.yyy hh:mm') : ''}</div>
            </div>
          </div>
          <div>
            <div className={styles.title}>
              {task.title}
            </div>
            <div className={styles.desc}>
              {task.description}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>

            <div className={styles.more}>
                <div className={styles.desc}>Read more</div>
                <img src="/img/SearchTaskPage/icons/down.svg" alt=''/>
            </div>
            <div className={styles.separatorLine}></div>
            <div className={styles.more}>
                <div className={styles.desc}>Share</div>
                <img src="/img/SearchTaskPage/icons/share.svg" alt=''/>
            </div>
            <div className={styles.separatorLine}></div>
            <div className={styles.more}>
                <div className={styles.desc}>Save</div>
                <img src="/img/SearchTaskPage/icons/favorite.svg" alt=''/>
            </div>
        </div>
      </div>
      <div className={styles.payment}>
        <div className={styles.titleLeft}>
          Payment method:
        </div>
        <div className={styles.method}>
          <img src="/img/SearchTaskPage/icons/bank.svg" alt=''/>
          <div className={styles.desc}>Bank account</div>
        </div>
        <div className={styles.method}>
          <img src="/img/SearchTaskPage/icons/cash.svg" alt=''/>
          <div className={styles.desc}>Cash</div>
        </div>
        <div className={styles.method}>
          <img className={styles.last} src="/img/SearchTaskPage/icons/safe.svg" alt=''/>
          <div className={styles.desc}>Safe deal</div>
        </div>
        {task.budget ?
          <>
          <div className={styles.price}>
            Fixed price:
          </div>
          <div className={styles.title}>
            less then <span>${task.budget}</span>
          </div>
          </>
          :
          task.ratePerHour && <>
          <div className={styles.price}>
            Hourly:
          </div>
          <div className={styles.title}>
            <span>${task.ratePerHour}/h</span>
            <span>${task.estimate}h/week</span>
          </div>
          </>
          }
          <div className={styles.btnContainer}>
            <Button bold smallFont transparent size='16px 0'>ACCEPT TASK</Button>
          </div>
      </div>
    </div>
  )
}
