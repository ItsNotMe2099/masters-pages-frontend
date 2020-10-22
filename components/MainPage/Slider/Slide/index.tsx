import styles from './index.module.scss'

interface Props {
  text: string
  image: string
}

export default function Slide(props: Props) {
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.text}>
          {props.text}
        </div>
      </div>
      <div>
        <div className={styles.image}>
          <img src={props.image} alt=''/>
        </div>
      </div>
    </div>
  )
}
