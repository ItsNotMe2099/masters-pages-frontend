import * as React from 'react'
import styles from 'components/for_pages/Task/profile/index.module.scss'
import Avatar from 'components/ui/Avatar'
import { ITask } from 'types'

interface Props {
  task: ITask
}

const Profile = (props: Props) => {


  return (
            <div className={styles.profile}>
              <Avatar/>
              <div className={styles.mobileWrapper}>
                <div className={styles.name__mobile}>
                  <div className={styles.nameText}>{props.task.profile.firstName} {props.task.profile.lastName}</div>
                  <img src="/img/SearchTaskPage/icons/verification.svg" alt=''/>
                </div>
              <div className={styles.icons}>
                <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
                <div>0</div>
                <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
                <div>0</div>
              </div>
              <div className={styles.stars}>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/star.svg" alt=''/>
                <img src="/img/SearchTaskPage/icons/halfStar.svg" alt=''/>
                <div className={styles.comments}>(0)</div>
              </div>
            </div>
           </div>
  )
}

export default Profile
