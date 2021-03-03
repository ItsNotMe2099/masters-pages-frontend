import { confirmOpen } from "components/Modal/actions";
import {
  fetchProfileSearchList,
  resetProfileSearchList, saveProfileSearchList,
  saveProfileSearchListRequest,
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
  const handleSaveSearch = () => {
      dispatch(confirmOpen({
        description: t('profileSearch.saveTheSearchConfirm'),
        onConfirm: () => {
          dispatch(saveProfileSearchList(filter));
        }
      }));
  }
  return <>
    <SearchProfileForm form={props.form} collapsed={props.collapsed} onChange={handleFilterChange} initialValues={props.initialValues}/>
    {!props.collapsed && <div className={styles.saveSearchWrapper}>
    <div className={styles.saveSearch} onClick={handleSaveSearch}>{t('profileSearch.saveTheSearch')}</div>
      <BookmarkSvg color={'white'}/>
   </div>}
   </>
}
export default SearchProfileFilter
