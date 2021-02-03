import Logo from 'components/Logo'
import styles from './index.module.scss'
import { useState } from "react";

interface Props {
 jobDone?: boolean
 firstName?: string
 lastName?: string
 img?: string
 job?: string
}

export default function ModalHeader(props: Props) {

  const [show, setShowAll] = useState(false)

  return (
    <div className={styles.root}>
    <div className={styles.job}>
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
      {props.job ?
      <div className={styles.top}>
        <div className={styles.work}>{props.job}</div>
          <a className={styles.details} onClick={() => show ? setShowAll(false) : setShowAll(true)}>
            {show ? <span>Hide</span> : <span>See details</span>}<img className={show ? styles.hide : null} src="img/icons/arrowDetails.svg" alt=''/>
          </a>
      </div>
      : null}
    </div>
  )
}
