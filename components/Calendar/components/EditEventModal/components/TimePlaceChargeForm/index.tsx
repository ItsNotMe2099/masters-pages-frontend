import Button from "components/ui/Button";
import Loader from "components/ui/Loader";

import * as React from "react";
import {useState} from "react";
import {EventStatus, IEvent, IRootState} from "types";
import styles from './index.module.scss'

import {connect, useDispatch, useSelector} from 'react-redux'

import {formValueSelector, reduxForm} from 'redux-form'
import EventInputsForm from 'components/Calendar/components/EditEventModal/components/EventInputsForm'
import PricingForm from 'components/Calendar/components/EditEventModal/components/PricingForm'
import {
  approveEventRequest,
  confirmEventRequest,
  declineEventRequest,
  deleteEvent, rejectEventRequest,
  setSubmitEvent
} from 'components/Events/actions'
import {confirmOpen, editEventOpen} from 'components/Modal/actions'
import MeetingForm from 'components/Calendar/components/EditEventModal/components/MeetingForm'
import StateButton from 'components/Calendar/components/EditEventModal/components/StateButton'
import {getEventPlannedAllowed} from 'utils/event'


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
  const {event, handleSubmit, onAddExpense, onEditExpense, onCancel} = props;
  const error = useSelector((state: IRootState) => state.event.formError)
  const formLoading = useSelector((state: IRootState) => state.event.formLoading)
  const profile = useSelector((state: IRootState) => state.profile.currentProfile)
  const taskList = useSelector((state: IRootState) => state.taskUser.list)
  const isCurrentEventEditMode = useSelector((state: IRootState) => state.event.isCurrentEventEditMode)
  const [isTempEdit, setIsTempEdit] = useState(false);
  const isAuthor = isTempEdit || profile.id === event.authorId
  const dispatch = useDispatch();

  const isPlannedDisabled = !((isTempEdit || isCurrentEventEditMode) && getEventPlannedAllowed(event)) || [EventStatus.Draft].includes(event.status);
  const isCompletedDisabled =  !((!(isTempEdit || isCurrentEventEditMode) && [EventStatus.Confirmed].includes(event.status)) || (isTempEdit && [EventStatus.Completed].includes(event.status)));
  console.log("isPlannedDisabled", event.status, isPlannedDisabled, isCurrentEventEditMode );
  console.log("isCompletedDisabled", event.status, isCompletedDisabled );
  console.log("InitialValues", props.initialValues);
  const getButtonKeys = () => {
    let keys = [];
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
    console.log("ButtoNkeys", keys, event.status)
    return keys;

  }
  const renderButton = (type: ButtonType) => {
    switch (type){
      case ButtonType.Delete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                type={'button'} onClick={handleDelete}>Delete</Button>;
      case ButtonType.Draft:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'submit'} onClick={handleDraft}>Save as Draft</Button>;

      case ButtonType.Send:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleSend}>Send</Button>;
      case ButtonType.Decline:
        return  <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                        type={'button'} onClick={handleDecline}>Decline</Button>;
      case ButtonType.Confirm:
        return  <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                        type={'button'} onClick={handleConfirm}>Confirm</Button>
      case ButtonType.Edit:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleEdit}>Edit</Button>;
      case ButtonType.EditResults:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleEdit}>Edit results</Button>;
      case ButtonType.Cancel:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleCancel}>Cancel</Button>;
      case ButtonType.DeclineDelete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleDelete}>Decline & Delete</Button>;
      case ButtonType.RestoreDelete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleRestore}>Restore</Button>;
      case ButtonType.Complete:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleComplete}>Complete</Button>;
      case ButtonType.Approve:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
                       type={'button'} onClick={handleApprove}>Approve</Button>;
    }
  }

  const handleSend = (e) => {
    const confirmText = event.status === EventStatus.Completed ? 'You are confirming your consent with completion of event as recorded.  This action can not be undone. Do you want to proceed?' : 'Your invitation will be send to your counterparty. Do you want to proceed?”';

    dispatch(confirmOpen({
      description: confirmText,
      onConfirm: () => {
        if(isTempEdit || isCurrentEventEditMode) {
          if(event.status === EventStatus.Completed){
            dispatch(setSubmitEvent('complete'));
          }else{
            dispatch(setSubmitEvent('sendWithEdit'));
          }

        }else{
          dispatch(setSubmitEvent('send'));
        }

        handleSubmit(e);
        dispatch(editEventOpen());
      },
      onCancel: () => {
        dispatch(editEventOpen());
      }
    }));
  }
  const handleComplete = (e) => {
    dispatch(confirmOpen({
      description: `You are confirming your consent with completion of event as recorded.  This action can not be undone. Do you want to proceed?`,
      onConfirm: () => {
        dispatch(setSubmitEvent('complete'));
        dispatch(editEventOpen());
        handleSubmit(e);
      },
      onCancel: () => {
        dispatch(editEventOpen());
      }
    }));

  }
  const handleRestore = (e) => {
    dispatch(rejectEventRequest(event.id));
    dispatch(editEventOpen());

  }
  const handleApprove = () => {

    dispatch(confirmOpen({
      description: `Approval is final and can not be undone. Do you want to proceed?`,
      onConfirm: () => {
        dispatch(approveEventRequest(event.id))
        dispatch(editEventOpen());
      },
      onCancel: () => {
        dispatch(editEventOpen());
      }
    }));


  }

  const handleCancel = () => {
    if(isTempEdit){
      setIsTempEdit(false);
    }else {
      onCancel();
    }
  }

  const handleDraft = (e) => {
    if(isTempEdit || isCurrentEventEditMode) {
      dispatch(setSubmitEvent('draftWithEdit'));
    }
    handleSubmit(e);
  }
  const handleEdit = (e) => {
    console.log("HandleEdit");
    setIsTempEdit(true);
    e.preventDefault();
    //dispatch(editEventRequest(event.id))
   // dispatch(deleteEvent(event.id))
  }


  const handleDelete = () => {
    dispatch(confirmOpen({
      description: `Deletion is final and can not be undo. Do you want to proceed?`,
      onConfirm: () => {
        dispatch(deleteEvent(event.id));
      },
      onCancel: () => {
        dispatch(editEventOpen());
      }
    }));

  }
  const handleConfirm = () => {
    dispatch(confirmOpen({
      description: `Confirm is final and can not be undone. Do you want to proceed?`,
      onConfirm: () => {
        dispatch(confirmEventRequest(event.id))
      },
      onCancel: () => {
        dispatch(editEventOpen());
      }
    }));
  }
  const handleDecline = () => {
    dispatch(confirmOpen({
      description: `Decline is final and can not be undone. Do you want to proceed?`,
      onConfirm: () => {
        dispatch(declineEventRequest(event.id))
      },
      onCancel: () => {
        dispatch(editEventOpen());
      }
    }));
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
