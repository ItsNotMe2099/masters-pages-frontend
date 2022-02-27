import { fetchTaskUserListRequest, resetTaskUserList } from 'components/TaskUser/actions'

import Modal from 'components/ui/Modal'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { IRootState} from 'types'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import NewEventForm from 'components/Calendar/components/NewEventModal/components/NewEventForm'
import {createEvent} from 'components/Events/actions'
import { useTranslation } from 'next-i18next'
interface Props {
  isOpen: boolean,
  range?: any,
  onClose: () => void
}
const NewEventModal = ({isOpen, onClose, range}: Props) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('tasks')
  const { t } = useTranslation('common')

  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const tabs = [
    { name: t('availableTasks'), key: 'tasks' },
    { name: t('privateTasks'), key: 'newTask' },
  ]
  const filter = {
    status: 'in_progress'
  }
  useEffect(() => {
    dispatch(fetchTaskUserListRequest({
      ...filter,
      limit: 100,
      sort: 'createdAt',
      sortOrder: 'DESC'
    }))
    return () => {
      dispatch(resetTaskUserList())
    }
  }, [])
  const handleChangeTab = (item) => {
    setActiveTab(item.key)
  }

  const handleSubmitNewEvent = (data) => {
    dispatch(createEvent({...data, ...data.timeRange, timezone: format(new Date(), 'XXX')}))
    // dispatch(taskNegotiationSendOfferCreateTask(data, currentProfile.id));
  }
  const handleCancel = () => {
    onClose()
  }


  return (
    <Modal isOpen={isOpen} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>
      <div className={styles.header}>

        <div className={styles.title}>{t('event.newEvent')}</div>
      </div>
      <div className={styles.body}>
        <NewEventForm initialValues={{...(range ? {timeRange: range} : {})}} onCancel={handleCancel} onSubmit={handleSubmitNewEvent}/>
      </div>

    </Modal>
  )
}

export default NewEventModal
