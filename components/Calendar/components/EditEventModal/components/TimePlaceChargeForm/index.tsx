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
import {
  approveEventRequest,
  confirmEventRequest,
  declineEventRequest,
  deleteEvent,
  rejectEventRequest,
  setSubmitEvent
} from 'components/Events/actions'
import {confirmOpen, editEventOpen} from 'components/Modal/actions'
import MeetingForm from 'components/Calendar/components/EditEventModal/components/MeetingForm'
import StateButton from 'components/Calendar/components/EditEventModal/components/StateButton'
import {getEventPlannedAllowed} from 'utils/event'
import { useTranslation } from 'next-i18next'


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
  event?: IEvent,
  onAddExpense: (type) => void
  onEditExpense: (type, key, data) => void
}

let TimePlaceChargeForm = (props: Props) => {
  const {event, handleSubmit, onAddExpense, onEditExpense, onCancel} = props
  const error = useSelector((state: IRootState) => state.event.formError)
  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const taskList = useSelector((state: IRootState) => state.taskUser.list)
  const isCurrentEventEditMode = useSelector((state: IRootState) => state.event.isCurrentEventEditMode)
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
            dispatch(setSubmitEvent('complete'))
          }else{
            dispatch(setSubmitEvent('sendWithEdit'))
          }

        }else{
          dispatch(setSubmitEvent('send'))
        }

        handleSubmit(e)
        dispatch(editEventOpen())
      },
      onCancel: () => {
        dispatch(editEventOpen())
      }
    }))
  }
  const handleComplete = (e) => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.yourConsent'),
      onConfirm: () => {
        dispatch(editEventOpen())
        dispatch(setSubmitEvent('complete'))
        handleSubmit(e)

      },
      onCancel: () => {
        dispatch(editEventOpen())
      }
    }))

  }
  const handleRestore = (e) => {
    dispatch(rejectEventRequest(event.id))
    dispatch(editEventOpen())

  }
  const handleApprove = () => {

    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.approvalIsFinal'),
      onConfirm: () => {
        dispatch(editEventOpen())
        dispatch(approveEventRequest(event.id))

      },
      onCancel: () => {
        dispatch(editEventOpen())
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
      dispatch(setSubmitEvent('draftWithEdit'))
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
        dispatch(deleteEvent(event.id))
      },
      onCancel: () => {
        dispatch(editEventOpen())
      }
    }))

  }
  const handleConfirm = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.confirmIsFinal'),
      onConfirm: () => {
        dispatch(confirmEventRequest(event.id))
      },
      onCancel: () => {
        dispatch(editEventOpen())
      }
    }))
  }
  const handleDecline = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.declineIsFinal'),
      onConfirm: () => {
        dispatch(declineEventRequest(event.id))
      },
      onCancel: () => {
        dispatch(editEventOpen())
      }
    }))
  }
  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div className={styles.states}>
        <StateButton event={event} type={'client'}/>
        <div className={styles.spacer}/>
        <StateButton event={event} type={'master'}/>

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

TimePlaceChargeForm   = reduxForm (
{
  form: 'TimePlaceChargeForm',
}
) (TimePlaceChargeForm )

const selector = formValueSelector('TimePlaceChargeForm')
TimePlaceChargeForm = connect(state =>
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
)(TimePlaceChargeForm)
export default TimePlaceChargeForm
