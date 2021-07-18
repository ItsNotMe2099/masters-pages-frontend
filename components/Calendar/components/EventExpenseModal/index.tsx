import { fetchTaskUserListRequest, resetTaskUserList } from "components/TaskUser/actions";

import Modal from "components/ui/Modal";
import Tabs from "components/ui/Tabs";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import * as React from "react";
import {IEvent, IRootState, ITask, SkillData, SkillListItem} from "types";
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'
import NewEventForm from 'components/Calendar/components/NewEventModal/components/NewEventForm'
import {createEvent} from 'components/Events/actions'
import StateButton from 'components/Calendar/components/EditEventModal/components/StateButton'
import TimePlaceChargeForm from 'components/Calendar/components/EditEventModal/components/TimePlaceChargeForm'
import PricingForm from 'components/Calendar/components/EditEventModal/components/PricingForm'
import EventExpenseForm from 'components/Calendar/components/EventExpenseModal/components/EventExpenseForm'
import {useTranslation} from 'i18n'
interface Props {
  isOpen: boolean,
  type: 'actual' | 'planned'
  event?: IEvent,
  onClose: () => void,
  onSubmit: (data) => void
}
const EventExpenseModal = ({event, isOpen, onClose, type, onSubmit}: Props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('tasks')
  const {t} = useTranslation('common');



  const handleSubmit = (data) => {
    onSubmit(data)
    onClose();
  }
  const handleCancel = () => {
    onClose();
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
