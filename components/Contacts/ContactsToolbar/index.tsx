import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from "components/TabSelect";
import {useTranslation, withTranslation} from "react-i18next";

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
      console.log("EventChange", val)
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
  console.log("LLLLL", language)
  return (
    <div className={styles.root}>
      <div className={styles.search}>
      <Input placeholder={'Search'} size={'small'} input={{value: null, onChange: (e) => {
        console.log("Change", e)
          onChangeSearch(e.currentTarget.value);
        } }}/>
      </div>
      <div className={`${styles.filter} ${styles.sort}`}>
        <div className={styles.label}>{totalName}:</div>
        <div className={styles.value}>{total}</div>

      </div>
      <div className={`${styles.filter} ${styles.category}`}>
        <div className={styles.label}>Category:</div>
        <DropDown onChange={handleCategoryChange} value={category} options={[
        {value: null,  label: 'all'},
        ...categories.map(item => ({ value: item.id,
            label: getCategoryTranslation(item, language)?.name})).sort((a,b)=> (a.label > b.label ? 1 : -1))
        ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>
      <div className={`${styles.filter} ${styles.subCategory}`}>
        <div className={styles.label}>Sub category:</div>
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
        <div className={styles.label}>User type:</div>
        <DropDown onChange={(val) => onUserTypeChange(val.value)} value={userType} options={[
          {value: 'all',  label: 'all'},
          {value: 'client',  label: 'client'},
          {value: 'master',  label: 'master'},
          {value: 'volunteer',  label: 'volunteer'},
        ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>
      <div className={`${styles.filter} ${styles.sort}`}>
        <div className={styles.label}>Sort by:</div>
        <DropDown onChange={(val) => onSortChange(val.value)} value={sortOrder} options={[
          {value: 'asc',  label: 'a-z'},
          {value: 'desc',  label: 'z-a'},
     ]}
                  item={(item) => <div>{item?.label}</div>}
        />
      </div>

    </div>
  )
}
export default ContactsToolbar
