import Loader from "components/ui/Loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {IRootState, ITask, ProfileData} from "types";
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
import ContactsToolbar from 'components/Contacts/ContactsToolbar'
import {fetchChatContactsList, resetContactsChatList, setPageContactsChatList} from 'components/Contacts/actions'
interface Props {
}
const ContactsMessages = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const dispatch = useDispatch()
  const loading = useSelector((state: IRootState) => state.contacts.listLoading)
  const list = useSelector((state: IRootState) => state.contacts.list)
  const total = useSelector((state: IRootState) => state.contacts.total)
  const page = useSelector((state: IRootState) => state.contacts.page)
  const [filter, setFilter] = useState({sortOrder: 'ASC', categoryId: null, subCategoryId: null, role: null});
  useEffect(() => {

    dispatch(resetContactsChatList())
    dispatch(fetchChatContactsList({
        page: 1,
      limit: 10,
      ...filter
    }));
    return () => {
      dispatch(resetContactsChatList());
    }
  }, [filter])

  const handleScrollNext = () => {
    dispatch(setPageContactsChatList(page + 1))
    dispatch(fetchChatContactsList({
      page: page + 1,
      limit: 10,
      ...filter
    }));
  }

  const handleDelete = (item) => {


  }
  const handleSortChange = (sortOrder) => {
    setFilter(filter => ({...filter, sortOrder}));
  }

  const handleCategoryChange = (categoryId) => {
    setFilter(filter => ({...filter, categoryId}));
  }
  const handleSubCategoryChange = (subCategoryId) => {
    setFilter(filter => ({...filter, subCategoryId}));
  }

  const handleRoleChange = (role) => {
    setFilter(filter => ({...filter, role}));
  console.log("Filter", filter);
  }

  return (
    <div className={styles.root}>
      <ContactsToolbar onSortChange={handleSortChange} sortOrder={filter.sortOrder} category={filter.categoryId} subCategory={filter.subCategoryId} userType={filter.role} onCategoryChange={handleCategoryChange} onSubCategoryChange={handleSubCategoryChange} onUserTypeChange={handleRoleChange} total={total} totalName={'Saved'}/>

      <div >
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          style={{overflow: 'inherit'}}
          hasMore={total > list.length}
          loader={loading ? <Loader/> : null}>
          {list.map(item => <ContactItem deleteActionName={'Delete'} key={item.id} profile={item}/>)}
        </InfiniteScroll>}
      </div>

    </div>
  )
}
export default ContactsMessages
