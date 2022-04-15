import styles from './index.module.scss'
import classNames from 'classnames'
import {format} from 'date-fns'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import { IProfile } from 'data/intefaces/IProfile'
import Avatar from 'components/ui/Avatar'
import Button from 'components/ui/Button'
import Marker from 'components/svg/Marker'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import { confirmModalClose, confirmOpen, modalClose } from 'components/Modal/actions'
import { useDispatch } from 'react-redux'


interface Props {
  application?: IApplication
  onViewClick?: () => void
  currentTab: ApplicationStatus
  profile?: IProfile
  onStatusChange?: (newStatus: ApplicationStatus) => void
}

interface ButtonsProps {
  application?: IApplication
  onViewClick?: () => void
}

const TabApplicationCard = ({application, currentTab, onStatusChange, ...props}: Props) => {

  const dispatch = useDispatch()

  const handleConfirm = (status: ApplicationStatus) => {
    onStatusChange(status)
    dispatch(confirmModalClose())
  }

  const description = (newStatus: ApplicationStatus, button?: string) => {
    switch(newStatus){
      case ApplicationStatus.Completed:
        return 'Volunteer involvement will be marked as “completed” and will be ended. Do you want to proceed?'
      case ApplicationStatus.Invited:
        return 'Invitation to join the project will be sent to the applicant. Do you want to proceed?'
      case ApplicationStatus.Shortlist:
        if(button === 'CANCEL INVITATION'){
          return 'Invitation to join the project will be withdrawn. Do you want to proceed?'
        }
        else{
          return 'The application will be “shortlisted”. Do you want to proceed?'
        }
      case ApplicationStatus.RejectedByCompany:
        return 'Volunteer involvement will be cancelled. Do you want to proceed?'
    }
  }

  const confirmData = (status: ApplicationStatus, button?: string) => {
    return  {title: ' ', description: description(status, button), onConfirm: () => {handleConfirm(status)}, onCancel: () => {dispatch(confirmModalClose())}}
  }

  const Buttons = (props: ButtonsProps) => {

    switch(currentTab){
      case ApplicationStatus.Applied:
        return (
          <div className={styles.btns}>
            <Button onClick={props.onViewClick}  type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.Shortlist)))} type='button' projectBtn='default'>
              SHORTLIST
            </Button>
            <Button 
            onClick={() => onStatusChange(ApplicationStatus.RejectedByCompany)} 
            type='button' projectBtn='red'>REJECT</Button>
          </div>
        )
      case ApplicationStatus.Shortlist:
        return (
          <div className={styles.btns}>
            <Button type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.Invited)))}  type='button' projectBtn='default'>
              INVITE
            </Button>
            <Button 
            onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.RejectedByCompany)))}
            type='button' projectBtn='red'>REJECT</Button>
          </div>
        )
      case ApplicationStatus.Invited:
        return (
          <div className={styles.btns}>
            <Button type='button' projectBtn='default'>VIEW</Button>
            <Button 
            onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.Shortlist, 'CANCEL INVITATION')))}
            type='button' projectBtn='red'>CANCEL INVITATION</Button>
          </div>
        )
      case ApplicationStatus.Execution:
        return (
          <div className={styles.btns}>
            <Button type='button' projectBtn='default'>VIEW</Button>
            <Button onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.Completed)))}
            type='button' projectBtn='default'>
              COMPLETE
            </Button>
            <Button 
            onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.RejectedByCompany)))}
            type='button' projectBtn='red'>REJECT</Button>
          </div>
          )
        case ApplicationStatus.Completed:
          return (
            <div className={styles.btnsCompleted}>
              <Button type='button' projectBtn='default'>VIEW</Button>
              <Button type='button' projectBtn='default'>
                REVIEW
              </Button>
              <Button type='button' projectBtn='default'>RECOMMEND</Button>
              <Button projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
        case ApplicationStatus.RejectedByCompany:
          return (
            <div className={styles.btns}>
              <Button type='button' projectBtn='default'>VIEW</Button>
              <Button 
              type='button' projectBtn='default'>
                RESTORE
              </Button>
              <Button projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
    }
  }

  return (
      <div className={styles.profile}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <Avatar image={props.profile.photo} size='largeSquare'/>
            <Button type='button' className={styles.details}><img src='/img/projects/account-details.svg' alt=''/></Button>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.name}>
                {props.profile.firstName} {props.profile.lastName}
              </div>
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
                Application No:
              </div>
            </div>
          </div>
          <div className={styles.requirements}>
            Main Requirements
          </div>
          <div className={styles.bottom}>
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
          {application.languages.length > 0 && <div>
         <div className={styles.sectionHeader}>Languages:</div>
         <div className={classNames(styles.sectionContent, styles.languages)}>
           {application.languages.map(i => <LanguageListItem className={styles.lang} model={i}/>)}
         </div>
       </div>}
        </div>
        <Buttons onViewClick={props.onViewClick} application={application}/>
        </div>
        <div className={styles.statistic}>
          <div className={styles.withUs}>
            Statistic with us:
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Applications:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Projects:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Orders:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Hours:
            </div>
            0h
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Reviews:
            </div>
            0
          </div>
          <div className={styles.option}>
            <div className={styles.text}>
              Recommendation:
            </div>
            No
          </div>
        </div>
      </div>
    )
  }

export default TabApplicationCard
