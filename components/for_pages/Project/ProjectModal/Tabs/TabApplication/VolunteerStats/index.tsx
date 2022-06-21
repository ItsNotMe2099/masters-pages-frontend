import * as React from 'react'
import styles from './index.module.scss'

interface Props {
  view?: boolean
}

const VolunteerStats = ({view, ...props}: Props) => {

  return (
    <div className={styles.statistic}>
    <div className={styles.withUs}>
      {view ? <><div>Volunteering Stats</div> | <div>With us</div></> : <>Statistic with us</>}
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Applications:
      </div>
      {view ? <>0 | 0</> : <>0</>}
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Projects:
      </div>
      {view ? <>0 | 0</> : <>0</>}
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Orders:
      </div>
      {view ? <>0 | 0</> : <>0</>}
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Hours:
      </div>
      {view ? <>0h | 0h</> : <>0h</>}
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Reviews:
      </div>
      {view ? <>0 | 0</> : <>0</>}
    </div>
    <div className={styles.option}>
      <div className={styles.text}>
        Recommendation:
      </div>
      {view ? <>No | No</> : <>No</>}
    </div>
  </div>
  )
}

export default VolunteerStats
