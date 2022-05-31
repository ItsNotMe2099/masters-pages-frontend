
import Modal from 'components/ui/Modal'
import { useState } from 'react'
import * as React from 'react'
import {IEvent} from 'types'
import styles from './index.module.scss'

import { useDispatch } from 'react-redux'
import EventExpenseForm from 'components/Calendar/components/EventExpenseModal/components/EventExpenseForm'
import { useTranslation } from 'next-i18next'
interface Props {
  isOpen: boolean,
  type: 'actual' | 'planned'
  event?: IEvent,
  onClose: () => void,
  onSubmit: (data) => void
}
const EventExpenseModal = ({event, isOpen, onClose, type, onSubmit}: Props) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('tasks')
  const {t} = useTranslation('common')



  const handleSubmit = (data) => {
    onSubmit(data)
    onClose()
  }
  const handleCancel = () => {
    onClose()
  }


  return (
    <Modal isOpen={isOpen} title={t('event.addNewExpense')} size={'medium'} className={styles.root} loading={false} closeClassName={styles.modalClose} onRequestClose={onClose}>

      <div className={styles.body}>
        <EventExpenseForm  onSubmit={handleSubmit} onCancel={handleCancel}/>
      </div>

    </Modal>
  )
}

export default EventExpenseModal
