
import {
  fetchTaskSearchList,
  resetTaskSearchList,
  setFilterTaskSearch
} from "components/TaskSearch/actions";
import { useRouter } from "next/router";
import SearchTaskForm from "pages/SearchTaskPage/Filter/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from "types";
import styles from './index.module.scss'
import {useTranslation} from "i18n";
import SavedSearchList from 'components/SavedSearchList'
const queryString = require('query-string')

import {change, initialize} from 'redux-form';
import {removeObjectEmpty} from 'utils/array'
interface Props {
  initialValues?: any
  collapsed?: boolean,
  onChange?: (data) => void,
  form?: string
}
const SearchTaskFilter = (props: Props) => {

  const { t } = useTranslation();
  const dispatch = useDispatch()
  const router = useRouter();
  const filter = useSelector((state: IRootState) => state.taskSearch.filter)
  const sortType = useSelector((state: IRootState) => state.taskSearch.sortType)

  const [showMap, setShowMap] = useState(false)
  const handleFilterChange = (data) => {
    if(props.onChange){
        props.onChange({...data, keyword: data.keyword && data.keyword.length > 2 ? data.keyword: undefined});
    }else{
      dispatch(initialize('searchTaskForm', data));
      dispatch(setFilterTaskSearch(data));
      dispatch(resetTaskSearchList())
      dispatch(fetchTaskSearchList())
      router.replace(`/SearchTaskPage?${queryString.stringify({filter: JSON.stringify(removeObjectEmpty(data)), sortType})}`, undefined, { shallow: true })

    }
  }

  return <div>
    <SearchTaskForm form={props.form} collapsed={props.collapsed} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <SavedSearchList type={'task'} onChange={handleFilterChange}/>}
   </div>
}
export default SearchTaskFilter
