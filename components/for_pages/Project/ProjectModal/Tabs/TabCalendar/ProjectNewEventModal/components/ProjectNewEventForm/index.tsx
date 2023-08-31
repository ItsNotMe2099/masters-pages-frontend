
import Button from 'components/ui/Button'
import Input from 'components/ui/Inputs/Input'
import SelectInput from 'components/ui/Inputs/SelectInput'
import Loader from 'components/ui/Loader'

import * as React from 'react'
import { IRootState } from 'types'
import {eventMinDuration, required} from 'utils/validations'
import styles from './index.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import { Field, reduxForm,formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import DateTimeRange from 'components/ui/Inputs/DateTimeRange'
import FormError from 'components/ui/Form/FormError'
import {RadioList} from 'components/ui/Inputs/RadioList'
import { useTranslation } from 'next-i18next'
import {useEventContext} from "context/event_state";
import {useEffect, useState} from "react";
import ApplicationRepository from "data/repositories/ApplicationRepository";
import {ApplicationStatus, IApplication} from "data/intefaces/IApplication";
import {useAppContext} from "context/state";
interface Props {
  onCancel: () => void
  initialValues?: any,
  handleSubmit?: (e) => void
  onSubmit: (data) => void
}
let ProjectNewEventForm = (props: Props) => {
  const appContext = useAppContext()
  const eventContext = useEventContext()
  const formLoading = eventContext.editLoading
  const { t } = useTranslation('common')
  const [applications, setApplications] = useState<IApplication[]>([])

  useEffect(() => {
    if(appContext.profile?.role === 'corporate') {
      ApplicationRepository.fetchApplicationsByCorporateForProject(eventContext.projectId).then(data => setApplications(data.data.filter(i => i.status === ApplicationStatus.Execution)))
    }
  }, [])


  return (
     <form className={styles.root} onSubmit={props.handleSubmit}>
       {formLoading ? <Loader/> : <>
      <div className={styles.form}>
        <Field
          name="timeRange"
          component={DateTimeRange}

          label={t('date')}
          validate={[required, eventMinDuration]}
        />
        <Field
          name="title"
          component={Input}
          labelType={'static'}
          size={'small'}
          label={t('event.eventTitle')}
          validate={required}
        />
        {appContext.profile?.role === 'corporate' && <Field
          name="participantId"
          component={SelectInput}
          options={applications.map(item => ({label: `${item.profile.firstName} ${item.profile.lastName}`, value: item.profile.id}))}
          label={'Volunteer'}
          size={'small'}
          validate={required}
        />}

    </div>

      {!formLoading && <div className={styles.buttons}>
        <Button className={styles.button} white={true} borderGrey={true} bold={true} size={'12px 40px'} type={'button'} onClick={props.onCancel}>{t('confirmModal.buttonCancel')}</Button>
        <Button className={`${styles.button} ${styles.buttonSubmit}`}  red={true} bold={true} size={'12px 40px'} type={'submit'}>{t('event.createEvent')}</Button>
      </div>}
      </>}
    </form>
  )
}

ProjectNewEventForm   = reduxForm ({
  form: 'ProjectNewEventForm',
}) (ProjectNewEventForm )

const selector = formValueSelector('ProjectNewEventForm')
ProjectNewEventForm = connect(state => {
  // can select values individually
//  const categoryId = selector(state, 'categoryId')

  return {
  }
})(ProjectNewEventForm)
export default ProjectNewEventForm
