import styles from './index.module.scss'

interface Props {
  taskTitle: string
  taskDesc: string
  taskTime: string
  taskPrice: string
  priceType: string
  taskImage: string
  color: string
}

export default function Task(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.image} style={{backgroundColor: props.color}}>
        <img src={props.taskImage} alt=''/>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <div className={styles.title}>
            {props.taskTitle}
          </div>
          <div className={styles.desc}>
            {props.taskDesc}
          </div>
          <div className={styles.time}>
            <img src='img/icons/clock.svg' alt=''/>
            <div>{props.taskTime}</div>
          </div>
        </div>
        <div className={styles.price}>
          <div className={styles.priceNum}>
            {props.taskPrice}
          </div>
          <div className={styles.priceType}>
            {props.priceType}
          </div>
        </div>
      </div>
    </div>
  )
}
