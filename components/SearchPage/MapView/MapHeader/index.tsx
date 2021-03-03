import Logo from "components/Logo";
import SearchProfileFilter from "components/SearchPage/Filter";
import ArrowDown from "components/svg/ArrowDown";
import { fetchProfileSearchList, resetProfileSearchList, setFilterProfileSearch } from "components/ProfileSearch/actions";
import { useRouter } from "next/router";
import {default as React, useState} from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
const queryString = require('query-string')
import { useDispatch, useSelector } from 'react-redux'
import {useTranslation} from "react-i18next";
import Header from "../../../layout/Header";
interface Props {
  searchRole?: 'master' | 'volunteer'
}
const MapHeader = (props: Props) => {
  const {t} = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch()
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)

  const handleMoreClick = () => {
    setExpanded(expanded => !expanded)
  }
  const getQueryFilter = () => {
    try {
      if((router.query as any).filter) {
        return JSON.parse((router.query as any).filter);
      }
    }catch (e) {

    }
    return {}
  }
  console.log("get query Filter", getQueryFilter())
  const handleOnChangeFilter = (data) => {
    dispatch(setFilterProfileSearch(data));
    dispatch(resetProfileSearchList())
    dispatch(fetchProfileSearchList({limit: 10000}))
    router.replace(`/Search${props.searchRole === 'master' ? 'Master' : 'Volunteer'}ePage?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })
  }
  return (
    <>
      <div className={styles.headerMobile}>
        <Header {...props}/>
      </div>
      <div  className={`${styles.root} ${expanded && styles.opened}`}>
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
