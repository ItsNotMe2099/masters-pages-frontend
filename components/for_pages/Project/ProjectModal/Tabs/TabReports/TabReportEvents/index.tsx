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
            {report.summary.map(i =>
              <div className={classNames(styles.cell, styles.draft,
                { [styles.special]: i.event_status === 'approved' })}>
                {i.event_status.charAt(0).toUpperCase()
                  + i.event_status.slice(1)}</div>)}
          </div>
          <div className={styles.row}>
            {report.summary.map(i => (
              <div className={classNames(styles.cell, styles.draft)}>{convertMinutesToHoursAndMinutes(i.count)}</div>
            ))}
          </div>
        </div>
        <div className={styles.title}>By Volunteers</div>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.label}>
            </div>
            <div className={classNames(styles.cell, styles.draft)}>Draft</div>
            <div className={classNames(styles.cell, styles.planned)}>Planned</div>
            <div className={classNames(styles.cell, styles.completed)}>Completed</div>
            <div className={classNames(styles.cell, styles.confirmed)}>Confirmed</div>
            <div className={classNames(styles.cell, styles.confirmed, styles.special)}>Approved</div>
          </div>
          {report.byVolunteer.map((i) => (<>
            <div className={styles.row} onClick={() => expandedVolunteers.find(a => a === i.participantId) ? setExpandedVolunteers(expandedVolunteers.filter(a => a !== i.participantId)) : setExpandedVolunteers(a => [...a, i.participantId])}>
              <div className={classNames(styles.label)}>
                <div className={styles.volunteer}>
                  <ArrowDown className={classNames(styles.chevron, { [styles.opened]: expandedVolunteers.includes(i.participantId) })} />
                  <Avatar image={i.photo} size='circle' href={Routes.profile({ id: i.participantId, slug: i.slug } as any as IProfile)} />
                  <Link href={Routes.profile({ id: i.participantId, slug: i.slug } as any as IProfile)}><a className={styles.name}>{i.firstName ?? ''} {i.lastName ?? ''}</a></Link>
                </div>
              </div>
              <div className={classNames(styles.cell, styles.draft)}>{convertMinutesToHoursAndMinutes(i.draft)}</div>
              <div className={classNames(styles.cell, styles.planned)}>{convertMinutesToHoursAndMinutes(i.planned)}</div>
              <div className={classNames(styles.cell, styles.completed)}>{convertMinutesToHoursAndMinutes(i.completed)}</div>
              <div className={classNames(styles.cell, styles.confirmed)}>{convertMinutesToHoursAndMinutes(i.confirmed)}</div>
              <div className={classNames(styles.cell, styles.confirmed)}>{convertMinutesToHoursAndMinutes(i.approved)}</div>
            </div>
            {expandedVolunteers.includes(i.participantId) && report.byDate.filter(a => a.participantId === i.participantId).map(i => (
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
          </>
          ))}

        </div>
      </>}

    </div>
  )
}

export default TabReportEvents
