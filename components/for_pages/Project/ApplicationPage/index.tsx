import * as React from 'react'
import {useEffect, useState} from 'react'
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
import {confirmChangeData, confirmModalClose, confirmOpen, modalClose} from 'components/Modal/actions'
import Button from 'components/ui/Button'
import { getMediaPath } from 'utils/media'
import Link from 'next/link'
import {useApplicationContext} from "context/application_state";
import Switch from "components/ui/Switch";
import {useRecommendContext} from "context/recommend_state";
import {ModalType, SnackbarType} from "types/enums";
import {useProjectContext} from "context/project_state";
import RatingStars from "components/ui/RatingStars";
import FeedbackRepository from "data/repositories/FeedbackRepository";
import Routes from "pages/routes";


interface Props {
  project: IProject
  application: IApplication
  index?: number
  total?: number
  modal?: boolean
  onEdit?: () => void
  currentTab?: ApplicationStatus
  onChangeStatus?: (status: ApplicationStatus) => void
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
const ApplicationPage = ({application, index, total, project, modal, onEdit, currentTab, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const applicationContext = useApplicationContext();
  const projectContext = useProjectContext();
  const [isLoading, setIsLoading] = useState(true);
  const recommendContext = useRecommendContext()
  const profile = appContext.profile
  const feedback = applicationContext.application?.feedbacks?.filter(i => !i.deletedAt).find(i => i.target === 'master')

  useEffect(() => {
    recommendContext.addRecord(application.profileId)
    return () => {
      recommendContext.removeRecord(application.profileId)
    }
  }, [])
  const handleDeleteReview = () => {
    dispatch(confirmOpen({
      description: 'Do you want to delete your review?',
      onConfirm: async () => {
        dispatch(confirmChangeData({loading: true}))
        await FeedbackRepository.delete(feedback.id);
        appContext.feedbackDeleteState$.next(feedback)
        dispatch(confirmModalClose())
        appContext.showSnackbar('Your review deleted', SnackbarType.success);
      }
    }))
  }
  const handleRecommend = (val) => {
    if(recommendContext.sending.includes(application.profileId)){
      return;
    }
    if(val) {
      recommendContext.createRecommend(application.profileId)
    }else{
      recommendContext.deleteRecommend(application.profileId)
    }
  }
  const EducationGradation = (education: string) => {
    switch(education){
      case 'student':
        return 1
      case 'graduate':
        return 2
      case 'undergraduate':
        return 3
      case 'bachelor':
        return 4
      case 'master':
        return 5
      case 'phd':
        return 6
    }
  }

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
    console.log(project.minAge)
    if(project.minAge && project.maxAge && (profileAge <= project.maxAge && profileAge >= project.minAge)){
      return true
    }else if(project.minAge && (profileAge <= project.maxAge && profileAge >= project.minAge)){
      return true
    }else if(project.maxAge && !project.minAge && profileAge <= project.maxAge ){
      return true
    }
    return false;
  }
  const profileLink = `${Routes.profile(application.profile)}`

  const dispatch = useDispatch()

  const changeStatus = (status: ApplicationStatus, isCancel?: boolean) => {
    applicationContext.changeStatus(status, isCancel);
    if(props.onChangeStatus){
      props.onChangeStatus(status)
    }
  }


  const handleEdit = () => {
    onEdit()
  }

  const Buttons = (props: ButtonsProps) => {

    switch(currentTab){
      case ApplicationStatus.Applied:
        return (
          <div className={styles.btns}>
            {profile.role === 'volunteer' ?
            <>
            <Button type='button' projectBtn='default' onClick={handleEdit}>
              EDIT
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByVolunteer)}
            type='button' projectBtn='red'>RECALL</Button>
            </>
            :
            <>
            <Button onClick={() => changeStatus(ApplicationStatus.Shortlist)} type='button' projectBtn='default'>
              SHORTLIST
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByCompany)}
            type='button' projectBtn='red'>REJECT</Button>
            </>
            }
          </div>
        )
      case ApplicationStatus.Shortlist:
        return (
          <div className={styles.btns}>
            {profile.role === 'volunteer' ?
            <>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByVolunteer)}
            type='button' projectBtn='red'>RECALL</Button>
            </>
            :
            <>
            <Button onClick={() => changeStatus(ApplicationStatus.Invited)}  type='button' projectBtn='default'>
              INVITE
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByCompany)}
            type='button' projectBtn='red'>REJECT</Button>
            </>}
          </div>
        )
      case ApplicationStatus.Invited:
        return (
          <div className={styles.btns}>
            {profile.role === 'volunteer' ?
            <>
            <Button onClick={() => changeStatus(ApplicationStatus.Execution)} type='button' projectBtn='default'>ACCEPT</Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByVolunteer)}
            type='button' projectBtn='red'>REJECT</Button>
            </>
            :
            <>
            <Button
            onClick={() => changeStatus(ApplicationStatus.Shortlist, true)}
            type='button' projectBtn='red'>CANCEL INVITATION</Button>
            </>}
          </div>
        )
      case ApplicationStatus.Execution:
        return (
          <div className={styles.btns}>
            {profile.role === 'volunteer' ?
            <>
            <Button
            onClick={() => profile.role === 'volunteer' ? changeStatus(ApplicationStatus.CompleteRequest) : changeStatus(ApplicationStatus.Completed)}
            type='button' projectBtn='default'>
              COMPLETE
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByVolunteer)}
            type='button' projectBtn='red'>RECALL</Button>
            </>
            :
            <>
            <Button onClick={() => changeStatus(ApplicationStatus.Completed)}
            type='button' projectBtn='default'>
              COMPLETE
            </Button>
            <Button
            onClick={() => changeStatus(ApplicationStatus.RejectedByCompany)}
            type='button' projectBtn='red'>REJECT</Button>
            </>
            }
          </div>
          )
        case ApplicationStatus.Completed:
          return (
            <div className={styles.btnsCompleted}>
              {profile.role === 'volunteer' ?
              <>
              {/*<Button type='button' projectBtn='default'>
                REQUEST REVIEW
              </Button>*/}
              {/*<Button type='button' projectBtn='default'>WRITE REVIEW</Button>*/}
              </>
              :
              <>
                <Button type='button' projectBtn='default' onClick={() => projectContext.showModal(ModalType.VolunteerFeedBackModal, {
                  feedback,
                  profileId: application.profileId, applicationId: application.id})}>
                  {feedback ? 'EDIT REVIEW' : 'REVIEW'}
                </Button>
                <div className={styles.switch}>
                  <Switch checked={!!recommendContext.store.find(i => i.eId === application.profileId)} onChange={handleRecommend}/> <div className={styles.switchName}>{ !!recommendContext.store.find(i => i.eId === application.profileId) ? 'Recommended' : 'No recommendation'}</div></div>

                <Button className={styles.recycle} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
              </>}
            </div>
          )
        case ApplicationStatus.RejectedByCompany:
          return (
            <div className={styles.btns}>
              <Button

              type='button' projectBtn='default'>
                RESTORE
              </Button>
              <Button className={styles.recycle} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
            </div>
          )
          case ApplicationStatus.RejectedByVolunteer:
            return (
              <div className={styles.btns}>
                {profile.role ?
                <>
                <Button className={styles.recycle} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
                <Button type='button' projectBtn='default' onClick={() => changeStatus(ApplicationStatus.Applied)}>REAPPLY</Button>
                </>
                :
                <>
                <Button
                type='button' projectBtn='default'>
                  RESTORE
                </Button>
                <Button className={styles.recycle} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>
                </>}
              </div>
            )
    }
    return null
  }

  const fileName = (file: string) => {
    const name = file.split('.').splice(0, 1)
    return name
  }

  const getImageSrc = (file: string) => {

    const srcValue = file
    if(!srcValue){
      return
    }
    const extension = srcValue.split('.').pop().toUpperCase()
    //return `${srcValue.indexOf('blob:') === 0 ? srcValue : (`${process.env.NEXT_PUBLIC_API_URL || ''}/api/s3/${srcValue}`)}`
    switch(extension){
      case 'TXT':
        return '/img/DocField/doc.svg'
      case 'DOC':
        return '/img/DocField/doc.svg'
      case 'PDF':
        return '/img/DocField/pdf.svg'
    }
  }

  const [isDrop, setIsDrop] = useState(false)

  const [isReq, setIsReq] = useState(appContext.isMobile ? false : true)

  return (
   <div className={styles.root}>

     <div className={styles.leftSide}>
        <div className={classNames(styles.section, styles.profile)}>
          <div className={styles.profileInfo}>
          <Link href={profileLink}>
            <a target='_blank'>
            <Avatar image={application.profile.photo} size={'largeSquare'}/>
            </a>
          </Link>
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
              <Link href={profileLink}>
                <a target='_blank' className={styles.profileName}>{application.profile.firstName} {application.profile.lastName}</a>
              </Link>
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
       {feedback && <div className={classNames(styles.section, styles.feedback)}>
         <div className={styles.sectionHeader}>
           <div>Review</div>
         <RatingStars mark={feedback.mark}/>
         </div>
         <div className={styles.sectionContent}>{feedback.description}</div>
         {feedback.fromProfileId === profile.id && <div className={styles.sectionFeedbackActions}>
            <Button type='button' projectBtn='default' onClick={() => projectContext.showModal(ModalType.VolunteerFeedBackModal, {
              feedback,
              profileId: application.profileId, applicationId: application.id})}>
              EDIT REVIEW
            </Button>

            <Button className={styles.recycle} onClick={handleDeleteReview} projectBtn='recycleBin'><img src='/img/icons/recycle-bin.svg' alt=''/></Button>

          </div>}
       </div>}

     <div className={classNames(styles.section, styles.coverLetter)}>
       <div className={styles.sectionHeader}>
         <div>Cover Letter</div>
         {application.coverLetterFileObject &&
         <a target='_blank' href={getMediaPath(application.coverLetterFileObject.urlS3)} download={fileName(application.coverLetterFileObject.name)}><img src={getImageSrc(application.coverLetterFile)} alt=''/></a>
         }
         </div>
       <div className={styles.sectionContent}>{application.coverLetter}</div>
     </div>

     <div className={classNames(styles.section, styles.resume)}>
       <div className={styles.sectionHeader}>
         <div>Resume</div>
         {application.resumeFileObject &&
         <a href={getMediaPath(application.resumeFileObject.urlS3)} download={fileName(application.resumeFileObject.name)}><img src={getImageSrc(application.resumeFile)} alt=''/></a>
         }
         </div>
       <div className={styles.sectionContent}>{application.resume}</div>
     </div>
     </div>
     <div className={styles.rightSide}>
       {modal &&
       appContext.isMobile ?
        <VolunteerStats view drop={isDrop} onClick={() => setIsDrop(isDrop ? false : true)} style='drop'/>
        :
        <VolunteerStats view/>
        }

       <div className={styles.requirements}>
         <div className={styles.header}
         style={{cursor: appContext.isMobile ? 'pointer' : 'auto'}}
         onClick={() => appContext.isMobile ? setIsReq(isReq ? false : true): null}>Requirements Check
         {appContext.isMobile &&<div><img src='/img/icons/arrowBlack.svg' alt=''/></div>}
         </div>
         {isReq &&
         <>
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
           <RequirementStatus name={'Education'} success={EducationGradation(application.education) >= EducationGradation(project.education)}/>
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
         </>
         }



       </div>
     </div>
      </div>
  )
}

export default ApplicationPage
