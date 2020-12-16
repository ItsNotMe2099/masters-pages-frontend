import {
  fetchTaskSearchList,
  resetTaskSearchList,
  saveTaskSearchListRequest,
  setFilterTaskSearch
} from "components/TaskSearch/actions";
import { useRouter } from "next/router";
import SearchTaskForm from "pages/SearchTaskPage/Filter/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
const queryString = require('query-string')
interface Props {
  initialValues?: any
  collapsed?: boolean
}
const SearchTaskFilter = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)

  const [showMap, setShowMap] = useState(false)
  const handleFilterChange = (data) => {
    console.log("Change", data)
    dispatch(setFilterTaskSearch(data));
    dispatch(resetTaskSearchList())
    dispatch(fetchTaskSearchList())
    router.push(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(data)})}`, undefined, { shallow: true })
  }
  const handleSaveSearch = () => {
      console.log("Save filter", filter);
      dispatch(saveTaskSearchListRequest(filter));
  }
  return <>
    <SearchTaskForm {...props} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <div className={styles.saveSearchWrapper}>
    <div className={styles.saveSearch} onClick={handleSaveSearch}>Save the search </div><img src={'/img/icons/like-icon.svg'}/>
   </div>}
   </>
}
export default SearchTaskFilter
