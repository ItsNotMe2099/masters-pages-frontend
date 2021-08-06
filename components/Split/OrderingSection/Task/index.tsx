import { format, formatDistance } from 'date-fns'
import { ITask } from 'types'
import styles from './index.module.scss'
import {useTranslation, Trans} from "i18n";

interface Props {
  task: ITask
  taskImage: string
  color: string
}

export default function Task(props: Props) {
  const {t} = useTranslation('common')
  return (
    <div className={styles.root}>
      <div className={styles.image} style={{backgroundColor: props.color}}>
        <img src={props.taskImage} alt=''/>
      </div>
      <div className={styles.detailsWrapper}>
        <div className={styles.details}>
          <div className={styles.title}>
            {props.task.title}
          </div>
          <div className={styles.desc}>
            {props.task.description}
          </div>
          <div className={styles.time}>
            <img src='/img/icons/clock.svg' alt=''/>
            <div>{formatDistance(new Date(), new Date(props.task.createdAt))}</div>
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.priceNum}>
            {props.task.priceType === "fixed" && props.task.budget !== null ? `$${props.task.budget}` :
            props.task.priceType === "rate" && props.task.ratePerHour !== null ? `$${props.task.ratePerHour}/${t('priceRateSuffix')}` :
            (props.task.priceType === "fixed" && props.task.budget === null) || (props.task.priceType === "rate" && props.task.ratePerHour === null) ? <>{t('free')}</> : <></>}
          </div>
          <div className={styles.priceType}>
            {props.task.priceType === "fixed" ? <>{t('fixedPrice')}</> : props.task.estimate !== null ? <>${props.task.estimate}{t('hAWeek')}</> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
