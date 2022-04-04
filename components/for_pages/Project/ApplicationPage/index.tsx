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
import {getMaxAge} from 'next/dist/server/image-optimizer'
import {getAge} from 'utils/date'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import {format} from 'date-fns'

interface Props {
  project: IProject
  application: IApplication
  index?: number
  total?: number
}
const RequirementStatus = (props: {name: string, success: boolean}) => {
  return <div className={classNames(styles.requirementStatus, {[styles.success]: props.success, [styles.failed]: !props.success})}>
    {props.name} <img src={`/img/Project/requirements_${props.success ? 'success' : 'failed'}.svg`}/>
  </div>
}
const ApplicationPage = ({application, index, total, project, ...props}: Props) => {
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
