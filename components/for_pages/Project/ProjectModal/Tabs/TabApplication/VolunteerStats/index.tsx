import * as React from 'react'
import styles from './index.module.scss'
import {useState} from 'react'
import { useAppContext } from 'context/state'
import classNames from 'classnames'

interface Props {
  view?: boolean
  drop: boolean
  onClick?: () => void
  style?: 'drop'
}

const VolunteerStats = ({view, drop, onClick, style, ...props}: Props) => {

  const [isDrop, setIsDrop] = useState(drop)

  const context = useAppContext()

  const handleClick = () => {
    setIsDrop(isDrop ? false : true)
    onClick && onClick()
  }

  const rootClass = {
    [styles.drop]: style === 'drop'
  }

  return (
    <div className={classNames(styles.statistic, rootClass)}>
    <div className={styles.withUs} onClick={context.isMobile ? handleClick : null}>
      {view ? <div className={styles.view}>
        <div className={styles.separate}><div>Volunteering Stats</div><div>&nbsp;&nbsp;|&nbsp;&nbsp;</div><div>With us</div></div>
        <div>{context.isMobile && <img src='/img/icons/arrowBlack.svg' alt=''/>}</div></div>
         : <>Statistic with us</>}
    </div>
    {isDrop &&
    <>
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
    </>
    }
  </div>
  )
}

VolunteerStats.defaultProps = {
  drop: true
}

export default VolunteerStats
