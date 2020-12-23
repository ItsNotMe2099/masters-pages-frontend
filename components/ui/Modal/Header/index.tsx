import Logo from 'components/Logo'
import styles from './index.module.scss'

interface Props {
 jobDone?: boolean
 firstName?: string
 lastName?: string
 img?: string
}

export default function ModalHeader(props: Props) {

  return (
    <div className={styles.root}>
      {props.jobDone ?
        <> 
          <div className={styles.avatar}><img src={props.img} alt=""/></div>
          <div className={styles.name}>{props.firstName} {props.lastName}</div>
          <div className={styles.text}>marked job like a<span> done</span></div>
        </>
        :
        <>
          <div className={styles.logo}><Logo/></div>
          <div className={styles.text}>Describe your experience</div>
        </>
      }
    </div>
  )
}
