import styles from './index.module.scss'

interface Props {
  image: string
  text: string
}

export default function Step(props: Props) {
  return (
    <>
      <div className={styles.columnFirst}> 
        <div className={styles.columnItem}>
          <img className={styles.icon} src={props.image} alt=''/>
          <div className={styles.text}>{props.text}</div>
        </div>
      </div>
    </>
  )
}
