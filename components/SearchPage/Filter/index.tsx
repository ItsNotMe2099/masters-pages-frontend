import { confirmOpen } from "components/Modal/actions";
import {
  fetchProfileSearchList,
  resetProfileSearchList,
  setFilterProfileSearch
} from "components/ProfileSearch/actions";
import SearchProfileForm from "components/SearchPage/Filter/Form";
import BookmarkSvg from "components/svg/Bookmark";
import { setPublishedTaskUser } from "components/TaskUser/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import {useTranslation} from "react-i18next";
import SavedSearchList from 'components/SavedSearchList'
const queryString = require('query-string')
interface Props {
  initialValues?: any
  collapsed?: boolean,
  searchRole?: string,
  onChange?: (data) => void,
  form?: string
}
const SearchProfileFilter = (props: Props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch()
  const router = useRouter();
  const filter = useSelector((state: IRootState) => state.profileSearch.filter)
  const sortType = useSelector((state: IRootState) => state.profileSearch.sortType)

  const [showMap, setShowMap] = useState(false)
  const handleFilterChange = (data) => {
    if(props.onChange){
        props.onChange(data);
    }else{
      dispatch(setFilterProfileSearch(data));
      dispatch(resetProfileSearchList())
      dispatch(fetchProfileSearchList())
      router.replace(`/Search${props.searchRole === 'master' ? 'Master' : 'Volunteer'}Page?${queryString.stringify({filter: JSON.stringify(data), sortType})}`, undefined, { shallow: true })

    }
  }

  console.log("Dsdsd", props.collapsed )
  return <div>
    <SearchProfileForm form={props.form} collapsed={props.collapsed} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <SavedSearchList type={'profile'} onChange={handleFilterChange}/>}

  </div>
}
export default SearchProfileFilter
