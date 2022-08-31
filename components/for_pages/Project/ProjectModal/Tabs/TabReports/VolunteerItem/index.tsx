import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import Avatar from 'components/ui/Avatar'
import classNames from 'classnames'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'

interface Props {
  application: IApplication
  onClick: () => void
  index: number
  itemIndex: number
}

const VolunteerItem = (props: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();

  return (
    <section className={classNames(styles.root, {[styles.active]: props.index === props.itemIndex})} onClick={props.onClick}>
      <div className={styles.left}>
        <Avatar image={props.application.profile.photo} size='circle'/>
        <div className={styles.name}>{props.application.profile.firstName} {props.application.profile.lastName}</div>
      </div>
      <div 
      className={classNames(styles.status, {[styles.completed]: props.application.status === ApplicationStatus.Completed}, 
      {[styles.declined]: props.application.status === ApplicationStatus.RejectedByCompany || props.application.status === ApplicationStatus.RejectedByVolunteer})}>
        <div className={styles.image}>
          <img 
          src={props.application.status === ApplicationStatus.Completed ? '/img/Reports/Volunteers/completed.svg' : props.application.status === ApplicationStatus.RejectedByCompany || props.application.status === ApplicationStatus.RejectedByVolunteer ? '/img/Reports/Volunteers/declined.svg' : '/img/Reports/Volunteers/invited.svg'} 
          alt=''/></div>{props.application.status === ApplicationStatus.RejectedByCompany || props.application.status === ApplicationStatus.RejectedByVolunteer ? 'Declined' : props.application.status}
      </div>
    </section>
  )
}

export default VolunteerItem
