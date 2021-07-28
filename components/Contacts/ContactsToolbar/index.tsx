import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from "components/TabSelect";
import {useTranslation, withTranslation} from "i18n";

import {DropDown} from 'components/ui/DropDown'
import Input from 'components/ui/Inputs/Input'
import {fetchCategory} from 'components/ui/Inputs/InputCategory/actions'
import {fetchSubCategory} from 'components/ui/Inputs/InputSubCategory/actions'
import {getCategoryTranslation} from 'utils/translations'

import {useThrottleFn} from '@react-cmpt/use-throttle'

interface Props {
  onSortChange: (sortOrder) => void,
  sortOrder: string,
  onUserTypeChange: (sortOrder) => void,
  userType: string,

  onCategoryChange: (sortOrder) => void,
  category: number,

  onSubCategoryChange: (sortOrder) => void,
  subCategory: number,
  onSearchChange: (value) => void
  total: number,
  totalName: string
}
const ContactsToolbar = (props: Props) => {
  const {onSortChange, sortOrder, total, totalName, subCategory, category, userType, onCategoryChange, onSubCategoryChange, onUserTypeChange} = props;
  const [ t , {language}] = useTranslation('common');
  const router = useRouter()
  const categories = useSelector((state: IRootState) => state.categoryInput.categories)
  const subCategories = useSelector((state: IRootState) => state.subCategoryInput.subCategories)
  const dispatch = useDispatch()
  const { callback: onChangeSearch, cancel, callPending } = useThrottleFn((val) => {
    props.onSearchChange(val)
  }, 300);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [])
  const handleCategoryChange = (val) => {
    dispatch(fetchSubCategory(val.value));
    onCategoryChange(val.value);
    onSubCategoryChange(null);
  }
  return (
    <div className={styles.root}>
      <div className={styles.search}>
      <Input placeholder={'Search'} size={'small'} input={{value: null, onChange: (e) => {
          onChangeSearch(e.currentTarget.value);
        } }}/>
      </div>
      <div className={`${styles.filter} ${styles.sort}`}>
        <div className={styles.label}>{totalName}:</div>
        <div className={styles.value}>{total}</div>

      </div>
      <div className={`${styles.filter} ${styles.category}`}>
        <div className={styles.label}>{t('taskSearch.filter.fieldCategory')}:</div>
        <DropDown onChange={handleCategoryChange} value={category} options={[
        {value: null,  label: 'all'},
        ...categories.map(item => ({ value: item.id,
            label: getCategoryTranslation(item, language)?.name})).sort((a,b)=> (a.label > b.label ? 1 : -1))
        ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>
      <div className={`${styles.filter} ${styles.subCategory}`}>
        <div className={styles.label}>{t('taskSearch.filter.fieldSubCategory')}:</div>
        <DropDown onChange={(val) => onSubCategoryChange(val?.value)} value={subCategory} options={[
          {value: null,  label: 'all'},
          ...subCategories.map(item => ({ value: item.id,
            label: getCategoryTranslation(item, language)?.name})).sort((a,b)=> (a.label > b.label ? 1 : -1))

        ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>
      <div className={styles.separator}/>
      <div className={`${styles.filter} ${styles.userType}`}>
        <div className={styles.label}>{t('contacts.toolbar.userType')}:</div>
        <DropDown onChange={(val) => onUserTypeChange(val.value)} value={userType} options={[
          {value: 'all',  label: t('contacts.toolbar.all')},
          {value: 'client',  label: t('contacts.toolbar.client')},
          {value: 'master',  label: t('contacts.toolbar.master')},
          {value: 'volunteer',  label: t('contacts.toolbar.volunteer')},
        ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>
      <div className={`${styles.filter} ${styles.sort}`}>
        <div className={styles.label}>{t('contacts.toolbar.sortType')}:</div>
        <DropDown onChange={(val) => onSortChange(val.value)} value={sortOrder} options={[
          {value: 'asc',  label: t('contacts.toolbar.a-z')},
          {value: 'desc',  label: t('contacts.toolbar.z-a')},
     ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>

    </div>
  )
}
export default ContactsToolbar
