import Link from 'next/link'
import styles from './index.module.scss'

interface Props {
  name: string
  avatar: string
  service: string,
  message: string,
  comments: number,
  negative: number,
}

export default function Comment(props: Props) {
  return (
    <>
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.border}>
           <img src={props.avatar}/>
        </div>
        <div className={styles.comment}>
          <div className={styles.inner}>
            <img src="img/icons/comment.svg" alt=''/>
            <div className={styles.positive}>{props.comments}</div>
            <div className={styles.negative}>{props.negative}</div>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.name}>{props.name}</div>
        <Link href="/"><a><div className={styles.service}>{props.service}</div></a></Link>
        <div className={styles.text}>
          {props.message}
        </div>
      </div>
    </div>

    <div className={styles.root__mobile}>
      <div className={styles.top}>
      <div className={styles.left}>
        <div className={styles.border}>
          <img src={props.avatar}/>
        </div>
      </div>
      <div>
        <div className={styles.name}>{props.name}</div>
        <Link href="/"><a><div className={styles.service}>{props.service}</div></a></Link>
        <div className={styles.comment}>
          <div className={styles.inner}>
            <img src="img/icons/comment.svg" alt=''/>
            <div className={styles.positive}>{props.comments}</div>
            <div className={styles.negative}>{props.negative}</div>
          </div>
        </div>
      </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.text}>
          {props.message}
        </div>
      </div>
      </div>
  </>
  )
}
