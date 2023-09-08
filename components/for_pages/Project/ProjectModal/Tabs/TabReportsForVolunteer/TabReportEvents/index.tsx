import * as React from 'react'
import styles from './index.module.scss'
import { IProject } from 'data/intefaces/IProject'
import { useTranslation } from 'next-i18next'
import { useAppContext } from 'context/state'
import { useState, useEffect } from 'react'
import ProjectRepository from "data/repositories/ProjectRepository";
import { IProjectEventsReport } from "data/intefaces/IProjectEventsReport";
import Loader from "components/ui/Loader";
import classNames from "classnames";
import ArrowDown from "components/svg/ArrowDown";
import Avatar from "components/ui/Avatar";
import Routes from "pages/routes";
import { IProfile } from "data/intefaces/IProfile";
import Link from "next/link";
import { EventStatus } from 'types'

interface Props {
  project: IProject | null
}

const TabReportEvents = ({ project }: Props) => {
  const { t } = useTranslation();
  const appContext = useAppContext();
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<IProjectEventsReport | null>(null)
  const [expandedVolunteers, setExpandedVolunteers] = useState<number[]>([])
  useEffect(() => {
    ProjectRepository.fetchEventsReport(project.id).then(data => {
      setLoading(false)
      setReport(data)
    })
  }, [])

  return (
    <div className={styles.root}>
      {loading && <Loader />}
      {!loading && report && <>
        <div className={styles.title}>Summary</div>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={classNames(styles.cell, styles.draft)}>Draft</div>
            <div className={classNames(styles.cell, styles.planned)}>Planned</div>
            <div className={classNames(styles.cell, styles.completed)}>Completed</div>
            <div className={classNames(styles.cell, styles.confirmed)}>Confirmed</div>
            <div className={classNames(styles.cell, styles.confirmed)}>Approved</div>
          </div>
          <div className={styles.row}>
            <div className={classNames(styles.cell, styles.draft)}>
              {report.summary.find(i => i.event_status === EventStatus.Draft)?.count ?? 0}</div>
            <div className={classNames(styles.cell, styles.planned)}>
              {report.summary.find(i => i.event_status === EventStatus.Planned)?.count ?? 0}</div>
            <div className={classNames(styles.cell, styles.completed)}>
              {report.summary.find(i => i.event_status === EventStatus.Completed)?.count ?? 0}</div>
            <div className={classNames(styles.cell, styles.confirmed)}>
              {report.summary.find(i => i.event_status === EventStatus.Confirmed)?.count ?? 0}</div>
            <div className={classNames(styles.cell, styles.confirmed)}>
              {report.summary.find(i => i.event_status === EventStatus.Approved)?.count ?? 0}</div>
          </div>
        </div>
      </>}

    </div>
  )
}

export default TabReportEvents
