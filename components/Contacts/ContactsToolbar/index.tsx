import {confirmOpen, modalClose, taskUpdateOpen} from "components/Modal/actions";
import Task from "components/Task";
import { fetchTaskSearchList, setPageTaskSearch } from "components/TaskSearch/actions";
import TaskShareModal from "components/TaskShareModal";
import {
  fetchTaskUserList,
  fetchTaskUserStatRequest, resetTaskUserList,
  setFilterTaskUser,
  setPageTaskUser, setSortOrderTaskUser, setSortTaskUser
} from "components/TaskUser/actions";
import Loader from "components/ui/Loader";
import Tabs from "components/ui/Tabs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRootState, ITask } from "types";
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { TabSelect } from "components/TabSelect";
import {useTranslation, withTranslation} from "react-i18next";
import Layout from 'components/layout/Layout'
import {getAuthServerSide} from 'utils/auth'
import TabOrderModal from 'pages/PersonalArea/orders/[orderType]/components/TabOrderModal'
import Modals from 'components/layout/Modals'
import {fetchFollowerList, resetFollowerList, setPageFollower} from 'components/Follower/actions'
import ContactItem from 'components/Contacts/ContactItem'
import {deleteSavedPeople, fetchSavedPeopleRequest, resetSavedPeopleList} from 'components/SavedPeople/actions'
import {
  deleteProfileRecommendation,
  fetchProfileRecommendationForProfileList,
  fetchProfileRecommendationList,
  resetProfileRecommendationList, setPageProfileRecommendation
} from 'components/ProfileRecommendations/actions'
import {DropDown} from 'components/ui/DropDown'
import Input from 'components/ui/Inputs/Input'
import {fetchCategory} from 'components/ui/Inputs/InputCategory/actions'
import {fetchSubCategory} from 'components/ui/Inputs/InputSubCategory/actions'
import {getCategoryTranslation} from 'utils/translations'
interface Props {
  onSortChange: (sortOrder) => void,
  sortOrder: string,
  onUserTypeChange: (sortOrder) => void,
  userType: string,

  onCategoryChange: (sortOrder) => void,
  category: number,

  onSubCategoryChange: (sortOrder) => void,
  subCategory: number,

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
      <Input placeholder={'Search'} size={'small'} input={{value: null, onChange: () => {}}}/>
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
