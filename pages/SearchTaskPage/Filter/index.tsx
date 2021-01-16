import { confirmOpen } from "components/Modal/actions";
import { saveProfileSearchList } from "components/ProfileSearch/actions";
import BookmarkSvg from "components/svg/Bookmark";
import {
  fetchTaskSearchList,
  resetTaskSearchList, saveTaskSearchList,
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
  collapsed?: boolean,
  onChange?: (data) => void,
  form?: string
}
const SearchTaskFilter = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)

  const [showMap, setShowMap] = useState(false)
  const handleFilterChange = (data) => {
    console.log("handleFilterChange", data)
    if(props.onChange){
        props.onChange({...data, keyword: data.keyword && data.keyword.length > 2 ? data.keyword: undefined});
    }else{
      dispatch(setFilterTaskSearch(data));
      dispatch(resetTaskSearchList())
      dispatch(fetchTaskSearchList())
      router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })

    }
  }
  const handleSaveSearch = () => {
    dispatch(confirmOpen({
      description: `Do you want to save current search?`,
      onConfirm: () => {
        dispatch(saveTaskSearchList(filter));
      }
    }));
  }
  return <>
    <SearchTaskForm form={props.form} collapsed={props.collapsed} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <div className={styles.saveSearchWrapper}>
    <div className={styles.saveSearch} onClick={handleSaveSearch}>Save the search </div><BookmarkSvg color={'white'}/>
   </div>}
   </>
}
export default SearchTaskFilter
