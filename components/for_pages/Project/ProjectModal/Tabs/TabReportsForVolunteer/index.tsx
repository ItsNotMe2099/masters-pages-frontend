import * as React from 'react'
import styles from './index.module.scss'
import {IProject} from 'data/intefaces/IProject'
import {useTranslation} from 'next-i18next'
import ProjectTabHeader from '../../ProjectTabHeader'
import TabReportEvents from './TabReportEvents'

interface Props {
  project: IProject | null
}

const TabReportsForVolunteer = ({project}: Props) => {
  const {t} = useTranslation()

  return (
    <div className={styles.root}>
      <ProjectTabHeader project={project}/>
      <div className={styles.content}>
        <TabReportEvents project={project}/>
      </div>
    </div>
  )
}

export default TabReportsForVolunteer
