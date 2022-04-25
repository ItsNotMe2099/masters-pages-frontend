import * as React from 'react'
import {useState} from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import StarRatings from 'react-star-ratings'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import {ApplicationStatus, IApplication} from 'data/intefaces/IApplication'
import classNames from 'classnames'
import Avatar from 'components/ui/Avatar'
import ProfileStatus from 'components/ui/ProfileStatus'
import {getAge} from 'utils/date'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import {format} from 'date-fns'
import VolunteerStats from '../ProjectModal/Tabs/TabApplication/VolunteerStats'
import { useDispatch } from 'react-redux'
import { confirmModalClose, confirmOpen, modalClose } from 'components/Modal/actions'
import Button from 'components/ui/Button'

interface Props {
  project: IProject
  application: IApplication
  index?: number
  total?: number
  modal?: boolean
  onStatusChange?: (newStatus: ApplicationStatus) => void
  currentTab?: ApplicationStatus
}
interface ButtonsProps {
  application?: IApplication
  onViewClick?: () => void
}
const RequirementStatus = (props: {name: string, success: boolean}) => {
  return <div className={classNames(styles.requirementStatus, {[styles.success]: props.success, [styles.failed]: !props.success})}>
    {props.name} <img src={`/img/Project/requirements_${props.success ? 'success' : 'failed'}.svg`}/>
  </div>
}
const ApplicationPage = ({application, index, total, project, modal, onStatusChange, currentTab, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const formatProjectAge = () => {
    if(project.minAge && project.maxAge){
      return `${project.minAge} - ${project.maxAge}`
    }else if(project.maxAge){
      return `< ${project.minAge}`
    }else if(project.minAge){
      return `> ${project.minAge}`
    }
    return null
  }
  const checkAge = () => {
    const profileAge = application.age ?? getAge(application.profile.birthday);
    if(project.minAge && project.maxAge && (profileAge <= project.maxAge && profileAge >= project.minAge)){
      return true;
    }else if(project.minAge && profileAge >= project.minAge){
      return true;
    }else if(project.maxAge && profileAge <= project.maxAge ){
      return true
    }
    return false;
  }
  const profileLink = `/id${application.profile.id}`

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
            <Button 
            onClick={() => dispatch(confirmOpen(confirmData(ApplicationStatus.Shortlist, 'CANCEL INVITATION')))}
            type='button' projectBtn='red'>CANCEL INVITATION</Button>
          </div>
        )
      case ApplicationStatus.Execution:
        return (
          <div className={styles.btns}>
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
   <div className={styles.root}>
     <div className={styles.leftSide}>
        <div className={classNames(styles.section, styles.profile)}>
          <div className={styles.profileInfo}>
            <Avatar image={application.profile.photo} href={profileLink}/>
            <div className={styles.icons}>
              <img src="/img/SearchTaskPage/icons/case.svg" alt=''/>
              <div>{application.profile.tasksCount || 0}</div>
              <img src="/img/SearchTaskPage/icons/like.svg" alt=''/>
              <div>{application.profile.feedbacksCount || 0}</div>
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

          <div className={styles.right}>
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.profileName}>{application.profile.firstName} {application.profile.lastName}</div>
                <ProfileStatus activityStatus={application.profile.activityStatus}/>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.dates}>
                  <div className={styles.dateItem}><div className={styles.dateItemLabel}>Applied on: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(application.createdAt), 'MM.dd.yyy')}</div>
                  {(index > 0 && total > 0) && <div className={styles.dateItem}><div className={styles.dateItemLabel}>Application No: </div>{index}/{total}</div>}
                </div>
              </div>


            </div>
            <div className={styles.statusBlock}>
            <div className={styles.status}><img src={'/img/Project/folder.svg'}/> {application.status}</div>
            </div>
            {modal && 
              <Buttons application={application}/>
            }
            <div className={styles.actions}></div>
          </div>
        </div>
     <div className={classNames(styles.section, styles.coverLetter)}>
       <div className={styles.sectionHeader}>Cover Letter</div>
       <div className={styles.sectionContent}>{application.coverLetter}</div>
     </div>

     <div className={classNames(styles.section, styles.resume)}>
       <div className={styles.sectionHeader}>Resume</div>
       <div className={styles.sectionContent}>{application.resume}</div>
     </div>
     </div>
     <div className={styles.rightSide}>
       {modal &&
        <VolunteerStats/>
        }
       <div className={styles.requirements}>
         <div className={styles.header}>Requirements Check</div>
         <div className={styles.columns}>
           <div>Applicant</div>
           <div>Requirements</div>
         </div>
         {(project.minAge || project.maxAge) && <div className={styles.requirementItem}>
           <RequirementStatus name={'Age'} success={checkAge()}/>
           <div className={styles.requirementItemValue}>
             <div>{application.age ?? getAge(application.profile.birthday)}</div>
             <div>{formatProjectAge()}</div>
           </div>
         </div>}

         <div className={styles.requirementItem}>
           <RequirementStatus name={'Education'} success={application.education === project.education}/>
           <div className={styles.requirementItemValue}>
             <div>{application.education}</div>
             <div>{project.education}</div>
           </div>
         </div>

         <div className={styles.requirementItem}>
           <RequirementStatus name={'Languages'} success={project.languages.every(i => (application.languages ?? application.profile.languages).includes(i))}/>
           <div className={styles.requirementItemValue}>
             <div>{(application.languages ?? application.profile.languages).map(i => <LanguageListItem model={i}/>)}</div>
             <div>{project.languages.map(i => <LanguageListItem  model={i}/>)}</div>
           </div>
         </div>



       </div>
     </div>
      </div>
  )
}

export default ApplicationPage
