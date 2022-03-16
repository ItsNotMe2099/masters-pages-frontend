import * as React from 'react'
import styles from 'components/for_pages/Project/ProjectModal/ProjectDescriptionHeader/index.module.scss'
import ProjectTabItem from 'components/for_pages/Project/ProjectModal/ProjectTabs/Tab'
import cx from 'classnames'
import {IProject} from 'data/intefaces/IProject'

interface Props {
  project: IProject
}
const ProjectDescriptionHeader = ({project}: Props) => {

  return (
    <div className={cx(styles.root)}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.status}></div>
          <div className={styles.title}>{project?.title || '[Project title]'}</div>
          <div className={styles.projectId}>Project id#: {project?.id}</div>
        </div>
        <div className={styles.header}>Volunteers</div>
        <div className={styles.right}>
          <div className={styles.line}>Application Limit: 47/100</div>
          <div className={styles.line}>Vacancies: 2/10</div>
        </div>
      </div>


      <div className={styles.time}></div>
     </div>
  )
}

export default ProjectDescriptionHeader
