import styles from './index.module.scss'

interface Props {
  image: string
  text: string
  wave1?: boolean
  wave2?: boolean
}

export default function Step(props: Props) {
  return (
    <>
      <div className={styles.columnFirst}> 
        <div className={styles.columnItem}>
          <img className={styles.icon} src={props.image} alt=''/>
          <div className={styles.text}>{props.text}</div>
        </div>
        {props.wave1 ?
        <img className={styles.wave} src={'img/icons/wave1.svg'} alt=''/>
        :
        null}
        {props.wave2 ?
        <img className={styles.wave} src='img/icons/wave2.svg' alt=''/>
        :
        null}
      </div>
    </>
  )
}
