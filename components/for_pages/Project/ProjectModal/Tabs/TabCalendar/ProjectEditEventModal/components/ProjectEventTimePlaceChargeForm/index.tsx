import Button from 'components/ui/Button'
import Loader from 'components/ui/Loader'
import * as React from 'react'
import {useState} from 'react'
import {EventStatus, IEvent, IRootState} from 'types'
import styles from './index.module.scss'
import {connect, useDispatch, useSelector} from 'react-redux'
import {formValueSelector, reduxForm} from 'redux-form'
import EventInputsForm from 'components/Calendar/components/EditEventModal/components/EventInputsForm'
import PricingForm from 'components/Calendar/components/EditEventModal/components/PricingForm'
import {confirmModalClose, confirmOpen, editEventOpen} from 'components/Modal/actions'
import MeetingForm from 'components/Calendar/components/EditEventModal/components/MeetingForm'
import StateButton from 'components/Calendar/components/EditEventModal/components/StateButton'
import {getEventPlannedAllowed} from 'utils/event'
import { useTranslation } from 'next-i18next'
import {useAppContext} from 'context/state'
import {useEventContext} from "context/event_state";
import {useEventCalendarContext} from "context/event_calendar";


enum ButtonType {
  Delete = 'Delete',
  Draft = 'Draft',
  Send = 'Send',
  Decline = 'Decline',
  Confirm = 'Confirm',
  Edit = 'Edit',
  EditResults = 'EditResults',
  Cancel = 'Cancel',
  DeclineDelete = 'DeclineDelete',
  RestoreDelete = 'RestoreDelete',
  Complete = 'Complete',
  Approve = 'Approve'
}

interface Props {
  onCancel?: () => void
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
  onAddExpense: (type) => void
  onEditExpense: (type, key, data) => void
  onSetSubmitEvent: (event: string) => void
}

let ProjectEventTimePlaceChargeForm = (props: Props) => {
  const { handleSubmit, onAddExpense, onEditExpense, onCancel} = props
  const eventContext = useEventContext()
  const event = eventContext.event
  const calendarContext = useEventCalendarContext()
  const formLoading = eventContext.editLoading
  const appContext = useAppContext();
  const profile = appContext.profile
  const isCurrentEventEditMode = calendarContext.isEditMode
  const [isTempEdit, setIsTempEdit] = useState(false)
  const isAuthor = isTempEdit || profile.id === event.authorId
  const dispatch = useDispatch()
  const {t} = useTranslation('common')

  let isPlannedDisabled = !((isTempEdit || isCurrentEventEditMode) && getEventPlannedAllowed(event))
  if([EventStatus.Draft].includes(event.status)){
    isPlannedDisabled = false
  }
  const isCompletedDisabled =  !((!(isTempEdit || isCurrentEventEditMode) && [EventStatus.Confirmed].includes(event.status)) || (isTempEdit && [EventStatus.Completed].includes(event.status)))

  const getButtonKeys = () => {
    let keys = []
    console.log("GetButtonsKeys", isTempEdit, isCurrentEventEditMode, event?.status)
    if(isTempEdit || isCurrentEventEditMode){
      keys = [ButtonType.Cancel, ButtonType.Draft, ButtonType.Send]
    }else if(isAuthor){
      if(event.status === EventStatus.Draft){
        keys = [ButtonType.Delete, ButtonType.Draft, ButtonType.Send]
      }else if(event.status === EventStatus.Planned){
        keys = [ButtonType.Cancel, ButtonType.Delete, ButtonType.Edit]
      }else if(event.status === EventStatus.Declined){
        keys = [ButtonType.Cancel, ButtonType.Delete, ButtonType.Edit]
      }else if(event.status === EventStatus.Confirmed){
        keys = [ButtonType.DeclineDelete, ButtonType.Edit, ButtonType.Complete]
      }else if(event.status === EventStatus.Completed){
        keys = [ButtonType.Cancel, ButtonType.Delete]
      }else if(event.status === EventStatus.Approved){
        keys = [ButtonType.Cancel, ButtonType.Delete]
      }else if(event.status === EventStatus.Deleted){
        keys = [ButtonType.Cancel, ButtonType.RestoreDelete]
      }
    }else{
      if(event.status === EventStatus.Draft){
        //Недостижмое
        keys = [ButtonType.Delete, ButtonType.Draft, ButtonType.Send]
      }else if(event.status === EventStatus.Planned){
        keys = [ButtonType.Decline, ButtonType.Confirm, ButtonType.Edit]
      }else if(event.status === EventStatus.Declined){
        keys = [ButtonType.Cancel, ButtonType.Delete, ButtonType.Edit]
      }else if(event.status === EventStatus.Confirmed){
        keys = [ButtonType.DeclineDelete, ButtonType.Edit, ButtonType.Complete]
      }else if(event.status === EventStatus.Completed){
        keys = [ButtonType.DeclineDelete,ButtonType.EditResults, ButtonType.Approve]
      }else if(event.status === EventStatus.Approved){
        keys = [ButtonType.Cancel, ButtonType.Delete]
      }else if(event.status === EventStatus.Deleted){
        keys = [ButtonType.Cancel, ButtonType.RestoreDelete, ButtonType.Delete]
      }
    }
    return keys

  }
  const renderButton = (type: ButtonType) => {
    switch (type){
      case ButtonType.Delete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                type={'button'} onClick={handleDelete}>{t('delete')}</Button>
      case ButtonType.Draft:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'submit'} onClick={handleDraft}>{t('saveAsDraft')}</Button>

      case ButtonType.Send:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleSend}>{t('send')}</Button>
      case ButtonType.Decline:
        return  <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                        type={'button'} onClick={handleDecline}>{t('decline')}</Button>
      case ButtonType.Confirm:
        return  <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                        type={'button'} onClick={handleConfirm}>{t('confirm')}</Button>
      case ButtonType.Edit:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleEdit}>{t('edit')}</Button>
      case ButtonType.EditResults:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleEdit}>{t('editResults')}</Button>
      case ButtonType.Cancel:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleCancel}>{t('cancel')}</Button>
      case ButtonType.DeclineDelete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleDelete}>{t('declineAndDelete')}</Button>
      case ButtonType.RestoreDelete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleRestore}>{t('restore')}</Button>
      case ButtonType.Complete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleComplete}>{t('complete')}</Button>
      case ButtonType.Approve:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleApprove}>{t('approve')}</Button>
    }
  }

  const handleSend = (e) => {
    const confirmText = event.status === EventStatus.Completed ? t('timePlaceChargeForm.yourConsent') : t('timePlaceChargeForm.yourInvitation')

    dispatch(confirmOpen({
      description: confirmText,
      onConfirm: () => {
        if(isTempEdit || isCurrentEventEditMode) {
          if(event.status === EventStatus.Completed){
            props.onSetSubmitEvent('complete')
          }else{
            props.onSetSubmitEvent('sendWithEdit')
          }

        }else{
         props.onSetSubmitEvent('send')
        }

        handleSubmit(e)
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))
  }
  const handleComplete = (e) => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.yourConsent'),
      onConfirm: () => {
        calendarContext.showModal('eventEditModal')
        props.onSetSubmitEvent('complete')
        handleSubmit(e)
        dispatch(confirmModalClose());

      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))

  }
  const handleRestore = (e) => {
    dispatch(confirmModalClose());
    eventContext.reject()
    calendarContext.showModal('eventEditModal')

  }
  const handleApprove = () => {

    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.approvalIsFinal'),
      onConfirm: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
        eventContext.approve()
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))


  }

  const handleCancel = () => {
    if(isTempEdit){
      setIsTempEdit(false)
    }else {
      onCancel()
    }
  }

  const handleDraft = (e) => {
    if(isTempEdit || isCurrentEventEditMode) {
      props.onSetSubmitEvent('draftWithEdit')
    }
    handleSubmit(e)
  }
  const handleEdit = (e) => {
    setIsTempEdit(true)
    e.preventDefault()
    //dispatch(editEventRequest(event.id))
   // dispatch(deleteEvent(event.id))
  }


  const handleDelete = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.deletionIsFinal'),
      onConfirm: () => {
        eventContext.delete()
        dispatch(confirmModalClose());
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))

  }
  const handleConfirm = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.confirmIsFinal'),
      onConfirm: () => {
        dispatch(confirmModalClose());
       eventContext.confirm()
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))
  }
  const handleDecline = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.declineIsFinal'),
      onConfirm: () => {
        dispatch(confirmModalClose());
        eventContext.decline()

      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))
  }
  console.log("EventStatus!!!", event.status)
  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.states}>
        <StateButton event={event} type={'client'}/>
        <div className={styles.spacer}/>
        <StateButton event={event} type={'volunteer'}/>

      </div>
      {formLoading ? <Loader/> : <>
        <div className={styles.form}>
          <EventInputsForm  {...props} isPlannedDisabled={isPlannedDisabled} isCompletedDisabled={isCompletedDisabled}  />
          <PricingForm {...props} isPlannedDisabled={isPlannedDisabled} isCompletedDisabled={isCompletedDisabled} onAddExpense={onAddExpense} onEditExpense={onEditExpense} event={event} />
          <MeetingForm {...props}  event={event} />
        </div>
        {!formLoading && <div className={styles.buttons}>
          {getButtonKeys().map(type => renderButton(type))}
        </div>}
      </>}
    </form>
  )
}

ProjectEventTimePlaceChargeForm   = reduxForm (
{
  form: 'ProjectEventTimePlaceChargeForm',
}
) (ProjectEventTimePlaceChargeForm )

const selector = formValueSelector('ProjectEventTimePlaceChargeForm')
ProjectEventTimePlaceChargeForm = connect(state =>
{
  const price = selector(state, 'price')
  const actualPrice = selector(state, 'actualPrice')
  const start = selector(state, 'start')
  const end = selector(state, 'end')
  const actualStart = selector(state, 'actualStart')
  const actualEnd = selector(state, 'actualEnd')
  const priceType = selector(state, 'priceType')
  const budget = selector(state, 'budget')
  const actualBudget = selector(state, 'actualBudget')
  const placeType = selector(state, 'placeType')


  return {price, actualPrice, start, end, actualStart, actualEnd, priceType, budget, actualBudget, placeType}
}
)(ProjectEventTimePlaceChargeForm)
export default ProjectEventTimePlaceChargeForm
