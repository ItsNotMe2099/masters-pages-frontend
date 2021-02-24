import Logo from "components/Logo";
import ArrowDown from "components/svg/ArrowDown";
import { fetchTaskSearchList, resetTaskSearchList, setFilterTaskSearch } from "components/TaskSearch/actions";
import { useRouter } from "next/router";
import SearchTaskFilter from "pages/SearchTaskPage/Filter";
import { useState } from "react";
import { IRootState } from "types";
import styles from './index.module.scss'
const queryString = require('query-string')
import { useDispatch, useSelector } from 'react-redux'

const MapHeader = (props) => {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch()
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)

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
    dispatch(setFilterTaskSearch(data));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList({limit: 10000}))
    router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })
  }
  return (
      <div className={styles.root}>
        <div className={`${styles.container}`}>
          <div className={styles.logo}>
            <Logo color={'white'}/>
          </div>
          <div className={styles.form}>
            <SearchTaskFilter form={'searchTaskFormMap'} onChange={handleOnChangeFilter} collapsed={!expanded} initialValues={getQueryFilter()}/>
          </div>

          <div className={styles.more} onClick={handleMoreClick}>{expanded ? 'Less' : 'More' } <ArrowDown color={'white'}/></div>
        </div>
      </div>

  )
}
export default MapHeader
