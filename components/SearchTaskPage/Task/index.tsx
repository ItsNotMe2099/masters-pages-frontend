import Button from 'components/ui/Button'
import styles from './index.module.scss'

interface Props {
  taskTitle: string
  taskDesc: string
  clientName: string
  avatar: string
  case: string
  likes: string
  comments: string
  taskTime: string
  taskPrice: string
  fixedPrice?: boolean
  workHours?: string
  verificationIcon?: boolean
}

export default function Task(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.mainContainer}>
        <div className={styles.avatar}>
          <div className={styles.avaContainer}>
            <img src={props.avatar} alt=''/>
          </div>
          <div className={styles.icons}>
            <img src="img/SearchTaskPage/icons/case.svg" alt=''/>
            <div>{props.case}</div>
            <img src="img/SearchTaskPage/icons/like.svg" alt=''/>
            <div>{props.likes}</div>
          </div> 
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.top}>
            <div className={styles.name}>
              <div>{props.clientName}</div>
              {props.verificationIcon ?
                <img src="img/SearchTaskPage/icons/verification.svg" alt=''/>
                :
                null
              }
            </div>
            <div className={styles.time}>
              <img src="img/SearchTaskPage/icons/clock.svg" alt=''/>
              <div className={styles.desc}>{props.taskTime}</div>
            </div>
          </div>
          <div>
            <div className={styles.title}>
              {props.taskTitle}
            </div>
            <div className={styles.desc}>
              {props.taskDesc}
            </div>
          </div>
        </div>
        </div>
        <div className={styles.bottom}>
            <div className={styles.stars}>
              <div>
                <img src="img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="img/SearchTaskPage/icons/halfStar.svg" alt=''/>
              </div>
              <div className={styles.comments}>({props.comments})</div>
            </div>
            <div className={styles.more}>
                <div className={styles.desc}>Read more</div>
                <img src="img/SearchTaskPage/icons/down.svg" alt=''/>
            </div>
            <div className={styles.separatorLine}></div>
            <div className={styles.more}>
                <div className={styles.desc}>Share</div>
                <img src="img/SearchTaskPage/icons/share.svg" alt=''/>
            </div>
            <div className={styles.separatorLine}></div>
            <div className={styles.more}>
                <div className={styles.desc}>Save</div>
                <img src="img/SearchTaskPage/icons/favorite.svg" alt=''/>
            </div>
        </div>
      </div>
      <div className={styles.payment}>
        <div className={styles.titleLeft}>
          Payment method:
        </div>
        <div className={styles.method}>
          <img src="img/SearchTaskPage/icons/bank.svg" alt=''/>
          <div className={styles.desc}>Bank account</div>
        </div>
        <div className={styles.method}>
          <img src="img/SearchTaskPage/icons/cash.svg" alt=''/>
          <div className={styles.desc}>Cash</div>
        </div>
        <div className={styles.method}>
          <img className={styles.last} src="img/SearchTaskPage/icons/safe.svg" alt=''/>
          <div className={styles.desc}>Safe deal</div>
        </div>
        {props.fixedPrice ?
          <>
          <div className={styles.price}>
            Fixed price:
          </div>
          <div className={styles.title}>
            less then <span>${props.taskPrice}</span>
          </div>
          </>
          :
          <>
          <div className={styles.price}>
            Hourly:
          </div>
          <div className={styles.title}>
            <span>${props.taskPrice}/h</span>
            <span>${props.workHours}h/week</span>
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
