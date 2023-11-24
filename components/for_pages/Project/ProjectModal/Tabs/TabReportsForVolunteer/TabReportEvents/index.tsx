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

  const convertMinutesToHoursAndMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursText = hours > 0 ? `${hours} hr` : '';
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes} min` : '';

    return `${hoursText} ${minutesText}`;
  }

  return (
    <div className={styles.root}>
      {loading && <Loader />}
      {!loading && report && <>
        <div className={styles.title}>Summary</div>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.label} />
            <div className={classNames(styles.cell, styles.draft)}>Draft</div>
            <div className={classNames(styles.cell, styles.planned)}>Planned</div>
            <div className={classNames(styles.cell, styles.completed)}>Completed</div>
            <div className={classNames(styles.cell, styles.confirmed)}>Confirmed</div>
            <div className={classNames(styles.cell, styles.confirmed)}>Approved</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>
              Total
            </div>
            <div className={classNames(styles.cell, styles.draft)}>
              {convertMinutesToHoursAndMinutes(report.summary.find(i => i.event_status === EventStatus.Draft)?.count) ?? 0}</div>
            <div className={classNames(styles.cell, styles.planned)}>
              {convertMinutesToHoursAndMinutes(report.summary.find(i => i.event_status === EventStatus.Planned)?.count) ?? 0}</div>
            <div className={classNames(styles.cell, styles.completed)}>
              {convertMinutesToHoursAndMinutes(report.summary.find(i => i.event_status === EventStatus.Completed)?.count) ?? 0}</div>
            <div className={classNames(styles.cell, styles.confirmed)}>
              {convertMinutesToHoursAndMinutes(report.summary.find(i => i.event_status === EventStatus.Confirmed)?.count) ?? 0}</div>
            <div className={classNames(styles.cell, styles.confirmed)}>
              {convertMinutesToHoursAndMinutes(report.summary.find(i => i.event_status === EventStatus.Approved)?.count) ?? 0}</div>
          </div>
          {report.byDate.map(i => (
            <div className={styles.row}>
              <div className={styles.label}>
                {i.date}
              </div>
              <div className={classNames(styles.cell, styles.draft)}>{convertMinutesToHoursAndMinutes(i.draft)}</div>
              <div className={classNames(styles.cell, styles.planned)}>{convertMinutesToHoursAndMinutes(i.planned)}</div>
              <div className={classNames(styles.cell, styles.completed)}>{convertMinutesToHoursAndMinutes(i.completed)}</div>
              <div className={classNames(styles.cell, styles.confirmed)}>{convertMinutesToHoursAndMinutes(i.confirmed)}</div>
              <div className={classNames(styles.cell, styles.confirmed)}>{convertMinutesToHoursAndMinutes(i.approved)}</div>
            </div>
          ))}
        </div>
      </>}

    </div>
  )
}

export default TabReportEvents
