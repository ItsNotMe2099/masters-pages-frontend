import Modal from "components/ui/Modal";
import Tabs from "components/ui/Tabs";
import {differenceInHours} from "date-fns";
import * as React from "react";
import {useEffect, useState} from "react";
import {EventStatus, IEvent, IRootState} from "types";
import styles from './index.module.scss'

import {useDispatch, useSelector} from 'react-redux'
import {
  resetEventForm, setCurrentEventNext, setCurrentEventPrevious,
  submitEvent,
  updateEventExpenses
} from 'components/Events/actions'
import TimePlaceChargeForm from 'components/Calendar/components/EditEventModal/components/TimePlaceChargeForm'
import InfoTab from 'components/Calendar/components/EditEventModal/InfoTab'
import Loader from 'components/ui/Loader'
import ChatTab from 'components/Calendar/components/EditEventModal/components/ChatTab'
import EventExpenseModal from 'components/Calendar/components/EventExpenseModal'
import {editEventOpen, eventExpenseActualOpen, eventExpensePlannedOpen, modalClose} from 'components/Modal/actions'
import {getEventCompletedAllowed, getEventPlannedAllowed} from 'utils/event'
import ArrowLeftSmall from 'components/svg/ArrowLeftSmall'
import ArrowRightSmall from 'components/svg/ArrowRightSmall'
import {setProfileGalleryCurrentItemIndex} from 'components/ProfileGallery/actions'
import {useTranslation} from 'react-i18next'


interface Props {
  isOpen: boolean,
  range?: { start?: Date, end?: Date },
  onClose: () => void
}

const EditEventModal = (props: Props) => {
  const {isOpen, onClose, range} = props;
  const currentProfile = useSelector((state: IRootState) => state.profile.currentProfile)
  const {t} = useTranslation('common');


  useEffect(() => {
    return () => {
      dispatch(resetEventForm());
    }
  }, [])

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('time')
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const [currentEventEditExpenseType, setCurrentEventEditExpenseType] = useState('actual');
  const [currentEventEditExpenseKey, setCurrentEventEditExpenseKey] = useState(0);
  const [currentEventEditExpense, setCurrentEventEditExpense] = useState(null);

  const currentEventExpenses = useSelector((state: IRootState) => state.event.currentEventExpenses)
  const currentEventActualExpenses = useSelector((state: IRootState) => state.event.currentEventActualExpenses)

  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const event = useSelector((state: IRootState) => state.event.currentEvent)
  const currentLoading = useSelector((state: IRootState) => state.event.currentLoading)



  const newRangeStart = getEventPlannedAllowed(event) ? range?.start : null;
  const newRangeEnd = getEventPlannedAllowed(event) ? range?.end : null;
  const newRangeActualStart = getEventCompletedAllowed(event) ? range?.start : null;
  const newRangeActualEnd = getEventCompletedAllowed(event) ? range?.end : null;

  const tabs = [
    {name: t('event.timePlaceCharge'), key: 'time'},
    {name: t('event.chatReview'), key: 'chat', badge: parseInt(event?.unreadTextMessagesCount, 10) + parseInt(event?.unreadMediaMessagesCount, 10)},
    {name: t('event.info'), key: 'info'},
  ];

  const handleChangeTab = (item) => {
    setActiveTab(item.key);
  }

  const isAllowCompleted = [EventStatus.Draft, EventStatus.Confirmed];

  const handleSubmit = (data) => {

    const submitData = {
      start: data.start,
      end: data.end,
      ...(isAllowCompleted ? {
        actualStart: data.actualStart,
        actualEnd: data.actualEnd,
        actualHours: data.actualPrice.total,
        actualRatePerHour: data.actualPrice.rate,
        actualBudget: data.actualBudget,
        actualExpenses: currentEventActualExpenses,
      } : {}),
      expenses: currentEventExpenses,
      estimate: data.price.total,
      ratePerHour: data.price.rate,
      budget: data.budget,
      meetingLink: data.meetingLink,
      country: data.country,
      city: data.city,
      region: data.region,
      zipcode: data.zipcode,
      address1: data.address1,
      address2: data.address2

    };
    console.log("SubmitData", submitData);
    dispatch(submitEvent(event, submitData));
  }

  const handleAddExpense = (type) => {
    setCurrentEventEditExpenseType(type);
    setCurrentEventEditExpense(null);
    console.log("handleAddExpense", type)
    if (type === 'actual') {
      dispatch(eventExpenseActualOpen());
    } else {
      dispatch(eventExpensePlannedOpen());
    }
  }
  const handleEditExpense = (type, key, data) => {
    setCurrentEventEditExpenseType(type);
    setCurrentEventEditExpense(data);
    setCurrentEventEditExpenseKey(key)
  }
  const handleCancel = () => {
    dispatch(modalClose());
  }
  const handleExpanseSubmit = (data) => {
    if (currentEventEditExpense) {
      const newExpenses = currentEventEditExpenseType === 'actual' ? [...currentEventActualExpenses] : [...currentEventExpenses];
      newExpenses[currentEventEditExpenseKey] = data;
      dispatch(updateEventExpenses(currentEventEditExpenseType, newExpenses));
    } else {
      console.log("handleExpanseSubmit", data);
      const newExpenses = currentEventEditExpenseType === 'actual' ? [...currentEventActualExpenses] : [...currentEventExpenses];
      newExpenses.push(data);
      dispatch(updateEventExpenses(currentEventEditExpenseType, newExpenses));
    }
  }

  const handleNextClick = () => {
      dispatch(setCurrentEventNext())

  }
  const handlePrevClick = () => {
      dispatch(setCurrentEventPrevious())
  }

  const actualStart = event ? event.actualStart || event.start : 0;
  const actualEnd = event ? event.actualEnd || event.end : 0;
  return (
    <div>
      <Modal isOpen={isOpen} size={'medium'} className={styles.root} loading={false} closeClassName={styles.modalClose}
             onRequestClose={onClose}>
        {(event && !currentLoading) &&
        <Tabs activeTab={activeTab} onChange={handleChangeTab} tabClassName={styles.mainTab} tabs={tabs}/>}
        {(event && !currentLoading) && <div className={styles.nav}>
         <div className={styles.navArrow} onClick={handlePrevClick}><ArrowLeftSmall/></div>
         <div className={styles.navTitle}> {event.title}</div>
          <div className={styles.navArrow} onClick={handleNextClick}><ArrowRightSmall/></div>
        </div>}

        {(event && !currentLoading) && <div className={styles.body}>
          {activeTab === 'time' && <TimePlaceChargeForm event={event}
                                                        onAddExpense={handleAddExpense}
                                                        onEditExpense={handleEditExpense}
                                                        onCancel={handleCancel}
                                                        initialValues={{
                                                          ...event,
                                                          start:  newRangeStart || new Date(event.start),
                                                          end: newRangeEnd || new Date(event.end),
                                                          actualStart:  newRangeActualStart || new Date(actualStart),
                                                          actualEnd: newRangeActualEnd || new Date(actualEnd),
                                                          price: {
                                                            rate: event.ratePerHour || event.task.ratePerHour,
                                                            total: event.estimate || (differenceInHours(new Date(event.end), new Date(event.start)) > 0 ? differenceInHours(new Date(event.end), new Date(event.start)) : 1)
                                                          },
                                                          actualPrice: {
                                                            rate: event.actualRatePerHour || event.task.ratePerHour,
                                                            total: event.actualHours || (differenceInHours(new Date(actualEnd), new Date(actualStart)) > 0 ? differenceInHours(new Date(actualEnd), new Date(actualStart)) : 1)
                                                          }
                                                        }} onSubmit={handleSubmit}/>}
          {activeTab === 'chat' && <ChatTab event={event}/>}
          {activeTab === 'info' && <InfoTab event={event}/>}

        </div>}
        {currentLoading && <div className={styles.body}>
          <Loader/>
        </div>}

      </Modal>
      {modalKey === 'eventExpensePlannedModal' &&
      <EventExpenseModal onSubmit={handleExpanseSubmit} type={'planned'} event={event} isOpen={true}
                         onClose={() => dispatch(editEventOpen())}/>}
      {modalKey === 'eventExpenseActualModal' &&
      <EventExpenseModal onSubmit={handleExpanseSubmit} type={'actual'} event={event} isOpen={true}
                         onClose={() => dispatch(editEventOpen())}/>}

    </div>
  )
}

export default EditEventModal
