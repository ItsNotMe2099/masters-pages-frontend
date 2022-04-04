import * as React from 'react'
import styles from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader/index.module.scss'
import ProjectTabItem from 'components/for_pages/Project/ProjectModal/ProjectTabs/Tab'
import cx from 'classnames'
import {IProject} from 'data/intefaces/IProject'
import {format} from 'date-fns'
import {useTranslation} from 'next-i18next'
import ProjectStatusLabel from 'components/for_pages/Project/ProjectModal/ProjectStatusLabel'

interface Props {
  project: IProject
  title: string
}
const ProjectDescriptionHeader = ({project, title}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={cx(styles.root)}>
      <div className={styles.top}>
        <div className={styles.left}>
          <ProjectStatusLabel status={project.status}/>
          <div className={styles.title}>{project?.title || '[Project title]'}</div>
          <div className={styles.projectId}>Project id#: {project?.id}</div>
        </div>
        <div className={styles.header}>{title}</div>
        {project && <div className={styles.right}>
          <div className={styles.line}>Application Limit: 0/{project.applicationsLimits}</div>
          <div className={styles.line}>Vacancies: 0/{project.vacanciesLimits}</div>
        </div>}
      </div>

      <div className={styles.dates}>
        <div className={styles.dateItem}><div className={styles.dateItemLabel}>Applications Deadline: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.applicationsClothingDate), 'MM.dd.yyy')}</div>
        <div className={styles.separator}/>
        <div className={styles.dateItem}><div className={styles.dateItemLabel}>Project Deadline: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.endDate), 'MM.dd.yyy')}</div>

      </div>

     </div>
  )
}

export default ProjectDescriptionHeader
