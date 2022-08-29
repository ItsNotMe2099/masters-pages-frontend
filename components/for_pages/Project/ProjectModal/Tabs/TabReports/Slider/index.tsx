import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import { IApplication } from 'data/intefaces/IApplication'
import {useState, useEffect} from 'react'
import { IProject } from 'data/intefaces/IProject'
import VolunteerItem from '../VolunteerItem'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { ProfileRole } from 'data/intefaces/IProfile'

interface Props {
  project: IProject
}

const SliderVolunteers = (props: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [page, setPage] = useState(1)
  const [applications, setApplications] = useState<IApplication[]>([])
  const [pageCount, setPageCount] = useState(2)
  const [isActive, setIsActive] = useState(false)

  const temp = [
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TEST'}, status: 'completed'},
    {profile: {photo: '/img/DocField/doc.svg', firstName: 'TEST', lastName: 'TESTRRRRRR'}, status: 'completed'},
  ]


  useEffect(() => {
    ApplicationRepository.fetchApplicationsByCorporateForProject(props.project.id, ProfileRole.Corporate, page, 10).then(data =>      
    {
      if(data){
        setApplications(data.data)
        //setPageCount(data.pageCount)
      }
    }
      )
  }, [page])

  const Slide = () => {
    return (
      <div className={styles.slide}>
        <div className={styles.left}>
        {/*applications*/temp.slice(0, 5).map((i, index) =>
          <VolunteerItem application={i} active={isActive} onClick={() => setIsActive(true)}/>
        )}
        </div>
        <div className={styles.right}>
        {/*applications*/temp.slice(5, 10).map(i =>
          <VolunteerItem application={i} active={isActive} onClick={() => setIsActive(true)}/>
        )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {pageCount > 1 && <a className={styles.prev} onClick={() => page !== 1 && setPage(page - 1)}><img src='/img/Reports/Volunteers/prev.svg' alt=''/></a>}
        <Slide/>
      {pageCount > 1 && <a className={styles.next} onClick={() => pageCount !== page && setPage(page + 1)}><img src='/img/Reports/Volunteers/next.svg' alt=''/></a>}
    </div>
  )
}

export default SliderVolunteers
