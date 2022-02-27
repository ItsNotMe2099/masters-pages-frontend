import Logo from 'components/Logo'
import ArrowDown from 'components/svg/ArrowDown'
import { fetchTaskSearchList, resetTaskSearchList, setFilterTaskSearch } from 'components/TaskSearch/actions'
import { useRouter } from 'next/router'
import SearchTaskFilter from 'components/for_pages/SearchTaskPage/Filter'
import {default as React, useState} from 'react'
import { IRootState } from 'types'
import styles from 'components/for_pages/SearchTaskPage/MapView/MapHeader/index.module.scss'
const queryString = require('query-string')
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Header from 'components/layout/Layout/LayoutAuthorized/mobile/Header'

const MapHeader = (props) => {
  const {t} = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)

  const handleMoreClick = () => {
    setExpanded(expanded => !expanded)
  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
        return JSON.parse((router.query as any).filter)
      }
    }catch (e) {

    }
    return {}
  }
  const handleOnChangeFilter = (data) => {
    dispatch(setFilterTaskSearch(data))
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList({limit: 10000}))
    router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })
  }
  return (
    <>
      <div className={styles.headerMobile}>
        <Header/>
      </div>
      <div  className={`${styles.root} ${expanded && styles.opened}`}>

        <div className={`${styles.container}`}>
          <div className={styles.logo}>
            <Logo color={'white'}/>
          </div>
          <div className={`${styles.form}`}>
            <SearchTaskFilter form={'searchTaskFormMap'} onChange={handleOnChangeFilter} collapsed={!expanded} initialValues={getQueryFilter()}/>

            <div onClick={handleMoreClick} className={styles.moreMobile}>
             {expanded ? <span>Hide</span> : <span>{t('taskSearch.filter.showMoreOptions')}</span>}<img className={expanded ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/>
            </div>
          </div>

          <div className={styles.more} onClick={handleMoreClick}>{expanded ? t('taskSearch.filter.less') : t('taskSearch.filter.more')  } <ArrowDown color={'white'}/></div>
        </div>
      </div>
</>
  )
}
export default MapHeader
