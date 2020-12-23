import { confirmOpen } from "components/Modal/actions";
import {
  fetchProfileSearchList,
  resetProfileSearchList, saveProfileSearchList,
  saveProfileSearchListRequest,
  setFilterProfileSearch
} from "components/ProfileSearch/actions";
import SearchProfileForm from "components/SearchPage/Filter/Form";
import { setPublishedTaskUser } from "components/TaskUser/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
const queryString = require('query-string')
interface Props {
  initialValues?: any
  collapsed?: boolean,
  searchRole?: string,
  onChange?: (data) => void,
  form?: string
}
const SearchProfileFilter = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter();
  const filter = useSelector((state: IRootState) => state.profileSearch.filter)
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)

  const [showMap, setShowMap] = useState(false)
  const handleFilterChange = (data) => {
    console.log("handleFilterChange", data)
    if(props.onChange){
        props.onChange(data);
    }else{
      dispatch(setFilterProfileSearch(data));
      dispatch(resetProfileSearchList())
      dispatch(fetchProfileSearchList())
      router.replace(`/Search${props.searchRole === 'master' ? 'Master' : 'Volunteer'}Page?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })

    }
  }
  const handleSaveSearch = () => {
      dispatch(confirmOpen({
        description: `Do you want to save current search?`,
        onConfirm: () => {
          dispatch(saveProfileSearchList(filter));
        }
      }));
  }
  return <>
    <SearchProfileForm form={props.form} collapsed={props.collapsed} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <div className={styles.saveSearchWrapper}>
    <div className={styles.saveSearch} onClick={handleSaveSearch}>Save the search </div><img src={'/img/icons/like-icon.svg'}/>
   </div>}
   </>
}
export default SearchProfileFilter
