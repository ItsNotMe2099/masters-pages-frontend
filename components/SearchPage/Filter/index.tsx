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
import {useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import {useTranslation} from "i18n";
import SavedSearchList from 'components/SavedSearchList'
import {removeObjectEmpty} from 'utils/array'
const queryString = require('query-string')
import {change, initialize} from 'redux-form';
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
      const ref = useRef(null);
  const [showMap, setShowMap] = useState(false)
  const [formTriggerUpdate, setFormTriggerUpdate] = useState(false)

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
  const handleFilterChange = (data) => {
    console.log("handleFilterChange",  ref.current)
    if(      ref.current){
      return;
    }
    setFormTriggerUpdate(!formTriggerUpdate);
    if(props.onChange){
      //props.onChange({...data, keyword: data.keyword && data.keyword.length > 2 ? data.keyword: undefined});

    }else{
      ref.current = true;

      dispatch(initialize('searchTaskForm', data));

      setTimeout(() => {
        ref.current = false;
      }, 800);

      console.log("FilterData", data, removeObjectEmpty(data));
      dispatch(setFilterProfileSearch(data));
      dispatch(resetProfileSearchList())
      dispatch(fetchProfileSearchList())
      router.replace(`/${getSearchPageLink()}?${queryString.stringify({filter: JSON.stringify(removeObjectEmpty(data)), sortType})}`, undefined, { shallow: true })

    }
  }

  return <div>
    <SearchProfileForm type={props.searchRole}  form={props.form} collapsed={props.collapsed} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <SavedSearchList type={'profile'} onChange={handleFilterChange}/>}

  </div>
}
export default SearchProfileFilter
