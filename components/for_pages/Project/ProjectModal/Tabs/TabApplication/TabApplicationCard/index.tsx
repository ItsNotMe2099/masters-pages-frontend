import styles from './index.module.scss'
import classNames from 'classnames'
import {format} from 'date-fns'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import { IProfile } from 'data/intefaces/IProfile'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import Marker from 'components/svg/Marker'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import { confirmModalClose, confirmOpen } from 'components/Modal/actions'
import { useDispatch } from 'react-redux'
import VolunteerStats from '../VolunteerStats'
import StarRatings from 'react-star-ratings'
import Link from 'next/link'
import React from 'react'
import {ApplicationWrapper, useApplicationContext} from "context/application_state";

interface Props {
  application?: IApplication
  index?: number
  total?: number
  onViewClick?: () => void
  currentTab: ApplicationStatus
  profile?: IProfile
  onStatusChange?: (newStatus: ApplicationStatus) => void
  onDelete?: (application: IApplication) => void
}

interface ButtonsProps {
  application?: IApplication
  onViewClick?: () => void
}

const TabApplicationCardInner = ({application, currentTab, onStatusChange, onDelete, ...props}: Props) => {

  const dispatch = useDispatch()
  const applicationContext = useApplicationContext()
  const handleConfirm = (status: ApplicationStatus) => {
    onStatusChange(status)
    dispatch(confirmModalClose())
  }

  const handleDelete = (application: IApplication) => {
    onDelete(application)
    dispatch(confirmModalClose())
  }


  const changeStatus = (status: ApplicationStatus, isCancel?: boolean) => {
    applicationContext.changeStatus(status, isCancel);
  }

  const Buttons = (props: ButtonsProps) => {

    switch(currentTab){
      case ApplicationStatus.Applied:
        return (
          <div className={styles.btns}>
            <Button onClick={props.onViewClick}  type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => changeStatus(ApplicationStatus.Shortlist)} type='button' projectBtn='default'>
              SHORTLIST
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByCompany)}
            type='button' projectBtn='red'>REJECT</Button>
          </div>
        )
      case ApplicationStatus.Shortlist:
        return (
          <div className={styles.btns}>
            <Button onClick={props.onViewClick} type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => changeStatus(ApplicationStatus.Invited)}  type='button' projectBtn='default'>
              INVITE
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByCompany)}
            type='button' projectBtn='red'>REJECT</Button>
          </div>
        )
      case ApplicationStatus.Invited:
        return (
          <div className={styles.btns}>
            <Button onClick={props.onViewClick} type='button' projectBtn='default'>VIEW</Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.Shortlist, true)}
            type='button' projectBtn='red'>CANCEL INVITATION</Button>
          </div>
        )
      case ApplicationStatus.Execution:
        return (
          <div className={styles.btns}>
            <Button onClick={props.onViewClick} type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => changeStatus(ApplicationStatus.Completed)}
            type='button' projectBtn='default'>
              COMPLETE
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByCompany)}
            type='button' projectBtn='red'>REJECT</Button>
          </div>
          )
          case ApplicationStatus.CompleteRequest:
            return (
              <div className={styles.btnsCompleted}>
                <Button  onClick={props.onViewClick} type='button' projectBtn='default'>OPEN</Button>
                <Button onClick={() => changeStatus(ApplicationStatus.Completed)} type='button' projectBtn='default'>
                  CONFIRM COMPLETION
                </Button>
                <Button
            onClick={() => changeStatus(ApplicationStatus.Execution)}
            type='button' projectBtn='red'>REJECT COMPLETION</Button>
              </div>
            )
        case ApplicationStatus.Completed:
          return (
            <div className={styles.btnsCompleted}>
              <Button  onClick={props.onViewClick} type='button' projectBtn='default'>VIEW</Button>
              <Button type='button' projectBtn='default'>
                REVIEW
              </Button>
              <Button type='button' projectBtn='default'>RECOMMEND</Button>
              <Button onClick={() => applicationContext.delete()} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
        case ApplicationStatus.RejectedByCompany:
          return (
            <div className={styles.btns}>
              <Button onClick={props.onViewClick} type='button' projectBtn='default'>VIEW</Button>
              {/*<Button
              type='button' projectBtn='default'>
                RESTORE
              </Button>*/}
              <Button onClick={() => applicationContext.delete()} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
    }
  }
  const profileLink = `/id${props.profile.id}`
  return (
      <div className={styles.profile}>
        <div className={styles.left}>
          <Link href={profileLink}>
          <a className={styles.avatar} target='_blank'>
            <Avatar image={props.profile.photo} size='largeSquare'/>
            <Button type='button' className={styles.details}><img src='/img/projects/account-details.svg' alt=''/></Button>
          </a>
          </Link>
          <div className={styles.icons}>
              <div className={styles.stat}>
              <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
              <div>{application.profile.tasksCount || 0}</div>
              </div>
              <div className={styles.stat}>
              <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
              <div>{application.profile.feedbacksCount || 0}</div>
              </div>
            </div>
            <div className={styles.stars}>
              <StarRatings
                rating={application.profile.rating || 0}
                starRatedColor="#F2B705"
                starEmptyColor={'#616161'}
                numberOfStars={5}
                name='rating'
                svgIconPath={'M4.08729 13.7644C3.74325 13.9408 3.35287 13.6316 3.42239 13.2367L4.16216 9.0209L1.02213 6.02971C0.728899 5.74985 0.88131 5.23824 1.27437 5.18298L5.63993 4.56264L7.58651 0.706016C7.7621 0.358411 8.23716 0.358411 8.41274 0.706016L10.3593 4.56264L14.7249 5.18298C15.1179 5.23824 15.2704 5.74985 14.9771 6.02971L11.8371 9.0209L12.5769 13.2367C12.6464 13.6316 12.256 13.9408 11.912 13.7644L7.99829 11.7536L4.0864 13.7644H4.08729Z'}
                svgIconViewBox={'0 0 16 14'}
                starDimension={'16px'}
                starSpacing={'1px'}

              />
              <div className={styles.comments}>({application.profile.rating || 0})</div>
            </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.top}>
            <div className={styles.left}>
              <Link href={profileLink}>
              <a className={styles.name} target='_blank'>
                {props.profile.firstName} {props.profile.lastName}
              </a>
              </Link>
              <div className={styles.online}>
                <Marker color={props.profile.activityStatus === 'offline' ? '#DC2626' : '#27C60D'}/>
                <div className={classNames(styles.text, {[styles.textOff]: props.profile.activityStatus === 'offline'})}>
                  {props.profile.activityStatus === 'online' ? <>Online</> : <>Offline</>}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.applied}>
                Applied on: <img src='/img/projects/calendar.svg' alt=''/> {format(new Date(application.appliedAt), 'dd.MM.yy')}
              </div>
              <div className={styles.applied}>
                Application No: {index + 1}/{total}
              </div>
            </div>
          </div>
          <div className={styles.requirements}>
            Main Requirements
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomWrapper}>
          <div className={styles.age}>
            <div>Age</div>
            <div className={styles.value}>
              {application.age}
            </div>
          </div>
          <div className={styles.age}>
            <div>Education</div>
            <div className={styles.value}>
              {application.education}
            </div>
          </div>
          {application.languages.length > 0 && <div className={styles.langs}>
         <div className={styles.sectionHeader}>Languages:</div>
         <div className={classNames(styles.sectionContent, styles.languages)}>
           {application.languages.map(i => <LanguageListItem className={styles.lang} model={i}/>)}
         </div>
       </div>}
        </div>
        <div className={styles.mobile}><VolunteerStats/></div>
        </div>
        <Buttons onViewClick={props.onViewClick} application={application}/>
        </div>
        <div className={styles.desktop}><VolunteerStats/></div>
      </div>
    )
  }

export default function TabApplicationCard(props: Props){
  return ( <ApplicationWrapper application={props.application} applicationId={props.application.id}>
    <TabApplicationCardInner {...props}/>
  </ApplicationWrapper>)

}
