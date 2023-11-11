
import Button from 'components/ui/Button'
import Input from 'components/ui/Inputs/Input'
import SelectInput from 'components/ui/Inputs/SelectInput'
import Loader from 'components/ui/Loader'

import * as React from 'react'
import { EventStatus, IEvent, IRootState } from 'types'
import { eventMinDuration, required } from 'utils/validations'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import { useTranslation } from 'next-i18next'
import { useEventContext } from "context/event_state";
import { useEffect, useState } from "react";
import ApplicationRepository from "data/repositories/ApplicationRepository";
import { ApplicationStatus, IApplication } from "data/intefaces/IApplication";
import { useAppContext } from "context/state";
import TextArea from 'components/ui/Inputs/TextArea'
import { confirmChangeData, confirmModalClose, confirmOpen } from 'components/Modal/actions'
import { useEventCalendarContext } from 'context/event_calendar'
import EventRepository from 'data/repositories/EventRepository'
import { ProfileRole } from 'data/intefaces/IProfile'
import StateButton from 'components/Calendar/components/EditEventModal/components/StateButton'
import { format } from 'date-fns'
import { useProjectContext } from 'context/project_state'
interface Props {
  onCancel: () => void
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
  eventNumber: number
  isPlannedDisabled?: boolean,
  total?: number
  //onSetSubmitEvent: (event: string, data?) => void
  event?: IEvent
}

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

let ProjectNewEventForm = (props: Props) => {
  const appContext = useAppContext()
  const profile = appContext.profile
  const eventContext = useEventContext()
  const formLoading = eventContext.editLoading
  const calendarContext = useEventCalendarContext()
  const { t } = useTranslation('common')
  const [applications, setApplications] = useState<IApplication[]>([])
  const event = eventContext.event
  const isCurrentEventEditMode = calendarContext.isEditMode
  const [isTempEdit, setIsTempEdit] = useState(false)
  const isAuthor = isTempEdit || event && profile.id === event.authorId || props.event && profile.id === props.event.authorId

  const participantId = useSelector(state => formValueSelector('ProjectNewEventForm')(state, 'participantId'))
  const title = useSelector(state => formValueSelector('ProjectNewEventForm')(state, 'title'))
  const timeRange = useSelector(state => formValueSelector('ProjectNewEventForm')(state, 'timeRange'))
  const desc = useSelector(state => formValueSelector('ProjectNewEventForm')(state, 'description'))

  const projectContext = useProjectContext()

  const { handleSubmit } = props

  const dispatch = useDispatch()

  // Access the form values using Redux Form's formValueSelector
  const formData = {
    title: title,
    participantId: participantId,
    timeRange: timeRange,
    description: desc
    // Add other form fields as needed
  }

  console.log('TIMERANGE', timeRange)


  useEffect(() => {
    if (appContext.profile?.role === 'corporate') {
      ApplicationRepository.fetchApplicationsByCorporateForProject(eventContext.projectId).then(data => setApplications(data.data.filter(i => i.status === ApplicationStatus.Execution)))
    }
  }, [])

  /*useEffect(() => {
    if (timeRange && participantId) {
      props.onSubmit(formData)
    }
  }, [participantId])*/

  console.log('participantId', participantId)

  const handleDelete = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.deletionIsFinal'),
      onConfirm: async () => {
        dispatch(confirmChangeData({ loading: true }))
        await EventRepository.delete(props.event ? props.event.id : event.id)
        console.log("Deleted111")
        appContext.eventDeleteState$.next(event)
        dispatch(confirmModalClose());
        calendarContext.hideModal() // hide event modal after delete
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))

  }

  const handleDraft = (e) => {

  }

  console.log('EVEEVEVEVEVEVEVV', props.event)
  console.log('EVEEVEVEVEVEVEVV2', event)

  const getButtonKeys = () => {
    let keys = []

    console.log("GetButtonsKeys", isAuthor, '2323', isTempEdit, isCurrentEventEditMode, event?.status)
    if (isTempEdit || isCurrentEventEditMode) {
      keys = [ButtonType.Cancel, ButtonType.Send]
    } else if (isAuthor) {
      if (!event && !props.event) {
        keys = [ButtonType.Draft]
      }
      else if (event?.status === EventStatus.Draft || props.event.status === EventStatus.Draft) {
        keys = [ButtonType.Delete, ButtonType.Send]
      } else if (event?.status === EventStatus.Planned || props.event.status === EventStatus.Planned) {
        keys = [ButtonType.Cancel, ButtonType.Delete]
      } else if (event?.status === EventStatus.Declined || props.event.status === EventStatus.Declined) {
        keys = [ButtonType.Cancel, ButtonType.Delete]
      } else if (event?.status === EventStatus.Confirmed || props.event.status === EventStatus.Confirmed) {
        keys = [ButtonType.DeclineDelete, ButtonType.Complete]
      } else if (event?.status === EventStatus.Completed || props.event.status === EventStatus.Completed) {
        keys = [ButtonType.Cancel, ButtonType.Delete]
      } else if (event?.status === EventStatus.Approved || props.event.status === EventStatus.Approved) {
        keys = [ButtonType.Cancel, ButtonType.Delete]
      } else if (event?.status === EventStatus.Deleted || props.event.status === EventStatus.Deleted) {
        keys = [ButtonType.Cancel, ButtonType.RestoreDelete]
      }
    } else {
      if (!event && !props.event) {
        keys = [ButtonType.Draft]
      }
      else if (event?.status === EventStatus.Draft || props.event.status === EventStatus.Draft) {
        //Недостижмое
        keys = [ButtonType.Delete, ButtonType.Send]
      } else if (event?.status === EventStatus.Planned || props.event.status === EventStatus.Planned) {
        keys = [ButtonType.Decline, ButtonType.Confirm]
      } else if (event?.status === EventStatus.Declined || props.event.status === EventStatus.Declined) {
        keys = [ButtonType.Cancel, ButtonType.Delete]
      } else if (event?.status === EventStatus.Confirmed || props.event.status === EventStatus.Confirmed) {
        keys = [ButtonType.DeclineDelete, ButtonType.Complete]
      } else if (event?.status === EventStatus.Completed || props.event.status === EventStatus.Completed) {
        keys = [ButtonType.DeclineDelete, ButtonType.Approve, ButtonType.EditResults]
      } else if (event?.status === EventStatus.Approved || props.event.status === EventStatus.Approved) {
        keys = [ButtonType.Cancel, ButtonType.Delete]
      } else if (event?.status === EventStatus.Deleted) {
        keys = [ButtonType.Cancel, ButtonType.RestoreDelete, ButtonType.Delete]
      }
    }
    return keys

  }

  const handleComplete = (e) => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.yourConsent'),
      onConfirm: () => {
        calendarContext.showModal('eventEditModal')
        eventContext.update('complete', {
          ...formData, ...formData.timeRange, timezone: format(new Date(), 'XXX'),
          priceType: 'fixed',
          ...(
            appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
          )
        }, event ? event.id : props.event.id)
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
        eventContext.approve(event ? event.id : props.event.id)
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))


  }

  const handleSend = (e) => {
    const confirmText = props.event ?
      props.event.status === EventStatus.Completed ? t('timePlaceChargeForm.yourConsent') : t('timePlaceChargeForm.yourInvitation')
      :
      event.status === EventStatus.Completed ? t('timePlaceChargeForm.yourConsent') : t('timePlaceChargeForm.yourInvitation')

    dispatch(confirmOpen({
      description: confirmText,
      onConfirm: () => {
        if (isTempEdit || isCurrentEventEditMode) {
          if (props.event ? props.event.status === EventStatus.Completed : event.status === EventStatus.Completed) {
            eventContext.update('complete', {
              ...formData, ...formData.timeRange, timezone: format(new Date(), 'XXX'),
              priceType: 'fixed',
              ...(
                appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
              )
            }, event ? event.id : props.event.id)
          } else {
            eventContext.update('sendWithEdit', {
              ...formData, ...formData.timeRange, timezone: format(new Date(), 'XXX'),
              priceType: 'fixed',
              ...(
                appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
              )
            }, event ? event.id : props.event.id)
          }

        } else {
          eventContext.update('send', {
            ...formData, ...formData.timeRange, timezone: format(new Date(), 'XXX'),
            priceType: 'fixed',
            ...(
              appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
            )
          }, event ? event.id : props.event.id)
        }

        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))
  }


  const handleCancel = () => {
    if (isTempEdit) {
      setIsTempEdit(false)
    } else {
      props.onCancel()
    }
  }

  const handleConfirm = () => {
    dispatch(confirmOpen({
      description: t('timePlaceChargeForm.confirmIsFinal'),
      onConfirm: () => {
        dispatch(confirmModalClose());
        eventContext.confirm(event ? event.id : props.event.id)
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
        eventContext.decline(event ? event.id : props.event.id)

      },
      onCancel: () => {
        dispatch(confirmModalClose());
        calendarContext.showModal('eventEditModal')
      }
    }))
  }

  const handleEdit = (e) => {
    setIsTempEdit(true)
    e.preventDefault()
    //dispatch(editEventRequest(event.id))
    // dispatch(deleteEvent(event.id))
  }
  const renderButton = (type: ButtonType) => {
    switch (type) {
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
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
          type={'button'} onClick={handleDecline}>{t('decline')}</Button>
      case ButtonType.Confirm:
        return <Button className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
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



  return (
    <form className={styles.root} onSubmit={props.handleSubmit}>
      {formLoading ? <Loader /> : <>
        <div className={styles.form}>

          <Field
            name="title"
            component={Input}
            labelType={'static'}
            size={'small'}
            label={t('event.eventTitle')}
            validate={required}
            disabled
          />
          {appContext.profile?.role === 'corporate' && <Field
            name="participantId"
            component={SelectInput}
            options={applications.map(item => ({ label: `${item.profile.firstName} ${item.profile.lastName}`, value: item.profile.id }))}
            label={'Volunteer'}
            size={'small'}
            validate={required}
            disabled={props.event?.participantId ? true : false}
          />}
          {(props.event || event) && <div className={styles.states}>
            <StateButton event={props.event ? props.event : event} type={ProfileRole.Corporate} />
            <div className={styles.spacer} />
            <StateButton event={props.event ? props.event : event} type={ProfileRole.Volunteer} />

          </div>}
          <Field
            name="timeRange"
            component={DateTimeRange}
            disabled={props.event}
            label={t('date')}
            validate={[required, eventMinDuration]}
          />

          <Field className={styles.desc} name='description' component={TextArea} size={'small'} />

        </div>

        {!formLoading && <div className={styles.buttons}>
          {getButtonKeys().map(type => renderButton(type))}
        </div>}
      </>}
    </form>
  )
}

ProjectNewEventForm = reduxForm({
  form: 'ProjectNewEventForm',
})(ProjectNewEventForm)

const selector = formValueSelector('ProjectNewEventForm')
ProjectNewEventForm = connect(state => {
  // can select values individually
  /*const participantId = selector(state, 'categoryId')

  return {
    participantId
  }*/
})(ProjectNewEventForm)
export default ProjectNewEventForm
