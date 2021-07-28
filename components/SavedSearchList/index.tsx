import {IRootState} from "types";
import styles from './index.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import {
  deleteSavedProfileSearch, deleteSavedTaskSearch,
  fetchSavedProfileSearchesRequest,
  fetchSavedTaskSearchesRequest, resetSavedSearchesList
} from 'components/SavedSearches/actions'
import SavedSearchListItem from 'components/SavedSearchList/components'
import React, {useEffect} from 'react'
import {confirmOpen, saveProfileSearchOpen, saveTaskSearchOpen} from 'components/Modal/actions'
import {setFilterTaskSearch} from 'components/TaskSearch/actions'
import {setFilterProfileSearch} from 'components/ProfileSearch/actions'
import BookmarkSvg from 'components/svg/Bookmark'
import {useTranslation} from 'i18n'


interface Props {
  type: 'task' | 'profile',
  onChange: (item) => void
}

export default function SavedSearchList(props: Props) {
  const {type, onChange} = props;
  const dispatch = useDispatch();
  const list = useSelector((state: IRootState) => state.savedSearch.list)
  const {t} = useTranslation();
  useEffect(() => {
    dispatch(resetSavedSearchesList());
    if (type === 'task') {
      dispatch(fetchSavedTaskSearchesRequest(1, 100));
    } else {
      dispatch(fetchSavedProfileSearchesRequest(1, 100));
    }
  }, [])

  const handleClick = (item) => {
    const data: any = {
      keywords: item.keywords,
      categoryId: item.categoryId,
      subCategoryId: item.subCategoryId,
      geonameid: item.geonameid,
      radius: item.radius,
      rating: item.rating,
      ratePerHourMin: item.ratePerHourMin,
      ratePerHourMax: item.ratePerHourMax,
      budgetMin: item.budgetMin,
      budgetMax: item.budgetMax,
      estimateMin: item.estimateMin,
      estimateMax: item.estimateMax,
      executionType: item.executionType,
      masterRole: item.masterRole};
    if(item.budgetMin || item.budgetMax){
      data.price = {type: 'fixed', min: item.budgetMin, max: item.budgetMax}
    }else if(item.ratePerHourMin || item.ratePerHourMax){
      data.price = {type: 'rate', min: item.budgetMin, max: item.budgetMax}
    }
    onChange(data);
  }
  const handleDelete = (item) => {
    dispatch(confirmOpen({
      description: `${t('savedSearch.areYouSure')}«${item.name || `${t('savedSearch.search')} #${item.id}`}»?`,
      onConfirm: () => {
        if (type === 'task') {
          dispatch(deleteSavedTaskSearch(item.id));
        } else {
          dispatch(deleteSavedProfileSearch(item.id));
        }
      }
    }));

  }

  const handleSaveSearch = () => {
    if (type === 'task') {
      dispatch(saveTaskSearchOpen())
    }else{
      dispatch(saveProfileSearchOpen());
    }
  }

  return (
    <div className={styles.root}>
     <div className={styles.list} style={{display: list.length === 0 ? 'none' : 'flex'}}>
      {list.map(item => <SavedSearchListItem key={item.id} item={item}  onClick={handleClick} onDelete={handleDelete}/>)}
     </div>
      <div className={styles.saveSearchWrapper}>
      <div className={styles.saveSearch} onClick={handleSaveSearch}>{t('taskSearch.saveTheSearch')}<BookmarkSvg color={'white'}/></div>
      </div>
      </div>
  )
}
