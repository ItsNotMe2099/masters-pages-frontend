import * as React from 'react'
import styles from './index.module.scss'

import {IProject, ProjectStatus} from 'data/intefaces/IProject'
import {format} from 'date-fns'
import {useTranslation} from 'next-i18next'

interface Props {
  status: ProjectStatus
}
const ProjectStatusLabel = ({status}: Props) => {
  const {t} = useTranslation();
  return (
          <div className={styles.root}>{t(`project.status.${status}`)}</div>

  )
}

export default ProjectStatusLabel
