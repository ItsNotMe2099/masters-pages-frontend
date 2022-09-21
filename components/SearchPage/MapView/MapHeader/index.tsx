import Logo from 'components/Logo'
import SearchProfileFilter from 'components/SearchPage/Filter'
import ArrowDown from 'components/svg/ArrowDown'
import { fetchProfileSearchList, resetProfileSearchList, setFilterProfileSearch } from 'components/ProfileSearch/actions'
import { useRouter } from 'next/router'
import {default as React, useState} from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'
const queryString = require('query-string')
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Header from '../../../layout/Layout/LayoutAuthorized/mobile/Header'
import classNames from "classnames";
import {useAppContext} from "context/state";
import {ProfileRole} from "data/intefaces/IProfile";
interface Props {
  searchRole?: 'master' | 'volunteer'
}
const MapHeader = (props: Props) => {
  const {t} = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const appContext = useAppContext()
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)

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

  const getSearchPageLink = () => {

    switch (props.searchRole){
      case 'master':
        return 'SearchMasterPage'
      case 'volunteer':
        return 'SearchVolunteerPage'
      default:
        return 'SearchClientPage'
    }
  }
  const handleOnChangeFilter = (data) => {
    dispatch(setFilterProfileSearch(data))
    dispatch(resetProfileSearchList())
    dispatch(fetchProfileSearchList({limit: 10000}))
    router.replace(`/${getSearchPageLink()}?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })
  }
  return (
    <>
      <div className={styles.headerMobile}>
        <Header/>
      </div>
      <div  className={classNames(styles.root, {
        [styles.opened]: expanded,
        [styles.client]: appContext.role === ProfileRole.Client,
        [styles.volunteer]: appContext.role === ProfileRole.Volunteer,
        [styles.corporate]: appContext.role === ProfileRole.Corporate,
      })}>
        <div className={`${styles.container}`}>
          <div className={styles.logo}>
            <Logo color={'white'}/>
          </div>
          <div className={styles.form}>
            <SearchProfileFilter searchRole={props.searchRole} form={'searchTaskFormMap'} onChange={handleOnChangeFilter} collapsed={!expanded} initialValues={getQueryFilter()}/>

            <div onClick={handleMoreClick} className={styles.moreMobile}>
              {expanded ? <span>Hide</span> : <span>{t('profileSearch.filter.showMoreOptions')}</span>}<img className={expanded ? styles.hide : null} src="/img/icons/arrowDownSrchTask.svg" alt=""/>
            </div>
          </div>

          <div className={styles.more} onClick={handleMoreClick}>{expanded ?  t('profileSearch.filter.less') : t('profileSearch.filter.more')} <ArrowDown color={'white'}/></div>
        </div>
      </div>
      </>

  )
}
export default MapHeader
