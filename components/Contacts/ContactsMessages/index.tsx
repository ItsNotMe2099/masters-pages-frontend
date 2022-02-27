import Loader from 'components/ui/Loader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {IRootState} from 'types'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import ContactItem from 'components/Contacts/ContactItem'
import ContactsToolbar from 'components/Contacts/ContactsToolbar'
import {
  deleteSavedPeople,
  fetchProfileContacts,
  resetProfileContactsList, setPageProfileContactsList
} from 'components/Contacts/actions'
import {confirmOpen} from 'components/Modal/actions'
import {deleteFollower} from 'components/Follower/actions'
interface Props {
type: string
}
const ContactsList = ({type}: Props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const dispatch = useDispatch()
  const loading = useSelector((state: IRootState) => state.contacts.listLoading)
  const list = useSelector((state: IRootState) => state.contacts.list)
  const total = useSelector((state: IRootState) => state.contacts.total)
  const page = useSelector((state: IRootState) => state.contacts.page)
  const initialFilter = {sortOrder: 'ASC', search: null, categoryId: null, subCategoryId: null, role: null}
  const [filter, setFilter] = useState(initialFilter)
  useEffect(() => {
      setFilter(initialFilter)

  }, [type])
  useEffect(() => {

    dispatch(resetProfileContactsList())
    dispatch(fetchProfileContacts({
        page: 1,
      limit: 10,
      type,
      ...filter
    }))
    return () => {
      dispatch(resetProfileContactsList())
    }
  }, [filter])

  const handleScrollNext = () => {
    dispatch(setPageProfileContactsList(page + 1))
    dispatch(fetchProfileContacts({
      page: page + 1,
      limit: 10,
      type,
      ...filter
    }))
  }

  const handleDelete = (item) => {
    if(type === 'saved') {
      dispatch(confirmOpen({
        description: `Do you want to delete saved profile «${item.firstName} ${item.lastName}»?`,
        onConfirm: () => {
          dispatch(deleteSavedPeople(item.id))
        }
      }))
    }else if(type === 'subscriptions'){
      dispatch(confirmOpen({
        description: `Do you want to delete your subscription for «${item.firstName} ${item.lastName}»?`,
        onConfirm: () => {
          dispatch(deleteFollower(item.id))
        }
      }))
    }
  }
  const handleSortChange = (sortOrder) => {
    setFilter(filter => ({...filter, sortOrder}))
  }

  const handleCategoryChange = (categoryId) => {
    setFilter(filter => ({...filter, categoryId: categoryId === 'all' ? null : categoryId}))
  }
  const handleSubCategoryChange = (subCategoryId) => {
    setFilter(filter => ({...filter, subCategoryId: subCategoryId === 'all' ? null : subCategoryId }))
  }
  const handleSearchChange = (search) => {
    setFilter(filter => ({...filter, search}))
  }

  const handleRoleChange = (role) => {
    setFilter(filter => ({...filter, role: role === 'all' ? null : role }))
  }


  return (
    <div className={styles.root}>
      <ContactsToolbar onSearchChange={handleSearchChange} onSortChange={handleSortChange} sortOrder={filter.sortOrder} category={filter.categoryId} subCategory={filter.subCategoryId} userType={filter.role} onCategoryChange={handleCategoryChange} onSubCategoryChange={handleSubCategoryChange} onUserTypeChange={handleRoleChange} total={total} totalName={'Total'}/>

      <div >
        {(loading && total === 0) && <Loader/>}
        {total > 0 && <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={handleScrollNext}
          className={styles.list}
          style={{overflow: 'inherit'}}
          hasMore={total > list.length}
          loader={loading ? <Loader/> : null}>
          {list.map(item => <ContactItem onDelete={['saved','subscriptions'].includes(type) ? handleDelete : null} deleteActionName={'Delete'} key={item.contactProfile.id} profile={item.contactProfile}/>)}
        </InfiniteScroll>}
      </div>

    </div>
  )
}
export default ContactsList
