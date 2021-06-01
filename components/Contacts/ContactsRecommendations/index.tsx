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
import ContactsToolbar from 'components/Contacts/ContactsToolbar'
interface Props {
}
const ContactsRecommendations = (props: Props) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const dispatch = useDispatch()

  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const loading = useSelector((state: IRootState) => state.profileRecommendation.listLoading)
  const list = useSelector((state: IRootState) => state.profileRecommendation.list)
  const total = useSelector((state: IRootState) => state.profileRecommendation.total)
  const page = useSelector((state: IRootState) => state.profileRecommendation.page)
  const [sortType, setSortType] = useState('asc');
  const [userType, setUserType] = useState('all');
  const [category, setCategory] = useState('all');
  const [subCategory, setSubCategory] = useState('all');
  useEffect(() => {

    dispatch(resetProfileRecommendationList())
    dispatch(fetchProfileRecommendationList(profile.id, {
        page: 1,
      limit: 10,
    }));
    return () => {
      dispatch(resetProfileRecommendationList());
    }
  }, [])

  const handleScrollNext = () => {
    dispatch(setPageProfileRecommendation(page + 1))
    dispatch(fetchProfileRecommendationList(profile.id, {
      page: page + 1,
      limit: 10,
    }));
  }


  const handleDelete = (item) => {
    dispatch(confirmOpen({
      description: `Do you want to delete recommendation for «${item.recommendedProfile.firstName} ${item.recommendedProfile.lastName}»?`,
      onConfirm: () => {
        dispatch(deleteProfileRecommendation(item.id));
      }
    }));

  }

  const handleSortChange = (sortType) => {

  }
  const handleCategoryChange = (category) => {

  }
  const handleSubCategoryChange = (subCategory) => {

  }

  const handleUserTypeChange = (userType) => {

  }


  return (
    <div className={styles.root}>
      <ContactsToolbar onSortChange={handleSortChange} sortType={sortType} category={category} subCategory={subCategory} userType={userType} onCategoryChange={handleCategoryChange} onSubCategoryChange={handleSubCategoryChange} onUserTypeChange={handleUserTypeChange} total={total} totalName={'Recommendations'}/>

      <div >
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          style={{overflow: 'inherit'}}
          hasMore={total > list.length}
          loader={loading ? <Loader/> : null}>
          {list.map(item => <ContactItem deleteActionName={'Delete'} key={item.id} profile={item.recommendedProfile} onDelete={() => handleDelete(item)}/>)}
        </InfiniteScroll>}
      </div>

    </div>
  )
}
export default ContactsRecommendations
