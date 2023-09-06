import Modal from 'components/ui/Modal'
import Tabs from 'components/ui/Tabs'
import {differenceInHours, differenceInMinutes} from 'date-fns'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import {EventStatus, IEvent, IRootState} from 'types'
import styles from './index.module.scss'

import {useDispatch, useSelector} from 'react-redux'
import InfoTab from 'components/Calendar/components/EditEventModal/InfoTab'
import Loader from 'components/ui/Loader'
import ChatTab from 'components/Calendar/components/EditEventModal/components/ChatTab'
import EventExpenseModal from 'components/Calendar/components/EventExpenseModal'
import {editEventOpen, eventExpenseActualOpen, eventExpensePlannedOpen, modalClose} from 'components/Modal/actions'
import {getEventCompletedAllowed, getEventPlannedAllowed} from 'utils/event'
import ArrowLeftSmall from 'components/svg/ArrowLeftSmall'
import ArrowRightSmall from 'components/svg/ArrowRightSmall'
import { useTranslation } from 'next-i18next'
import {EventWrapper, useEventContext} from "context/event_state";
import {useEventCalendarContext} from "context/event_calendar";
import ProjectEventTimePlaceChargeForm
  from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectEditEventModal/components/ProjectEventTimePlaceChargeForm";
import ProjectEventInfoTab
  from "components/for_pages/Project/ProjectModal/Tabs/TabCalendar/ProjectEditEventModal/ProjectEventInfoTab";


interface Props {
  isOpen: boolean,
  range?: { start?: Date, end?: Date },
  onClose: () => void
  event: IEvent
}
const differenceInHoursCeil = (end, start) => {
  const diff = differenceInHours(end, start)
  if(differenceInMinutes(end, start) % 60 !== 0){
    return diff + 1
  }
  return diff
}
const ProjectEditEventModalInner = (props: Props) => {
  const {isOpen, onClose, range} = props
  const {t} = useTranslation('common')
  const calendarContext = useEventCalendarContext()
  const eventContext = useEventContext()

  const [activeTab, setActiveTab] = useState('time')
  const modalKey = useSelector((state: IRootState) => state.modal.modalKey)

  const [currentEventEditExpenseType, setCurrentEventEditExpenseType] = useState('actual')
  const [currentEventEditExpenseKey, setCurrentEventEditExpenseKey] = useState(0)
  const [currentEventEditExpense, setCurrentEventEditExpense] = useState(null)

  const currentEventExpenses =  eventContext.currentExpenses
  const currentEventActualExpenses = eventContext.currentActualExpenses

  const formLoading = eventContext.editLoading
  const event = eventContext.event
  const currentLoading = eventContext.loading
  const submitEventRef = useRef<string | null>(null)
  const handleSetSubmitEvent = (event: string | null) => {
    submitEventRef.current = event;

  }
  useEffect(() => {
    return () => calendarContext.setIsEditMode(false)
  }, [])


  const newRangeStart = getEventPlannedAllowed(event) ? range?.start : null
  const newRangeEnd = getEventPlannedAllowed(event) ? range?.end : null
  const newRangeActualStart = getEventCompletedAllowed(event) || getEventPlannedAllowed(event) ? range?.start : null
  const newRangeActualEnd = getEventCompletedAllowed(event) || getEventPlannedAllowed(event) ? range?.end : null

  const tabs = [
    {name: t('event.timePlaceCharge'), key: 'time'},
 //   {name: t('event.chatReview'), key: 'chat', badge: parseInt(event?.unreadTextMessagesCount, 10) + parseInt(event?.unreadMediaMessagesCount, 10)},
  //  {name: t('event.info'), key: 'info'},
  ]

  const handleChangeTab = (item) => {
    setActiveTab(item.key)
  }

  const isAllowCompleted = [EventStatus.Draft, EventStatus.Confirmed]

  const handleSubmit = async (data) => {

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
      placeType: data.placeType,
      meetingLink: data.meetingLink,
      country: data.country,
      city: data.city,
      region: data.region,
      zipcode: data.zipcode,
      address1: data.address1,
      address2: data.address2

    }

    await eventContext.update(submitEventRef.current, submitData)
    calendarContext.hideModal()
  }

  const handleAddExpense = (type) => {
    setCurrentEventEditExpenseType(type)
    setCurrentEventEditExpense(null)
    if (type === 'actual') {
      calendarContext.showModal('eventExpenseActualModal')
    } else {
      calendarContext.showModal('eventExpensePlannedModal')
    }
  }
  const handleEditExpense = (type, key, data) => {
    setCurrentEventEditExpenseType(type)
    setCurrentEventEditExpense(data)
    setCurrentEventEditExpenseKey(key)
  }
  const handleCancel = () => {

    calendarContext.hideModal()
  }
  const handleExpanseSubmit = (data) => {
    if (currentEventEditExpense) {
      const newExpenses = currentEventEditExpenseType === 'actual' ? [...currentEventActualExpenses] : [...currentEventExpenses]
      newExpenses[currentEventEditExpenseKey] = data
      eventContext.setCurrentExpenses(newExpenses)
    } else {
      const newExpenses = currentEventEditExpenseType === 'actual' ? [...currentEventActualExpenses] : [...currentEventExpenses]
      newExpenses.push(data)
      eventContext.setCurrentActualExpenses(newExpenses)
    }
  }

  const handleNextClick = () => {
    calendarContext.setCurrentEventNext()
  }
  const handlePrevClick = () => {
    calendarContext.setCurrentEventPrev()
  }

  const actualStart = event ? event.actualStart || event.start : 0
  const actualEnd = event ? event.actualEnd || event.end : 0
  console.log('newRangeStart', newRangeStart, newRangeEnd, differenceInHours(new Date(newRangeEnd), new Date(newRangeStart)))
  return (
    <div>
      <Modal isOpen={isOpen} size={'medium'} className={styles.root} loading={false} closeClassName={styles.modalClose}
             onRequestClose={onClose}>
        {(event && !currentLoading) &&
        <Tabs activeTab={activeTab} onChange={handleChangeTab} tabClassName={styles.mainTab} tabs={tabs}/>}
        {(event && !currentLoading) && <div className={styles.nav}>
         <div className={styles.navArrow} onClick={handlePrevClick}><ArrowLeftSmall/></div>
         <div className={styles.navTitle}> {event.participant.firstName} {event.participant.lastName}</div>
          <div className={styles.navArrow} onClick={handleNextClick}><ArrowRightSmall/></div>
        </div>}

        {(event && !currentLoading) && <div className={styles.body}>
          {activeTab === 'time' && <ProjectEventTimePlaceChargeForm
                                                        onAddExpense={handleAddExpense}
                                                        onEditExpense={handleEditExpense}
                                                        onCancel={handleCancel}
                                                        onSetSubmitEvent={handleSetSubmitEvent}
                                                        initialValues={{
                                                          ...event,
                                                          start: newRangeStart || new Date(event.start),
                                                          end: newRangeEnd || new Date(event.end),
                                                          actualStart: newRangeActualStart || new Date(actualStart),
                                                          actualEnd: newRangeActualEnd || new Date(actualEnd),
                                                          price: {
                                                            rate: event.ratePerHour || event.task?.ratePerHour,
                                                            total: newRangeStart && newRangeEnd ? differenceInHoursCeil(new Date(newRangeEnd), new Date(newRangeStart)) : event.estimate || (differenceInHoursCeil(new Date(event.end), new Date(event.start)) > 0 ? differenceInHoursCeil(new Date(event.end), new Date(event.start)) : 1)
                                                          },
                                                          actualPrice: {
                                                            rate: event.actualRatePerHour || event.task?.ratePerHour,
                                                            total: newRangeActualStart && newRangeActualEnd ? differenceInHoursCeil(new Date(newRangeActualEnd), new Date(newRangeActualStart)) : event.actualHours || (differenceInHoursCeil(new Date(actualEnd), new Date(actualStart)) > 0 ? differenceInHoursCeil(new Date(actualEnd), new Date(actualStart)) : 1)
                                                          }
                                                        }} onSubmit={handleSubmit}/>}
          {activeTab === 'chat' && <ChatTab event={event}/>}
          {activeTab === 'info' && <ProjectEventInfoTab event={event}/>}

        </div>}
        {currentLoading && <div className={styles.body}>
          <Loader/>
        </div>}

      </Modal>
      {modalKey === 'eventExpensePlannedModal' &&
      <EventExpenseModal onSubmit={handleExpanseSubmit} type={'planned'} event={event} isOpen={true}
                         onClose={() =>
                           calendarContext.showModal('eventEditModal')}/>}
      {modalKey === 'eventExpenseActualModal' &&
      <EventExpenseModal onSubmit={handleExpanseSubmit} type={'actual'} event={event} isOpen={true}
                         onClose={() => calendarContext.showModal('eventEditModal')}/>}

    </div>
  )
}

export default function ProjectEditEventModal(props: Props){
  return <EventWrapper eventId={props.event.id} event={props.event}>
    <ProjectEditEventModalInner {...props}/>
  </EventWrapper>
}
