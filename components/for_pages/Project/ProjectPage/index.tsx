import * as React from 'react'
import {ReactElement, useState} from 'react'
import styles from './index.module.scss'
import {IProject, ProjectExecutionType, ProjectStatus} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import LanguageListItem from 'components/PublicProfile/components/view/CardLanguages/components/LanguageListItem'
import {format} from 'date-fns'
import ProjectStatusLabel from 'components/for_pages/Project/ProjectModal/ProjectStatusLabel'
import {getMediaPath} from 'utils/media'
import WorkInListItem from 'components/PublicProfile/components/view/CardPreferWorkIn/components/WorkInListItem'
import ProjectCategories from 'components/for_pages/Project/ProjectCategories'
import { IOrganization } from 'data/intefaces/IOrganization'
import CardOrganization from 'components/for_pages/Project/ProjectPage/CardOrganization'
import ProjectLink from "components/for_pages/Project/ProjectPage/ProjectLink";
import ProjectTabHeader from "components/for_pages/Project/ProjectModal/ProjectTabHeader";

interface Props {
  project: IProject
  controls: ReactElement[] | ReactElement
  onSave: (data) => any;
  organization?: IOrganization
  projectStatus?: ProjectStatus
  fullWidth?: boolean
}
const RequirementStatus = (props: {name: string, success: boolean}) => {
  return <div className={classNames(styles.requirementStatus, {[styles.success]: props.success, [styles.failed]: !props.success})}>
    {props.name} <img src={`/img/Project/requirements_${props.success ? 'success' : 'failed'}.svg`}/>
  </div>
}
const ProjectPage = ({  project, projectStatus, ...props}: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const profile = appContext.profile

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

  const profileLink = `/id${project.corporateProfileId}`
  const handleClickAttachment = (e, item) => {
    e.preventDefault();
    e.stopPropagation()
    window.open(getMediaPath(item.urlS3))
  }
  console.log("ProjectPhoto11", project.photo, project)
  return (
   <div className={props.fullWidth ? styles.fullWidth : styles.root}>
    <div className={styles.left}>
        <div className={styles.cardOrg}>
          <CardOrganization organization={props.organization}/>
  </div>
        {/*<CardProfile profileId={profile?.id}/>*/}
    </div>
     <div className={styles.center}>
       <ProjectTabHeader project={project}/>
       {project.inquiries && <div className={styles.section}>
         <div className={styles.sectionHeader}>Inquiries</div>
         <div className={styles.sectionContent}>{project.inquiries}</div>
       </div>}
       {project.description && <div className={styles.section}>
         <div className={styles.sectionHeader}>Project Description</div>
         <div className={styles.sectionContent}>{project.description}</div>
       </div>}
       {project.attachments && <div className={styles.section}>
         <div className={styles.sectionHeader}>Files</div>
         {<div className={styles.attachments}>
              {project.attachmentsObjects?.map(item =>
                  <a className={styles.item} target={'_blank'} href={getMediaPath(item.urlS3)} onClick={(e) => handleClickAttachment(e, item)} download={fileName(item.name || item.urlS3)}><div className={styles.image}><img src={getImageSrc(item.urlS3)} alt=''/></div><span>{item.name}</span></a>
              )}
            </div>}
       </div>}
       {project.requirements && <div className={styles.section}>
         <div className={styles.sectionHeader}>Application Requirements</div>
         <div className={styles.sectionContent}>{project.requirements}</div>
       </div>}
       {project.benefits && <div className={styles.section}>
         <div className={styles.sectionHeader}>Benefits for participants</div>
         <div className={styles.sectionContent}>{project.benefits}</div>
       </div>}

       {profile && <div className={styles.controls}>
         {props.controls}
       </div>}
     </div>
     <div className={styles.right}>
        <div className={styles.header}>Project Info</div>
     {project.photo && <div className={styles.photo}><img src={getMediaPath(project.photo)}/></div>}
       <div className={styles.section}>
         <div className={styles.sectionHeader}>Share Link</div>
        <ProjectLink projectId={project.id}/>
       </div>
     <div className={styles.section}>
       <div className={styles.sectionHeader}>Execution type</div>
       <div className={classNames(styles.sectionContent, styles.executionType)}>
         {[ProjectExecutionType.Online, ProjectExecutionType.Combo].includes(project.executionType) && <div className={classNames(styles.executionTypeItem, styles.online)}><img src={'/img/Project/location_green.svg'}/> Online</div>}
         {[ProjectExecutionType.Offline, ProjectExecutionType.Combo].includes(project.executionType) && <div className={styles.executionTypeItem}><img src={'/img/Project/location.svg'}/> In Person</div>}
       </div>
     </div>

       {project.locations.length > 0 && <div className={styles.section}>
         <div className={styles.sectionHeader}>Project Locations:</div>
         <div className={classNames(styles.sectionContent, styles.projectLocations)}>
           {project.locations.map(i => <WorkInListItem model={{type: i.type, location: i.location, isOnline: i.isOnline}} address={i.address}/>)}
         </div>
       </div>}
       {project.skills.length > 0 && <div className={styles.section}>
         <div className={styles.sectionHeader}>Relevant to categories:</div>
         <div className={classNames(styles.sectionContent, styles.projectLocations)}>
           <ProjectCategories skills={project.skills}/>
         </div>
       </div>}

       {project.languages.length > 0 && <div className={styles.section}>
         <div className={styles.sectionHeader}>Languages:</div>
         <div className={classNames(styles.sectionContent, styles.languages)}>
           {project.languages.map(i => <LanguageListItem model={i}/>)}
         </div>
       </div>}
       {(project.minAge || project.maxAge) && <div className={styles.section}>
         <div className={styles.sectionHeader}>Age:</div>
         <div className={classNames(styles.sectionContent, styles.ageLimits)}>
           <div className={styles.ageItem}><div className={styles.label}>Min age</div><div className={styles.value}>{project.minAge}</div></div>
           <div className={styles.ageItem}><div className={styles.label}>Max age</div><div className={styles.value}>{project.maxAge}</div></div>
         </div>
       </div>}
       {project.webLink && <div className={styles.section}>
         <div className={styles.sectionHeader}>External Web Link:</div>
         <div className={classNames(styles.sectionContent, styles.webLink)}>
           <img src={'/img/Project/web.svg'}/> <a href={project.webLink} target={'_blank'}>{project.webLink}</a>
         </div>
       </div>}
       {profile && <div className={styles.controlsAlt}>
         {props.controls}
       </div>}
     </div>


   </div>
  )
}

export default ProjectPage
