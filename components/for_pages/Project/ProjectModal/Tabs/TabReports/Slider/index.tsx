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
import Avatar from 'components/ui/Avatar'
import { format } from 'date-fns'

interface Props {
  project: IProject
}

const SliderVolunteers = (props: Props) => {
  const {t} = useTranslation();
  const appContext = useAppContext();
  const [page, setPage] = useState(1)
  const [applications, setApplications] = useState<IApplication[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [item, setItemForFirstArray] = useState(null)
  const [itemSecond, setItemForSecondArray] = useState(null)
  const [currentItem, setCurrentItem] = useState<IApplication | null>(null)


  useEffect(() => {
    ApplicationRepository.fetchApplicationsByCorporateForProject(props.project.id, ProfileRole.Corporate, page, 10).then(data =>      
    {
      if(data){
        setApplications(data.data)
        setPageCount(data.pageCount)
      }
    }
      )
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
          <VolunteerItem index={index} application={i} active={isActive} onClick={() => handleItemInFirst(index)} itemIndex={item}/>
        )}
        </div>
        <div className={styles.right}>
        {applications.slice(5, 10).map((i, index) =>
          <VolunteerItem index={index} application={i} active={isActive} onClick={() => handleItemInSecond(index)} itemIndex={itemSecond}/>
        )}
        </div>
      </div>
    )
  }

  const table = [
    {name: 'Applied', value: currentItem && format(new Date(currentItem?.appliedAt), 'dd.MM.yy')},
    /*{name: 'Project published', value: format(new Date(project.updatedAt), 'MMM dd, yyyy')},
    {name: 'Aplications start date', value: format(new Date(project.startDate), 'MMM dd, yyyy')},
    {name: 'Aplications end date', value: format(new Date(project.applicationsClothingDate), 'MMM dd, yyyy')},
    {name: 'Project started', value: format(new Date(project.startDate), 'MMM dd, yyyy')},
    {name: 'Project completed', value: format(new Date(project.endDate), 'MMM dd, yyyy')},*/
  ]

  return (
    <>
    <div className={styles.root}>
      {pageCount > 1 && <a className={styles.prev} onClick={() => page !== 1 && setPage(page - 1)}><img src='/img/Reports/Volunteers/prev.svg' alt=''/></a>}
        <Slide/>
      {pageCount > 1 && <a className={styles.next} onClick={() => pageCount !== page && setPage(page + 1)}><img src='/img/Reports/Volunteers/next.svg' alt=''/></a>}
    </div>
    {currentItem &&
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
      </div>}
    </>
  )
}

export default SliderVolunteers
