import styles from './index.module.scss'

interface Props {
  image: string
  image_2: string
  image_3: string
  text: string
  text_2: string
  text_3: string
}

export default function Steps(props: Props) {
  return (
    <>
      <div className={styles.columnFirst}> 
        <div className={styles.columnItem}>
          <img className={styles.icon} src={props.image} alt=''/>
          <div className={styles.text}>{props.text}</div>
        </div>
        <img className={styles.wave} src={'img/icons/wave1.svg'} alt=''/>
        <div className={styles.columnItem}>
          <img className={styles.icon} src={props.image_2} alt=''/>
          <div className={styles.text}>{props.text_2}</div>
        </div>
        <img className={styles.wave} src='img/icons/wave2.svg' alt=''/>
        <div className={styles.columnItem}>
          <img className={styles.icon} src={props.image_3} alt=''/>
          <div className={styles.text}>{props.text_3}</div>
        </div>
      </div>
    </>
  )
}
