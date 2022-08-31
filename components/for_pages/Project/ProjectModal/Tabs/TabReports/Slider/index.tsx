import * as React from 'react'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {useAppContext} from 'context/state'
import { ApplicationStatus, IApplication } from 'data/intefaces/IApplication'
import {useState, useEffect} from 'react'
import { IProject } from 'data/intefaces/IProject'
import VolunteerItem from '../VolunteerItem'
import ApplicationRepository from 'data/repositories/ApplicationRepository'
import { ProfileRole } from 'data/intefaces/IProfile'
import Avatar from 'components/ui/Avatar'
import { format } from 'date-fns'
import classNames from 'classnames'
import { useWindowWidth } from '@react-hook/window-size'

interface Props {
  project: IProject
}

const SliderVolunteers = (props: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [page, setPage] = useState(1)
  const [applications, setApplications] = useState<IApplication[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [item, setItemForFirstArray] = useState(null)
  const [itemSecond, setItemForSecondArray] = useState(null)
  const [currentItem, setCurrentItem] = useState<IApplication | null>(null)
  const width = useWindowWidth()
  const isMobile = width < 1025

  const limit = isMobile ? 5 : 10

  useEffect(() => {
    ApplicationRepository.fetchApplicationsByCorporateForProject(props.project.id, ProfileRole.Corporate, page, limit).then(data =>      
    {
      if(data){
        setApplications(data.data)
        setPageCount(data.pageCount)
      }
    }
      )
      setCurrentItem(null)
      setItemForFirstArray(null)
      setItemForSecondArray(null)
  }, [page])

  const handleItemInFirst = (indexItem: number) => {
    setItemForSecondArray(null)
    setItemForFirstArray(indexItem)
    setCurrentItem(null)
    setCurrentItem(applications?.slice(0, 5).find((i, index) => indexItem === index))
  }

  const handleItemInSecond = (indexItem: number) => {
    setItemForFirstArray(null)
    setItemForSecondArray(indexItem)
    setCurrentItem(null)
    setCurrentItem(applications?.slice(5, 10).find((i, index) => indexItem === index))
  }

  const Slide = () => {
    return (
      <div className={styles.slide}>
        <div className={styles.left}>
        {applications.slice(0, 5).map((i, index) =>
          <VolunteerItem index={index} application={i} onClick={() => handleItemInFirst(index)} itemIndex={item}/>
        )}
        </div>
        {!isMobile &&
        <div className={styles.right}>
        {applications.slice(5, 10).map((i, index) =>
          <VolunteerItem index={index} application={i}  onClick={() => handleItemInSecond(index)} itemIndex={itemSecond}/>
        )}
        </div>}
      </div>
    )
  }

  const Dot = (propsDot: {index?: number, page?: number, onClick?: () => void}) => {
    return (
      <div className={styles.dot} onClick={propsDot.onClick}>
        <img src={propsDot.index + 1 === propsDot.page ? '/img/Reports/Volunteers/dot-active.svg' : '/img/Reports/Volunteers/dot.svg'} alt=''/>
      </div>
    )
  }

  const array = Array(pageCount)

  const dots = array.fill(<Dot/>)

  const table = [
    {name: 'Applied', value: currentItem && format(new Date(currentItem?.appliedAt), 'dd.MM.yy')},
    {name: 'Status', value: <div 
    className={classNames(styles.status, {[styles.completed]: currentItem?.status === ApplicationStatus.Completed}, 
    {[styles.declined]: currentItem?.status === ApplicationStatus.RejectedByCompany || currentItem?.status === ApplicationStatus.RejectedByVolunteer})}>
      <div className={styles.image}>
        <img 
        src={currentItem?.status === ApplicationStatus.Completed ? '/img/Reports/Volunteers/completed.svg' : currentItem?.status === ApplicationStatus.RejectedByCompany || currentItem?.status === ApplicationStatus.RejectedByVolunteer ? '/img/Reports/Volunteers/declined.svg' : '/img/Reports/Volunteers/invited.svg'} 
        alt=''/></div>{currentItem?.status === ApplicationStatus.RejectedByCompany || currentItem?.status === ApplicationStatus.RejectedByVolunteer ? 'Declined' : currentItem?.status}
    </div>,},
    {name: 'Recommendation', value: 'No'},
    {name: 'Events', value: 0},
    {name: 'Hours', value: 0},
    {name: 'Reviews', value: 0},
  ]

  return (
    <>
    <div className={styles.root}>
      {pageCount > 1 && <a className={styles.prev} onClick={() => page !== 1 && setPage(page - 1)}><img src='/img/Reports/Volunteers/prev.svg' alt=''/></a>}
        <Slide/>
      {pageCount > 1 && <a className={styles.next} onClick={() => pageCount !== page && setPage(page + 1)}><img src='/img/Reports/Volunteers/next.svg' alt=''/></a>}
    </div>
    {pageCount > 1 &&
    <div className={styles.dots}>
        {dots.map((i, index) => <Dot index={index} page={page} onClick={() => setPage(index + 1)}/>)}
    </div>}
    {currentItem &&
      <>
      <div className={styles.separator}></div>
      <div className={styles.info}>
        <div className={styles.head}>
          <Avatar image={currentItem.profile.photo} size='circleLarge'/>
          <div className={styles.name}>{currentItem.profile.firstName} {currentItem.profile.lastName}</div>
        </div>
        <div className={styles.table}>
          {table.map(i => 
              <div className={styles.row}>
                    <div className={styles.cellFirst}>
                      {i.name}
                    </div>
                    <div className={styles.cell}>
                      {i.value}
                    </div>
                  </div>   
                  )}
                </div>  
      </div>
      </>
      }
    </>
  )
}

export default SliderVolunteers
