import * as React from 'react'
import styles from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader/index.module.scss'
import cx from 'classnames'
import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {format} from 'date-fns'
import {useTranslation} from 'next-i18next'
import ProjectStatusLabel from 'components/for_pages/Project/ProjectModal/ProjectStatusLabel'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  project: IProject
  title: string
}
const ProjectDescriptionHeader = ({project, title}: Props) => {
  const {t} = useTranslation();
  return (
    <div className={cx(styles.root)}>
      <VisibleXs>
          <div className={styles.header}>{title}</div>
        </VisibleXs>
      <div className={styles.top}>
        <div className={styles.left}>
          <ProjectStatusLabel status={project?.status ?? ProjectStatus.Draft}/>
          <div className={styles.title}>{project?.title || '[Project title]'}</div>
          <div className={styles.projectId}>Project id#: {project?.id}</div>
        </div>
        <HiddenXs>
          <div className={styles.header}>{title}</div>
        </HiddenXs>
        {project && <div className={styles.right}>
          <div className={styles.line}><div>Application Limit:</div> <div>0/{project.applicationsLimits}</div></div>
          <div className={styles.line}><div>Vacancies:</div> <div>0/{project.vacanciesLimits}</div></div>
        </div>}
      </div>

      {project && <div className={styles.dates}>
        <div className={styles.dateItem}><div className={styles.dateItemLabel}>Applications Deadline: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.applicationsClothingDate), 'MM.dd.yyy')}</div>
        <div className={styles.separator}/>
        <div className={styles.dateItem}><div className={styles.dateItemLabel}>Project Deadline: </div> <img src={'/img/Project/calendar.svg'}/>{format(new Date(project.endDate), 'MM.dd.yyy')}</div>

      </div>}

     </div>
  )
}

export default ProjectDescriptionHeader
