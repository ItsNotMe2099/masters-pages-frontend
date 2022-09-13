import { taskNegotiationSendOfferCreateTask
} from 'components/TaskNegotiation/actions'
import TaskOfferNewOrder from 'components/TaskNegotiation/TaskOfferModal/components/TaskOfferNewOrder'
import TaskOfferOrderList from 'components/TaskNegotiation/TaskOfferModal/components/TaskOfferOrderList'
import { fetchTaskUserListRequest, resetTaskUserList } from 'components/TaskUser/actions'

import Modal from 'components/ui/Modal'
import Tabs from 'components/ui/Tabs'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { IRootState } from 'types'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import { fetchProfileSearchStatRequest, setSearchStatFilter } from 'components/ProfileSearch/actions'
interface Props {
  isOpen: boolean,
  onClose: () => void
}
const TaskOfferModal = ({isOpen, onClose}: Props) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('tasks')


  const sendOfferLoading = useSelector((state: IRootState) => state.taskOffer.sendOfferLoading)
  const taskListTotal = useSelector((state: IRootState) => state.taskUser.total)
  const taskListLoading = useSelector((state: IRootState) => state.taskUser.listLoading)
  const statFilter = useSelector((state: IRootState) => state.profileSearch.searchStatFilter)
  const {t} = useTranslation('common')
  const appContext = useAppContext()
  const profile = appContext.profile
  const isMaster = profile.role !== 'client'
  useEffect(() => {
    if(profile.role === 'client') {
      dispatch(fetchTaskUserListRequest({
        status: 'published',
        page: 1,
        limit: 10
      }))
    }
    return () => {
      dispatch(resetTaskUserList())
    }
  }, [])

  const tabs = [
    { name: t('taskNegotiation.availableTasks'), key: 'tasks' },
    { name: t('taskNegotiation.privateTask'), key: 'newTask' },
  ]
  const handleChangeTab = (item) => {
    setActiveTab(item.key)
  }

  const handleSubmitNewOrder = (data) => {
    dispatch(taskNegotiationSendOfferCreateTask({...data, visibilityType: 'private', profileId: profile.id}, profile.id))
  }

  const handleChangeForStat = (key, value) => {
    statFilter[key] = value
    dispatch(setSearchStatFilter(statFilter))
    dispatch(fetchProfileSearchStatRequest({
      limit: 1,
      ...statFilter
    }))
  }

  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <img  src={'/img/icons/dollar.svg'}/>
        </div>
        <div className={styles.title}>{t('taskNegotiation.offerTask')}</div>
      </div>
      <div className={styles.body}>
        {!sendOfferLoading && !taskListLoading && taskListTotal > 0 && <Tabs tabs={tabs} activeTab={activeTab} onChange={handleChangeTab}/>}
      {activeTab === 'tasks' && taskListTotal > 0 && <TaskOfferOrderList onCancel={onClose}/>}
      {(activeTab === 'newTask' || taskListTotal === 0) && <TaskOfferNewOrder onChangeForStat={handleChangeForStat} isMaster={isMaster} onCancel={onClose} initialValues={{
        priceType: 'fixed',
        masterRole: profile.role === 'client' ? profile.role : profile.role,
        countryCode: profile?.geoname?.country,
        geonameid: profile?.geonameid,
      }} onSubmit={handleSubmitNewOrder}/>}
      </div>

     </Modal>
  )
}

export default TaskOfferModal
