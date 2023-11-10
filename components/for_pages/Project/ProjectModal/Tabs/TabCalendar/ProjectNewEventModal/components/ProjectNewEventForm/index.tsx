
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
let ProjectNewEventForm = (props: Props) => {
  const appContext = useAppContext()
  const eventContext = useEventContext()
  const formLoading = eventContext.editLoading
  const calendarContext = useEventCalendarContext()
  const { t } = useTranslation('common')
  const [applications, setApplications] = useState<IApplication[]>([])
  const event = eventContext.event
  const isCurrentEventEditMode = calendarContext.isEditMode
  const [isTempEdit, setIsTempEdit] = useState(false)

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
            })
          } else {
            eventContext.update('sendWithEdit', {
              ...formData, ...formData.timeRange, timezone: format(new Date(), 'XXX'),
              priceType: 'fixed',
              ...(
                appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
              )
            }, props.event.id)
          }

        } else {
          eventContext.update('send', {
            ...formData, ...formData.timeRange, timezone: format(new Date(), 'XXX'),
            priceType: 'fixed',
            ...(
              appContext.profile.role !== 'corporate' ? { participantId: projectContext.project.corporateProfileId } : {}
            )
          }, props.event.id)
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
            <StateButton event={props.event ? props.event : event} type={ProfileRole.Client} />
            <div className={styles.spacer} />
            <StateButton event={props.event ? props.event : event} type={ProfileRole.Master} />

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
          <Button disabled={props.event ? false : event ? false : true} className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
            type={'button'} onClick={handleDelete}>{t('delete')}</Button>
          <Button disabled={props.event ? props.event.status !== undefined : event ? event.status !== undefined : false}  className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
            type={'submit'} onClick={handleDraft}>{t('saveAsDraft')}</Button>
          <Button disabled={props.event ? false : event ? false : true} className={`${styles.button} ${styles.buttonSubmit}`} red={true} bold={true}
            type={'button'} onClick={handleSend}>{t('send')}</Button>
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
