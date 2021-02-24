import Logo from "components/Logo";
import SearchProfileFilter from "components/SearchPage/Filter";
import ArrowDown from "components/svg/ArrowDown";
import { fetchProfileSearchList, resetProfileSearchList, setFilterProfileSearch } from "components/ProfileSearch/actions";
import { useRouter } from "next/router";
import { useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
const queryString = require('query-string')
import { useDispatch, useSelector } from 'react-redux'
interface Props {
  searchRole?: 'master' | 'volunteer'
}
const MapHeader = (props: Props) => {
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
      <div className={styles.root}>
        <div className={`${styles.container}`}>
          <div className={styles.logo}>
            <Logo color={'white'}/>
          </div>
          <div className={styles.form}>
            <SearchProfileFilter searchRole={props.searchRole} form={'searchTaskFormMap'} onChange={handleOnChangeFilter} collapsed={!expanded} initialValues={getQueryFilter()}/>
          </div>

          <div className={styles.more} onClick={handleMoreClick}>{expanded ? 'Less' : 'More' } <ArrowDown color={'white'}/></div>
        </div>
      </div>

  )
}
export default MapHeader
